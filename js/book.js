var fight_display = require('./html/fight_display.js');

Book = function (args) {
  this.input = document.getElementById(args.inputId);
  this.areaWindow = document.getElementById(args.areaId);
  this.playerWindow = document.getElementById(args.playerId);
  this.inventory = document.getElementById(args.inventory);
  this.highlighter = document.getElementById(args.highlighter);
  this.player = args.player;
  this.fightScreen = false;
  this.fightDisplay = fight_display;
};

Book.prototype.init = function () {
  var input = document.getElementById('main-input');
  input.onkeydown = function (event) {
    if (event.keyCode === 13) {
      this.player.getInput(input.value);
      input.value = '';
    }
  }.bind(this);
  this.highlighter.onclick = function () {
    if (this.player.highlightOff) {
      this.player.highlightOff = false;
      this.highlighter.className = 'highlighter';
    } else {
      this.player.highlightOff = true;
      this.highlighter.className = 'off';
    }
    this.player.lookAround();
  }.bind(this);
};

Book.prototype.clearInventory = function () {
  this.inventory.innerHTML = "";
};

Book.prototype.displayInventory = function (item) {
  this.inventory.innerHTML += '<li>'+item.name+'</li>';
};

Book.prototype.readArea = function (area) {
  var description = "";
  description += area.description;
  for (var x = 0; x < area.contents.length; x++) {
    description += " " + area.contents[x].description;
  }
  if (area.postscript) {
    description += " " + area.postscript;
  }
  description = this.player.highlight(description);
  this.areaWindow.innerHTML = description;
};

Book.prototype.scrollDown = function (scrollDelta, diff) {
  if (!diff) { diff = 1; }
  var y = window.pageYOffset;
  window.scrollTo(0, y+diff);
  diff += 0.5;
  if (diff < scrollDelta) {
    window.setTimeout(function () {
      this.scrollDown(scrollDelta, diff);
    }.bind(this), 10);
  }
};

Book.prototype.describeFight = function (player, opponent, callback) {
  var fight = {
    player: player,
    opponent: opponent,
    playerEnterMove: function (move) {
      this.printFightMove(move.name);
    }.bind(this),
    opponentEnterMove: function (move) {
      this.printFightMove(move.name);
    }.bind(this),
  };
  this.playerWindow.className = 'fight-window';
  this.input.blur();
  this.scrollDown(16);
  fight.player.currentMove = {
    index: 0,
    data: player.moves[0],
  };
  this.playerWindow.innerHTML = this.fightDisplay.fighter(player, player.currentMove.data);
  this.playerWindow.innerHTML += '<br><div>vs.</div><br>' + this.fightDisplay.fighter(fight.opponent, fight.opponent.moves[0]);
  this.setUpFightControls(fight, callback);
};

Book.prototype.setUpFightControls = function (fight, callback) {
  var slideLeft; var slideRight; var player;
  player = fight.player;
  slideLeft = function () {
    player.currentMove.index -= 1;
    if (player.currentMove.index < 0) {
      player.currentMove.index = player.moves.length-1;
    }
    player.currentMove.data = player.moves[player.currentMove.index];
    this.playerWindow.innerHTML = this.fightDisplay.fighter(player, player.currentMove.data);
    this.playerWindow.innerHTML += '<br><div>vs.</div><br>' + this.fightDisplay.fighter(fight.opponent, fight.opponent.moves[0]);
  }.bind(this);
  slideRight = function () {
    player.currentMove.index += 1;
    if (player.currentMove.index >= player.moves.length) {
      player.currentMove.index = 0;
    }
    player.currentMove.data = player.moves[player.currentMove.index];
    this.playerWindow.innerHTML = this.fightDisplay.fighter(player, player.currentMove.data);
    this.playerWindow.innerHTML += '<br><div>vs.</div><br>' + this.fightDisplay.fighter(fight.opponent, fight.opponent.moves[0]);
  }.bind(this);
  window.onkeydown = function (event) {
    if (event.key == 'ArrowLeft') {
      slideLeft();
    }
    if (event.key == 'ArrowRight') {
      slideRight();
    }
    if (event.key == ' ') {
      callback();
    }
  };
};

Book.prototype.updateFightDisplay = function (player, opponent) {
  this.playerWindow.innerHTML = this.fightDisplay.fighter(player, player.currentMove.data);
  this.playerWindow.innerHTML += '<br><div>vs.</div><br>' + this.fightDisplay.fighter(opponent, opponent.moves[0]);
};

Book.prototype.printFightMove = function (move) {
  this.playerWindow.innerHTML += "\n" + move.name;
};

Book.prototype.endFight = function () {
  this.playerWindow.classname = 'player-window';
};

module.exports = Book;
