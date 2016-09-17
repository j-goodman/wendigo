var Area = require('./area.js');
var Book = require('./book.js');
var Player = require('./player.js');
var worldMap = require('./world.js');

window.onload = function () {
  init();
};

var init = function () {
  game = {};
  game.worldMap = worldMap;
  game.player = new Player ({
    book: new Book ({
      inputId: 'main-input',
      areaId: 'area-window',
      playerId: 'player-window',
      inventory: 'inventory',
      highlighter: 'highlighter',
    }),
    name: 'Sanjuro',
    moves: [
      {
        name: 'forward thrust',
        attack: {
          cut: 0,
          stab: 24,
          crush: 0,
          blast: 0,
        },
        defense: {
          cut: 12,
          stab: 3,
          crush: 6,
          blast: 0,
        },
      },
      {
        name: 'cross cut',
        attack: {
          cut: 24,
          stab: 0,
          crush: 0,
          blast: 0,
        },
        defense: {
          cut: 12,
          stab: 3,
          crush: 3,
          blast: 0,
        },
      },
      {
        name: 'cautious feint',
        attack: {
          cut: 5,
          stab: 5,
          crush: 0,
          blast: 0,
        },
        defense: {
          cut: 18,
          stab: 18,
          crush: 0,
          blast: 0,
        },
      },
    ],
    hitpoints: 100,
    spawnpoint: 'farmhouse',
    worldMap: game.worldMap,
  });
  game.player.init();
  game.player.book.init();
};
