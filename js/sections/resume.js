/* Resume section: a compact card. The PDF is only shown when the visitor clicks "View resume". */
(() => {
  "use strict";

  const Site = window.Site;
  const {
    $,
    el,
    icon,
    has,
    clean,
    isPdf,
    fileName,
    hideSection,
    ICONS,
    profile: P,
    resumeFile,
    cfg,
    canEmbedPdf,
  } = Site;

  function renderResume() {
    const title = has(P.name) ? `${clean(P.name)}'s resume` : "Resume";
    // Phones can't preview a PDF inside the page, so there "View resume" opens the file in a new tab.
    const viewButton =
      isPdf(resumeFile) && !canEmbedPdf
        ? el(
            "a",
            { class: "btn btn-primary resume-dl", href: resumeFile, target: "_blank", rel: "noopener" },
            icon("external"),
            "View resume",
          )
        : el(
            "button",
            {
              class: "btn btn-primary resume-dl",
              type: "button",
              onclick: () => Site.openViewer({ title, subtitle: fileName(resumeFile), file: resumeFile }),
            },
            icon("file"),
            "View resume",
          );

    $("#resume-card").append(
      el(
        "div",
        { class: "resume-card reveal" },
        el("span", { class: "resume-icon", html: ICONS.file }),
        el("div", { class: "resume-text" }, el("h3", {}, title), cfg.resume.text && el("p", {}, cfg.resume.text)),
        el("div", { class: "resume-actions" }, viewButton),
      ),
    );

    // On the live site, hide the resume if its file is missing instead of offering a broken link.
    if (/^https?:/.test(location.protocol)) {
      fetch(resumeFile, { method: "HEAD" })
        .then((res) => {
          if (res.ok) return;
          document.querySelectorAll(".resume-dl").forEach((a) => a.remove());
          hideSection("resume");
        })
        .catch(() => {});
    }
  }

  Site.renderResume = renderResume;
})();
