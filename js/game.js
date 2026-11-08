/* Game theme layer. Load AFTER script.js.
   Adds: header HUD, 16 collectibles hidden around the page, pixel clouds / bushes /
   dividers that fill every section's empty space, a skill ticker, and a chicken that runs as you scroll. */
(() => {
  "use strict";

  const root = document.documentElement;
  const D = window.PORTFOLIO || {};
  const KEY = "game";
  const TOTAL = 16;
  const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;

  let saved = {};
  try { saved = JSON.parse(localStorage.getItem(KEY)) || {}; } catch (e) {}
  const state = { got: Array.isArray(saved.got) ? saved.got : [] };
  const save = () => { try { localStorage.setItem(KEY, JSON.stringify(state)); } catch (e) {} };

  const mk = (cls, tag = "div") => { const n = document.createElement(tag); n.className = cls; return n; };
  const rng = (seed) => () => {
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };

  /* ---------- Pixel sprites (drawn from text, no image files needed) ---------- */
  const PAL = { y: "#fbbf24", o: "#d97706", w: "#fff7d6", r: "#ef4444", t: "#2dd4bf", T: "#0f766e", b: "#6366f1", B: "#312e81",
    g: "#22c55e", G: "#15803d", W: "#ffffff", k: "#6b4423", c: "#f97316", l: "#cbd5e1", m: "#111827" };
  const SP = {};
  const art = (name, rows) => {
    const w = Math.max(...rows.map((r) => r.length));
    const px = [];
    rows.forEach((row, y) => { for (let x = 0; x < row.length; x++) if (row[x] !== ".") px.push(`<rect x='${x}' y='${y}' width='1' height='1' fill='${PAL[row[x]]}'/>`); });
    const svg = `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 ${w} ${rows.length}' shape-rendering='crispEdges'>${px.join("")}</svg>`;
    SP[name] = { w, h: rows.length, url: `url("data:image/svg+xml,${encodeURIComponent(svg)}")` };
  };
  art("coin", ["..oooo..", ".oyyyyo.", "oyywwyyo", "oyywyyyo", "oyywyyyo", "oyyyyyyo", ".oyyyyo.", "..oooo.."]);
  art("heart", [".rr.rr.", "rrrrrrr", "rrwrrrr", ".rrrrr.", "..rrr..", "...r..."]);
  art("star", ["....y....", "...yyy...", "...yyy...", "yyyyyyyyy", ".yyyyyyy.", "..yyyyy..", "..yyoyy..", ".yyo.oyy.", ".yo...oy."]);
  art("gem", ["..tttt..", ".tWttTt.", "tWttttTt", ".tttTTt.", "..tTTt..", "...tt..."]);
  art("potion", ["..kkkk..", "...ll...", "...ll...", "..bbbb..", ".bbWbbb.", ".bbbbbB.", ".bbbbbB.", "..BBBB.."]);
  art("cloud", [".....WWW........", "...WWWWWWW.WW...", ".WWWWWWWWWWWWW..", "WWWWWWWWWWWWWWWW", "WWWWWWWWWWWWWWWW", ".WWWWWWWWWWWWWW."]);
  art("bush", ["....GGGG......", "..GGggggGG.GG.", ".GggggggggGggG", "GggggggggggggG", "GggggggggggggG", "GGGGGGGGGGGGGG"]);
  art("mushroom", ["..rrrr..", ".rrWWrr.", "rrWrrWrr", "rrrrrrrr", ".WWWWWW.", "...WW...", "...WW...", "...WW..."]);
  art("chick1", [".....rr.....", "....rrr.....", "....WWWW....", "...WWmWcc...", "...WWWWcc...", "...WWWWr....", "..WWWWWW....", ".WWWWWWWW...", ".WWWWWWWW...", "..WWWWWW....", "...cc.cc....", "...c..c....."]);
  art("chick2", [".....rr.....", "....rrr.....", "....WWWW....", "...WWmWcc...", "...WWWWcc...", "...WWWWr....", "..WWWWWW....", ".WWWWWWWW...", ".WWWWWWWW...", "..WWWWWW....", "....cc.cc...", "....c...c..."]);

  // Stepped mountain silhouette tile
  (() => {
    const r = rng(7); let h = 40, rects = "";
    for (let x = 0; x < 960; x += 16) {
      h = Math.max(24, Math.min(110, h + Math.round((r() - 0.5) * 5) * 8));
      rects += `<rect x='${x}' y='${120 - h}' width='16' height='${h}' fill='#2dd4bf'/>`;
    }
    const svg = `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 960 120' shape-rendering='crispEdges'>${rects}</svg>`;
    root.style.setProperty("--mtn", `url("data:image/svg+xml,${encodeURIComponent(svg)}")`);
    root.style.setProperty("--coin", SP.coin.url);
  })();

  /* ---------- Fixed elements ---------- */
  const world = mk("world"), ground = mk("ground-fixed"), chick = mk("chick");
  const layer = mk("game-layer"), loot = mk("loot-layer");
  [world, layer, loot, ground, chick].forEach((n) => n.setAttribute("aria-hidden", "true"));
  chick.style.setProperty("--c1", SP.chick1.url);
  chick.style.setProperty("--c2", SP.chick2.url);
  document.body.append(world, layer, loot, ground, chick);

  /* ---------- Header: HUD ---------- */
  const hud = mk("hud");
  hud.innerHTML = '<span class="lv"></span><span class="hud-coin"></span><span class="count"></span>';
  hud.title = `Collect all ${TOTAL} items hidden around the page`;
  document.querySelector(".nav-actions")?.prepend(hud);

  const paintHud = () => {
    const n = state.got.length;
    hud.querySelector(".lv").textContent = "LV " + String(Math.floor(n / 2)).padStart(2, "0");
    hud.querySelector(".count").textContent = `${n} /${TOTAL}`;
  };

  /* ---------- Effects ---------- */
  let ac;
  function beep(f = 880) {
    try {
      ac = ac || new AudioContext(); ac.resume?.();
      const o = ac.createOscillator(), g = ac.createGain(), t = ac.currentTime;
      o.type = "square"; o.frequency.setValueAtTime(f, t); o.frequency.setValueAtTime(f * 1.5, t + 0.06);
      g.gain.setValueAtTime(0.04, t); g.gain.exponentialRampToValueAtTime(0.0001, t + 0.16);
      o.connect(g).connect(ac.destination); o.start(); o.stop(t + 0.17);
    } catch (e) {}
  }
  function burst(x, y) {
    if (reduced) return;
    for (let i = 0; i < 8; i++) {
      const p = mk("spark"), a = (Math.PI * 2 * i) / 8, d = 24 + Math.random() * 20;
      p.style.left = x + "px"; p.style.top = y + "px";
      document.body.append(p);
      p.animate([{ transform: "translate(0,0)", opacity: 1 }, { transform: `translate(${Math.cos(a) * d}px,${Math.sin(a) * d}px)`, opacity: 0 }], { duration: 550, easing: "ease-out" }).onfinish = () => p.remove();
    }
  }
  function jump() { chick.classList.remove("jump"); void chick.offsetWidth; chick.classList.add("jump"); }
  chick.addEventListener("click", () => { jump(); beep(660); });

  function win() {
    const t = mk("toast");
    t.innerHTML = `<strong>QUEST COMPLETE!</strong><span>You found all ${TOTAL} items. Thanks for playing!</span>`;
    const b = mk("btn btn-sm", "button");
    b.type = "button"; b.textContent = "Play again";
    b.addEventListener("click", () => { state.got = []; save(); paintHud(); t.remove(); layout(); });
    t.append(b); document.body.append(t);
    setTimeout(() => t.classList.add("show"), 20);
    setTimeout(() => t.remove(), 10000);
  }

  function collect(n, id) {
    if (state.got.includes(id)) return;
    state.got.push(id); save(); paintHud();
    const r = n.getBoundingClientRect();
    burst(r.left + r.width / 2, r.top + r.height / 2);
    n.remove(); beep(); jump();
    hud.classList.remove("bump"); void hud.offsetWidth; hud.classList.add("bump");
    if (state.got.length >= TOTAL) win();
  }

  /* ---------- Ticker under the hero ---------- */
  (() => {
    const items = [...(D.skills || []).flatMap((g) => g.items || []), ...(D.projects || []).map((p) => p.title), "Insert coin"]
      .map((s) => String(s || "").trim()).filter(Boolean);
    if (!items.length) return;
    const t = mk("ticker"), track = mk("ticker-track");
    t.setAttribute("aria-hidden", "true");
    for (let c = 0; c < 4; c++) items.forEach((txt) => { const s = document.createElement("span"); s.textContent = txt; track.append(s); });
    t.append(track);
    document.querySelector(".hero")?.after(t);
  })();

  /* ---------- Fill the page: decor + collectibles (positions are seeded, so they stay put) ---------- */
  const TYPES = ["coin", "heart", "coin", "gem", "coin", "star", "coin", "potion", "coin", "heart", "gem", "coin", "star", "coin", "heart", "gem"];

  function put(parent, name, x, y, scale, cls) {
    const s = SP[name], n = mk(cls);
    n.style.cssText = `left:${x}px;top:${y}px;width:${s.w * scale}px;height:${s.h * scale}px;--img:${s.url}`;
    parent.append(n);
    return n;
  }

  function layout() {
    layer.style.height = loot.style.height = "0px";
    const W = root.clientWidth, H = root.scrollHeight;
    layer.style.height = loot.style.height = H + "px";
    layer.replaceChildren(); loot.replaceChildren();

    const boxes = [...document.querySelectorAll(".hero, main > section:not([hidden])")].map((s) => {
      const r = s.getBoundingClientRect(), cs = getComputedStyle(s);
      return { top: r.top + scrollY, bottom: r.bottom + scrollY, pt: parseFloat(cs.paddingTop) || 0, pb: parseFloat(cs.paddingBottom) || 0 };
    });

    // Decor: a dotted divider, drifting clouds and bushes/mushrooms sitting on it
    boxes.forEach((b, i) => {
      const r = rng(i * 97 + 13), wide = W > 700;
      const d = mk("game-divider"); d.style.top = b.bottom - 4 + "px"; layer.append(d);
      for (let k = 0; k < (wide ? 2 : 1); k++) put(layer, "cloud", r() * (W - 80), b.top + 14 + r() * Math.min(80, (b.bottom - b.top) / 3), 4, "deco cloud");
      ["bush", "mushroom", "bush"].slice(0, wide ? 3 : 2).forEach((n) => put(layer, n, r() * (W - 60), b.bottom - 4 - SP[n].h * 3, 3, "deco"));
    });

    // Collectibles: placed only in padding strips and side gutters, so they never cover text or buttons
    TYPES.forEach((type, i) => {
      const id = "i" + i;
      if (state.got.includes(id) || !boxes.length) return;
      const b = boxes[i % boxes.length], r = rng(i * 131 + 5);
      const zones = [
        [16, W - 56, b.top + 8, b.top + Math.max(28, b.pt - 40)],
        [16, W - 56, b.bottom - Math.max(56, Math.min(b.pb, 110)), b.bottom - 52],
      ];
      if (W > 1240) {
        const g = (W - 1140) / 2 - 50;
        zones.push([10, g, b.top + 90, b.bottom - 90], [10, g, b.top + 90, b.bottom - 90], [W - g - 10, W - 56, b.top + 90, b.bottom - 90], [W - g - 10, W - 56, b.top + 90, b.bottom - 90]);
      }
      const z = zones[Math.floor(r() * zones.length)];
      const x = z[0] + r() * Math.max(0, z[1] - z[0]), y = z[2] + r() * Math.max(0, z[3] - z[2]);
      const n = put(loot, type, x, y, 3, "loot-item");
      n.style.setProperty("--d", (r() * 2).toFixed(2) + "s");
      n.addEventListener("pointerenter", (e) => { if (e.pointerType === "mouse") collect(n, id); });
      n.addEventListener("click", () => collect(n, id));
    });
  }

  /* ---------- Chicken runs along the ground as you scroll ---------- */
  let lastY = scrollY, lastMove = 0, dir = 1;
  function run() {
    const max = root.scrollHeight - innerHeight;
    if (scrollY !== lastY) { dir = scrollY > lastY ? 1 : -1; lastY = scrollY; lastMove = performance.now(); }
    chick.style.setProperty("--x", (max > 0 ? (scrollY / max) * (innerWidth - 56) : 0) + "px");
    chick.style.setProperty("--dir", dir);
  }
  addEventListener("scroll", run, { passive: true });
  addEventListener("resize", run);
  setInterval(() => chick.classList.toggle("f2", performance.now() - lastMove < 160 && !chick.classList.contains("f2")), 130);


  let timer;
  const later = () => { clearTimeout(timer); timer = setTimeout(layout, 150); };
  addEventListener("resize", later);
  addEventListener("load", later);
  if ("ResizeObserver" in window) new ResizeObserver(later).observe(document.body);

  paintHud();
  run();
  requestAnimationFrame(layout);
})();
