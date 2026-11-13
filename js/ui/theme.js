/* Light / dark theme toggle in the header. */
(() => {
  "use strict";

  const Site = window.Site;
  const { $, ICONS } = Site;

  function setupTheme() {
    const root = document.documentElement;
    const button = $("#theme-toggle");
    const systemDark = matchMedia("(prefers-color-scheme: dark)");
    const isDark = () => (root.dataset.theme ? root.dataset.theme === "dark" : systemDark.matches);
    const paint = () => {
      button.innerHTML = isDark() ? ICONS.sun : ICONS.moon;
      button.setAttribute("aria-label", isDark() ? "Switch to light mode" : "Switch to dark mode");
    };
    button.addEventListener("click", () => {
      root.dataset.theme = isDark() ? "light" : "dark";
      try {
        localStorage.setItem("theme", root.dataset.theme);
      } catch (e) {}
      paint();
      button.classList.remove("spin");
      void button.offsetWidth; // restart the icon animation
      button.classList.add("spin");
    });
    systemDark.addEventListener?.("change", paint);
    paint();
  }

  Site.setupTheme = setupTheme;
})();
