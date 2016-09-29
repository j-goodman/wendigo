/*jshint sub:true*/
Fighter = function (args) {
  this.checkText = args.checkText;
  this.name = args.name;
  this.verbs = args.verbs;
  this.description = args.description;
  this.hitpoints = args.hitpoints;
  this.moves = args.moves;
  this.onFight = args.onFight;
  this.onDeath = args.onDeath;
};

Fighter.prototype["check"] = function (noun, player) {
  player.display(noun.checkText);
  if (this.onCheck) {
    this.onCheck();
  }
};

Fighter.prototype["attack"] = function (noun, player) {
  player.getMove(noun);
};

Fighter.prototype.startFight = function (target) {
  var move = this.chooseMove();
  target.isAttacked(this, move);
};

Fighter.prototype.chooseMove = function (attackerMove) {
  var move = this.moves[Math.floor(Math.random()*this.moves.length*0.99)];
  this.currentMove = move;
  return move;
  // Move decision logic will be based on data in the Fighter's memory object
  // about what has been most effective in the past.
};

Fighter.prototype.hitpointsString = function () {
  var string = "";
  for (var x = 0; x < this.hitpoints; x+=3) {
    string += "█";
  }
  if (string.length < this.hitpoints/3) {
    string += "▌";
  }
  return string;
};

Fighter.prototype.isAttacked = function (opponent, move) {
  if (this.onFight) {
    this.onFight();
  }
  var response = this.chooseMove(move);
  // The Fighter will sometimes flee, otherwise they attack
  if (opponent.haveFightDescribed) {
    opponent.haveFightDescribed(this, function () {
      this.engage(opponent, opponent.currentMove.data, response);
      opponent.engage(this, response, opponent.currentMove.data);
    }.bind(this));
  }
  if (opponent.book) {
    this.attackInterval = window.setInterval(function () {
      if (Math.round(Math.random())) {
        this.chooseMove();
        opponent.book.updateFightDisplay(opponent, this);
      }
    }.bind(this), 750);
  }
};

Fighter.prototype.die = function (opponent) {
  if (this.onDeath) {
    this.onDeath();
  }
  clearInterval(this.attackInterval);
  opponent.concludeFight();
  this.engage = null;
};

Fighter.prototype.engage = function (opponent, move, response) {
  this.chooseMove();
  var damage = 0;
  var damageTypes = ['cut', 'stab', 'crush', 'blast'];

  damageTypes.forEach(function (type) {
    damage += (move.attack[type] - response.defense[type]) < 0 ?
    0 : (move.attack[type] - response.defense[type]);
  });
  this.hitpoints -= damage;
  if (this.hitpoints <= 0) {
    this.die(opponent);
  }
  if (opponent.hitpoints <= 0) {
    opponent.die();
  }
};

module.exports = Fighter;
