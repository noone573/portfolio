/* Viewer pop-up for certificates and the resume. */
(() => {
  "use strict";

  const Site = window.Site;
  const { $, el, icon, has, isPdf, imageOr, pdfFallback, newTab, canEmbedPdf, ICONS } = Site;

  const dialog = $("#viewer");

  // doc = { title, subtitle, file, alt?, thumbnail?, credentialUrl? }
  function openViewer(doc) {
    const body = $("#viewer-body");
    const actions = $("#viewer-actions");
    const alt = doc.alt || doc.title;
    $("#viewer-title").textContent = doc.title;
    $("#viewer-sub").textContent = doc.subtitle || "";
    body.replaceChildren();
    actions.replaceChildren();

    if (!doc.file) {
      body.append(el("p", { class: "doc-fallback" }, "No file attached."));
    } else if (!isPdf(doc.file)) {
      body.append(imageOr(doc.file, alt, doc.title));
    } else if (canEmbedPdf) {
      body.append(
        el(
          "object",
          { data: `${doc.file}#view=FitH`, type: "application/pdf", "aria-label": alt },
          pdfFallback(doc.file),
        ),
      );
    } else {
      body.append(
        doc.thumbnail
          ? imageOr(doc.thumbnail, `Preview of ${alt}`, doc.title)
          : pdfFallback(doc.file, "Tap below to open the PDF."),
      );
    }

    if (doc.file) {
      actions.append(
        el(
          "a",
          { class: "btn btn-sm", href: doc.file, target: "_blank", rel: "noopener" },
          icon("external"),
          isPdf(doc.file) ? "Open PDF" : "Open file",
        ),
      );
    }
    if (has(doc.credentialUrl)) {
      actions.append(
        el(
          "a",
          { class: "btn btn-sm btn-primary", href: doc.credentialUrl, ...newTab(doc.credentialUrl) },
          icon("check"),
          "Verify credential",
        ),
      );
    }

    if (typeof dialog.showModal === "function") dialog.showModal();
    else if (doc.file) window.open(doc.file, "_blank", "noopener");
  }

  function setupViewer() {
    $("#viewer-close").innerHTML = ICONS.close;
    $("#viewer-close").addEventListener("click", () => dialog.close());
    // Clicking the dark backdrop around the pop-up closes it
    dialog.addEventListener("click", (e) => {
      if (e.target === dialog) dialog.close();
    });
    dialog.addEventListener("close", () => $("#viewer-body").replaceChildren());
  }

  Object.assign(Site, { openViewer, setupViewer });
})();
