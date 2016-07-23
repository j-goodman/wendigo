Area = function (args) {
  this.description = args.description;
  this.exits = args.exits;
  this.features = args.features;
  this.name = args.name;
  this.nouns = args.nouns;
  this.verbs = args.verbs;
  this.worldMap = args.worldMap;
};

Area.prototype.getNoun = function (name) {
  for (var x = 0 ; x < this.exits.length ; x++) {
    if (this.exits[x].name === name) {
      return this.exits[x];
    }
  }
  for (x = 0 ; x < this.features.length ; x++) {
    if (this.features[x].name === name) {
      return this.features[x];
    }
  }
  return false;
};


module.exports = Area;
