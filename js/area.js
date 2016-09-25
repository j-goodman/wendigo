Area = function (args) {
  this.description = args.description;
  this.postscript = args.postscript;
  this.contents = args.contents;
  this.name = args.name;
  this.worldMap = args.worldMap;
  this.getNouns = function () {
    var nouns = [];
    for (var x = 0 ; x < this.contents.length ; x++) {
      nouns.push(this.contents[x].name.toLowerCase());
      if (this.contents[x].contents) {
        for (var z = 0 ; z < this.contents[x].contents.length ; z++) {
          nouns.push(this.contents[x].contents[z].name.toLowerCase());
        }
      }
    }
    this.nouns = nouns;
  }.bind(this);
  this.getVerbs = function () {
    var verbs = [];
    for (var x = 0 ; x < this.contents.length ; x++) {
      for (var y = 0 ; y < this.contents[x].verbs.length ; y++) {
        if (!verbs.includes(this.contents[x].verbs[y])) {
          verbs.push(this.contents[x].verbs[y]);
        }
      }
      if (this.contents[x].contents) {
        for (var z = 0 ; z < this.contents[x].contents.length ; z++) {
          for (var a = 0 ; a < this.contents[x].contents[z].verbs.length ; a++) {
            if (!verbs.includes(this.contents[x].contents[z].verbs[a])) {
              verbs.push(this.contents[x].contents[z].verbs[a]);
            }
          }
        }
      }
    }
    this.verbs = verbs;
  }.bind(this);
  this.getNouns();
  this.getVerbs();
};

Area.prototype.getNoun = function (name) {
  for (var x = 0 ; x < this.contents.length ; x++) {
    if (this.contents[x].name.toLowerCase() === name.toLowerCase()) {
      return this.contents[x];
    }
    if (this.contents[x].contents) {
      for (var y = 0 ; y < this.contents[x].contents.length ; y++) {
        if (this.contents[x].contents[y].name === name) {
          return this.contents[x].contents[y];
        }
      }
    }
  }
  return false;
};


module.exports = Area;
