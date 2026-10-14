# My Portfolio

A plain static website (HTML + CSS + JS). No installs or build step needed.

## View it

Double-click `index.html` to open it in your browser.

## Edit it with the Portfolio Editor

The editor lives in the separate `portfolio-editor` folder next to this one, so it is never published with your site.

1. Open `portfolio-editor/editor.html` in **Google Chrome or Microsoft Edge**.
2. Click **Choose portfolio folder**, pick this `portfolio` folder, and click **Allow** when the browser asks for edit permission.
3. Make your changes, then click **Save changes** (or press Ctrl+S).
4. Refresh `index.html` to see the result.

What you can edit:

| Tab | What's in it |
| --- | --- |
| Profile | Profile picture, name, title, email, location, status badge, short intro, About text, links |
| Skills | Languages, Frameworks & Tools, Interests (add, remove, rename groups) |
| Projects | Add, edit, reorder or delete projects, each with a picture, description, tags and links |
| Certificates | Upload certificates (images or PDFs) with name, issuer, date and an optional verify link |
| Education & Experience | Timeline entries for school and work |
| Resume | Upload or replace your resume PDF |

**Empty sections are hidden** on the site automatically. A tab marked "hidden" in the editor won't appear on your site until you add something to it.

Uploaded files are copied into `assets/`. Removing or replacing an item doesn't delete the old file, so you can clean up unused files in `assets/` by hand if you like. Each save also keeps the previous version as `data.backup.js`, just in case.

### Switching into the editor

- **From your portfolio page:** type `edit` on your keyboard (not inside a text box). The editor opens in a new tab. This only works when the site is opened from your own computer; on the published site, typing `edit` does nothing.
- **Directly:** open `portfolio-editor/editor.html`.
- **Back to the site:** click **View site** in the editor's top bar.

### Who can edit?

Only you.

- **People viewing your published link** can't edit anything. The site has no edit button, and the editor is never uploaded. Only upload the `portfolio` folder, never `portfolio-editor`.
- **People using your computer** (for example when you show your portfolio on your laptop) are stopped by the editor's **PIN**. You choose it the first time you open the editor. The editor asks for it every time it opens, locks itself after 10 minutes of inactivity, and has a 🔒 button to lock it right away. Five wrong tries trigger a 30-second wait.
- To change the PIN, open the editor and click **Change PIN** on the start screen. To reset a forgotten PIN, clear the editor page's site data in your browser settings.

The PIN keeps out casual visitors, but anyone who can use your unlocked computer could still open the files directly. Lock Windows (Windows key + L) when you step away.

After editing, upload the updated `portfolio` folder again to update the live site.

## Folder layout

```
portfolio/
├── index.html
├── data.js          ← your content (written by the editor)
├── style.css
├── script.js
└── assets/
    ├── profile.*            ← your photo
    ├── resume/resume.pdf    ← your resume
    ├── certificates/        ← certificate images / PDFs
    └── projects/            ← project pictures
```

## Put it online (free)

- **GitHub Pages:** push this folder to a GitHub repo, then go to Settings → Pages → deploy from the `main` branch. For the address `https://<username>.github.io`, name the repo `<username>.github.io`.
- **Netlify Drop:** drag the `portfolio` folder onto https://app.netlify.com/drop. To update, drag it again.
