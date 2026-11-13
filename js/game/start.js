/* Starts the game layer, and redraws the decor when the page size changes. Loads last. */
(() => {
  "use strict";

  const Game = window.Game;
  const { layout, paintHud, run } = Game;

  let timer;
  const later = () => {
    clearTimeout(timer);
    timer = setTimeout(layout, 150);
  };
  addEventListener("resize", later);
  addEventListener("load", later);
  if ("ResizeObserver" in window) new ResizeObserver(later).observe(document.body);

  paintHud();
  run();
  requestAnimationFrame(layout);
})();
