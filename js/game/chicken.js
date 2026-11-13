/* The chicken runs along the ground as you scroll, facing the scroll direction. */
(() => {
  "use strict";

  const Game = window.Game;
  const { root, chick } = Game;

  let lastY = scrollY;
  let lastMove = 0;
  let dir = 1;

  function run() {
    const max = root.scrollHeight - innerHeight;
    if (scrollY !== lastY) {
      dir = scrollY > lastY ? 1 : -1;
      lastY = scrollY;
      lastMove = performance.now();
    }
    chick.style.setProperty("--x", (max > 0 ? (scrollY / max) * (innerWidth - 56) : 0) + "px");
    chick.style.setProperty("--dir", dir);
  }
  addEventListener("scroll", run, { passive: true });
  addEventListener("resize", run);

  // Flip between the two running frames while the page is moving
  setInterval(() => {
    const moving = performance.now() - lastMove < 160;
    chick.classList.toggle("f2", moving && !chick.classList.contains("f2"));
  }, 130);

  Game.run = run;
})();
