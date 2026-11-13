/* Fills the page with decor and the collectibles. Positions are seeded, so they stay put between visits. */
(() => {
  "use strict";

  const Game = window.Game;
  const { root, mk, rng, SP, state, layer, loot, collect } = Game;

  const TYPES = [
    "coin",
    "heart",
    "coin",
    "gem",
    "coin",
    "star",
    "coin",
    "potion",
    "coin",
    "heart",
    "gem",
    "coin",
    "star",
    "coin",
    "heart",
    "gem",
  ];

  // Places sprite `name` at (x, y), drawn `scale` times bigger.
  function put(parent, name, x, y, scale, cls) {
    const s = SP[name];
    const n = mk(cls);
    n.style.cssText = `left:${x}px;top:${y}px;width:${s.w * scale}px;height:${s.h * scale}px;--img:${s.url}`;
    parent.append(n);
    return n;
  }

  // The page area of the hero and of every visible section.
  function sectionBoxes() {
    return [...document.querySelectorAll(".hero, main > section:not([hidden])")].map((s) => {
      const r = s.getBoundingClientRect();
      const cs = getComputedStyle(s);
      return {
        top: r.top + scrollY,
        bottom: r.bottom + scrollY,
        pt: parseFloat(cs.paddingTop) || 0,
        pb: parseFloat(cs.paddingBottom) || 0,
      };
    });
  }

  // A dotted divider under each section, drifting clouds, and bushes/mushrooms sitting on the divider.
  function placeDecor(boxes, W) {
    boxes.forEach((b, i) => {
      const r = rng(i * 97 + 13);
      const wide = W > 700;
      const d = mk("game-divider");
      d.style.top = b.bottom - 4 + "px";
      layer.append(d);
      for (let k = 0; k < (wide ? 2 : 1); k++) {
        put(layer, "cloud", r() * (W - 80), b.top + 14 + r() * Math.min(80, (b.bottom - b.top) / 3), 4, "deco cloud");
      }
      ["bush", "mushroom", "bush"]
        .slice(0, wide ? 3 : 2)
        .forEach((n) => put(layer, n, r() * (W - 60), b.bottom - 4 - SP[n].h * 3, 3, "deco"));
    });
  }

  // Collectibles go only in padding strips and side gutters, so they never cover text or buttons.
  function placeLoot(boxes, W) {
    TYPES.forEach((type, i) => {
      const id = "i" + i;
      if (state.got.includes(id) || !boxes.length) return;
      const b = boxes[i % boxes.length];
      const r = rng(i * 131 + 5);
      // Each zone is [left, right, top, bottom]
      const zones = [
        [16, W - 56, b.top + 8, b.top + Math.max(28, b.pt - 40)],
        [16, W - 56, b.bottom - Math.max(56, Math.min(b.pb, 110)), b.bottom - 52],
      ];
      if (W > 1240) {
        const g = (W - 1140) / 2 - 50;
        const left = [10, g, b.top + 90, b.bottom - 90];
        const right = [W - g - 10, W - 56, b.top + 90, b.bottom - 90];
        zones.push(left, left, right, right);
      }
      const z = zones[Math.floor(r() * zones.length)];
      const x = z[0] + r() * Math.max(0, z[1] - z[0]);
      const y = z[2] + r() * Math.max(0, z[3] - z[2]);
      const n = put(loot, type, x, y, 3, "loot-item");
      n.style.setProperty("--d", (r() * 2).toFixed(2) + "s");
      n.addEventListener("pointerenter", (e) => {
        if (e.pointerType === "mouse") collect(n, id);
      });
      n.addEventListener("click", () => collect(n, id));
    });
  }

  function layout() {
    layer.style.height = loot.style.height = "0px";
    const W = root.clientWidth;
    const H = root.scrollHeight;
    layer.style.height = loot.style.height = H + "px";
    layer.replaceChildren();
    loot.replaceChildren();

    const boxes = sectionBoxes();
    placeDecor(boxes, W);
    placeLoot(boxes, W);
  }

  Game.layout = layout;
})();
