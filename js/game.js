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
      // highlightId: 'highlight-input',
      inventory: 'inventory',
    }),
    spawnpoint: 'backroom',
    worldMap: game.worldMap,
  });
  game.player.init();
  game.player.book.init();
};
