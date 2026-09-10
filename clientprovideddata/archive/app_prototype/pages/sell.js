// ============================================================
// sell.js — "Sell with SS"
// ============================================================

import { el, ICONS, sectionHead, kicker } from '../core/lib/components.js';
import { esc } from '../core/lib/format.js';

export const title = () => 'Sell Your Property — SS Property';

const STEPS = [
  ['Tell us about it', 'Basic details, a few photos — five minutes.'],
  ['We value it', 'An honest price band, backed by recent comparable sales.'],
  ['We shoot it', 'Walkthrough video and photography at no upfront cost for selected homes.'],
  ['We sell it', 'Qualified-buyer viewings, negotiation, closing support.'],
];

export default function sellPage() {
  const frag = document.createDocumentFragment();

  frag.appendChild(el('section', 'section', `
    <div class="container split" style="align-items:center">
      <div>
        ${kicker('Sell your property')}
        <h1 class="display d3" style="margin-top:16px;max-width:16ch">Sold well, <em class="italic" style="color:var(--brass)">without the noise.</em></h1>
        <p class="muted" style="margin-top:20px;max-width:52ch">
          Listing with SS Property means professional media, verified information and buyers who are
          ready — not window shoppers. You get one point of contact from valuation to registration.
        </p>
        <div class="grid g2" style="margin-top:40px;gap:20px">
          ${STEPS.map(([t, d], i) => `
            <div data-reveal style="border-top:1px solid var(--line);padding-top:16px">
              <span class="caps" style="color:var(--brass)">Step 0${i + 1}</span>
              <h3 style="font-family:var(--font-display);font-weight:560;font-size:var(--fs-1);margin-top:8px">${t}</h3>
              <p class="muted" style="font-size:var(--fs--1);margin-top:6px">${d}</p>
            </div>`).join('')}
        </div>
      </div>

      <div class="ui-enquire" data-reveal style="padding:clamp(24px,3vw,40px)">
        <b style="font-family:var(--font-display);font-size:var(--fs-2);font-weight:540">List with us</b>
        <div class="ui-field"><input class="ui-input" id="s-name" placeholder=" " autocomplete="name"><label class="ui-label" for="s-name">Your name</label></div>
        <div class="ui-field"><input class="ui-input" id="s-phone" type="tel" placeholder=" " autocomplete="tel"><label class="ui-label" for="s-phone">Phone</label></div>
        <div class="ui-field has-arrow"><select class="ui-input" id="s-type">
          <option value="">Property type…</option>
          <option>Apartment</option><option>Independent house</option><option>Land</option><option>Commercial</option>
        </select></div>
        <div class="ui-field"><input class="ui-input" id="s-loc" placeholder=" "><label class="ui-label" for="s-loc">Locality</label></div>
        <div class="ui-field"><input class="ui-input" id="s-price" type="number" min="0" placeholder=" "><label class="ui-label" for="s-price">Expected price (₹, optional)</label></div>
        <button class="ui-btn ui-btn-primary" id="s-send" data-magnetic>Request valuation ${ICONS.arrow.replace('<svg', '<svg class="arr"')}</button>
        <p class="caps muted">Or WhatsApp us directly — replies within a day</p>
        <a class="ui-btn ui-btn-ghost" href="https://wa.me/919429693786" target="_blank" rel="noopener">${ICONS.wa} WhatsApp 94296 93786</a>
      </div>
    </div>`));

  frag.appendChild(el('section', 'section band-paper2', `
    <div class="container center" style="display:grid;gap:20px;justify-items:center">
      ${kicker('A quiet promise')}
      <p class="display d4" style="max-width:26ch;font-weight:460">Your property gets the same treatment we give our own.</p>
      <p class="muted" style="max-width:52ch">Verified facts, honest pricing guidance, real media. If a listing isn't ready, we'll tell you why — that's how trust compounds.</p>
    </div>`));

  const form = frag.querySelector('.ui-enquire');
  form.querySelectorAll('.ui-input').forEach((inp) => {
    inp.addEventListener('input', () => inp.closest('.ui-field').classList.toggle('filled', !!inp.value));
    if (inp.tagName === 'SELECT') inp.addEventListener('change', () => inp.closest('.ui-field').classList.add('filled'));
  });
  frag.querySelector('#s-send').addEventListener('click', () => {
    const name = form.querySelector('#s-name').value.trim();
    if (!name) { form.querySelector('#s-name').focus(); return; }
    import('../core/lib/components.js').then(({ toast }) => toast('Thank you — we\u2019ll call you shortly.'));
  });

  return frag;
}
