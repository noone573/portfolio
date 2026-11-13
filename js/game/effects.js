/* Effects: beep sound, spark burst, chicken jump, picking up an item, and the "quest complete" toast. */
(() => {
  "use strict";

  const Game = window.Game;
  const { mk, state, save, reduced, chick, hud, paintHud, TOTAL } = Game;

  let ac;
  function beep(f = 880) {
    try {
      ac = ac || new AudioContext();
      ac.resume?.();
      const o = ac.createOscillator();
      const g = ac.createGain();
      const t = ac.currentTime;
      o.type = "square";
      o.frequency.setValueAtTime(f, t);
      o.frequency.setValueAtTime(f * 1.5, t + 0.06);
      g.gain.setValueAtTime(0.04, t);
      g.gain.exponentialRampToValueAtTime(0.0001, t + 0.16);
      o.connect(g).connect(ac.destination);
      o.start();
      o.stop(t + 0.17);
    } catch (e) {}
  }

  function burst(x, y) {
    if (reduced) return;
    for (let i = 0; i < 8; i++) {
      const p = mk("spark");
      const a = (Math.PI * 2 * i) / 8;
      const d = 24 + Math.random() * 20;
      p.style.left = x + "px";
      p.style.top = y + "px";
      document.body.append(p);
      const frames = [
        { transform: "translate(0,0)", opacity: 1 },
        { transform: `translate(${Math.cos(a) * d}px,${Math.sin(a) * d}px)`, opacity: 0 },
      ];
      p.animate(frames, { duration: 550, easing: "ease-out" }).onfinish = () => p.remove();
    }
  }

  // Removing and re-adding the class restarts the CSS animation
  function jump() {
    chick.classList.remove("jump");
    void chick.offsetWidth;
    chick.classList.add("jump");
  }
  chick.addEventListener("click", () => {
    jump();
    beep(660);
  });

  function win() {
    const t = mk("toast");
    t.innerHTML = `<strong>QUEST COMPLETE!</strong><span>You found all ${TOTAL} items. Thanks for playing!</span>`;
    const b = mk("btn btn-sm", "button");
    b.type = "button";
    b.textContent = "Play again";
    b.addEventListener("click", () => {
      state.got = [];
      save();
      paintHud();
      t.remove();
      Game.layout();
    });
    t.append(b);
    document.body.append(t);
    setTimeout(() => t.classList.add("show"), 20);
    setTimeout(() => t.remove(), 10000);
  }

  function collect(n, id) {
    if (state.got.includes(id)) return;
    state.got.push(id);
    save();
    paintHud();
    const r = n.getBoundingClientRect();
    burst(r.left + r.width / 2, r.top + r.height / 2);
    n.remove();
    beep();
    jump();
    hud.classList.remove("bump");
    void hud.offsetWidth;
    hud.classList.add("bump");
    if (state.got.length >= TOTAL) win();
  }

  Game.collect = collect;
})();
