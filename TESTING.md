# Testing log

## Browsers and devices

| Browser / device | How | Result |
| --- | --- | --- |
| Chromium-based browser, desktop (Windows) | Viewports 1280px, 1024px, 768px, 375px, 320px | ✅ Pass |
| Chromium mobile emulation (touch, 375 × 812) | Menu, certificate viewer, PDF fallback | ✅ Pass |
| Microsoft Edge (Windows) | Live URL | ☐ To test |
| Mozilla Firefox (Windows) | Live URL | ☐ To test |
| Real phone (Android Chrome or iPhone Safari) | Live URL on mobile data / another network | ☐ To test |

Fill in the "To test" rows by going through the checklist below in each browser.

## Checklist

- [ ] Page loads from the live URL with all images, styles and fonts, and no errors in the console (F12 → Console)
- [ ] Every menu link scrolls to its section, and the current section is highlighted
- [ ] Phone/tablet menu: opens with the ☰ button and closes with the ✕ button, a link tap, Escape, or a tap outside
- [ ] Light/dark toggle works and is remembered after a reload
- [ ] "View my work" and "Contact me" buttons jump to the right sections
- [ ] Project "Live demo" links open in a new tab
- [ ] Certificates: clicking one opens the viewer; ✕, Escape and clicking the backdrop close it; "Open PDF" opens the file
- [ ] Contact: "Email me" opens the mail app; "Copy email" shows "Copied!"
- [ ] No sideways scrolling at 320px, 375px, 768px, 1024px and 1280px wide (F12 → device toolbar)
- [ ] HTML passes https://validator.w3.org/nu/?doc=https://noone573.github.io/portfolio/ with no errors

## Bugs found and fixed

| # | Problem | Cause | Fix |
| --- | --- | --- | --- |
| 1 | A stray "0" appeared on the page when a list (such as project tags) was empty | JavaScript `list.length && element` returns `0` when the list is empty, and the `0` was printed as text | Changed to `list.length > 0 && element` |
| 2 | The education section was labelled "Resume" even without a resume file | Menu label was hard-coded | Label is now based on the content (Education / Experience / Resume) and can be renamed |
| 3 | Certificates showed an empty box on phones | Mobile browsers have no built-in PDF viewer inside a page | Detects devices without inline PDF support (`navigator.pdfViewerEnabled`, touch screens) and shows the preview picture with an "Open PDF" button |
| 4 | Heading levels skipped from `h2` to `h4` in the education timeline | Entry titles were always `h4`, even when the group heading was hidden | Entries use `h3` when there is no group heading |
| 5 | Validator warnings for empty headings | Section headings were empty until JavaScript filled them in | Added fallback heading text in the HTML |
| 6 | Certificate images had empty `alt` text | Treated as decorative | Added descriptive `alt` text, e.g. "Preview of the Networking Basics certificate" |
| 7 | Layout CSS was desktop-first | Written with `max-width` media queries | Rewritten mobile-first with `min-width` breakpoints at 600, 768 and 1024px |
| 8 | Header background could disappear in older browsers | `color-mix()` isn't supported before Chrome 111, Firefox 113 and Safari 16.2 | Added a solid-color fallback before the `color-mix()` rule |
| 9 | After an update, the page briefly showed a broken layout | The browser kept the old cached `script.js` with the new HTML | Reloading with Ctrl+F5 fixes it; worth doing after each deploy |
