/* Fixed page layers: sky and mountains, the ground strip, the decor and loot layers, and the chicken. */
(() => {
  "use strict";

  const Game = window.Game;
  const { mk, SP } = Game;

  const world = mk("world");
  const ground = mk("ground-fixed");
  const chick = mk("chick");
  const layer = mk("game-layer"); // clouds, bushes and dividers
  const loot = mk("loot-layer"); // collectibles
  [world, layer, loot, ground, chick].forEach((n) => n.setAttribute("aria-hidden", "true"));
  chick.style.setProperty("--c1", SP.chick1.url);
  chick.style.setProperty("--c2", SP.chick2.url);
  document.body.append(world, layer, loot, ground, chick);

  Object.assign(Game, { chick, layer, loot });
})();
