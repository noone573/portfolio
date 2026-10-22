# Juniel — Personal Portfolio

A responsive single-page portfolio that presents who I am, my skills, the projects I've built, my certificates and my education.

- **Live site:** https://noone573.github.io/portfolio/
- **Repository:** https://github.com/noone573/portfolio

Built with plain HTML, CSS and JavaScript (no frameworks or build step) and hosted on GitHub Pages.

## Features

- **Sections:** About, Skills, Projects, Certificates, Education and Contact. A section with no content is hidden automatically.
- **Responsive, mobile-first layout** with a collapsible menu on phones and tablets.
- **Light and dark themes.** Follows the device setting, with a toggle that remembers your choice.
- **Certificate viewer:** a pop-up that shows certificates full size. On phones, PDFs open in a new tab because mobile browsers can't display them inside a page.
- **Project cards** with screenshots, technology tags and live demo links.
- **Small touches:** a "Copy email" button, the current section highlighted in the menu, and fade-in animations (turned off when the device asks for reduced motion).

## Built with

- HTML5 semantic elements (`header`, `nav`, `main`, `section`, `article`, `footer`, `dialog`)
- CSS3: custom properties (design tokens), Flexbox, Grid, `clamp()` for fluid type, media queries
- Vanilla JavaScript (ES2020)
- Google Fonts: Space Grotesk (headings) and Inter (body text)
- GitHub Pages for hosting

## Project structure

```
index.html        Page structure: semantic landmarks and section skeletons
css/style.css     Design tokens, components and responsive breakpoints
js/data.js        All site content: profile, skills, projects, certificates, education
js/script.js      Builds the page from data.js; menu, theme, viewer and animations
assets/           Profile photo, project screenshots, certificates, resume
TESTING.md        Browser and device testing log, including bugs found and fixed
```

Content is kept separate from layout: all text and file paths live in `js/data.js`, and `js/script.js` turns it into HTML. Updating the portfolio means editing data, not markup.

## Design system

| Token | Light | Dark | Used for |
| --- | --- | --- | --- |
| `--bg` | `#f6f6f2` | `#0c0f11` | Page background |
| `--surface` | `#ffffff` | `#14181b` | Cards |
| `--text` | `#17191b` | `#e9ecee` | Main text |
| `--muted` | `#5b6066` | `#9ba3a9` | Secondary text |
| `--accent` | `#0f766e` | `#2dd4bf` | Buttons, highlights |
| `--accent-2` | `#4f46e5` | `#818cf8` | Gradients |

- **Typography:** Space Grotesk for headings, Inter for body text. Sizes scale smoothly with `clamp()`.
- **Shape and spacing:** 18px card corners, pill-shaped buttons, and a consistent spacing scale (8 / 16 / 24 / 32px, sections 72–104px).
- **Contrast:** every text color meets WCAG AA (at least 4.5:1) in both themes. Main text is about 16:1 and secondary text at least 5.4:1.

## Responsive design

The CSS is written mobile-first: base styles target phones, and three breakpoints add layout as the screen grows.

| Breakpoint | Target | Changes |
| --- | --- | --- |
| base (< 600px) | Phones | Single column, dropdown menu |
| `min-width: 600px` | Large phones / small tablets | Two-column skills and certificates |
| `min-width: 768px` | Tablets | Two-column projects, roomier spacing |
| `min-width: 1024px` | Desktops | Inline menu, photo beside the intro, three-column grids, side-by-side About |

There is no horizontal scrolling at any width from 320px up.

## Accessibility

- A skip link, a semantic landmark for each region, and one `h1` with headings in order (`h2` for sections, `h3` for cards)
- Descriptive `alt` text on every image, and `aria-label`s on icon-only buttons and repeated links ("Live demo of …")
- Visible keyboard focus, Escape closes the menu and the certificate viewer, and motion respects `prefers-reduced-motion`

## Run locally

Open `index.html` in a browser, or serve the folder:

```bash
python -m http.server 8000
```

Then visit http://localhost:8000.

## Deployment

GitHub Pages publishes the root of the `main` branch. Pushing to `main` updates the live site within about a minute.

## Testing

See [TESTING.md](TESTING.md) for the browsers and devices tested and the bugs found and fixed.
