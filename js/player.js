var Fighter = require('./fighter.js');

Player = function (args) {
  this.name = args.name;
  this.book = args.book;
  this.location = args.worldMap[args.spawnpoint];
  this.moves = args.moves;
  this.hitpoints = args.hitpoints;
  this.inventory = [];
  this.highlightOff = false;
};

Player.prototype.getInput = function (input) {
  var command = this.parseInput(input);
};

Player.prototype.parseInput = function (input) {
  input = input.toLowerCase();
  var verbs = this.location.verbs;
  var nouns = this.location.nouns;
  var verb;
  var noun;
  for (x = 0 ; x < this.inventory.length ; x++) {
    nouns.push(this.inventory[x].name);
  }
  var verbEnd = 0;
  for (x = 0 ; x < input.length ; x++) {
    if (verbs.includes(input.slice(0, x))) {
      verb = (input.slice(0, x));
      verbEnd = x;
    }
  }
  for (x = verbEnd+2 ; x <= input.length ; x++) {
    if (nouns.includes(input.slice(verbEnd+1, x))) {
      noun = (input.slice(verbEnd+1, x));
    }
  }
  this.executeCommand(verb, noun);
};

Player.prototype.executeCommand = function (verb, noun) {
  if (!verb) {
    this.display("Unknown <v>verb</v>.");
    return undefined;
  } else if (!noun) {
    this.display("Unknown <n>noun</n>.");
    return undefined;
  } else {
    this.display("");
    if (this.location.getNoun(noun)) {
      noun = this.location.getNoun(noun);
    } else if (this.getInventoryNoun(noun)) {
      noun = this.getInventoryNoun(noun);
    } else {
      this.display("Unknown <n>noun</n>");
    }
    if (noun[verb]) {
      verb = noun[verb];
      verb(noun, this);
    } else {
      verbs = "";
      if (noun.verbs.length > 1) {
        for (x = 0 ; x < noun.verbs.length-1 ; x++) {
          verbs += "<v>" + noun.verbs[x] + "</v>" + " ";
        }
        verbs += "or <v>" + noun.verbs[noun.verbs.length-1] + "</v>" + ".";
      } else {
        verbs = "<v>" + noun.verbs[0] + "</v>.";
      }
      this.display("You can't do that <v>verb</v> to that <n>noun</n>. Try " + verbs);
    }
  }

  Player.prototype.startFight = function (target) {
    var move = this.chooseMove();
    this.attack(target, move);
  };

  Player.prototype.getMove = function (attacker, attackerMove) {
    var move = this.moves[0];

    this.attack(attacker, move);

    // The player will choose from their list of moves, sometimes getting hints
    // about their attacker's moves, if they are perceptive (stat).
  };

  Player.prototype.attack = function (target, move) {
    target.isAttacked(this, move);
  };

  Player.prototype.isAttacked = function (opponent, move) {
    var response = this.chooseMove(move);
    // The Player can either engage or flee.
  };

  Player.prototype.haveFightDescribed = function (opponent, callback) {
    this.book.describeFight(this, opponent, callback);
  };

  Player.prototype.concludeFight = function () {
    this.book.concludeFight();
  };

  Player.prototype.listMoves = function () {
    this.moves = [
      {
        name: 'punch',
        attack: {
          cut: 0,
          stab: 0,
          crush: 7,
          blast: 0,
        },
        defense: {
          cut: 0,
          stab: 0,
          crush: 1,
          blast: 0,
        },
      },
    ];
    for (var ii=0; ii < this.inventory.length; ii++) {
      if (this.inventory[ii].moves) {
        this.moves = this.moves.concat(this.inventory[ii].moves);
      }
    }
  };

  Player.prototype.engage = function (opponent, move, response) {
    var damage = 0;
    var damageTypes = ['cut', 'stab', 'crush', 'blast'];

    damageTypes.forEach(function (type) {
      damage += (move.attack[type] - response.defense[type]) < 0 ?
      0 : (move.attack[type] - response.defense[type]);
    });

    var dealtDamage = 0;
    damageTypes.forEach(function (type) {
      dealtDamage += (response.attack[type] - move.defense[type]) < 0 ?
      0 : (response.attack[type] - move.defense[type]);
    });

    this.hitpoints -= damage;
    var comment = 'You take ' + damage + ' damage and deal ' + dealtDamage + '.';
    if (this.hitpoints > 0 && opponent.hitpoints > 0) {
      this.book.updateFightDisplay(this, opponent, comment);
    }
  };
};

Player.prototype.die = function () {
  window.alert("You've died.");
  window.scrollTo(0, 0);
  location.reload();
};

Player.prototype.getInventoryNoun = function (name) {
  for (var x = 0 ; x < this.inventory.length ; x++) {
    if (this.inventory[x].name === name) {
      return this.inventory[x];
    }
  }
  return false;
};

Player.prototype.display = function (text) {
  this.book.playerWindow.innerHTML = this.highlight(text);
};

Player.prototype.highlight = function (text) {
  if (this.highlightOff) {
    return text;
  }
  var nouns = this.location.nouns;
  var verbs = this.location.verbs;
  for (x = 0 ; x < text.length-1 ; x++) {
    for (var y = 1 ; y < text.length ; y++) {
      var output;
      if (nouns.includes(text.slice(x, y).toLowerCase())) {
        output = text;
        if (text.slice(x-3, x) !== "<n>") {
          output = [text.slice(0, x), "<n>", text.slice(x)].join('');
          output = [output.slice(0, y+3), "</n>", output.slice(y+3)].join('');
        }
        text = output;
      } else if (verbs.includes(text.slice(x, y).toLowerCase())) {
        output = text;
        if (text.slice(x-3, x) !== "<v>") {
          output = [text.slice(0, x), "<v>", text.slice(x)].join('');
          output = [output.slice(0, y+3), "</v>", output.slice(y+3)].join('');
        }
        text = output;
      }
    }
  }
  return text;
};

Player.prototype.hitpointsString = Fighter.prototype.hitpointsString;

Player.prototype.enterArea = function () {
  this.lookAround();
};

Player.prototype.lookAround = function () {
  this.book.readArea(this.location);
};

Player.prototype.updateInventory = function () {
  this.book.clearInventory();
  this.inventory.forEach(function (item) {
    this.book.displayInventory(item);
  }.bind(this));
};

Player.prototype.init = function () {
  this.book.player = this;
  this.lookAround();
};

module.exports = Player;
