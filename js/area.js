Area = function (args) {
  this.description = args.description;
  this.contents = args.contents;
  this.name = args.name;
  this.nouns = args.nouns;
  this.verbs = args.verbs;
  this.worldMap = args.worldMap;
};

Area.prototype.getNoun = function (name) {
  for (var x = 0 ; x < this.contents.length ; x++) {
    if (this.contents[x].name === name) {
      return this.contents[x];
    }
  }
  return false;
};


module.exports = Area;
