Feature = function (args) {
  this.checkText = args.checkText;
  this.name = args.name;
  this.verbs = args.verbs;
  this.description = args.description;
  this.onCheck = args.onCheck;
};

Feature.prototype["check"] = function (noun, player) {
  player.display(noun.checkText);
  if (noun.onCheck) {
    noun.onCheck();
  }
};

Feature.prototype["@"] = function (noun, player) {
  this["check"]();
};

module.exports = Feature;
