Box = function (args) {
  this.checkText = args.checkText;
  this.contents = args.contents;
  this.postscript = args.postscript;
  this.name = args.name;
  this.verbs = args.verbs;
  this.description = args.description;
};

Box.prototype["check"] = function (noun, player) {
  var description = noun.checkText + " ";
  if (noun.contents.length === 0) {
    description += "nothing.";
    description = player.highlight(description);
    player.display(description);
    return undefined;
  }
  if (noun.contents.length === 1) {
    description += noun.contents[0].description + ".";
    description = player.highlight(description);
    player.display(description);
    return undefined;
  }
  for (var x = 0 ; x < noun.contents.length-1 ; x++) {
    description += noun.contents[x].description;
    description += ", ";
  }
  description += "and " + noun.contents[noun.contents.length-1].description;
  if (noun.postscript) {
    description += noun.postscript;
  }
  description += ".";
  description = player.highlight(description);
  player.display(description);
  if (this.onCheck) {
    this.onCheck();
  }
};

Box.prototype["@"] = function (noun, player) {
  this["check"]();
};

module.exports = Box;
