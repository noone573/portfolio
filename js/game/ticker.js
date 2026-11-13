/* Scrolling ticker under the hero: skills and project titles. */
(() => {
  "use strict";

  const Game = window.Game;
  const { mk, D } = Game;

  const items = [
    ...(D.skills || []).flatMap((g) => g.items || []),
    ...(D.projects || []).map((p) => p.title),
    "Insert coin",
  ]
    .map((s) => String(s || "").trim())
    .filter(Boolean);
  if (!items.length) return;

  const ticker = mk("ticker");
  const track = mk("ticker-track");
  ticker.setAttribute("aria-hidden", "true");
  // Four copies so the track is long enough to loop seamlessly
  for (let c = 0; c < 4; c++) {
    items.forEach((txt) => {
      const s = document.createElement("span");
      s.textContent = txt;
      track.append(s);
    });
  }
  ticker.append(track);
  document.querySelector(".hero")?.after(ticker);
})();
