// ============================================================
// motion.js — choreography engine
// reveal / parallax / magnetic / countUp — all reduced-motion safe
// ============================================================

const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
let io = null;

/** Observe [data-reveal] elements under root; add .in when visible (once). */
export function reveal(root = document) {
  if (reduced) {
    root.querySelectorAll?.('[data-reveal], [data-reveal-img]').forEach((el) => el.classList.add('in'));
    return;
  }
  if (!io) {
    io = new IntersectionObserver((entries) => {
      for (const e of entries) {
        if (e.isIntersecting) {
          e.target.classList.add('in');
          io.unobserve(e.target);
        }
      }
    }, { threshold: 0.12, rootMargin: '0px 0px -6% 0px' });
  }
  root.querySelectorAll?.('[data-reveal], [data-reveal-img]').forEach((el) => {
    // auto-stagger siblings inside a shared parent
    if (!el.style.getPropertyValue('--i')) {
      const sibs = [...el.parentElement?.children || []].filter((c) => c.hasAttribute?.('data-reveal'));
      const idx = sibs.indexOf(el);
      if (idx > 0) el.style.setProperty('--i', Math.min(idx, 8));
    }
    io.observe(el);
  });
}

/** Scroll-linked parallax: translateY = scrollDelta * amt within viewport. */
export function parallax(el, amt = 0.18) {
  if (reduced || !el) return () => {};
  let raf = 0;
  const update = () => {
    const r = el.parentElement.getBoundingClientRect();
    const progress = (r.top + r.height / 2 - innerHeight / 2) / (innerHeight / 2 + r.height / 2);
    el.style.transform = `translateY(${(-progress * amt * 100).toFixed(2)}%)`;
    raf = 0;
  };
  const onScroll = () => { if (!raf) raf = requestAnimationFrame(update); };
  addEventListener('scroll', onScroll, { passive: true });
  update();
  return () => removeEventListener('scroll', onScroll);
}

/** Magnetic hover for primary CTAs. */
export function magnetic(el, strength = 0.28) {
  if (reduced || !el) return;
  const move = (e) => {
    const r = el.getBoundingClientRect();
    const x = (e.clientX - r.left - r.width / 2) * strength;
    const y = (e.clientY - r.top - r.height / 2) * strength;
    el.style.transform = `translate(${x.toFixed(1)}px, ${y.toFixed(1)}px)`;
  };
  const leave = () => { el.style.transform = ''; };
  el.addEventListener('pointermove', move);
  el.addEventListener('pointerleave', leave);
}

/** Count-up numerals when scrolled into view. data-count="125000" data-suffix="+". */
export function countUp(el) {
  if (!el) return;
  const target = parseFloat(el.dataset.count || '0');
  if (reduced || isNaN(target)) {
    el.textContent = el.dataset.final || String(target);
    return;
  }
  const fmt = (n) => {
    if (el.dataset.format === 'inr') return '₹' + Math.round(n).toLocaleString('en-IN');
    return Math.round(n).toLocaleString('en-IN') + (el.dataset.suffix || '');
  };
  const obs = new IntersectionObserver((entries) => {
    if (!entries[0].isIntersecting) return;
    obs.disconnect();
    const t0 = performance.now();
    const dur = 1400;
    const tick = (t) => {
      const p = Math.min((t - t0) / dur, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      el.textContent = fmt(target * eased);
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, { threshold: 0.4 });
  obs.observe(el);
}

/** Wire all motion primitives inside a freshly mounted root. */
export function wire(root = document) {
  reveal(root);
  root.querySelectorAll?.('[data-magnetic]').forEach((el) => magnetic(el));
  root.querySelectorAll?.('[data-count]').forEach((el) => countUp(el));
  const pxEls = [];
  root.querySelectorAll?.('[data-parallax]').forEach((el) => pxEls.push(parallax(el, parseFloat(el.dataset.parallax || '0.18'))));
  return () => pxEls.forEach((off) => off());
}

/** Header shadow on scroll. Call once at app boot. */
export function headerScroll(header) {
  const on = () => header?.classList.toggle('scrolled', scrollY > 8);
  addEventListener('scroll', on, { passive: true });
  on();
}
