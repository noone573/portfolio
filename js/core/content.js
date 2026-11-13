/* Reads the content from data.js, drops empty entries, and works out which sections to show,
   in what order, and with which menu names and titles. */
(() => {
  "use strict";

  const Site = window.Site;
  const { has, clean } = Site;

  const D = window.PORTFOLIO || {};
  const P = D.profile || {};
  const R = D.resume || {};
  const S = D.site || {};

  /* ---------- Content, with empty entries removed ---------- */
  const about = [].concat(D.about || []).filter(has);
  const skillGroups = (D.skills || [])
    .map((g) => ({ group: clean(g.group), items: (g.items || []).filter(has).map(clean) }))
    .filter((g) => g.items.length > 0);
  const projects = (D.projects || []).filter((p) => p && (has(p.title) || has(p.description) || has(p.image)));
  const certificates = (D.certificates || []).filter((c) => c && (has(c.title) || has(c.file)));
  const education = (R.education || []).filter((i) => i && (has(i.title) || has(i.place)));
  const experience = (R.experience || []).filter((i) => i && (has(i.title) || has(i.place)));
  const socials = (P.socials || []).filter((s) => s && has(s.url));
  const email = clean(P.email);
  const resumeFile = clean(R.file);

  /* ---------- Sections: order, visibility, menu names and titles ---------- */
  const SECTION_IDS = ["about", "skills", "projects", "certificates", "education", "resume", "contact"];
  const both = education.length > 0 && experience.length > 0;
  const onlyExperience = experience.length && !education.length;
  const DEFAULTS = {
    about: { nav: "About", title: "About me" },
    skills: { nav: "Skills", title: "Skills & interests" },
    projects: { nav: "Projects", title: "Things I've built" },
    certificates: { nav: "Certificates", title: "Certificates" },
    education: {
      nav: both ? "Education & Experience" : onlyExperience ? "Experience" : "Education",
      title: both ? "Education & experience" : onlyExperience ? "Experience" : "Education",
    },
    resume: { nav: "Resume", title: "My resume", text: "A one-page summary of my education, skills and projects." },
    contact: {
      nav: "Contact",
      title: "Let's work together.",
      text: "Have an opportunity, a project, or just want to say hi? My inbox is open.",
    },
  };

  // Older saves had a single "resume" section that also held education; split it in two.
  function migrate(list) {
    if (!list.some((s) => s.id === "resume") || list.some((s) => s.id === "education")) return list;
    return list.flatMap((s) => (s.id === "resume" ? [{ ...s, id: "education" }, { id: "resume" }] : [s]));
  }

  // The saved order, with any section missing from it slotted back in after its usual neighbour.
  function sectionOrder(saved) {
    const order = saved.map((s) => s.id).filter((id, i, all) => SECTION_IDS.includes(id) && all.indexOf(id) === i);
    SECTION_IDS.forEach((id, i) => {
      if (order.includes(id)) return;
      const before = SECTION_IDS.slice(0, i)
        .reverse()
        .find((prev) => order.includes(prev));
      order.splice(before ? order.indexOf(before) + 1 : 0, 0, id);
    });
    return order;
  }

  const saved = migrate(Array.isArray(S.sections) ? S.sections.filter(Boolean) : []);
  const order = sectionOrder(saved);
  const cfg = Object.fromEntries(
    order.map((id) => {
      const s = saved.find((x) => x.id === id) || {};
      const pick = (key) => (has(s[key]) ? clean(s[key]) : DEFAULTS[id][key]);
      return [id, { show: s.show !== false, nav: pick("nav"), title: pick("title"), text: pick("text") }];
    }),
  );
  const shown = {
    about: cfg.about.show && about.length > 0,
    skills: cfg.skills.show && skillGroups.length > 0,
    projects: cfg.projects.show && projects.length > 0,
    certificates: cfg.certificates.show && certificates.length > 0,
    education: cfg.education.show && (education.length > 0 || experience.length > 0),
    resume: cfg.resume.show && !!resumeFile,
    contact: cfg.contact.show && (!!email || socials.length > 0),
  };

  Object.assign(Site, {
    profile: P,
    site: S,
    about,
    skillGroups,
    projects,
    certificates,
    education,
    experience,
    socials,
    email,
    resumeFile,
    both,
    order,
    cfg,
    shown,
  });
})();
