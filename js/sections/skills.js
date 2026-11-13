/* Skills section: one card per skill group. */
(() => {
  "use strict";

  const Site = window.Site;
  const { $, el, ICONS, skillGroups } = Site;

  // Picks a card icon from the group's name.
  function skillIcon(group) {
    if (/lang/i.test(group)) return "code";
    if (/frame|tool|lib|tech|software/i.test(group)) return "tool";
    if (/interest|hobb|passion/i.test(group)) return "heart";
    return "spark";
  }

  function renderSkills() {
    $("#skills-grid").append(
      ...skillGroups.map((g) =>
        el(
          "div",
          { class: "skill-card reveal" },
          el(
            "div",
            { class: "skill-head" },
            el("span", { class: "skill-icon", html: ICONS[skillIcon(g.group)] }),
            el("h3", {}, g.group || "Skills"),
          ),
          el(
            "ul",
            { class: "tags" },
            g.items.map((s) => el("li", { class: "tag" }, s)),
          ),
        ),
      ),
    );
  }

  Site.renderSkills = renderSkills;
})();
