// ============================================================
// work.js — "The Invitation": narrative + services + form
// ============================================================

import { el, ICONS, sectionHead, kicker } from '../core/lib/components.js';
import { esc } from '../core/lib/format.js';

export const title = () => 'Work With Us — SS Property';

const SERVICES = [
  ['Brand partnership', 'Showcase your projects to a highly engaged Kolkata real-estate audience — across reels, tours and this portfolio.', 'Brands · Developers'],
  ['Content & promotion', 'Professional walkthroughs, photography and distribution for developers and property businesses.', 'Developers · Agencies'],
  ['Buy-side advisory', 'Curated shortlists, honest guidance and negotiation that protects your budget.', 'Buyers'],
  ['Sell-side assistance', 'Valuation, media, marketing and buyer filtering — a clean, quick sale at the right price.', 'Owners'],
];

export default function workPage() {
  const frag = document.createDocumentFragment();

  frag.appendChild(el('section', 'section', `
    <div class="container split" style="align-items:center">
      <div>
        ${kicker('Work with us')}
        <h1 class="display d3" style="margin-top:16px;max-width:18ch">More than listings — <em class="italic" style="color:var(--brass)">a partnership.</em></h1>
        <p class="muted" style="margin-top:20px;max-width:52ch">
          We've built SS Property on verified information and honest media. If you're a developer,
          a brand or an owner with something worth showing — we'd like to walk it with you.
        </p>
        <div style="display:flex;gap:12px;margin-top:32px;flex-wrap:wrap">
          <span class="ui-badge">${ICONS.verified} RERA registered</span>
          <span class="ui-badge ui-badge-brass">125K+ community</span>
        </div>
      </div>
      <div class="ui-enquire" data-reveal style="padding:clamp(24px,3vw,40px)">
        <b style="font-family:var(--font-display);font-size:var(--fs-2);font-weight:540">Start the conversation</b>
        <div class="ui-field"><input class="ui-input" id="w-name" placeholder=" " autocomplete="name"><label class="ui-label" for="w-name">Your name</label></div>
        <div class="ui-field"><input class="ui-input" id="w-org" placeholder=" "><label class="ui-label" for="w-org">Company / brand</label></div>
        <div class="ui-field"><input class="ui-input" id="w-phone" type="tel" placeholder=" " autocomplete="tel"><label class="ui-label" for="w-phone">Phone</label></div>
        <div class="ui-field"><textarea class="ui-input" id="w-msg" placeholder=" "></textarea><label class="ui-label" for="w-msg">What are you building?</label></div>
        <button class="ui-btn ui-btn-primary" id="w-send" data-magnetic>Send ${ICONS.arrow.replace('<svg', '<svg class="arr"')}</button>
        <p class="caps muted">Or write to writetous@ssproperty.in</p>
      </div>
    </div>`));

  const svc = el('section', 'section band-dark', `
    <div class="container">
      ${sectionHead('What we do', 'Four ways to work together.', { onDark: true })}
      <div class="grid g2">
        ${SERVICES.map(([t, d, who], i) => `
          <div data-reveal class="flow" style="border:1px solid var(--line-dark);border-radius:var(--r-card);padding:clamp(24px,3vw,40px)">
            <span class="display d4 num" style="color:var(--brass-2);font-weight:420">0${i + 1}</span>
            <h3 class="d5" style="font-family:var(--font-display);font-weight:560;color:var(--paper)">${t}</h3>
            <p style="color:var(--paper-70);font-size:var(--fs--1);line-height:1.7">${d}</p>
            <span class="caps" style="color:var(--brass-2)">${who}</span>
          </div>`).join('')}
      </div>
    </div>`);
  frag.appendChild(svc);

  frag.appendChild(el('section', 'section band-paper2', `
    <div class="container center" style="display:grid;gap:24px;justify-items:center">
      ${kicker('Why teams choose us')}
      <div class="grid g3" style="margin-top:16px;text-align:left">
        <div data-reveal class="flow"><h3 class="d5" style="font-family:var(--font-display);font-weight:560">Real media, real reach</h3><p class="muted" style="font-size:var(--fs--1)">Walkthroughs our audience actually watches — 125K+ and growing across platforms.</p></div>
        <div data-reveal class="flow"><h3 class="d5" style="font-family:var(--font-display);font-weight:560">Compliance-first</h3><p class="muted" style="font-size:var(--fs--1)">RERA registered and verification-led. Your name is shown next to quality, never risk.</p></div>
        <div data-reveal class="flow"><h3 class="d5" style="font-family:var(--font-display);font-weight:560">Kolkata, properly</h3><p class="muted" style="font-size:var(--fs--1)">From Newtown to Garia — we know the blocks, the rates and the buyers.</p></div>
      </div>
    </div>`));

  // form wiring
  const form = frag.querySelector('.ui-enquire');
  form.querySelectorAll('.ui-input').forEach((inp) => {
    inp.addEventListener('input', () => inp.closest('.ui-field').classList.toggle('filled', !!inp.value));
  });
  frag.querySelector('#w-send').addEventListener('click', () => {
    const name = form.querySelector('#w-name').value.trim();
    if (!name) { form.querySelector('#w-name').focus(); return; }
    import('../core/lib/components.js').then(({ toast }) => toast('Thank you — expect our note shortly.'));
  });

  return frag;
}
