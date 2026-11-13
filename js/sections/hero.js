/* Hero section: the site name in the header and the introduction at the top of the page. */
(() => {
  "use strict";

  const Site = window.Site;
  const {
    $,
    el,
    icon,
    has,
    clean,
    initials,
    imageOr,
    socialLinks,
    ICONS,
    profile: P,
    site: S,
    shown,
    resumeFile,
  } = Site;

  function renderBrand() {
    const name = clean(S.brand) || clean(P.name) || "Portfolio";
    document.title = P.name ? `${clean(P.name)} | Portfolio` : "Portfolio";
    $("#brand").replaceChildren(
      el("span", { class: "brand-mark", "aria-hidden": "true" }, initials(name)),
      el("span", { class: "brand-name" }, name),
    );
  }

  function renderHero() {
    const hero = $("#hero");
    const secondButton =
      resumeFile && shown.resume
        ? el("a", { class: "btn", href: "#resume" }, icon("file"), "View resume")
        : shown.contact && el("a", { class: "btn", href: "#contact" }, icon("mail"), "Contact me");
    const badgeOnPhoto = has(P.photo) && has(P.location);

    hero.append(
      el(
        "div",
        { class: "hero-text" },
        has(P.status) &&
          el(
            "p",
            { class: "status-pill reveal" },
            el("span", { class: "pulse", "aria-hidden": "true" }),
            clean(P.status),
          ),
        el(
          "h1",
          { class: "reveal" },
          has(P.name)
            ? [el("span", { class: "hello" }, "Hi, I'm"), el("span", { class: "grad" }, clean(P.name))]
            : "Welcome",
        ),
        has(P.role) && el("p", { class: "role reveal" }, clean(P.role)),
        has(P.tagline) && el("p", { class: "tagline reveal" }, clean(P.tagline)),
        (shown.projects || secondButton) &&
          el(
            "div",
            { class: "cta reveal" },
            shown.projects &&
              el("a", { class: "btn btn-primary", href: "#projects" }, "View my work", icon("arrow", "arrow")),
            secondButton,
          ),
        el(
          "div",
          { class: "hero-meta reveal" },
          has(P.location) && !badgeOnPhoto && el("span", { class: "meta-item" }, icon("pin"), clean(P.location)),
          socialLinks(),
        ),
      ),
    );

    if (!has(P.photo)) {
      hero.classList.add("no-photo");
      return;
    }
    hero.append(
      el(
        "div",
        { class: "portrait reveal" },
        el(
          "div",
          { class: "portrait-frame" },
          imageOr(P.photo, `Portrait of ${clean(P.name) || "the site owner"}`, P.name),
        ),
        badgeOnPhoto &&
          el(
            "div",
            { class: "portrait-badge" },
            el("span", { class: "badge-icon", html: ICONS.pin }),
            el("span", {}, el("small", {}, "Based in"), el("strong", {}, clean(P.location))),
          ),
      ),
    );
  }

  Object.assign(Site, { renderBrand, renderHero });
})();
