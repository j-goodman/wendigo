Exit = function (args) {
  this.name = args.name;
  this.checkText = args.checkText;
  this.destinationName = args.destinationName;
};

Exit.prototype["go to"] = function (noun, player) {
  var worldMap = require("./world.js");
  player.location = worldMap[noun.destinationName];
  player.enterArea();
};

Exit.prototype["check"] = function (noun, player) {
  player.display(noun.checkText);
};

Exit.prototype["@"] = function (noun, player) {
  Exit.prototype["go to"](noun, player);
};

module.exports = Exit;
