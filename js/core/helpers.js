/* Small helpers shared by every other file: building elements, cleaning up text, checking links and files.
   Everything is stored on window.Site so the other files can use it. */
(() => {
  "use strict";

  const Site = (window.Site = window.Site || {});

  const $ = (sel, root = document) => root.querySelector(sel);

  // True when a value has real content: a non-blank string, a non-empty list, or anything that isn't null.
  const has = (v) => (typeof v === "string" ? v.trim() !== "" : Array.isArray(v) ? v.length > 0 : v != null);
  const clean = (v) => (has(v) ? String(v).trim() : "");

  // el("a", { class: "btn", href: "#top", onclick: fn }, "text", otherNode) builds an element with its children.
  function el(tag, props = {}, ...kids) {
    const node = document.createElement(tag);
    for (const [key, value] of Object.entries(props)) {
      if (value == null || value === false) continue;
      if (key === "class") node.className = value;
      else if (key === "html") node.innerHTML = value;
      else if (key.startsWith("on")) node.addEventListener(key.slice(2), value);
      else node.setAttribute(key, value === true ? "" : value);
    }
    for (const kid of kids.flat()) {
      if (kid == null || kid === false || kid === "") continue;
      node.append(kid.nodeType ? kid : document.createTextNode(String(kid)));
    }
    return node;
  }

  const icon = (name, cls = "i") => el("span", { class: cls, html: Site.ICONS[name] || Site.ICONS.link });
  const isPdf = (path) => /\.pdf(?:$|[?#])/i.test(path || "");
  const fileName = (path) => (path || "").split("/").pop();
  const newTab = (url) => (/^https?:/i.test(url) ? { target: "_blank", rel: "noopener noreferrer" } : {});

  function initials(text) {
    const words = String(text || "?")
      .replace(/[^\p{L}\p{N}\s]/gu, "")
      .trim()
      .split(/\s+/);
    return (words.length > 1 ? words[0][0] + words[1][0] : words[0].slice(0, 2)).toUpperCase();
  }

  function hideSection(id) {
    const section = document.getElementById(id);
    if (section) section.hidden = true;
    $(`.nav-links a[href="#${id}"]`)?.remove();
  }

  Object.assign(Site, {
    $,
    has,
    clean,
    el,
    icon,
    isPdf,
    fileName,
    newTab,
    initials,
    hideSection,
    // The visitor asked their system for less motion
    reducedMotion: matchMedia("(prefers-reduced-motion: reduce)").matches,
    // Phones (and browsers without a PDF viewer) open PDFs in a new tab instead of inside the page
    canEmbedPdf: navigator.pdfViewerEnabled !== false && !matchMedia("(pointer: coarse)").matches,
  });
})();
