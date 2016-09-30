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
    moves: [],
    hitpoints: 100,
    spawnpoint: 'dirt_road',
    worldMap: game.worldMap,
  });
  game.player.init();
  game.player.book.init();
};
