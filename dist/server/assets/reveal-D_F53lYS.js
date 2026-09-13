//#region src/lib/reveal.ts
/**
* Scroll-reveal via IntersectionObserver. No scroll listeners, no React state -
* the observer adds .is-visible directly so React never re-renders.
*
* For route content, call initRevealOnScroll() once per route component mount
* (see src/routes/* layout components).
*/
function initRevealOnScroll(root = document) {
	const els = root.querySelectorAll(".reveal:not(.is-visible)");
	if (els.length === 0) return;
	const io = new IntersectionObserver((entries) => {
		for (const entry of entries) if (entry.isIntersecting) {
			entry.target.classList.add("is-visible");
			io.unobserve(entry.target);
		}
	}, {
		threshold: .15,
		rootMargin: "0px 0px -40px 0px"
	});
	els.forEach((el) => io.observe(el));
}
//#endregion
export { initRevealOnScroll as t };
