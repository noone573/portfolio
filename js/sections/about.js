/* About section: the about text and the quick facts beside it. */
(() => {
  "use strict";

  const Site = window.Site;
  const { $, el, has, clean, profile: P, about, education, email } = Site;

  function renderAbout() {
    const latest = education[0];
    const facts = [
      has(P.location) && ["Based in", clean(P.location)],
      latest && ["Education", [latest.title, latest.place].filter(has).map(clean).join(", ")],
      email && ["Email", el("a", { href: `mailto:${email}` }, email)],
    ].filter(Boolean);

    $("#about-text").append(...about.map((p) => el("p", { class: "reveal" }, clean(p))));
    if (facts.length) {
      $("#facts").append(...facts.map(([term, value]) => el("div", {}, el("dt", {}, term), el("dd", {}, value))));
    } else {
      $("#facts").remove();
      $("#about .about-grid").classList.add("single");
    }
  }

  Site.renderAbout = renderAbout;
})();
