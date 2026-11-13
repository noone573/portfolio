/* Reusable page pieces: an image with a placeholder fallback, a "can't preview this PDF" box,
   and the row of social links. */
(() => {
  "use strict";

  const Site = window.Site;
  const { el, icon, initials, newTab, ICONS, socials, email } = Site;

  // A color picked from the text, so each placeholder gets its own (but always the same) shade.
  function hue(text) {
    let h = 0;
    for (const ch of String(text)) h = (h * 31 + ch.codePointAt(0)) % 997;
    return 165 + (h % 110);
  }
  const placeholder = (text) =>
    el("div", { class: "ph", style: `--h:${hue(text)}`, "aria-hidden": "true" }, el("span", {}, initials(text)));

  // An image that swaps itself for a placeholder when there's no file or it fails to load.
  function imageOr(src, alt, fallbackText) {
    if (!src) return placeholder(fallbackText);
    const img = el("img", { src, alt, loading: "lazy", decoding: "async" });
    img.addEventListener("error", () => img.replaceWith(placeholder(fallbackText)), { once: true });
    return img;
  }

  function pdfFallback(path, text = "This browser can't preview the PDF here.") {
    return el(
      "div",
      { class: "doc-fallback" },
      icon("file"),
      el("p", {}, text),
      el("a", { class: "btn btn-sm", href: path, target: "_blank", rel: "noopener" }, icon("external"), "Open PDF"),
    );
  }

  function socialLinks() {
    const items = socials.slice();
    if (email) items.push({ label: "Email", url: `mailto:${email}`, icon: "mail" });
    if (!items.length) return null;
    return el(
      "div",
      { class: "socials" },
      items.map((s) =>
        el("a", {
          class: "icon-btn",
          href: s.url,
          "aria-label": s.label || "Link",
          title: s.label || s.url,
          ...newTab(s.url),
          html: ICONS[s.icon || String(s.label || "").toLowerCase()] || ICONS.link,
        }),
      ),
    );
  }

  Object.assign(Site, { imageOr, pdfFallback, socialLinks });
})();
