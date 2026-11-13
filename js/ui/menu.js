/* Mobile menu button in the header. */
(() => {
  "use strict";

  const Site = window.Site;
  const { $, ICONS } = Site;

  function setupMenu() {
    const button = $("#menu-toggle");
    const nav = $("#site-nav");
    const setOpen = (open) => {
      nav.classList.toggle("open", open);
      button.setAttribute("aria-expanded", String(open));
      button.setAttribute("aria-label", open ? "Close menu" : "Open menu");
      button.innerHTML = open ? ICONS.close : ICONS.menu;
    };
    button.addEventListener("click", () => setOpen(!nav.classList.contains("open")));
    // Close it after picking a link, clicking outside the header, or pressing Escape
    nav.addEventListener("click", (e) => {
      if (e.target.closest("a")) setOpen(false);
    });
    document.addEventListener("click", (e) => {
      if (!e.target.closest(".nav")) setOpen(false);
    });
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") setOpen(false);
    });
    setOpen(false);
  }

  Site.setupMenu = setupMenu;
})();
