/* Contact section and the page footer. */
(() => {
  "use strict";

  const Site = window.Site;
  const { $, el, icon, clean, socialLinks, profile: P, email, socials, cfg } = Site;

  function copyEmailButton() {
    const label = el("span", {}, "Copy email");
    const button = el("button", { class: "btn", type: "button" }, icon("copy"), label);
    button.addEventListener("click", async () => {
      try {
        await navigator.clipboard.writeText(email);
        label.textContent = "Copied!";
      } catch (e) {
        label.textContent = email; // clipboard blocked: show the address instead
      }
      setTimeout(() => {
        label.textContent = "Copy email";
      }, 2000);
    });
    return button;
  }

  function renderContact() {
    const copyButton = email ? copyEmailButton() : null;
    $("#contact-inner").replaceChildren(
      el(
        "div",
        { class: "contact-card reveal" },
        el("p", { class: "eyebrow" }),
        el("h2", {}, cfg.contact.title),
        cfg.contact.text && el("p", { class: "contact-text" }, cfg.contact.text),
        email && el("a", { class: "contact-email", href: `mailto:${email}` }, email),
        el(
          "div",
          { class: "cta" },
          email && el("a", { class: "btn btn-primary", href: `mailto:${email}` }, icon("mail"), "Email me"),
          copyButton,
        ),
        socials.length > 0 && socialLinks(),
      ),
    );
  }

  function renderFooter() {
    $("#footer").append(
      el("p", {}, `© ${new Date().getFullYear()} ${clean(P.name)}`),
      el("a", { href: "#top" }, "Back to top ↑"),
    );
  }

  Object.assign(Site, { renderContact, renderFooter });
})();
