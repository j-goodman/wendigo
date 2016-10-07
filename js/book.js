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
  this.fightComment = 'vs.';
};

Book.prototype.init = function () {
  window.scrollTo(0, 0);
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

Book.prototype.scrollUp = function (scrollDelta, diff) {
  if (!diff) { diff = 1; }
  var y = window.pageYOffset;
  window.scrollTo(0, y-diff);
  diff += 0.5;
  if (diff < scrollDelta) {
    window.setTimeout(function () {
      this.scrollUp(scrollDelta, diff);
    }.bind(this), 10);
  }
};

Book.prototype.describeFight = function (player, opponent, callback) {
  player.listMoves();
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
  this.playerWindow.innerHTML += '<br><div>' + this.fightComment + '</div><br>' + this.fightDisplay.fighter(fight.opponent, fight.opponent.currentMove);
  this.setUpFightControls(fight, callback);
  if (fight.opponent.name === "the Devil") {
    window.setTimeout(function () {
      this.backup = this.fightComment;
      this.fightComment = 'press the spacebar to engage your opponent';
    }.bind(this), 6000);
    window.setTimeout(function () {
      this.fightComment = this.backup;
    }.bind(this), 8000);
  }
};

Book.prototype.concludeFight = function () {
  this.playerWindow.className = 'player-window';
  this.scrollUp(18);
  this.playerWindow.innerHTML = '';
  this.unplugFightControls();
  this.input.focus();
  this.readArea(this.player.location);
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
    this.playerWindow.innerHTML += '<br><div>' + this.fightComment + '</div><br>' + this.fightDisplay.fighter(fight.opponent, fight.opponent.currentMove);
  }.bind(this);
  slideRight = function () {
    player.currentMove.index += 1;
    if (player.currentMove.index >= player.moves.length) {
      player.currentMove.index = 0;
    }
    player.currentMove.data = player.moves[player.currentMove.index];
    this.playerWindow.innerHTML = this.fightDisplay.fighter(player, player.currentMove.data);
    this.playerWindow.innerHTML += '<br><div>' + this.fightComment + '</div><br>' + this.fightDisplay.fighter(fight.opponent, fight.opponent.currentMove);
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

Book.prototype.unplugFightControls = function () {
  window.onkeydown = null;
};

Book.prototype.updateFightDisplay = function (player, opponent, comment) {
  if (comment) {
    this.fightComment = comment;
  }
  this.playerWindow.innerHTML = this.fightDisplay.fighter(player, player.currentMove.data);
  this.playerWindow.innerHTML += '<br><div>' + this.fightComment + '</div><br>' + this.fightDisplay.fighter(opponent, opponent.currentMove);
};

Book.prototype.printFightMove = function (move) {
  this.playerWindow.innerHTML += "\n" + move.name;
};

Book.prototype.endFight = function () {
  this.playerWindow.classname = 'player-window';
};

module.exports = Book;
