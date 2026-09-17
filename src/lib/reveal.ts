/**
 * Scroll-reveal & Animation Engine via IntersectionObserver.
 * Lightweight, GPU-accelerated, progressive enhancement.
 * No scroll event listeners, zero frame stutter.
 */

export function initRevealOnScroll(root: ParentNode = document) {
  if (typeof window === "undefined") return;

  // Enable animation state only if user has not requested reduced motion
  const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (!prefersReduced) {
    document.documentElement.classList.add("js-loaded");
  }

  // Handle standard .reveal elements
  const els = root.querySelectorAll<HTMLElement>(
    ".reveal:not(.is-visible), .reveal-stagger:not(.is-visible), .reveal-left:not(.is-visible), .reveal-right:not(.is-visible), .reveal-scale:not(.is-visible)"
  );
  if (els.length === 0) return;

  const io = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          const target = entry.target as HTMLElement;
          target.classList.add("is-visible");

          // If this is a staggered parent, automatically set staggered transition delays on immediate children
          if (target.classList.contains("reveal-stagger")) {
            const children = target.children;
            for (let i = 0; i < children.length; i++) {
              const child = children[i] as HTMLElement;
              child.style.transitionDelay = `${i * 90}ms`;
              child.classList.add("is-visible");
            }
          }

          io.unobserve(target);
        }
      }
    },
    { threshold: 0.1, rootMargin: "0px 0px -30px 0px" },
  );

  els.forEach((el) => io.observe(el));
}
