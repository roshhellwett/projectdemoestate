// SS Property offline clone — runtime shim v3.
// Full offline data layer for the Wix headless (Kore/Astro) app:
//  - Replays exact captured wix-data responses; synthesizes any other query from the local DB
//  - Rewrites wixstatic media URLs -> local files (fetch bodies, XHR, DOM imgs, styles)
//  - Serves a JWT-shaped fake OAuth token (SDK parses it for metaSiteId)
//  - Serves captured parastorage scripts locally
(() => {
  const MEDIA_MAP = window.__SS_MEDIA_MAP__ || {};
  const HAS_LOCAL = window.__SS_HAS_LOCAL__ || {};
  const DB = window.__SS_DB__ || {};
  const API_URLS = window.__SS_API_URLS__ || {};   // exact url -> {status, body}
  const EXACT = window.__SS_EXACT__ || {};          // b64(spec) -> body

  const WIX_RE = /https:\/\/static\.wixstatic\.com\/media\/([A-Za-z0-9_~.,%-]+)/g;

  const b64u = {
    enc: (s) => btoa(unescape(encodeURIComponent(s))).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, ''),
    dec: (s) => { s = s.replace(/-/g, '+').replace(/_/g, '/'); while (s.length % 4) s += '='; return decodeURIComponent(escape(atob(s))); }
  };

  // ---------- JWT-shaped fake token (metaSiteId inside) ----------
  function fakeJWT() {
    const b64 = (o) => b64u.enc(JSON.stringify(o));
    const now = Math.floor(Date.now() / 1000);
    const header = { alg: 'none', typ: 'JWT' };
    const payload = {
      iss: 'wix.com', aud: 'wix.com', sub: 'offline-clone',
      msid: 'd536d138-8337-44ec-9152-3b2a11e52ae9', // real metaSiteId from the site
      siteId: 'd536d138-8337-44ec-9152-3b2a11e52ae9',
      inst: 'offline-clone-instance',
      iat: now, exp: now + 31536000,
    };
    return `${b64(header)}.${b64(payload)}.x`;
  }

  // ---------- media URL mapping ----------
  // All local paths are ABSOLUTE from site root so they resolve on any route.
  function mapUrl(u) {
    if (typeof u !== 'string' || u.indexOf('wixstatic.com') === -1) return u;
    const clean = u.split(/[?#]/)[0];
    if (MEDIA_MAP[clean]) return '/' + MEDIA_MAP[clean];
    const m = clean.match(/^https:\/\/static\.wixstatic\.com\/media\/(.+)$/);
    if (m) {
      const path = m[1];
      const base = path.split('/v1/')[0];
      if (HAS_LOCAL['media/b/' + base]) return '/media/b/' + base;
      // any downloaded variant of this base: prefer the base file itself
      if (HAS_LOCAL['media/v/' + base]) return '/media/v/' + base;  // dir — not fetchable directly
    }
    return u;
  }
  window.__ss_mapUrl = mapUrl;

  function rewriteBody(text) {
    return text.replace(WIX_RE, (full, path) => {
      const clean = full.split(/[?#]/)[0];
      if (MEDIA_MAP[clean]) return '/' + MEDIA_MAP[clean];
      const base = path.split('/v1/')[0];
      if (HAS_LOCAL['media/b/' + base]) return '/media/b/' + base;
      return full;
    });
  }

  // ---------- wix-data engine ----------
  function specOf(url) {
    const m = url.match(/\?\.r=([^&]+)/);
    if (!m) return null;
    try { return JSON.parse(b64u.dec(m[1])); } catch (e) { return null; }
  }

  function matchFilter(it, filter) {
    return Object.entries(filter).every(([k, v]) => {
      const val = it[k];
      if (v && typeof v === 'object' && !(v instanceof Array)) {
        if (v.$eq !== undefined) return String(val) === String(v.$eq);
        if (v.$in !== undefined) return v.$in.map(String).includes(String(val));
        if (v.$hasSome !== undefined) return v.$hasSome.map(String).includes(String(val));
        return String(val) === String(v);
      }
      return String(val) === String(v);
    });
  }

  function buildResponse(spec) {
    const coll = spec.dataCollectionId;
    const q = spec.query || {};
    let items = DB[coll] || [];
    const filter = q.filter || {};
    if (Object.keys(filter).length) items = items.filter((it) => matchFilter(it, filter));
    const limit = (q.paging && q.paging.limit) ? q.paging.limit : (items.length || 1);
    const offset = (q.paging && q.paging.offset) || 0;
    const sliced = items.slice(offset, offset + limit);
    return {
      dataItems: sliced.map((it) => ({ id: it._id, dataCollectionId: coll, data: it })),
      pagingMetadata: { count: sliced.length, offset, total: items.length, tooManyToCount: false, cursors: {} }
    };
  }

  function jsonResponse(obj) {
    return new Response(rewriteBody(JSON.stringify(obj)), { status: 200, headers: { 'Content-Type': 'application/json' } });
  }

  // ---------- fetch interceptor ----------
  const realFetch = window.fetch.bind(window);
  async function ssFetch(input, init) {
    const url = (typeof input === 'string') ? input : (input && input.url) || String(input);
    const method = (init && init.method) || (input && input.method) || 'GET';

    if (/GET/i.test(method)) {
      // 1) wix-data items query
      if (/\/wix-data\/v2\/items\/query/.test(url)) {
        const spec = specOf(url);
        if (spec) {
          const key = b64u.enc(JSON.stringify(spec));
          if (EXACT[key]) return jsonResponse(JSON.parse(EXACT[key]));
          return jsonResponse(buildResponse(spec));
        }
      }
      // 2) exact captured endpoints (tag-manager, public-config, members 403 body, etc.)
      for (const [u, rec] of Object.entries(API_URLS)) {
        if (url.split('?')[0] === u.split('?')[0]) {
          return new Response(rec.body, { status: rec.status || 200, headers: { 'Content-Type': 'application/json' } });
        }
      }
      // 3) parastorage scripts -> local copies
      if (/^https:\/\/static\.parastorage\.com\//.test(url)) {
        const local = '/parastorage' + new URL(url).pathname.replace('/services', '/services');
        return realFetch(local, init);
      }
      // 4) media -> local
      const mapped = mapUrl(url);
      if (mapped !== url) return realFetch(mapped, init);
    }

    // 5) OAuth token endpoint (POST) -> fake JWT
    if (/\/oauth2\/token/.test(url)) {
      return new Response(JSON.stringify({
        access_token: fakeJWT(), token_type: 'Bearer',
        expires_in: 31536000, refresh_token: 'offline-clone-refresh', scope: 'offline_access'
      }), { status: 200, headers: { 'Content-Type': 'application/json' } });
    }

    // 6) telemetry — swallow silently
    if (/frog\.wix\.com|telemetry/.test(url)) {
      return new Response('', { status: 204 });
    }

    return realFetch(input, init);
  }
  window.fetch = ssFetch;

  // ---------- XMLHttpRequest (some SDK code + siteTags use XHR, not fetch) ----------
  const XO = XMLHttpRequest.prototype.open;
  const XS = XMLHttpRequest.prototype.send;
  const XSR = Object.getOwnPropertyDescriptor(XMLHttpRequest.prototype, 'onreadystatechange');
  XMLHttpRequest.prototype.open = function (m, u, ...rest) {
    this.__ss_url = String(u);
    this.__ss_method = String(m || 'GET').toUpperCase();
    const mapped = mapUrl(this.__ss_url);
    return XO.call(this, m, (mapped !== this.__ss_url) ? mapped : this.__ss_url, ...rest);
  };
  XMLHttpRequest.prototype.send = function (body) {
    const u = this.__ss_url || '';
    const isGET = (this.__ss_method || 'GET') === 'GET';

    // wix-data query -> local DB
    if (isGET && /\/wix-data\/v2\/items\/query/.test(u)) {
      const spec = specOf(u);
      if (spec) {
        const key = b64u.enc(JSON.stringify(spec));
        const resp = EXACT[key] ? JSON.parse(EXACT[key]) : buildResponse(spec);
        const text = rewriteBody(JSON.stringify(resp));
        return fakeXHR(this, 200, text);
      }
    }
    // captured endpoints (tag-manager, public-config, members/my...)
    if (isGET) {
      for (const [cu, rec] of Object.entries(API_URLS)) {
        if (u.split('?')[0] === cu.split('?')[0]) {
          return fakeXHR(this, rec.status || 200, rec.body);
        }
      }
    }
    // oauth token
    if (/\/oauth2\/token/.test(u)) {
      return fakeXHR(this, 200, JSON.stringify({
        access_token: fakeJWT(), token_type: 'Bearer',
        expires_in: 31536000, refresh_token: 'offline-clone-refresh', scope: 'offline_access'
      }));
    }
    // telemetry
    if (/frog\.wix\.com|telemetry/.test(u)) {
      return fakeXHR(this, 204, '');
    }
    // otherwise pass through (media URLs already mapped in open())
    return XS.call(this, body);
  };

  function fakeXHR(xhr, status, text) {
    const def = (obj, k, v) => Object.defineProperty(obj, k, { value: v, configurable: true, enumerable: true });
    const readyState = 4;
    def(xhr, 'readyState', readyState);
    def(xhr, 'status', status);
    def(xhr, 'statusText', status === 200 ? 'OK' : '');
    def(xhr, 'responseText', text);
    def(xhr, 'response', text);
    def(xhr, 'responseURL', 'about:offline-clone');
    try { def(xhr, 'responseType', ''); } catch (e) {}
    if (typeof xhr.onreadystatechange === 'function') {
      try { xhr.onreadystatechange(); } catch (e) {}
    }
    xhr.dispatchEvent(new Event('readystatechange'));
    xhr.dispatchEvent(new ProgressEvent('load'));
    xhr.dispatchEvent(new ProgressEvent('loadend'));
  }

  // ---------- DOM img/style rewriting ----------
  // 1) property setter interception (SDK sets img.src via property, not setAttribute)
  try {
    const srcDesc = Object.getOwnPropertyDescriptor(HTMLImageElement.prototype, 'src');
    Object.defineProperty(HTMLImageElement.prototype, 'src', {
      get() { return srcDesc.get.call(this); },
      set(v) {
        if (typeof v === 'string' && v.indexOf('wixstatic.com') !== -1) {
          const m = mapUrl(v);
          if (m !== v) { this.__ssDone = 1; return srcDesc.set.call(this, m); }
        }
        return srcDesc.set.call(this, v);
      },
      configurable: true, enumerable: true,
    });
  } catch (e) { console.warn('[offline-clone] src setter hook failed', e); }

  function fixEl(el) {
    if (!el || el.__ssDone) return;
    if (el.tagName === 'IMG') {
      if (el.getAttribute('src') && el.getAttribute('src').indexOf('wixstatic') !== -1) {
        const m = mapUrl(el.getAttribute('src'));
        if (m !== el.getAttribute('src')) { el.setAttribute('src', m); el.__ssDone = 1; }
      }
    }
    if (el.srcset && el.srcset.indexOf('wixstatic') !== -1) {
      el.srcset = el.srcset.split(',').map((p) => {
        const seg = p.trim().split(/\s+/);
        const m = mapUrl(seg[0]);
        return (m !== seg[0]) ? [m, seg[1]].filter(Boolean).join(' ') : p;
      }).join(', ');
      el.__ssDone = 1;
    }
  }
  const scan = (root) => { if (root && root.querySelectorAll) root.querySelectorAll('img').forEach(fixEl); };
  const mo = new MutationObserver((muts) => {
    for (const mu of muts) {
      for (const n of mu.addedNodes) {
        if (n.nodeType !== 1) continue;
        (n.tagName === 'IMG') ? fixEl(n) : scan(n);
      }
      if (mu.type === 'attributes') fixEl(mu.target);
    }
  });
  mo.observe(document.documentElement, { childList: true, subtree: true, attributes: true, attributeFilter: ['src', 'srcset'] });
  scan(document);

  // setAttribute('src'/'srcset'/'style') with wixstatic urls
  const origSetAttr = Element.prototype.setAttribute;
  Element.prototype.setAttribute = function (name, val) {
    if (typeof val === 'string' && val.indexOf('wixstatic') !== -1) {
      try {
        if (name === 'style') {
          val = val.replace(/url\(["']?(https:\/\/static\.wixstatic\.com\/media\/[^"')]+)["']?\)/g, (f, u) => `url("${mapUrl(u)}")`);
        } else if (name === 'src' || name === 'srcset' || name === 'data-src') {
          val = (name === 'srcset') ? val.split(',').map((p) => {
            const seg = p.trim().split(/\s+/);
            const m = mapUrl(seg[0]);
            return (m !== seg[0]) ? [m, seg[1]].filter(Boolean).join(' ') : p;
          }).join(', ') : mapUrl(val);
        }
      } catch (e) {}
    }
    return origSetAttr.call(this, name, val);
  };

  // CSSOM backgroundImage writes (el.style.backgroundImage = 'url(https://...)')
  try {
    const cssProto = CSSStyleDeclaration.prototype;
    const bgDesc = Object.getOwnPropertyDescriptor(cssProto, 'backgroundImage');
    if (bgDesc && bgDesc.set) {
      Object.defineProperty(cssProto, 'backgroundImage', {
        get() { return bgDesc.get.call(this); },
        set(v) {
          if (typeof v === 'string' && v.indexOf('wixstatic') !== -1) {
            try { v = v.replace(/url\(["']?(https:\/\/static\.wixstatic\.com\/media\/[^"')]+)["']?\)/g, (f, u) => `url("${mapUrl(u)}")`); } catch (e) {}
          }
          return bgDesc.set.call(this, v);
        },
        configurable: true, enumerable: true,
      });
    }
  } catch (e) {}

  console.info('[offline-clone] shim active — DB collections:', Object.keys(DB).map(c => c + ':' + (DB[c] ? DB[c].length : 0)).join(' '));
})();
