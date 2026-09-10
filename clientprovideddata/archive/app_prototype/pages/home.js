// ============================================================
// home.js — "The Address"
// hero · marquee · featured · reels · stats · process ·
// testimonials · faq · cta
// ============================================================

import { el, ICONS, propertyCard, sectionHead, kicker, toast } from '../core/lib/components.js';
import { properties, newestFirst, reels, testimonials, faqs } from '../core/lib/data.js';
import { esc, priceOf, tcase } from '../core/lib/format.js';

export const title = () => 'SS Property — Premium Real Estate in Kolkata';

export default function home() {
  const frag = document.createDocumentFragment();
  const props = properties();
  const featured = newestFirst(props).slice(0, 3);
  const HERO = '/media/b/216404_90d216724e3248f28c690e727e262972~mv2.png';

  /* ---------------- HERO ---------------- */
  const hero = el('section', 'ui-hero', `
    <div class="ui-hero-media" data-parallax="0.10">
      <img src="${HERO}" alt="A premium Kolkata residence at dusk" fetchpriority="high">
    </div>
    <div class="ui-hero-veil"></div>
    <div class="ui-hero-grain"></div>
    <div class="container ui-hero-in">
      <div data-intro style="--i:0">
        <span class="kicker on-dark no-rule">Kolkata · Est. trust</span>
      </div>
      <h1 class="ui-hero-title" data-intro style="--i:1">
        Find a property<br>you'll <em>love</em><br>to call home.
      </h1>
      <p class="ui-hero-sub" data-intro style="--i:2">
        Verified residences, real video walkthroughs, and a brokered
        experience worth the visit — across every address that matters in Kolkata.
      </p>
      <div class="ui-search" data-intro style="--i:3" role="search" aria-label="Property search">
        <button class="ui-search-field" data-search="location">
          <label>Location</label><span class="val muted" style="font-size:var(--fs--1)">Newtown, Lake Town…</span>
        </button>
        <button class="ui-search-field" data-search="type">
          <label>Type</label><span class="val muted" style="font-size:var(--fs--1)">Apartment, Villa…</span>
        </button>
        <button class="ui-search-field" data-search="budget">
          <label>Budget</label><span class="val muted" style="font-size:var(--fs--1)">₹50 L – ₹2 Cr</span>
        </button>
        <a class="ui-btn ui-btn-dark" href="/properties" data-nav style="align-self:center;padding:16px 28px">
          Search ${ICONS.arrow.replace('<svg', '<svg class="arr"')}
        </a>
      </div>
      <div data-intro style="--i:4" class="stack-sm" aria-label="Popular searches">
        <span class="caps" style="color:var(--paper-55)">Popular</span>
        <div style="display:flex;gap:8px;flex-wrap:wrap">
          ${['Newtown', 'Rajarhat', 'Salt Lake', 'Lake Town', 'Garia', 'Kasba'].map((n) =>
            `<a class="ui-chip on-dark" href="/properties?q=${encodeURIComponent(n)}" data-nav>${n}</a>`).join('')}
        </div>
      </div>
    </div>`);
  hero.querySelectorAll('[data-search]').forEach((b) =>
    b.addEventListener('click', () => { location.href = '/properties'; }));
  frag.appendChild(hero);

  /* ---------------- MARQUEE (trust strip) ---------------- */
  const strip = ['1000+ properties featured', '125K+ community', 'RERA registered · WBRERA/A/HOW/2025/000646',
    '1000+ happy clients', 'Real video tours', 'Verified listings'];
  frag.appendChild(el('div', 'band-dark-2', `
    <div class="ui-marquee" style="padding-block:18px" aria-hidden="true">
      <div class="ui-marquee-track">
        ${strip.concat(strip).map((s) => `<span class="caps" style="color:var(--paper-55);white-space:nowrap">✦ &nbsp;${esc(s)}</span>`).join('')}
      </div>
    </div>`));

  /* ---------------- FEATURED ---------------- */
  const featuredWrap = el('section', 'section');
  featuredWrap.innerHTML = `
    <div class="container">
      ${sectionHead('Featured residences', 'Handpicked, worth the visit.', {
        sub: 'A short edit of our finest currently available — each one walked through on video by our team.',
        cta: `<a class="ui-btn ui-btn-ghost" href="/properties" data-nav>View all ${props.length} ${ICONS.arrow.replace('<svg', '<svg class="arr"')}</a>`,
      })}
      <div class="grid g3">
        ${featured.map((p) => '<div></div>').join('')}
      </div>
    </div>`;
  const grid = featuredWrap.querySelector('.grid');
  featured.forEach((p, i) => grid.appendChild(propertyCard(p, { featured: true })));
  frag.appendChild(featuredWrap);

  /* ---------------- REELS ---------------- */
  const reelData = reels();
  if (reelData.length) {
    const reelsSec = el('section', 'section band-dark', `
      <div class="container">
        ${sectionHead('See it, feel it', 'Walk the rooms before you visit.', {
          onDark: true,
          sub: 'Immersive reels shot inside the residences — the honest version of every listing.',
          cta: `<a class="ui-btn ui-btn-onDark" href="/videos" data-nav>All tours ${ICONS.arrow.replace('<svg', '<svg class="arr"')}</a>`,
        })}
        <div class="h-scroll" style="display:flex;gap:20px;padding-bottom:12px;scrollbar-width:thin">
          ${reelData.map((r, i) => `
            <a class="ui-card" data-reveal href="${esc(r.reelUrl || '#')}" ${r.reelUrl?.startsWith('http') ? 'target="_blank" rel="noopener"' : ''}
               style="flex:0 0 clamp(260px, 30vw, 380px);background:var(--ink-2)">
              <div class="ui-card-media" style="aspect-ratio:4/5">
                ${r.coverImage ? `<img src="${esc(r.coverImage)}" alt="${esc(r.title || 'Reel')}" loading="lazy">` : ''}
                <span class="ui-play" style="width:52px;height:52px">${ICONS.play}</span>
              </div>
              <div class="ui-card-body">
                <span class="caps" style="color:var(--brass-2)">Reel ${String(i + 1).padStart(2, '0')}</span>
                <h3 class="ui-card-title" style="color:var(--paper)">${esc(r.title || 'Property tour')}</h3>
                <p style="color:var(--paper-55);font-size:var(--fs--1)">${esc(r.shortDescription || 'A walkthrough with our team.')}</p>
              </div>
            </a>`).join('')}
        </div>
      </div>`);
    // remove data-nav behavior — these open externally
    reelsSec.querySelectorAll('a[data-reveal]').forEach((a) => a.removeAttribute('data-nav'));
    frag.appendChild(reelsSec);
  }

  /* ---------------- STATS ---------------- */
  const stats = [
    { n: '1000', suffix: '+', l: 'Properties featured' },
    { n: '125', suffix: 'K+', l: 'Community' },
    { n: '100', suffix: '+', l: 'Developer partners' },
    { n: '1000', suffix: '+', l: 'Happy clients' },
  ];
  frag.appendChild(el('section', 'section band-dark-2', `
    <div class="container">
      <div class="grid g4 on-dark" data-reveal style="align-items:center">
        ${stats.map((s) => `
          <div class="ui-stat">
            <span class="n num" data-count="${s.n}" data-suffix="${s.suffix}" data-final="${s.n}${s.suffix}">${s.n}${s.suffix}</span>
            <span class="l">${esc(s.l)}</span>
          </div>`).join('')}
      </div>
    </div>`));

  /* ---------------- PROCESS ---------------- */
  const steps = [
    ['Discover', 'Explore a curated collection — every listing verified before it earns a place.'],
    ['Experience', 'Walk the rooms on video first. Decide before you drive.'],
    ['Engage', 'Book a visit at your convenience, with a person who knows the address.'],
    ['Acquire', 'Complete the paperwork with expert assistance, end to end.'],
  ];
  frag.appendChild(el('section', 'section', `
    <div class="container">
      ${sectionHead('The process', 'Four steps, no guesswork.')}
      <div class="grid g4">
        ${steps.map(([t, d], i) => `
          <div data-reveal class="flow" style="border-top:1px solid var(--line);padding-top:24px">
            <span class="display d4 num" style="color:var(--brass);font-weight:420">0${i + 1}</span>
            <h3 class="d5" style="font-family:var(--font-display);font-weight:560">${t}</h3>
            <p class="muted" style="font-size:var(--fs--1)">${d}</p>
          </div>`).join('')}
      </div>
    </div>`));

  /* ---------------- TESTIMONIALS ---------------- */
  const tst = testimonials();
  if (tst.length) {
    frag.appendChild(el('section', 'section band-paper2', `
      <div class="container" style="display:grid;gap:56px">
        ${sectionHead('In their words', 'Trust, confirmed.')}
        <div class="ui-quote" data-reveal>
          <p>${esc(tst[0].reviewText)}</p>
          <div style="display:flex;align-items:center;gap:14px;margin-top:24px">
            ${tst[0].clientPhoto ? `<img src="${esc(tst[0].clientPhoto)}" alt="${esc(tst[0].clientName)}" style="width:44px;height:44px;border-radius:50%;object-fit:cover">` : ''}
            <div>
              <b style="font-size:var(--fs--1)">${esc(tst[0].clientName)}</b>
              <div class="caps muted" style="margin-top:2px">${esc(tst[0].clientLocation || 'Kolkata')} · ${'★'.repeat(Math.round(tst[0].rating || 5))}</div>
            </div>
          </div>
        </div>
      </div>`));
  }

  /* ---------------- FAQ ---------------- */
  const faqRows = faqs();
  if (faqRows.length) {
    const faqSec = el('section', 'section');
    faqSec.innerHTML = `
      <div class="container" style="display:grid;grid-template-columns:5fr 7fr;gap:64px" class="faq-grid">
        <div>
          ${sectionHead('Questions', 'Answered plainly.', { reveal: false })}
          <p class="muted" style="max-width:38ch">Everything buyers usually ask before the first visit. Anything else — <a href="mailto:writetous@ssproperty.in" style="color:var(--brass);border-bottom:1px solid var(--brass-soft)">write to us</a>.</p>
        </div>
        <div class="ui-acc" data-reveal>
          ${faqRows.map((f) => `
            <div class="ui-acc-item">
              <button class="ui-acc-btn" aria-expanded="false">
                <span>${esc(f.question)}</span>
                <span class="ui-acc-icon" aria-hidden="true"></span>
              </button>
              <div class="ui-acc-body"><div><p>${esc(f.answer)}</p></div></div>
            </div>`).join('')}
        </div>
      </div>`;
    faqSec.querySelectorAll('.ui-acc-btn').forEach((btn) => {
      btn.addEventListener('click', () => {
        const item = btn.closest('.ui-acc-item');
        const open = item.classList.toggle('open');
        btn.setAttribute('aria-expanded', open);
      });
    });
    frag.appendChild(faqSec);
  }

  /* ---------------- CTA BAND ---------------- */
  frag.appendChild(el('section', '', `
    <div class="band-dark" style="position:relative;overflow:hidden">
      <div style="position:absolute;inset:0;background:radial-gradient(120% 120% at 85% 10%, rgba(201,162,75,0.22), transparent 55%)"></div>
      <div class="container section" style="position:relative;display:grid;gap:32px;justify-items:center;text-align:center">
        <span class="kicker on-dark" data-reveal>Begin here</span>
        <h2 class="display d2" data-reveal style="max-width:20ch">Tell us the address you're dreaming of.</h2>
        <p data-reveal style="color:var(--paper-70);max-width:46ch">Share your requirements and our experts will curate a selection that matches — usually within a day.</p>
        <div data-reveal style="display:flex;gap:14px;flex-wrap:wrap;justify-content:center">
          <a class="ui-btn ui-btn-primary ui-btn-lg" href="/properties" data-nav data-magnetic>Browse residences</a>
          <a class="ui-btn ui-btn-onDark ui-btn-lg" href="/work-with-us" data-nav>Talk to an expert</a>
        </div>
      </div>
    </div>`));

  return frag;
}
