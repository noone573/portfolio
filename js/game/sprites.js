/* Pixel sprites, drawn from text (no image files needed). Each letter is a color from PAL; "." is empty. */
(() => {
  "use strict";

  const Game = window.Game;
  const { root, rng } = Game;

  const PAL = {
    y: "#fbbf24",
    o: "#d97706",
    w: "#fff7d6",
    r: "#ef4444",
    t: "#2dd4bf",
    T: "#0f766e",
    b: "#6366f1",
    B: "#312e81",
    g: "#22c55e",
    G: "#15803d",
    W: "#ffffff",
    k: "#6b4423",
    c: "#f97316",
    l: "#cbd5e1",
    m: "#111827",
  };

  // Turns SVG markup into a CSS url(...) value.
  const svgUrl = (width, height, body) => {
    const svg =
      `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 ${width} ${height}' ` +
      `shape-rendering='crispEdges'>${body}</svg>`;
    return `url("data:image/svg+xml,${encodeURIComponent(svg)}")`;
  };

  const SP = {};
  const art = (name, rows) => {
    const w = Math.max(...rows.map((r) => r.length));
    const px = [];
    rows.forEach((row, y) => {
      for (let x = 0; x < row.length; x++) {
        if (row[x] !== ".") px.push(`<rect x='${x}' y='${y}' width='1' height='1' fill='${PAL[row[x]]}'/>`);
      }
    });
    SP[name] = { w, h: rows.length, url: svgUrl(w, rows.length, px.join("")) };
  };

  // prettier-ignore
  art("coin", [
    "..oooo..",
    ".oyyyyo.",
    "oyywwyyo",
    "oyywyyyo",
    "oyywyyyo",
    "oyyyyyyo",
    ".oyyyyo.",
    "..oooo..",
  ]);
  // prettier-ignore
  art("heart", [
    ".rr.rr.",
    "rrrrrrr",
    "rrwrrrr",
    ".rrrrr.",
    "..rrr..",
    "...r...",
  ]);
  art("star", [
    "....y....",
    "...yyy...",
    "...yyy...",
    "yyyyyyyyy",
    ".yyyyyyy.",
    "..yyyyy..",
    "..yyoyy..",
    ".yyo.oyy.",
    ".yo...oy.",
  ]);
  // prettier-ignore
  art("gem", [
    "..tttt..",
    ".tWttTt.",
    "tWttttTt",
    ".tttTTt.",
    "..tTTt..",
    "...tt...",
  ]);
  // prettier-ignore
  art("potion", [
    "..kkkk..",
    "...ll...",
    "...ll...",
    "..bbbb..",
    ".bbWbbb.",
    ".bbbbbB.",
    ".bbbbbB.",
    "..BBBB..",
  ]);
  art("cloud", [
    ".....WWW........",
    "...WWWWWWW.WW...",
    ".WWWWWWWWWWWWW..",
    "WWWWWWWWWWWWWWWW",
    "WWWWWWWWWWWWWWWW",
    ".WWWWWWWWWWWWWW.",
  ]);
  art("bush", [
    "....GGGG......",
    "..GGggggGG.GG.",
    ".GggggggggGggG",
    "GggggggggggggG",
    "GggggggggggggG",
    "GGGGGGGGGGGGGG",
  ]);
  // prettier-ignore
  art("mushroom", [
    "..rrrr..",
    ".rrWWrr.",
    "rrWrrWrr",
    "rrrrrrrr",
    ".WWWWWW.",
    "...WW...",
    "...WW...",
    "...WW...",
  ]);
  art("chick1", [
    ".....rr.....",
    "....rrr.....",
    "....WWWW....",
    "...WWmWcc...",
    "...WWWWcc...",
    "...WWWWr....",
    "..WWWWWW....",
    ".WWWWWWWW...",
    ".WWWWWWWW...",
    "..WWWWWW....",
    "...cc.cc....",
    "...c..c.....",
  ]);
  art("chick2", [
    ".....rr.....",
    "....rrr.....",
    "....WWWW....",
    "...WWmWcc...",
    "...WWWWcc...",
    "...WWWWr....",
    "..WWWWWW....",
    ".WWWWWWWW...",
    ".WWWWWWWW...",
    "..WWWWWW....",
    "....cc.cc...",
    "....c...c...",
  ]);

  // Stepped mountain silhouette tile
  (() => {
    const r = rng(7);
    let h = 40;
    let rects = "";
    for (let x = 0; x < 960; x += 16) {
      h = Math.max(24, Math.min(110, h + Math.round((r() - 0.5) * 5) * 8));
      rects += `<rect x='${x}' y='${120 - h}' width='16' height='${h}' fill='#2dd4bf'/>`;
    }
    root.style.setProperty("--mtn", svgUrl(960, 120, rects));
    root.style.setProperty("--coin", SP.coin.url);
  })();

  Game.SP = SP;
})();
