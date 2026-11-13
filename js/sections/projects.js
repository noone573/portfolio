/* Projects section: project cards and the tag filter. */
(() => {
  "use strict";

  const Site = window.Site;
  const { $, el, icon, has, clean, imageOr, newTab, projects } = Site;

  function projectCard(p, featured) {
    const links = p.links || {};
    const tags = (p.tags || []).filter(has).map(clean);
    const title = clean(p.title) || "Untitled project";

    const demoLink =
      links.demo &&
      el(
        "a",
        {
          class: "btn btn-sm btn-primary",
          href: links.demo,
          "aria-label": `Live demo of ${title} (opens in a new tab)`,
          ...newTab(links.demo),
        },
        icon("external"),
        "Live demo",
      );
    const codeLink =
      links.github &&
      el(
        "a",
        {
          class: "btn btn-sm",
          href: links.github,
          "aria-label": `Source code of ${title} on GitHub (opens in a new tab)`,
          ...newTab(links.github),
        },
        icon("github"),
        "Source code",
      );
    const fileLink =
      links.file &&
      el(
        "a",
        {
          class: "btn btn-sm",
          href: links.file,
          target: "_blank",
          rel: "noopener",
          "aria-label": `Document for ${title} (opens in a new tab)`,
        },
        icon("file"),
        "Document",
      );

    return el(
      "article",
      { class: `card project reveal${featured ? " featured" : ""}`, "data-tags": tags.join("|") },
      el("div", { class: "thumb" }, imageOr(p.image, `Screenshot of ${title}`, title)),
      el(
        "div",
        { class: "card-body" },
        has(p.year) && el("span", { class: "kicker" }, clean(p.year)),
        el("h3", {}, title),
        has(p.description) && el("p", { class: "card-text" }, clean(p.description)),
        tags.length > 0 &&
          el(
            "ul",
            { class: "tags", "aria-label": "Technologies" },
            tags.map((t) => el("li", { class: "tag" }, t)),
          ),
        (links.demo || links.github || links.file) &&
          el("div", { class: "card-actions" }, demoLink, codeLink, fileLink),
      ),
    );
  }

  function renderProjects() {
    const grid = $("#project-grid");
    // With an odd number of projects the first one is shown wide so the grid stays even.
    const featureFirst = projects.length % 2 === 1;
    grid.append(...projects.map((p, i) => projectCard(p, featureFirst && i === 0)));

    // Tag filter (only worth showing with 3+ projects and 2+ different tags)
    const tags = [...new Set(projects.flatMap((p) => (p.tags || []).filter(has).map(clean)))];
    if (projects.length < 3 || tags.length < 2) return;
    const chips = ["All", ...tags].map((t) =>
      el("button", { class: "chip", type: "button", "aria-pressed": String(t === "All"), onclick: () => filter(t) }, t),
    );
    function filter(tag) {
      chips.forEach((c) => c.setAttribute("aria-pressed", String(c.textContent === tag)));
      grid.querySelectorAll(".card").forEach((card) => {
        card.hidden = tag !== "All" && !card.dataset.tags.split("|").includes(tag);
      });
    }
    $("#project-filters").append(...chips);
  }

  Site.renderProjects = renderProjects;
})();
