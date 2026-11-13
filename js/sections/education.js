/* Education / Experience section: a timeline for each list.
   When both lists are shown each gets an <h3> label and entries use <h4>;
   otherwise the section <h2> already names the list, so entries use <h3>. */
(() => {
  "use strict";

  const Site = window.Site;
  const { $, el, icon, has, clean, both, education, experience } = Site;

  function timeline(label, iconName, items) {
    if (!items.length) return null;
    const entryHeading = both ? "h4" : "h3";
    return el(
      "div",
      { class: "tl-group reveal" },
      both && el("h3", {}, icon(iconName), label),
      el(
        "ol",
        { class: "tl" },
        items.map((it) =>
          el(
            "li",
            {},
            el(
              "div",
              { class: "tl-card" },
              has(it.period) && el("span", { class: "period" }, clean(it.period)),
              has(it.title) && el(entryHeading, { class: "tl-title" }, clean(it.title)),
              has(it.place) && el("p", { class: "place" }, clean(it.place)),
              has(it.details) && el("p", { class: "details" }, clean(it.details)),
            ),
          ),
        ),
      ),
    );
  }

  function renderEducation() {
    const groups = [timeline("Education", "school", education), timeline("Experience", "briefcase", experience)];
    $("#timeline").append(...groups.filter(Boolean));
  }

  Site.renderEducation = renderEducation;
})();
