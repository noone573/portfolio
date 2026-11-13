/* Builds the page. The files in js/core, js/sections and js/ui only define the pieces;
   this file runs them in order. Keep this file here: the Portfolio Editor looks for
   js/script.js to recognise the portfolio folder. */
(() => {
  "use strict";

  const Site = window.Site;
  const { $, el, order, shown, cfg } = Site;

  // Puts sections in the chosen order, builds the menu, and numbers the visible sections.
  function arrangeSections() {
    const main = $("#main");
    const visible = order.filter((id) => shown[id]);
    order.forEach((id) => {
      const section = document.getElementById(id);
      main.append(section);
      section.hidden = !shown[id];
    });
    $("#site-nav").replaceChildren(...visible.map((id) => el("a", { href: `#${id}` }, cfg[id].nav)));
    visible.forEach((id, i) => {
      const eyebrow = $(`#${id} .eyebrow`);
      if (eyebrow) {
        eyebrow.replaceChildren(
          el("span", { class: "num" }, String(i + 1).padStart(2, "0")),
          el("span", { class: "line", "aria-hidden": "true" }),
          cfg[id].nav,
        );
      }
      const heading = $(`#${id} .section-title h2`);
      if (heading) heading.textContent = cfg[id].title;
    });
  }

  /* ---------- Build the page ---------- */
  Site.renderBrand();
  Site.renderHero();
  if (shown.about) Site.renderAbout();
  if (shown.skills) Site.renderSkills();
  if (shown.projects) Site.renderProjects();
  if (shown.certificates) Site.renderCertificates();
  if (shown.education) Site.renderEducation();
  if (shown.resume) Site.renderResume();
  if (shown.contact) Site.renderContact();
  Site.renderFooter();
  arrangeSections();
  Site.setupViewer();
  Site.setupTheme();
  Site.setupMenu();
  Site.setupScroll();
  Site.setupMotion();
  Site.setupEditShortcut();
})();
