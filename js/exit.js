Exit = function (args) {
  this.name = args.name;
  this.checkText = args.checkText;
  this.destinationName = args.destinationName;
  this.locked = args.locked;
  this.lockCheck = args.lockCheck;
  this.keyName = args.keyName;
  this.verbs = args.verbs;
  this.onExit = args.onExit;
  this.onTry = args.onTry;
  this.description = args.description;
};

Exit.prototype["go to"] = function (noun, player) {
  if (!noun.locked) {
    var worldMap = require("./world.js");
    player.location = worldMap[noun.destinationName];
    if (this.onExit) {
      this.onExit();
    }
    player.enterArea();
  } else {
    return noun.lockCheck;
  }
};

Exit.prototype["check"] = function (noun, player) {
  player.display(noun.checkText);
};

Exit.prototype["@"] = function (noun, player) {
  Exit.prototype["go to"](noun, player);
};

module.exports = Exit;
