//#region src/lib/reveal.ts
/**
* Scroll-reveal & Animation Engine via IntersectionObserver.
* Lightweight, GPU-accelerated, progressive enhancement.
* No scroll event listeners, zero frame stutter.
*/
function initRevealOnScroll(root = document) {
	if (typeof window === "undefined") return;
	if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) document.documentElement.classList.add("js-loaded");
	const els = root.querySelectorAll(".reveal:not(.is-visible), .reveal-stagger:not(.is-visible), .reveal-left:not(.is-visible), .reveal-right:not(.is-visible), .reveal-scale:not(.is-visible)");
	if (els.length === 0) return;
	const io = new IntersectionObserver((entries) => {
		for (const entry of entries) if (entry.isIntersecting) {
			const target = entry.target;
			target.classList.add("is-visible");
			if (target.classList.contains("reveal-stagger")) {
				const children = target.children;
				for (let i = 0; i < children.length; i++) {
					const child = children[i];
					child.style.transitionDelay = `${i * 90}ms`;
					child.classList.add("is-visible");
				}
			}
			io.unobserve(target);
		}
	}, {
		threshold: .1,
		rootMargin: "0px 0px -30px 0px"
	});
	els.forEach((el) => io.observe(el));
}
//#endregion
export { initRevealOnScroll as t };
