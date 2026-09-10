// ============================================================
// property.js — "The Dossier": gallery, specs, enquire, similar
// ============================================================

import { el, ICONS, propertyCard, kicker } from '../core/lib/components.js';
import { propertyById, imagesFor, similarTo, tourFor } from '../core/lib/data.js';
import { esc, priceOf, sqft, tcase, parseLocation, dateIN } from '../core/lib/format.js';
import { notFoundPage } from './notfound.js';

export function title(params) {
  const p = propertyById(params[0]);
  return p ? `${p.propertyName || 'Residence'} — SS Property` : 'Property — SS Property';
}

export default function propertyPage({ params }) {
  const p = propertyById(params[0]);
  if (!p) return notFoundPage({ params });

  const frag = document.createDocumentFragment();
  const price = priceOf(p);
  const loc = parseLocation(p.location);
  const imgs = imagesFor(p);
  const tour = tourFor(p);
  const similar = similarTo(p, 3);

  /* breadcrumb + head */
  frag.appendChild(el('div', '', `
    <div class="container" style="padding-top:28px">
      <nav class="ui-crumb" aria-label="Breadcrumb">
        <a href="/" data-nav>Home</a><span class="sep">/</span>
        <a href="/properties" data-nav>Properties</a><span class="sep">/</span>
        <span style="color:var(--ink)">${esc(loc.area)}</span>
      </nav>
    </div>`));

  const head = el('section', '', `
    <div class="container" style="padding-block:36px 8px">
      <div style="display:flex;justify-content:space-between;align-items:flex-end;gap:24px;flex-wrap:wrap">
        <div>
          ${p.status ? `<span class="ui-chip ui-chip-brass">${esc(tcase(p.status))}</span>` : ''}
          <h1 class="display d3" style="margin-top:16px;max-width:24ch">${esc(p.propertyName || p.title || 'Residence')}</h1>
          <p class="muted" style="margin-top:10px;display:flex;align-items:center;gap:8px">
            ${ICONS.pin} ${esc(loc.full)}
          </p>
        </div>
        <div class="ui-price num" style="text-align:right">
          <span class="big">${esc(price.big)}</span>
          ${price.short && price.short !== price.big ? `<span class="small">${esc(price.short)}</span>` : ''}
        </div>
      </div>
    </div>`);
  frag.appendChild(head);

  /* gallery */
  if (imgs.length) {
    const g = el('section', '', `
      <div class="container" style="padding-block:16px 8px">
        <div class="ui-gallery" data-reveal>
          <div class="ui-gallery-main">
            <img id="g-main" src="${esc(imgs[0].src)}" alt="${esc(imgs[0].alt)}">
            ${imgs.length > 1 ? `<span class="ui-count num">${imgs.length} photos</span>` : ''}
          </div>
          ${imgs.length > 1 ? `
            <div class="ui-gallery-thumbs" role="tablist" aria-label="Gallery">
              ${imgs.map((im, i) => `
                <button role="tab" aria-label="Photo ${i + 1}" class="${i === 0 ? 'active' : ''}" data-idx="${i}">
                  <img src="${esc(im.src)}" alt="" loading="lazy">
                </button>`).join('')}
            </div>` : ''}
        </div>
      </div>`);
    const main = g.querySelector('#g-main');
    g.querySelectorAll('.ui-gallery-thumbs button').forEach((btn) => {
      btn.addEventListener('click', () => {
        const im = imgs[+btn.dataset.idx];
        main.src = im.src;
        main.alt = im.alt || '';
        g.querySelectorAll('.ui-gallery-thumbs button').forEach((b) => b.classList.remove('active'));
        btn.classList.add('active');
      });
    });
    frag.appendChild(g);
  }

  /* dossier + enquire */
  const specs = [
    ['Configuration', tcase(p.bhkType) || '—'],
    ['Area', sqft(p.areaSqFt ?? p.areaAsText) || '—'],
    ['Bathrooms', p.numberOfBathrooms != null ? Number(p.numberOfBathrooms) : '—'],
    ['Balconies', p.numberOfBalconies != null ? Number(p.numberOfBalconies) : '—'],
    ['Facing', tcase(p.facing) || '—'],
    ['Floor', p.floor || '—'],
    ['Furnishing', tcase(p.furnishingStatus) || '—'],
    ['Possession', tcase(p.possessionStatus) || (p.possessionDate ? dateIN(p.possessionDate) : '—')],
    ['Building', tcase(p.buildingType) || '—'],
    ['Developer', p.developerName || '—'],
    ['Parking', tcase(p.parking) || '—'],
    ['Maintenance', p.maintenance || '—'],
  ].filter(([k, v]) => v !== '—' || ['Configuration', 'Area'].includes(k));

  const amenities = String(p.amenities || '').split(/[|,·]/).map((s) => s.trim()).filter(Boolean);

  const body = el('section', 'section-tight', `
    <div class="container split">
      <div class="flow">
        <div data-reveal>
          ${kicker('The residence')}
          <p class="measure" style="font-size:var(--fs-1);line-height:1.7">${esc(p.description || 'A verified residence in one of Kolkata\u2019s most convenient addresses.')}</p>
        </div>

        <div data-reveal>
          ${kicker('Specifications')}
          <dl class="spec-grid num" style="margin-top:20px">
            ${specs.map(([k, v]) => `
              <div class="spec-row">
                <dt class="caps muted">${esc(k)}</dt>
                <dd>${esc(String(v))}</dd>
              </div>`).join('')}
          </dl>
        </div>

        ${amenities.length ? `
          <div data-reveal>
            ${kicker('Amenities')}
            <div style="display:flex;gap:8px;flex-wrap:wrap;margin-top:20px">
              ${amenities.map((a) => `<span class="ui-chip" style="background:var(--paper-2)">${ICONS.check} ${esc(a)}</span>`).join('')}
            </div>
          </div>` : ''}

        ${p.landmarks ? `
          <div data-reveal>
            ${kicker('Landmarks')}
            <ul class="stack-sm" style="margin-top:18px">
              ${String(p.landmarks).split('|').map((l) => `<li class="muted" style="display:flex;gap:10px">${ICONS.pin}<span>${esc(l.trim())}</span></li>`).join('')}
            </ul>
          </div>` : ''}

        ${tour && tour.embedUrl ? `
          <div data-reveal>
            ${kicker('Video tour')}
            <div class="ui-facade" data-facade data-embed="${esc(tour.embedUrl)}" style="margin-top:20px;aspect-ratio:16/9;border-radius:var(--r-img)">
              ${tour.thumbnailImage ? `<img src="${esc(tour.thumbnailImage)}" alt="Video tour of the residence" loading="lazy">` : ''}
              <span class="ui-play">${ICONS.play}</span>
              <span class="ui-facade-platform"><span class="ui-chip" style="background:rgba(18,16,14,.72);color:var(--paper)">▶ &nbsp;Play the tour</span></span>
            </div>
          </div>` : ''}
      </div>

      <aside style="display:grid;gap:24px;align-content:start">
        <div class="ui-enquire" data-reveal>
          <div class="agent">
            <img src="/app/assets/monogram.svg" alt="" style="color:var(--brass);background:var(--brass-soft);border-radius:50%;padding:9px">
            <div class="who">
              <b>Ujjawal Sharma</b>
              <span>Founder · SS Property</span>
            </div>
          </div>
          <div class="num" style="display:grid;gap:2px">
            <span class="big" style="font-family:var(--font-display);font-size:var(--fs-3);font-weight:580;letter-spacing:-0.02em">${esc(price.big)}</span>
            ${price.short && price.short !== price.big ? `<span class="muted" style="font-size:var(--fs--1)">${esc(price.short)}</span>` : ''}
          </div>
          <div style="display:grid;gap:10px">
            <a class="ui-btn ui-btn-primary" href="https://wa.me/919429693786?text=${encodeURIComponent(`Hi, I'd like to visit: ${p.propertyName || p._id}`)}" target="_blank" rel="noopener" data-magnetic>
              ${ICONS.wa} Book a visit
            </a>
            <a class="ui-btn ui-btn-ghost" href="tel:+919429693786">${ICONS.phone} Call 94296 93786</a>
          </div>
          <div class="stack-sm" style="border-top:1px solid var(--line);padding-top:16px">
            <span class="ui-badge">${ICONS.verified} Verified by SS Property</span>
            <span class="caps muted num" style="letter-spacing:0.1em">RERA · WBRERA/A/HOW/2025/000646</span>
          </div>
        </div>

        <div class="ui-enquire" style="padding:24px" data-reveal>
          <b style="font-size:var(--fs--1)">Enquire about this residence</b>
          <div class="ui-field"><input class="ui-input" id="eq-name" placeholder=" " autocomplete="name"><label class="ui-label" for="eq-name">Full name</label></div>
          <div class="ui-field"><input class="ui-input" id="eq-phone" type="tel" placeholder=" " autocomplete="tel"><label class="ui-label" for="eq-phone">Phone</label></div>
          <button class="ui-btn ui-btn-dark" id="eq-send">Send enquiry</button>
          <p class="caps muted" style="letter-spacing:0.08em">Reply usually within a day</p>
        </div>
      </aside>
    </div>`);

  // wire facade + form
  const facade = body.querySelector('[data-facade]');
  if (facade) {
    facade.addEventListener('click', () => {
      const u = facade.dataset.embed;
      const iframe = document.createElement('iframe');
      iframe.allow = 'autoplay; encrypted-media; picture-in-picture';
      iframe.allowFullscreen = true;
      // instagram embeds need /embed; youtube watch links need /embed/ID
      let src = u;
      if (/instagram\.com\/(reel|p)\//.test(u)) src = u.replace(/\/(reel|p)\//, '/$1/embed').replace(/\/$/, '') + '/embed/captioned/';
      facade.innerHTML = '';
      facade.appendChild(iframe);
      iframe.src = src;
    }, { once: true });
  }
  const send = body.querySelector('#eq-send');
  send.addEventListener('click', () => {
    const name = body.querySelector('#eq-name').value.trim();
    if (!name) { send.closest('.ui-enquire').querySelector('.ui-field').classList.add('filled'); return; }
    import('../core/lib/components.js').then(({ toast }) => toast('Thank you — we\u2019ll reach out shortly.'));
  });

  frag.appendChild(body);

  /* similar */
  if (similar.length) {
    const sim = el('section', 'section-tight band-paper2', `
      <div class="container">
        ${kicker('Nearby, worth a look')}
        <h2 class="display d4" style="margin:14px 0 40px">You may also like</h2>
        <div class="grid g3"></div>
      </div>`);
    const g = sim.querySelector('.grid');
    similar.forEach((s) => g.appendChild(propertyCard(s)));
    frag.appendChild(sim);
  }

  return frag;
}
