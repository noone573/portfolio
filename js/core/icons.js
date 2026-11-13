/* SVG icons used across the page. Long SVG code is split into pieces that are joined back together,
   so no line gets too long to read. */
(() => {
  "use strict";

  const Site = (window.Site = window.Site || {});

  // Solid icon (brand logos): the pieces form one path.
  const filled = (...pathPieces) =>
    `<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="${pathPieces.join("")}"/></svg>`;

  // Line icon drawn in the current text color: the pieces are its shapes.
  const stroke = (...shapes) =>
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" ' +
    'stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' +
    shapes.join("") +
    "</svg>";

  Site.ICONS = {
    /* ---------- Brand logos ---------- */
    github: filled(
      "M12 .5a11.5 11.5 0 0 0-3.64 22.41c.58.1.79-.25.79-.56v-2c-3.2.7-3.88-1.37-3.88-1.37",
      "-.53-1.33-1.28-1.69-1.28-1.69-1.05-.72.08-.7.08-.7 1.16.08 1.77 1.19 1.77 1.19 1.03 1.77 2.7 1.26 3.36.96",
      ".1-.75.4-1.26.73-1.55-2.56-.29-5.25-1.28-5.25-5.7 0-1.26.45-2.29 1.19-3.1",
      "-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.17 1.18",
      "a11 11 0 0 1 5.77 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.59.23 2.76.11 3.05",
      ".74.81 1.19 1.84 1.19 3.1 0 4.43-2.7 5.4-5.27 5.69.41.36.78 1.06.78 2.14v3.17c0 .31.21.67.8.56",
      "A11.5 11.5 0 0 0 12 .5Z",
    ),
    linkedin: filled(
      "M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5ZM3 9h4v12H3V9Z",
      "m6 0h3.8v1.7h.05c.53-1 1.83-2.05 3.77-2.05 4.03 0 4.78 2.65 4.78 6.1V21h-4v-5.4",
      "c0-1.3-.02-2.95-1.8-2.95-1.8 0-2.08 1.4-2.08 2.85V21H9V9Z",
    ),
    facebook: filled(
      "M13.5 21v-7.5h2.5l.4-3h-2.9V8.6c0-.87.25-1.46 1.5-1.46h1.6V4.46A21 21 0 0 0 14.27 4.3",
      "c-2.3 0-3.87 1.4-3.87 3.98v2.22H7.8v3h2.6V21h3.1Z",
    ),

    /* ---------- Line icons ---------- */
    mail: stroke('<rect x="3" y="5" width="18" height="14" rx="2"/>', '<path d="m3 7 9 6 9-6"/>'),
    external: stroke(
      '<path d="M14 4h6v6"/>',
      '<path d="M20 4 10 14"/>',
      '<path d="M19 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1h5"/>',
    ),
    download: stroke('<path d="M12 4v11"/>', '<path d="m7 10 5 5 5-5"/>', '<path d="M5 20h14"/>'),
    arrow: stroke('<path d="M5 12h14"/>', '<path d="m13 6 6 6-6 6"/>'),
    copy: stroke('<rect x="9" y="9" width="11" height="11" rx="2"/>', '<path d="M5 15V6a2 2 0 0 1 2-2h9"/>'),
    sun: stroke(
      '<circle cx="12" cy="12" r="4"/>',
      '<path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4',
      'M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/>',
    ),
    moon: stroke('<path d="M20 14.5A8 8 0 1 1 9.5 4a6.5 6.5 0 0 0 10.5 10.5Z"/>'),
    menu: stroke('<path d="M4 7h16M4 12h16M4 17h16"/>'),
    close: stroke('<path d="M6 6l12 12M18 6 6 18"/>'),
    file: stroke(
      '<path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8l-5-5Z"/>',
      '<path d="M14 3v5h5"/>',
      '<path d="M9 13h6M9 17h4"/>',
    ),
    link: stroke(
      '<path d="M10 14a4 4 0 0 0 5.66 0l3-3a4 4 0 0 0-5.66-5.66l-1 1"/>',
      '<path d="M14 10a4 4 0 0 0-5.66 0l-3 3a4 4 0 0 0 5.66 5.66l1-1"/>',
    ),
    pin: stroke(
      '<path d="M12 21s-7-6.2-7-11.5a7 7 0 0 1 14 0C19 14.8 12 21 12 21Z"/>',
      '<circle cx="12" cy="9.5" r="2.5"/>',
    ),
    check: stroke('<path d="m5 12 4.5 4.5L19 7"/>'),
    award: stroke('<circle cx="12" cy="9" r="6"/>', '<path d="M8.5 14 7 21l5-3 5 3-1.5-7"/>'),
    school: stroke('<path d="m2 9 10-5 10 5-10 5Z"/>', '<path d="M6 11v5c0 1.5 2.7 3 6 3s6-1.5 6-3v-5"/>'),
    briefcase: stroke(
      '<rect x="3" y="7" width="18" height="13" rx="2"/>',
      '<path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>',
      '<path d="M3 13h18"/>',
    ),
    code: stroke('<path d="m8 8-4 4 4 4M16 8l4 4-4 4M14 5l-4 14"/>'),
    tool: stroke('<path d="M14.7 6.3a4 4 0 0 0-5.4 5.4L3 18l3 3 6.3-6.3a4 4 0 0 0 5.4-5.4l-2.5 2.5-2.4-.6-.6-2.4Z"/>'),
    heart: stroke('<path d="M12 20s-7-4.4-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 10c0 5.6-7 10-7 10Z"/>'),
    spark: stroke(
      '<path d="M12 3v4M12 17v4M3 12h4M17 12h4',
      'M6.3 6.3l2.5 2.5M15.2 15.2l2.5 2.5M6.3 17.7l2.5-2.5M15.2 8.8l2.5-2.5"/>',
    ),
  };
})();
