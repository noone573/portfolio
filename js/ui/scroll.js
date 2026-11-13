/* Scrolling: header shadow, highlighting the current menu link, and fading content in as it appears. */
(() => {
  "use strict";

  const Site = window.Site;
  const { $, reducedMotion } = Site;

  function setupScroll() {
    const header = $("#site-header");
    const onScroll = () => header.classList.toggle("scrolled", scrollY > 8);
    addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    if (!("IntersectionObserver" in window)) return;

    // Highlight the menu link of the section in the middle of the screen
    const links = [...document.querySelectorAll(".nav-links a")];
    const spy = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          links.forEach((a) => a.classList.toggle("active", a.getAttribute("href") === `#${entry.target.id}`));
        });
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    document.querySelectorAll("main > section:not([hidden])").forEach((s) => spy.observe(s));

    // Fade content in as it scrolls into view (skipped if the visitor prefers less motion)
    if (reducedMotion) return;
    document.documentElement.classList.add("anim");

    // Section headings, skill tags and timeline entries get their own small animations
    document.querySelectorAll(".section-head, .tl-group").forEach((n) => n.classList.add("reveal"));
    document.querySelectorAll(".tags").forEach((list) => {
      [...list.children].forEach((t, i) => t.style.setProperty("--k", i));
    });
    document.querySelectorAll(".tl").forEach((list) => {
      [...list.children].forEach((li, i) => li.style.setProperty("--k", i));
    });

    // Stagger: siblings animate one after another. The hero gets a slower, deliberate sequence.
    document.querySelectorAll(".reveal").forEach((n) => {
      const siblings = [...n.parentElement.children].filter((c) => c.classList.contains("reveal"));
      const i = siblings.indexOf(n);
      let delay = Math.min(i, 5) * 90;
      if (n.closest(".hero")) delay = n.classList.contains("portrait") ? 520 : 140 + i * 110;
      n.style.setProperty("--d", `${delay}ms`);
    });

    const reveal = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("in");
          reveal.unobserve(entry.target);
        });
      },
      { rootMargin: "0px 0px -6% 0px" },
    );
    document.querySelectorAll(".reveal").forEach((n) => reveal.observe(n));
  }

  Site.setupScroll = setupScroll;
})();
