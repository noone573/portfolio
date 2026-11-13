/* Game theme layer: shared state and helpers. Everything is stored on window.Game.
   The game adds a header HUD, 16 collectibles hidden around the page, pixel clouds / bushes /
   dividers that fill every section's empty space, a skill ticker, and a chicken that runs as you scroll.
   The game files load AFTER script.js (they decorate the finished page), in the order listed in index.html. */
(() => {
  "use strict";

  const Game = (window.Game = window.Game || {});

  // Collected items are remembered in the browser between visits
  const KEY = "game";
  let saved = {};
  try {
    saved = JSON.parse(localStorage.getItem(KEY)) || {};
  } catch (e) {}
  const state = { got: Array.isArray(saved.got) ? saved.got : [] };
  const save = () => {
    try {
      localStorage.setItem(KEY, JSON.stringify(state));
    } catch (e) {}
  };

  // mk("ticker") makes a <div class="ticker">
  const mk = (cls, tag = "div") => {
    const n = document.createElement(tag);
    n.className = cls;
    return n;
  };

  // Seeded random numbers: the same seed always gives the same sequence, so decor stays in place.
  const rng = (seed) => () => {
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };

  Object.assign(Game, {
    root: document.documentElement,
    D: window.PORTFOLIO || {},
    TOTAL: 16,
    reduced: matchMedia("(prefers-reduced-motion: reduce)").matches,
    state,
    save,
    mk,
    rng,
  });
})();
