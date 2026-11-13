/* Certificates section: certificate cards that open in the viewer pop-up (ui/viewer.js). */
(() => {
  "use strict";

  const Site = window.Site;
  const { $, el, icon, has, clean, isPdf, imageOr, newTab, certificates } = Site;

  function certThumb(c, title) {
    const alt = `Preview of the ${title} certificate`;
    if (c.thumbnail) return imageOr(c.thumbnail, alt, title);
    if (isPdf(c.file)) return el("div", { class: "pdf-tile" }, icon("file"), el("span", {}, "PDF"));
    return imageOr(c.file, alt, title);
  }

  function certificateCard(c) {
    const title = clean(c.title) || "Certificate";
    const meta = [c.issuer, c.date].filter(has).map(clean).join(" · ");
    const open = () =>
      Site.openViewer({
        title,
        subtitle: meta,
        file: c.file,
        alt: `${title} certificate`,
        thumbnail: c.thumbnail,
        credentialUrl: c.credentialUrl,
      });

    return el(
      "article",
      { class: "card reveal" },
      el(
        "button",
        { class: "thumb cert-thumb", type: "button", "aria-label": `View certificate: ${title}`, onclick: open },
        certThumb(c, title),
      ),
      el(
        "div",
        { class: "card-body cert-body" },
        el("h3", {}, title),
        meta && el("p", { class: "cert-meta" }, icon("award"), meta),
        has(c.credentialUrl) &&
          el(
            "a",
            {
              class: "text-link",
              href: c.credentialUrl,
              "aria-label": `Verify the ${title} credential (opens in a new tab)`,
              ...newTab(c.credentialUrl),
            },
            icon("check"),
            "Verify credential",
          ),
      ),
    );
  }

  function renderCertificates() {
    $("#cert-grid").append(...certificates.map(certificateCard));
  }

  Site.renderCertificates = renderCertificates;
})();
