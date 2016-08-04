/*jshint sub:true*/
Fighter = function (args) {
  this.checkText = args.checkText;
  this.name = args.name;
  this.verbs = args.verbs;
  this.description = args.description;
  this.hitpoints = args.hitpoints;
  this.moves = args.moves;
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
  return this.moves[0];
  // Move decision logic will be based on data in the Fighter's memory object
  // about what has been most effective in the past.
};

Fighter.prototype.isAttacked = function (opponent, move) {
  var response = this.chooseMove(move);
  // The Fighter will sometimes flee, otherwise they attack
  this.engage(opponent, move, response);
  opponent.engage(this, response, move);
};

Fighter.prototype.engage = function (opponent, move, response) {
  var damage = 0;
  var damageTypes = ['cut', 'stab', 'crush', 'blast'];

  damageTypes.forEach(function (type) {
    damage += (move.attack[type] - response.defense[type]) < 0 ?
    0 : (move.attack[type] - response.defense[type]);
  });
  this.hitpoints -= damage;
};

module.exports = Fighter;
