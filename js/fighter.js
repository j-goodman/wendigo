Fighter = function (args) {
  this.checkText = args.checkText;
  this.name = args.name;
  this.verbs = args.verbs;
  this.description = args.description;
  this.stats = args.stats;
  this.move = args.moves;
};

Fighter.prototype["check"] = function (noun, player) {
  player.display(noun.checkText);
  if (this.onCheck) {
    this.onCheck();
  }
};

Fighter.prototype["@"] = function (noun, player) {
  this["check"]();
};

module.exports = Fighter;
