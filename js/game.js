var Area = require('./area.js');
var Book = require('./book.js');
var Player = require('./player.js');
var worldMap = require('./world.js');

window.onload = function () {
  console.log("Window loaded.");
  init();
};

var init = function () {
  game = {};
  game.worldMap = worldMap;
  console.log("Initializing player.");
  game.player = new Player ({
    book: new Book ({
      inputId: 'main-input',
      areaId: 'area-window',
      playerId: 'player-window',
      inventory: 'inventory',
      highlighter: 'highlighter',
    }),
    name: 'Enoki',
    moves: [
      {
        name: 'forward thrust',
        attack: {
          cut: 2,
          stab: 14,
          crush: 4,
          blast: 0,
        },
        defense: {
          cut: 8,
          stab: 2,
          crush: 3,
          blast: 0,
        },
      },
      {
        name: 'cross cut',
        attack: {
          cut: 14,
          stab: 0,
          crush: 6,
          blast: 0,
        },
        defense: {
          cut: 4,
          stab: 7,
          crush: 2,
          blast: 0,
        },
      },
    ],
    hitpoints: 100,
    spawnpoint: 'farmhouse',
    worldMap: game.worldMap,
  });
  game.player.init();
  console.log("Initializing book.");
  game.player.book.init();
  console.log("Initialized.");
};
