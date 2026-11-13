/* Owner shortcut: typing "edit" opens the local content editor. Only works when the
   site is opened from the owner's own computer, never on the published site. */
(() => {
  "use strict";

  const Site = window.Site;

  function setupEditShortcut() {
    const local = location.protocol === "file:" || ["localhost", "127.0.0.1", "[::1]"].includes(location.hostname);
    if (!local) return;
    let typed = "";
    addEventListener("keydown", (e) => {
      const notPlainLetter = e.ctrlKey || e.metaKey || e.altKey || e.key.length !== 1;
      if (notPlainLetter || e.target.closest("input, textarea, [contenteditable]")) return;
      typed = (typed + e.key.toLowerCase()).slice(-4);
      if (typed !== "edit") return;
      typed = "";
      window.open(new URL("../portfolio-editor/editor.html", location.href).href, "_blank");
    });
  }

  Site.setupEditShortcut = setupEditShortcut;
})();
