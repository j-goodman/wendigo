Area = function (args) {
  this.description = args.description;
  this.contents = args.contents;
  this.name = args.name;
  this.worldMap = args.worldMap;
  this.getNouns = function () {
    var nouns = [];
    for (var x = 0 ; x < this.contents.length ; x++) {
      nouns.push(this.contents[x].name);
    }
    return nouns;
  }.bind(this);
  this.getVerbs = function () {
    var verbs = [];
    for (var x = 0 ; x < this.contents.length ; x++) {
      console.log(this.contents[x]);
      console.log(this.contents[x].verbs);
      for (var y = 0 ; y < this.contents[x].verbs.length ; y++) {
        if (!verbs.includes(this.contents[x].verbs[y])) {
          verbs.push(this.contents[x].verbs[y]);
        }
      }
    }
    return verbs;
  }.bind(this);
  this.nouns = this.getNouns();
  this.verbs = this.getVerbs();
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
