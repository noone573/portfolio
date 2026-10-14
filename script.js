/* Renders the portfolio from data.js. You normally don't need to edit this file.
   Any section with no content is hidden automatically. */
(() => {
  "use strict";

  const D = window.PORTFOLIO || {};
  const P = D.profile || {};
  const R = D.resume || {};
  const $ = (sel, root = document) => root.querySelector(sel);

  /* ---------- Content (empty entries are dropped) ---------- */
  const has = (v) => (typeof v === "string" ? v.trim() !== "" : Array.isArray(v) ? v.length > 0 : v != null);
  const about = [].concat(D.about || []).filter(has);
  const skillGroups = (D.skills || [])
    .map((g) => ({ group: g.group || "", items: (g.items || []).filter(has) }))
    .filter((g) => g.items.length);
  const projects = (D.projects || []).filter((p) => p && (has(p.title) || has(p.description) || has(p.image)));
  const certificates = (D.certificates || []).filter((c) => c && (has(c.title) || has(c.file)));
  const education = (R.education || []).filter((i) => i && (has(i.title) || has(i.place)));
  const experience = (R.experience || []).filter((i) => i && (has(i.title) || has(i.place)));
  const socials = (P.socials || []).filter((s) => s && has(s.url));
  const resumeFile = has(R.file) ? R.file : "";
  const downloadName = has(P.name) ? `${P.name.trim()} - Resume${(resumeFile.match(/\.[a-z0-9]+$/i) || [""])[0]}` : "";

  /* ---------- Icons ---------- */
  const stroke = (paths) =>
    `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${paths}</svg>`;
  const ICONS = {
    github: '<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M12 .5a11.5 11.5 0 0 0-3.64 22.41c.58.1.79-.25.79-.56v-2c-3.2.7-3.88-1.37-3.88-1.37-.53-1.33-1.28-1.69-1.28-1.69-1.05-.72.08-.7.08-.7 1.16.08 1.77 1.19 1.77 1.19 1.03 1.77 2.7 1.26 3.36.96.1-.75.4-1.26.73-1.55-2.56-.29-5.25-1.28-5.25-5.7 0-1.26.45-2.29 1.19-3.1-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.17 1.18a11 11 0 0 1 5.77 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.59.23 2.76.11 3.05.74.81 1.19 1.84 1.19 3.1 0 4.43-2.7 5.4-5.27 5.69.41.36.78 1.06.78 2.14v3.17c0 .31.21.67.8.56A11.5 11.5 0 0 0 12 .5Z"/></svg>',
    linkedin: '<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5ZM3 9h4v12H3V9Zm6 0h3.8v1.7h.05c.53-1 1.83-2.05 3.77-2.05 4.03 0 4.78 2.65 4.78 6.1V21h-4v-5.4c0-1.3-.02-2.95-1.8-2.95-1.8 0-2.08 1.4-2.08 2.85V21H9V9Z"/></svg>',
    facebook: '<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M13.5 21v-7.5h2.5l.4-3h-2.9V8.6c0-.87.25-1.46 1.5-1.46h1.6V4.46A21 21 0 0 0 14.27 4.3c-2.3 0-3.87 1.4-3.87 3.98v2.22H7.8v3h2.6V21h3.1Z"/></svg>',
    mail: stroke('<rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/>'),
    external: stroke('<path d="M14 4h6v6"/><path d="M20 4 10 14"/><path d="M19 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1h5"/>'),
    download: stroke('<path d="M12 4v11"/><path d="m7 10 5 5 5-5"/><path d="M5 20h14"/>'),
    sun: stroke('<circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/>'),
    moon: stroke('<path d="M20 14.5A8 8 0 1 1 9.5 4a6.5 6.5 0 0 0 10.5 10.5Z"/>'),
    menu: stroke('<path d="M4 7h16M4 12h16M4 17h16"/>'),
    close: stroke('<path d="M6 6l12 12M18 6 6 18"/>'),
    file: stroke('<path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8l-5-5Z"/><path d="M14 3v5h5"/><path d="M9 13h6M9 17h4"/>'),
    link: stroke('<path d="M10 14a4 4 0 0 0 5.66 0l3-3a4 4 0 0 0-5.66-5.66l-1 1"/><path d="M14 10a4 4 0 0 0-5.66 0l-3 3a4 4 0 0 0 5.66 5.66l1-1"/>'),
    pin: stroke('<path d="M12 21s-7-6.2-7-11.5a7 7 0 0 1 14 0C19 14.8 12 21 12 21Z"/><circle cx="12" cy="9.5" r="2.5"/>'),
    check: stroke('<path d="m5 12 4.5 4.5L19 7"/>'),
  };

  /* ---------- Helpers ---------- */
  function el(tag, props = {}, ...kids) {
    const n = document.createElement(tag);
    for (const [k, v] of Object.entries(props)) {
      if (v == null || v === false) continue;
      if (k === "class") n.className = v;
      else if (k === "html") n.innerHTML = v; // only used for the trusted icon markup above
      else if (k.startsWith("on")) n.addEventListener(k.slice(2), v);
      else n.setAttribute(k, v === true ? "" : v);
    }
    for (const c of kids.flat()) {
      if (c == null || c === false || c === "") continue;
      n.append(c.nodeType ? c : document.createTextNode(String(c)));
    }
    return n;
  }
  const icon = (name) => el("span", { class: "i", html: ICONS[name] || ICONS.link, style: "display:contents" });
  const isPdf = (path) => /\.pdf(?:$|[?#])/i.test(path || "");
  const fileName = (path) => (path || "").split("/").pop();
  const external = (url) => /^https?:/i.test(url) ? { target: "_blank", rel: "noopener noreferrer" } : {};

  function initials(text) {
    const words = String(text || "?").replace(/[^\p{L}\p{N}\s]/gu, "").trim().split(/\s+/);
    return (words.length > 1 ? words[0][0] + words[1][0] : words[0].slice(0, 2)).toUpperCase();
  }
  // Hue in the teal → blue → violet range so placeholders match the accent color
  function hue(text) {
    let h = 0;
    for (const ch of String(text)) h = (h * 31 + ch.codePointAt(0)) % 997;
    return 165 + (h % 110);
  }
  const placeholder = (text) => el("div", { class: "ph", style: `--h:${hue(text)}`, "aria-hidden": "true" }, el("span", {}, initials(text)));

  // An <img> that swaps itself for a placeholder if the file is missing.
  function imageOr(src, alt, fallbackText) {
    if (!src) return placeholder(fallbackText);
    const img = el("img", { src, alt, loading: "lazy", decoding: "async" });
    img.addEventListener("error", () => img.replaceWith(placeholder(fallbackText)), { once: true });
    return img;
  }

  function hideSection(id) {
    const section = document.getElementById(id);
    if (section) section.hidden = true;
    const link = $(`.nav-links a[href="#${id}"]`);
    if (link) link.hidden = true;
  }

  function socialLinks() {
    const items = socials.slice();
    if (has(P.email)) items.push({ label: "Email", url: `mailto:${P.email}`, icon: "mail" });
    if (!items.length) return null;
    return el("div", { class: "socials" },
      items.map((s) => el("a", {
        class: "icon-btn", href: s.url, "aria-label": s.label || "Link", title: s.label || s.url, ...external(s.url),
        html: ICONS[s.icon || String(s.label || "").toLowerCase()] || ICONS.link,
      }))
    );
  }

  const resumeButton = (label) =>
    resumeFile && el("a", { class: "btn resume-dl", href: resumeFile, download: downloadName }, icon("download"), label);

  /* ---------- Sections ---------- */
  function renderMeta() {
    const name = P.name || "Portfolio";
    document.title = P.name ? `${P.name} | Portfolio` : "Portfolio";
    $("#brand").append(el("span", { class: "brand-mark", "aria-hidden": "true" }, initials(name)), el("span", {}, name));
  }

  function renderHero() {
    const text = el("div", { class: "hero-text reveal" },
      P.name && el("p", { class: "eyebrow" }, "Hi, I'm"),
      P.name && el("h1", {}, P.name),
      P.role && el("p", { class: "role" }, P.role),
      P.tagline && el("p", { class: "tagline" }, P.tagline),
      (P.location || P.status) && el("div", { class: "meta-row" },
        P.status && el("span", { class: "pill" }, el("span", { class: "dot", "aria-hidden": "true" }), P.status),
        P.location && el("span", { class: "pill" }, icon("pin"), P.location)
      ),
      el("div", { class: "cta" },
        projects.length && el("a", { class: "btn btn-primary", href: "#projects" }, "View projects"),
        resumeButton("Download resume")
      ),
      socialLinks()
    );
    $("#hero").append(text);
    if (has(P.photo)) $("#hero").append(el("div", { class: "avatar reveal" }, imageOr(P.photo, `Photo of ${P.name || ""}`, P.name)));
    else $("#hero").classList.add("no-photo");
  }

  function renderAbout() {
    if (!about.length && !skillGroups.length) return hideSection("about");
    const grid = $("#about .about-grid");

    if (about.length) $("#about-text").append(...about.map((p) => el("p", { class: "reveal" }, p)));
    else {
      $("#about-text").remove();
      grid.classList.add("single");
      $("#about h2").textContent = "Skills & interests";
    }

    if (skillGroups.length) {
      $("#skills").append(...skillGroups.map((g) =>
        el("div", { class: "skill-group reveal" },
          g.group && el("h3", {}, g.group),
          el("ul", { class: "tags" }, g.items.map((s) => el("li", { class: "tag" }, s)))
        )
      ));
    } else {
      $("#skills").remove();
      grid.classList.add("single");
    }
  }

  function projectCard(p) {
    const links = p.links || {};
    const tags = (p.tags || []).filter(has);
    const title = p.title || "Untitled project";
    return el("article", { class: "card reveal", "data-tags": tags.join("|") },
      el("div", { class: "thumb" }, imageOr(p.image, `Screenshot of ${title}`, title)),
      el("div", { class: "card-body" },
        p.year && el("p", { class: "card-kicker" }, p.year),
        el("h3", {}, title),
        p.description && el("p", { class: "card-text" }, p.description),
        tags.length && el("ul", { class: "tags" }, tags.map((t) => el("li", { class: "tag" }, t))),
        (links.github || links.demo || links.file) && el("div", { class: "card-links" },
          links.github && el("a", { href: links.github, ...external(links.github) }, icon("github"), "Code"),
          links.demo && el("a", { href: links.demo, ...external(links.demo) }, icon("external"), "Live demo"),
          links.file && el("a", { href: links.file, target: "_blank", rel: "noopener" }, icon("file"), "Document")
        )
      )
    );
  }

  function renderProjects() {
    if (!projects.length) return hideSection("projects");
    const grid = $("#project-grid");
    grid.append(...projects.map(projectCard));

    const tags = [...new Set(projects.flatMap((p) => (p.tags || []).filter(has)))];
    if (tags.length < 2) return;
    const chips = ["All", ...tags].map((t) =>
      el("button", { class: "chip", type: "button", "aria-pressed": String(t === "All"), onclick: () => filter(t) }, t)
    );
    function filter(tag) {
      chips.forEach((c) => c.setAttribute("aria-pressed", String(c.textContent === tag)));
      grid.querySelectorAll(".card").forEach((card) => {
        card.hidden = tag !== "All" && !card.dataset.tags.split("|").includes(tag);
      });
    }
    $("#project-filters").append(...chips);
  }

  function certThumb(c) {
    if (c.thumbnail) return imageOr(c.thumbnail, "", c.title);
    if (isPdf(c.file)) return el("div", { class: "pdf-tile" }, icon("file"), el("span", {}, "PDF"));
    return imageOr(c.file, "", c.title);
  }

  function renderCertificates() {
    if (!certificates.length) return hideSection("certificates");
    $("#cert-grid").append(...certificates.map((c) =>
      el("article", { class: "card reveal" },
        el("button", { class: "thumb cert-thumb", type: "button", "aria-label": `View certificate: ${c.title || "certificate"}`, onclick: () => openViewer(c) }, certThumb(c)),
        el("div", { class: "card-body compact" },
          el("h3", {}, c.title || "Certificate"),
          (c.issuer || c.date) && el("p", { class: "cert-meta" }, [c.issuer, c.date].filter(has).join(" · ")),
          c.credentialUrl && el("div", { class: "card-links" },
            el("a", { href: c.credentialUrl, ...external(c.credentialUrl) }, icon("check"), "Verify credential")
          )
        )
      )
    ));
  }

  function timelineGroup(title, items) {
    if (!items.length) return null;
    return el("div", { class: "tl-group reveal" },
      el("h3", {}, title),
      el("ol", { class: "tl" }, items.map((it) =>
        el("li", {},
          it.period && el("p", { class: "period" }, it.period),
          it.title && el("h4", {}, it.title),
          it.place && el("p", { class: "place" }, it.place),
          it.details && el("p", { class: "details" }, it.details)
        )
      ))
    );
  }

  function pdfFallback(path) {
    return el("div", { class: "doc-fallback" },
      icon("file"),
      el("p", {}, "This browser can't preview the PDF here."),
      el("a", { class: "btn btn-sm", href: path, target: "_blank", rel: "noopener" }, icon("external"), "Open PDF")
    );
  }

  function renderResume() {
    const groups = [timelineGroup("Education", education), timelineGroup("Experience", experience)].filter(Boolean);
    if (!groups.length && !resumeFile) return hideSection("resume");

    const grid = $("#resume .resume-grid");
    const heading = $("#resume h2");
    heading.textContent = education.length && experience.length ? "Education & experience"
      : education.length ? "Education" : experience.length ? "Experience" : "My resume";

    if (groups.length) $("#timeline").append(...groups);
    else { $("#timeline").remove(); grid.classList.add("single"); }

    if (!resumeFile) { $("#resume-viewer").remove(); grid.classList.add("single"); return; }

    const doc = el("div", { class: "doc reveal" },
      el("div", { class: "doc-bar" },
        el("p", { class: "doc-name" }, icon("file"), el("span", {}, fileName(resumeFile))),
        el("a", { class: "btn btn-sm", href: resumeFile, target: "_blank", rel: "noopener" }, icon("external"), "Open"),
        el("a", { class: "btn btn-sm btn-primary", href: resumeFile, download: downloadName }, icon("download"), "Download")
      ),
      isPdf(resumeFile)
        ? el("object", { data: `${resumeFile}#view=FitH`, type: "application/pdf", "aria-label": "Resume" }, pdfFallback(resumeFile))
        : el("div", { class: "viewer-body" }, imageOr(resumeFile, "Resume", "CV"))
    );
    $("#resume-viewer").append(doc);

    // On a live site, hide the resume if the file is missing instead of showing a broken viewer.
    if (/^https?:/.test(location.protocol)) {
      fetch(resumeFile, { method: "HEAD" }).then((res) => {
        if (res.ok) return;
        document.querySelectorAll(".resume-dl").forEach((a) => a.remove());
        if (groups.length) { $("#resume-viewer").remove(); grid.classList.add("single"); }
        else hideSection("resume");
      }).catch(() => {});
    }
  }

  function renderContact() {
    const links = socialLinks();
    if (!has(P.email) && !links) hideSection("contact");
    else {
      $("#contact-inner").append(
        el("div", { class: "contact-card reveal" },
          el("p", { class: "eyebrow" }, "Contact"),
          el("h2", {}, "Let's work together."),
          el("p", {}, "Have an opportunity, a project, or just want to say hi? My inbox is open."),
          (has(P.email) || resumeFile) && el("div", { class: "cta" },
            has(P.email) && el("a", { class: "btn btn-primary", href: `mailto:${P.email}` }, icon("mail"), P.email),
            resumeButton("Resume")
          ),
          links
        )
      );
    }
    $("#footer").append(
      el("p", {}, `© ${new Date().getFullYear()} ${P.name || ""}`),
      el("a", { href: "#top" }, "Back to top ↑")
    );
  }

  /* ---------- Certificate viewer ---------- */
  const dialog = $("#viewer");
  function openViewer(c) {
    const body = $("#viewer-body");
    const actions = $("#viewer-actions");
    $("#viewer-title").textContent = c.title || "Certificate";
    $("#viewer-sub").textContent = [c.issuer, c.date].filter(has).join(" · ");
    body.replaceChildren();
    actions.replaceChildren();

    if (!c.file) body.append(el("p", { class: "doc-fallback" }, "No file attached."));
    else if (isPdf(c.file)) body.append(el("object", { data: c.file, type: "application/pdf", "aria-label": c.title || "Certificate" }, pdfFallback(c.file)));
    else body.append(imageOr(c.file, c.title || "Certificate", c.title));

    if (c.file) actions.append(el("a", { class: "btn btn-sm", href: c.file, target: "_blank", rel: "noopener" }, icon("external"), "Open file"));
    if (c.credentialUrl) actions.append(el("a", { class: "btn btn-sm btn-primary", href: c.credentialUrl, ...external(c.credentialUrl) }, icon("check"), "Verify credential"));

    if (typeof dialog.showModal === "function") dialog.showModal();
    else if (c.file) window.open(c.file, "_blank", "noopener");
  }
  $("#viewer-close").innerHTML = ICONS.close;
  $("#viewer-close").addEventListener("click", () => dialog.close());
  dialog.addEventListener("click", (e) => { if (e.target === dialog) dialog.close(); });
  dialog.addEventListener("close", () => $("#viewer-body").replaceChildren());

  /* ---------- Chrome: theme, menu, scroll ---------- */
  function setupTheme() {
    const root = document.documentElement;
    const btn = $("#theme-toggle");
    const mq = matchMedia("(prefers-color-scheme: dark)");
    const isDark = () => (root.dataset.theme ? root.dataset.theme === "dark" : mq.matches);
    const paint = () => {
      btn.innerHTML = isDark() ? ICONS.sun : ICONS.moon;
      btn.setAttribute("aria-label", isDark() ? "Switch to light mode" : "Switch to dark mode");
    };
    btn.addEventListener("click", () => {
      root.dataset.theme = isDark() ? "light" : "dark";
      try { localStorage.setItem("theme", root.dataset.theme); } catch (e) {}
      paint();
    });
    mq.addEventListener?.("change", paint);
    paint();
  }

  function setupMenu() {
    const btn = $("#menu-toggle");
    const nav = $("#site-nav");
    const set = (open) => {
      nav.classList.toggle("open", open);
      btn.setAttribute("aria-expanded", String(open));
      btn.setAttribute("aria-label", open ? "Close menu" : "Open menu");
      btn.innerHTML = open ? ICONS.close : ICONS.menu;
    };
    btn.addEventListener("click", () => set(!nav.classList.contains("open")));
    nav.addEventListener("click", (e) => { if (e.target.closest("a")) set(false); });
    set(false);
  }

  function setupScroll() {
    const header = $("#site-header");
    const onScroll = () => header.classList.toggle("scrolled", scrollY > 8);
    addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    if (!("IntersectionObserver" in window)) return;

    const links = [...document.querySelectorAll(".nav-links a")];
    const spy = new IntersectionObserver((entries) => {
      entries.forEach((en) => {
        if (!en.isIntersecting) return;
        links.forEach((a) => a.classList.toggle("active", a.getAttribute("href") === `#${en.target.id}`));
      });
    }, { rootMargin: "-45% 0px -50% 0px" });
    document.querySelectorAll("main section[id]:not([hidden])").forEach((s) => spy.observe(s));

    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    document.documentElement.classList.add("anim");
    const reveal = new IntersectionObserver((entries) => {
      entries.forEach((en) => {
        if (!en.isIntersecting) return;
        en.target.classList.add("in");
        reveal.unobserve(en.target);
      });
    }, { rootMargin: "0px 0px -8% 0px" });
    document.querySelectorAll(".reveal").forEach((n) => reveal.observe(n));
  }

  // Owner shortcut: type "edit" anywhere on the page to open the Portfolio Editor in a new tab.
  // Only active when the site is opened from your own computer, never on the published site.
  function setupEditShortcut() {
    const local = location.protocol === "file:" || ["localhost", "127.0.0.1", "[::1]"].includes(location.hostname);
    if (!local) return;
    let typed = "";
    addEventListener("keydown", (e) => {
      if (e.ctrlKey || e.metaKey || e.altKey || e.key.length !== 1 || e.target.closest("input, textarea, [contenteditable]")) return;
      typed = (typed + e.key.toLowerCase()).slice(-4);
      if (typed !== "edit") return;
      typed = "";
      window.open(new URL("../portfolio-editor/editor.html", location.href).href, "_blank");
    });
  }

  renderMeta();
  renderHero();
  renderAbout();
  renderProjects();
  renderCertificates();
  renderResume();
  renderContact();
  setupTheme();
  setupMenu();
  setupScroll();
  setupEditShortcut();
})();
