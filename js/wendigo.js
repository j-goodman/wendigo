/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	var Area = __webpack_require__(1);
	var Book = __webpack_require__(2);
	var Player = __webpack_require__(3);
	var worldMap = __webpack_require__(4);
	
	window.onload = function () {
	  init();
	};
	
	var init = function () {
	  game = {};
	  game.worldMap = worldMap;
	  game.player = new Player ({
	    book: new Book ({
	      inputId: 'main-input',
	      areaId: 'area-window',
	      playerId: 'player-window',
	      inventory: 'inventory',
	      highlighter: 'highlighter',
	    }),
	    spawnpoint: 'farmhouse',
	    worldMap: game.worldMap,
	  });
	  game.player.init();
	  game.player.book.init();
	};


/***/ },
/* 1 */
/***/ function(module, exports) {

	Area = function (args) {
	  this.description = args.description;
	  this.postscript = args.postscript;
	  this.contents = args.contents;
	  this.name = args.name;
	  this.worldMap = args.worldMap;
	  this.getNouns = function () {
	    var nouns = [];
	    for (var x = 0 ; x < this.contents.length ; x++) {
	      nouns.push(this.contents[x].name);
	      if (this.contents[x].contents) {
	        for (var z = 0 ; z < this.contents[x].contents.length ; z++) {
	          nouns.push(this.contents[x].contents[z].name);
	        }
	      }
	    }
	    return nouns;
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


/***/ },
/* 2 */
/***/ function(module, exports) {

	Book = function (args) {
	  this.input = document.getElementById(args.inputId);
	  this.areaWindow = document.getElementById(args.areaId);
	  this.playerWindow = document.getElementById(args.playerId);
	  this.inventory = document.getElementById(args.inventory);
	  this.highlighter = document.getElementById(args.highlighter);
	  this.player = args.player;
	};
	
	Book.prototype.init = function () {
	  var input = document.getElementById('main-input');
	  input.onkeydown = function (event) {
	    if (event.keyCode === 13) {
	      this.player.getInput(input.value);
	      input.value = '';
	    }
	  }.bind(this);
	  this.highlighter.onclick = function () {
	    if (this.player.highlightOff) {
	      this.player.highlightOff = false;
	      this.highlighter.className = 'highlighter';
	    } else {
	      this.player.highlightOff = true;
	      this.highlighter.className = 'off';
	    }
	    this.player.lookAround();
	  }.bind(this);
	};
	
	Book.prototype.clearInventory = function () {
	  this.inventory.innerHTML = "";
	};
	
	Book.prototype.displayInventory = function (item) {
	  this.inventory.innerHTML += '<li>'+item.name+'</li>';
	};
	
	Book.prototype.readArea = function (area) {
	  var description = "";
	  description += area.description;
	  for (var x = 0; x < area.contents.length; x++) {
	    description += " " + area.contents[x].description;
	  }
	  if (area.postscript) {
	    description += " " + area.postscript;
	  }
	  description = this.player.highlight(description);
	  this.areaWindow.innerHTML = description;
	};
	
	module.exports = Book;


/***/ },
/* 3 */
/***/ function(module, exports) {

	Player = function (args) {
	  this.book = args.book;
	  this.location = args.worldMap[args.spawnpoint];
	  this.inventory = [];
	  this.highlightOff = false;
	};
	
	Player.prototype.getInput = function (input) {
	  var command = this.parseInput(input);
	};
	
	Player.prototype.parseInput = function (input) {
	  input = input.toLowerCase();
	  var verbs = this.location.verbs;
	  var nouns = this.location.nouns;
	  var verb;
	  var noun;
	  for (x = 0 ; x < this.inventory.length ; x++) {
	    nouns.push(this.inventory[x].name);
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
	    } else if (this.getInventoryNoun(noun)) {
	      noun = this.getInventoryNoun(noun);
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
	
	Player.prototype.getInventoryNoun = function (name) {
	  for (var x = 0 ; x < this.inventory.length ; x++) {
	    if (this.inventory[x].name === name) {
	      return this.inventory[x];
	    }
	  }
	  return false;
	};
	
	Player.prototype.display = function (text) {
	  this.book.playerWindow.innerHTML = this.highlight(text);
	};
	
	Player.prototype.highlight = function (text) {
	  if (this.highlightOff) {
	    return text;
	  }
	  var nouns = this.location.nouns;
	  var verbs = this.location.verbs;
	  for (x = 0 ; x < text.length-1 ; x++) {
	    for (var y = 1 ; y < text.length ; y++) {
	      var output;
	      if (nouns.includes(text.slice(x, y))) {
	        output = text;
	        if (text.slice(x-3, x) !== "<n>") {
	          output = [text.slice(0, x), "<n>", text.slice(x)].join('');
	          output = [output.slice(0, y+3), "</n>", output.slice(y+3)].join('');
	        }
	        text = output;
	      } else if (verbs.includes(text.slice(x, y))) {
	        output = text;
	        if (text.slice(x-3, x) !== "<v>") {
	          output = [text.slice(0, x), "<v>", text.slice(x)].join('');
	          output = [output.slice(0, y+3), "</v>", output.slice(y+3)].join('');
	        }
	        text = output;
	      }
	    }
	  }
	  return text;
	};
	
	Player.prototype.enterArea = function () {
	  this.lookAround();
	};
	
	Player.prototype.lookAround = function () {
	  this.book.readArea(this.location);
	};
	
	Player.prototype.updateInventory = function () {
	  this.book.clearInventory();
	  this.inventory.forEach(function (item) {
	    this.book.displayInventory(item);
	  }.bind(this));
	};
	
	Player.prototype.init = function () {
	  this.book.player = this;
	  this.lookAround();
	};
	
	module.exports = Player;


/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	var Area = __webpack_require__(1);
	var Exit = __webpack_require__(5);
	var Feature = __webpack_require__(6);
	
	var worldMap = {};
	
	worldMap.backroom = __webpack_require__(7);
	worldMap.studio = __webpack_require__(9);
	worldMap.farmhouse = __webpack_require__(10);
	
	module.exports = worldMap;


/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	Exit = function (args) {
	  this.name = args.name;
	  this.checkText = args.checkText;
	  this.destinationName = args.destinationName;
	  this.locked = args.locked;
	  this.lockCheck = args.lockCheck;
	  this.keyName = args.keyName;
	  this.verbs = args.verbs;
	  this.description = args.description;
	};
	
	Exit.prototype["go to"] = function (noun, player) {
	  var worldMap = __webpack_require__(4);
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


/***/ },
/* 6 */
/***/ function(module, exports) {

	Feature = function (args) {
	  this.checkText = args.checkText;
	  this.name = args.name;
	  this.verbs = args.verbs;
	  this.description = args.description;
	};
	
	Feature.prototype["check"] = function (noun, player) {
	  player.display(noun.checkText);
	  if (this.onCheck) {
	    this.onCheck();
	  }
	};
	
	Feature.prototype["@"] = function (noun, player) {
	  this["check"]();
	};
	
	module.exports = Feature;


/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	var Area = __webpack_require__(1);
	var Feature = __webpack_require__(6);
	var Item = __webpack_require__(8);
	var Exit = __webpack_require__(5);
	
	area = new Area ({
	  description: "A cramped back room in an artist's studio. Some pipes line the far wall.",
	  name: 'backroom',
	  worldMap: this,
	  contents: [
	    new Exit ({
	      name: "door",
	      checkText: "A green <n>door</n>. You can <v>go to</v> it to leave the room.",
	      description: "On the wall next to you is a green <n>door</n>.",
	      destinationName: 'studio',
	      verbs: ["check", "go to"],
	    }),
	
	    new Item ({
	      name: "magazine",
	      checkText: "It looks like an old science fiction <n>magazine</n>, but you can't read the language.",
	      description: "On a low table in the corner is a <n>magazine</n>. You can <v>check</v> something to get a description of it (i.e., \"<v>check</v> <n>magazine</n>\").",
	      verbs: ["check"],
	    }),
	
	    new Item ({
	      name: "small key",
	      checkText: "An old key ring with one <n>small key</n> on it. If you want to take it with you you can <v>get</v> it.",
	      description: "There is a <n>small key</n> on the floor.",
	      verbs: ["check", "get"],
	      onGet: function () {
	        this.checkText = "An old key ring with one <n>small key</n> on it.";
	      },
	    }),
	
	  ],
	});
	
	module.exports = area;


/***/ },
/* 8 */
/***/ function(module, exports) {

	Item = function (args) {
	  this.checkText = args.checkText;
	  this.name = args.name;
	  this.verbs = args.verbs;
	  this.description = args.description;
	  this.onGet = args.onGet;
	};
	
	Item.prototype["check"] = function (noun, player) {
	  player.display(noun.checkText);
	};
	
	Item.prototype["use"] = function (noun, player) {
	  player.display(noun.checkText);
	  console.log("Used item.");
	};
	
	Item.prototype["get"] = function (noun, player) {
	  if (!player.inventory.includes(noun)) {
	    var message = (noun.name + "</n>" + " added to your inventory.");
	    var firstLetter = message.slice(0, 1);
	    message = message.slice(1, message.length);
	    message = '<n>' + firstLetter.toUpperCase() + message;
	    player.inventory.push(noun);
	    player.display(message);
	    player.updateInventory();
	    for (var x = 0; x < player.location.contents.length; x++) {
	      if (player.location.contents[x].name === noun.name) {
	        player.location.contents.splice(x, 1);
	        x--;
	      }
	      if (player.location.contents[x].contents) {
	        for (var y = 0; y < player.location.contents[x].contents.length; y++) {
	          if (player.location.contents[x].contents[y].name === noun.name) {
	            player.location.contents[x].contents.splice(y, 1);
	            y--;
	          }
	        }
	      }
	    }
	    if (noun.onGet) {
	      noun.onGet();
	    }
	    player.book.readArea(player.location);
	  } else {
	    player.display("You already have that.");
	  }
	};
	
	Item.prototype["@"] = function (noun, player) {
	  Item.prototype["use"](noun, player);
	};
	
	module.exports = Item;


/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	var Area = __webpack_require__(1);
	var Feature = __webpack_require__(6);
	var Exit = __webpack_require__(5);
	
	var area = new Area ({
	  description: "A painter's studio. Overhead a ceiling fan drifts in steady circles.",
	  name: 'studio',
	  worldMap: this,
	  contents: [
	
	    new Feature ({
	      name: "empty canvas",
	      checkText: "It's a blank white canvas.",
	      description: "A stretched, <n>empty canvas</n> leans against the east wall.",
	      verbs: ["check"],
	    }),
	
	    new Exit ({
	      name: "door",
	      checkText: "A green <n>door</n>. <v>go to</v>?",
	      description: "Beside the empty canvases is a green <n>door</n>.",
	      destinationName: 'backroom',
	      verbs: ["check", "go to"],
	    }),
	
	    new Feature ({
	      name: "window",
	      checkText: "The snow has melted away in the parking lot outside except for where it had already been gathered into piles.",
	      description: "The sun shines through a <n>window</n> opposite, on the west wall.",
	      verbs: ["check"],
	    }),
	
	    new Feature ({
	      name: "painting",
	      checkText: "Strokes of paint streak the canvas, not enough yet for them to unite into any shape with meaning. The colors are dark burning browns and yellows. Acrylic paint.",
	      description: "In front of the window is an unfinished <n>painting</n>.",
	      verbs: ["check"],
	    }),
	
	    new Feature ({
	      name: "locked door",
	      checkText: "It's locked.",
	      description: "There's a <n>locked door</n> on the north wall.",
	      locked: true,
	      lockCheck: "You can't get through the <n>locked door</n>",
	      keyName: "small key",
	      verbs: ["check", "go to"],
	    }),
	
	  ],
	});
	
	module.exports = area;


/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	var Area = __webpack_require__(1);
	var Feature = __webpack_require__(6);
	var Box = __webpack_require__(11);
	var Item = __webpack_require__(8);
	var Exit = __webpack_require__(5);
	
	area = new Area ({
	  description: "A single-room building, about ten yards wide in either direction, with walls made from cinder blocks and roughly applied concrete.",
	  name: 'farmhouse',
	  worldMap: this,
	  contents: [
	    new Feature ({
	      name: "floor",
	      description: "The floor is lined by oak planks made grey with a thin coating of ash.",
	      checkText: "The ash on the floor is soft and feels as if it's still warm. The planks are in disrepair and have large cracks between them and splinters on their upward faces.",
	      verbs: ["check"],
	    }),
	    new Feature ({
	      name: "table",
	      description: "You are lying face-up on a wooden table. If you want to know more about the table, you can check it.",
	      checkText: "The table is made of a smooth, light wood, and is very cool to the touch, almost seeming to radiate cold into the warm humid air of the small concrete building.",
	      verbs: ["check"],
	
	      onCheck: function () {
	        this.desctiption = "There is a wooden table in the middle of the room.";
	      },
	    }),
	    new Feature ({
	      name: "other table",
	      description: "Nearby there is an other table, very similar to the first",
	      checkText: "Like its twin, this one is made of a cool, light, smooth wood. There is a dead man lying face-up on top of it.",
	      verbs: ["check"],
	    }),
	    new Feature ({
	      name: "dead man",
	      description: "A dead man is lying on top of it.",
	      checkText: "The dead man looks like he's in is mid-forties, healthy aside from being dead. His eyes are open, looking up a the ceiling with a placid expression. He's wearing a loose-fitting white dress shirt and pants with pockets in them.",
	      verbs: ["check"],
	    }),
	    new Box ({
	      name: "pockets",
	      description: "",
	      contents: [
	        new Item ({
	          name: "watch",
	          checkText: "It's a wrist watch with a fraying leather band that feels slightly moist and smells like sweat. It's eleven thirty.",
	          description: "a watch",
	          verbs: ["check", "get"],
	        }),
	        new Item ({
	          name: "keys",
	          checkText: "An aluminium ring of keys with a small silver key on it and a larger black car key.",
	          description: "a set of keys",
	          verbs: ["check", "get"],
	        }),
	        new Item ({
	          name: "dollar bill",
	          checkText: "A one dollar bill. If you want to take it with you, you can get it.",
	          description: "a dollar bill",
	          verbs: ["check", "get"],
	        }),
	        new Item ({
	          name: "phone",
	          checkText: "It's a smartphone. It has run out of charge.",
	          description: "a phone",
	          verbs: ["check", "get"],
	        }),
	      ],
	      checkText: "The dead man's pockets contain",
	      verbs: ["check"],
	    }),
	
	    new Exit ({
	      name: "door",
	      checkText: "A green wooden door. You can go to it to leave the building. Outside you can hear insects buzzing in the night.",
	      description: "On the wall next to you is a green door.",
	      destinationName: 'wheatfield',
	      verbs: ["check", "go to"],
	    }),
	  ],
	});
	
	module.exports = area;


/***/ },
/* 11 */
/***/ function(module, exports) {

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


/***/ }
/******/ ]);
//# sourceMappingURL=wendigo.js.map