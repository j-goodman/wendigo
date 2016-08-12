Book = function (args) {
  this.input = document.getElementById(args.inputId);
  this.areaWindow = document.getElementById(args.areaId);
  this.playerWindow = document.getElementById(args.playerId);
  this.inventory = document.getElementById(args.inventory);
  this.highlighter = document.getElementById(args.highlighter);
  this.player = args.player;
  this.fightScreen = false;
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

Book.prototype.describeFight = function (player, opponent) {
  console.log("'Describing fight' --Book");
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
  this.scrollDown(13);
  console.log(fight.player);
  console.log(this.playerWindow.innerHTML);
  this.playerWindow.innerHTML = '<ul>';
  this.playerWindow.innerHTML += '<li>' + fight.player.name + '</li><li>' + fight.player.moves[0].name + '</li>';
  this.playerWindow.innerHTML += '<li>' + fight.opponent.name + '</li>';
  this.playerWindow.innerHTML += '<ul>';
  console.log("Populated window");
  var fightText = fight.player.name + "\n" + "";
  this.areaWindow.innerHTML = fightText;
};

Book.prototype.printFightMove = function (move) {
  this.playerWindow.innerHTML += "\n" + move.name;
};

Book.prototype.endFight = function () {
  this.playerWindow.classname = 'player-window';
};

module.exports = Book;
