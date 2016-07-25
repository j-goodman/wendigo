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
	      // highlightId: 'highlight-input',
	      inventory: 'inventory',
	    }),
	    spawnpoint: 'backroom',
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


/***/ },
/* 2 */
/***/ function(module, exports) {

	Book = function (args) {
	  this.input = document.getElementById(args.inputId);
	  this.areaWindow = document.getElementById(args.areaId);
	  this.playerWindow = document.getElementById(args.playerId);
	  // this.highlightedInput = document.getElementById(args.highlightId);
	  this.inventory = document.getElementById(args.inventory);
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
	  input.onkeyup = function (event) {
	    input.value = this.player.highlight(input.value);
	  }.bind(this);
	};
	
	Book.prototype.clearInventory = function () {
	  this.inventory.innerHTML = "";
	};
	
	Book.prototype.displayInventory = function (item) {
	  this.inventory.innerHTML += '<li>'+item.name+'</li>';
	};
	
	Book.prototype.readArea = function (area) {
	  this.areaWindow.innerHTML = area.description;
	};
	
	Book.prototype.readCheck = function (object) {
	  this.playerWindow.value = object.check;
	};
	
	module.exports = Book;


/***/ },
/* 3 */
/***/ function(module, exports) {

	Player = function (args) {
	  this.book = args.book;
	  this.location = args.worldMap[args.spawnpoint];
	  this.inventory = [];
	};
	
	Player.prototype.getInput = function (input) {
	  var command = this.parseInput(input);
	};
	
	Player.prototype.parseInput = function (input) {
	  var verbs = [];
	  var nouns = [];
	  var verb;
	  var noun;
	  for (var x = 0 ; x < this.location.contents.length ; x++) {
	    nouns.push(this.location.contents[x].name);
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
	
	// Player.prototype.highlight = function (text) {
	//   this.book.highlightedInput.innerHTML = text;
	//   var nouns = this.location.nouns;
	//   var verbs = this.location.verbs;
	//   for (x = 0 ; x < text.length-1 ; x++) {
	//     for (var y = 1 ; y < text.length ; y++) {
	//       var output;
	//       if (nouns.includes(text.slice(x, y))) {
	//         output = text;
	//         if (text.slice(x-3, x) !== "<n>") {
	//           output = [text.slice(0, x), "<n>", text.slice(x)].join('');
	//           output = [output.slice(0, y+3), "</n>", output.slice(y+3)].join('');
	//         }
	//         this.book.highlightedInput.innerHTLM = output;
	//         return output;
	//       } else if (verbs.includes(text.slice(x, y))) {
	//         output = text;
	//         if (text.slice(x-3, x) !== "<v>") {
	//           output = [text.slice(0, x), "<v>", text.slice(x)].join('');
	//           output = [output.slice(0, y+3), "</v>", output.slice(y+3)].join('');
	//         }
	//         this.book.highlightedInput.innerHTLM = output;
	//         return output;
	//
	//       }
	//     }
	//   }
	//   return text;
	// };
	
	Player.prototype.enterArea = function () {
	  this.lookAround();
	};
	
	Player.prototype.lookAround = function () {
	  this.book.readArea(this.location);
	};
	
	Player.prototype.updateInventory = function () {
	  this.book.clearInventory();
	  console.log("Updating inventory.");
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
	worldMap.studio = __webpack_require__(8);
	
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
	};
	
	Feature.prototype["check"] = function (noun, player) {
	  player.display(noun.checkText);
	};
	
	Feature.prototype["@"] = function (noun, player) {
	  Feature.prototype["check"](noun, player);
	};
	
	module.exports = Feature;


/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	var Area = __webpack_require__(1);
	var Feature = __webpack_require__(6);
	var Item = __webpack_require__(9);
	var Exit = __webpack_require__(5);
	
	area = new Area ({
	  description: "A cramped back room in an artist's studio. Some pipes line the far wall, on another wall is a green <n>door</n>. There is a <n>small key</n> and a <n>magazine</n> on the floor. You can <v>check</v> something to get a description of it (i.e., \"<v>check</v> <n>magazine</n>\"). You can also <v>go to</v> the green <n>door</n>.",
	  name: 'backroom',
	  nouns: ['small key', 'door', 'magazine'],
	  verbs: ['@', 'check', 'go to', 'get'],
	  worldMap: this,
	  contents: [
	    new Exit ({
	      name: "door",
	      checkText: "A green <n>door</n>. <v>go to</v>?",
	      destinationName: 'studio',
	      verbs: ["check", "go to"],
	    }),
	    new Feature ({
	      name: "magazine",
	      checkText: "It looks like an old science fiction <n>magazine</n>, but you can't read the language.",
	      verbs: ["check"],
	    }),
	
	    new Item ({
	      name: "small key",
	      checkText: "An old key ring with one <n>small key</n> on it. If you want to take it with you you can <v>get</v> it.",
	      verbs: ["check", "get"],
	    }),
	
	  ],
	});
	
	module.exports = area;


/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	var Area = __webpack_require__(1);
	var Feature = __webpack_require__(6);
	var Exit = __webpack_require__(5);
	
	var area = new Area ({
	  description: "A painter's studio. A stretched, <n>empty canvas</n> leans against the east wall, the sun shines through a <n>window</n> opposite, on the west wall. Overhead a ceiling fan drifts in steady circles. In front of the window is an unfinished <n>painting</n>. Beside the empty canvases is a green <n>door</n>. There's a <n>locked door</n> on the north wall.",
	  name: 'studio',
	  nouns: ['door', 'painting', 'window', 'empty canvas', 'locked door'],
	  verbs: ['@', 'check', 'go to'],
	  worldMap: this,
	  contents: [
	
	    new Exit ({
	      name: "door",
	      checkText: "A green <n>door</n>. <v>go to</v>?",
	      destinationName: 'backroom',
	      verbs: ["check", "go to"],
	    }),
	
	    new Feature ({
	      name: "painting",
	      checkText: "Strokes of paint streak the canvas, not enough yet for them to unite into any shape with meaning. The colors are dark burning browns and yellows. Acrylic paint.",
	      verbs: ["check"],
	    }),
	
	    new Feature ({
	      name: "empty canvas",
	      checkText: "It's a blank white canvas.",
	      verbs: ["check"],
	    }),
	
	    new Feature ({
	      name: "window",
	      checkText: "The snow has melted away in the parking lot outside except for where it had already been gathered into piles.",
	      verbs: ["check"],
	    }),
	
	    new Feature ({
	      name: "locked door",
	      checkText: "It's locked.",
	      locked: true,
	      lockCheck: "You can't get through the <n>locked door</n>",
	      keyName: "small key",
	      verbs: ["check", "go to"],
	    }),
	
	  ],
	});
	
	module.exports = area;


/***/ },
/* 9 */
/***/ function(module, exports) {

	Item = function (args) {
	  this.checkText = args.checkText;
	  this.name = args.name;
	  this.verbs = args.verbs;
	};
	
	Item.prototype["check"] = function (noun, player) {
	  player.display(noun.checkText);
	};
	
	Item.prototype["use"] = function (noun, player) {
	  player.display(noun.checkText);
	  console.log("Used item.");
	};
	
	Item.prototype["get"] = function (noun, player) {
	  player.display(noun.checkText);
	  player.inventory.push(noun);
	  player.updateInventory();
	  // remove self from area
	};
	
	Item.prototype["@"] = function (noun, player) {
	  Item.prototype["use"](noun, player);
	};
	
	module.exports = Item;


/***/ }
/******/ ]);
//# sourceMappingURL=bundle.js.map