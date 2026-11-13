/* Extra motion: scroll progress bar, card spotlight, portrait tilt, and the typed role line. */
(() => {
  "use strict";

  const Site = window.Site;
  const { $, el, reducedMotion } = Site;

  function setupMotion() {
    // Thin progress bar along the top edge
    const bar = $("#progress");
    let ticking = false;
    const paintProgress = () => {
      const max = document.documentElement.scrollHeight - innerHeight;
      bar.style.setProperty("--p", max > 0 ? Math.min(1, Math.max(0, scrollY / max)).toFixed(4) : 0);
      ticking = false;
    };
    addEventListener(
      "scroll",
      () => {
        if (!ticking) {
          ticking = true;
          requestAnimationFrame(paintProgress);
        }
      },
      { passive: true },
    );
    addEventListener("resize", paintProgress);
    paintProgress();

    if (reducedMotion) return;

    // Soft light that follows the cursor inside cards
    const SPOT = ".card, .skill-card, .tl-card, .resume-card, .facts";
    document.addEventListener(
      "pointermove",
      (e) => {
        const card = e.target.closest?.(SPOT);
        if (!card) return;
        const r = card.getBoundingClientRect();
        card.style.setProperty("--mx", `${e.clientX - r.left}px`);
        card.style.setProperty("--my", `${e.clientY - r.top}px`);
      },
      { passive: true },
    );

    // Portrait leans gently toward the cursor (mouse devices only)
    const hero = $(".hero");
    const frame = $(".portrait-frame");
    if (frame && matchMedia("(hover: hover) and (pointer: fine)").matches) {
      hero.addEventListener("pointermove", (e) => {
        const r = frame.getBoundingClientRect();
        const x = (e.clientX - (r.left + r.width / 2)) / innerWidth;
        const y = (e.clientY - (r.top + r.height / 2)) / innerHeight;
        frame.style.setProperty("--ry", `${(x * 16).toFixed(2)}deg`);
        frame.style.setProperty("--rx", `${(-y * 16).toFixed(2)}deg`);
      });
      hero.addEventListener("pointerleave", () => {
        frame.style.removeProperty("--rx");
        frame.style.removeProperty("--ry");
      });
    }

    // Role line types itself out once the hero has appeared
    const role = $(".role");
    if (role) {
      const full = role.textContent;
      role.setAttribute("aria-label", full);
      const typed = el("span", { "aria-hidden": "true" });
      role.replaceChildren(typed, el("span", { class: "caret", "aria-hidden": "true" }));
      let n = 0;
      const tick = () => {
        typed.textContent = full.slice(0, ++n);
        if (n < full.length) setTimeout(tick, 55);
        else setTimeout(() => role.classList.add("done"), 2200);
      };
      setTimeout(tick, 1000);
    }
  }

  Site.setupMotion = setupMotion;
})();
