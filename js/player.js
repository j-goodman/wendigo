Player = function (args) {
  this.book = args.book;
  this.location = args.worldMap[args.spawnpoint];
};

Player.prototype.getInput = function (input) {
  var command = this.parseInput(input);
};

Player.prototype.parseInput = function (input) {
  var verbs = [];
  var nouns = [];
  var verb;
  var noun;
  for (var x = 0 ; x < this.location.exits.length ; x++) {
    nouns.push(this.location.exits[x].name);
  }
  for (x = 0 ; x < this.location.features.length ; x++) {
    nouns.push(this.location.features[x].name);
  }
  for (x = 0 ; x < this.location.verbs.length ; x++) {
    verbs.push(this.location.verbs[x]);
  }
  var verbEnd = 0;
  for (x = 0 ; x < input.length ; x++) {
    if (verbs.includes(input.slice(0, x))) {
      verb = (input.slice(0, x));
      verbEnd = x;
    }
  }
  for (x = verbEnd+2 ; x <= input.length ; x++) {
    if (nouns.includes(input.slice(verbEnd+1, x))) {
      noun = (input.slice(verbEnd+1, x));
    }
  }
  this.executeCommand(verb, noun);
};

Player.prototype.executeCommand = function (verb, noun) {
  if (!verb) {
    this.display("Unknown <v>verb</v>.");
    return undefined;
  } else if (!noun) {
    this.display("Unknown <n>noun</n>.");
    return undefined;
  } else {
    this.display("");
    if (this.location.getNoun(noun)) {
      noun = this.location.getNoun(noun);
    } else {
      this.display("Unknown <n>noun</n>");
    }
    if (noun[verb]) {
      verb = noun[verb];
      verb(noun, this);
    } else {
      verbs = "";
      if (noun.verbs.length > 1) {
        for (x = 0 ; x < noun.verbs.length-1 ; x++) {
          verbs += "<v>" + noun.verbs[x] + "</v>" + " ";
        }
        verbs += "or <v>" + noun.verbs[noun.verbs.length-1] + "</v>" + ".";
      } else {
        verbs = "<v>" + noun.verbs[0] + "</v>.";
      }
      this.display("You can't do that <v>verb</v> to that <n>noun</n>. Try " + verbs);
    }
  }
};

Player.prototype.display = function (text) {
  this.book.playerWindow.innerHTML = text;
};

Player.prototype.highlight = function (text) {
  // var nouns = this.location.nouns;
  // var verbs = this.location.verbs;
  // for (x = 0 ; x < text.length-1 ; x++) {
  //   for (var y = 1 ; y < text.length ; y++) {
  //     if (nouns.includes(text.slice(x, y))) {
  //       var output = text;
  //       if (text.slice(x-3, x) !== "<b>") {
  //         output = [text.slice(0, x), "<b>", text.slice(x)].join('');
  //         output = [output.slice(0, y+3), "</b>", output.slice(y+3)].join('');
  //       }
  //       return output;
  //     }
  //   }
  // }
  return text;
};

Player.prototype.enterArea = function () {
  this.lookAround();
};

Player.prototype.lookAround = function () {
  this.book.readArea(this.location);
};

Player.prototype.init = function () {
  this.book.player = this;
  this.lookAround();
};

module.exports = Player;
