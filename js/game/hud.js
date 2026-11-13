/* Header HUD: level and item counter next to the theme button. */
(() => {
  "use strict";

  const Game = window.Game;
  const { mk, state, TOTAL } = Game;

  const hud = mk("hud");
  hud.innerHTML = '<span class="lv"></span><span class="hud-coin"></span><span class="count"></span>';
  hud.title = `Collect all ${TOTAL} items hidden around the page`;
  document.querySelector(".nav-actions")?.prepend(hud);

  const paintHud = () => {
    const n = state.got.length;
    hud.querySelector(".lv").textContent = "LV " + String(Math.floor(n / 2)).padStart(2, "0");
    hud.querySelector(".count").textContent = `${n} /${TOTAL}`;
  };

  Object.assign(Game, { hud, paintHud });
})();
