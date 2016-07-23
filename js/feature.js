Feature = function (args) {
  this.checkText = args.checkText;
  this.name = args.name;
  this.verbs = args.verbs;
};

Feature.prototype["check"] = function (noun, player) {
  player.display(noun.checkText);
};

Feature.prototype["@"] = function (noun, player) {
  Feature.prototype["check"](noun, player);
};

module.exports = Feature;
