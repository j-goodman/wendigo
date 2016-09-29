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
	var Player = __webpack_require__(4);
	var worldMap = __webpack_require__(6);
	
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
	    name: 'Sanjuro',
	    moves: [],
	    hitpoints: 100,
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
	  this.onExit = args.onExit;
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
	  this.contents.forEach(function (feature) {
	    feature.location = this;
	  }.bind(this));
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


/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	var fight_display = __webpack_require__(3);
	
	Book = function (args) {
	  this.input = document.getElementById(args.inputId);
	  this.areaWindow = document.getElementById(args.areaId);
	  this.playerWindow = document.getElementById(args.playerId);
	  this.inventory = document.getElementById(args.inventory);
	  this.highlighter = document.getElementById(args.highlighter);
	  this.player = args.player;
	  this.fightScreen = false;
	  this.fightDisplay = fight_display;
	  this.fightComment = 'vs.';
	};
	
	Book.prototype.init = function () {
	  window.scrollTo(0, 0);
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
	
	Book.prototype.scrollDown = function (scrollDelta, diff) {
	  if (!diff) { diff = 1; }
	  var y = window.pageYOffset;
	  window.scrollTo(0, y+diff);
	  diff += 0.5;
	  if (diff < scrollDelta) {
	    window.setTimeout(function () {
	      this.scrollDown(scrollDelta, diff);
	    }.bind(this), 10);
	  }
	};
	
	Book.prototype.scrollUp = function (scrollDelta, diff) {
	  if (!diff) { diff = 1; }
	  var y = window.pageYOffset;
	  window.scrollTo(0, y-diff);
	  diff += 0.5;
	  if (diff < scrollDelta) {
	    window.setTimeout(function () {
	      this.scrollUp(scrollDelta, diff);
	    }.bind(this), 10);
	  }
	};
	
	Book.prototype.describeFight = function (player, opponent, callback) {
	  player.listMoves();
	  var fight = {
	    player: player,
	    opponent: opponent,
	    playerEnterMove: function (move) {
	      this.printFightMove(move.name);
	    }.bind(this),
	    opponentEnterMove: function (move) {
	      this.printFightMove(move.name);
	    }.bind(this),
	  };
	  this.playerWindow.className = 'fight-window';
	  this.input.blur();
	  this.scrollDown(16);
	  fight.player.currentMove = {
	    index: 0,
	    data: player.moves[0],
	  };
	  this.playerWindow.innerHTML = this.fightDisplay.fighter(player, player.currentMove.data);
	  this.playerWindow.innerHTML += '<br><div>' + this.fightComment + '</div><br>' + this.fightDisplay.fighter(fight.opponent, fight.opponent.currentMove);
	  this.setUpFightControls(fight, callback);
	};
	
	Book.prototype.concludeFight = function () {
	  this.playerWindow.className = 'player-window';
	  this.scrollUp(18);
	  this.playerWindow.innerHTML = '';
	  this.unplugFightControls();
	  this.input.focus();
	  this.readArea(this.player.location);
	};
	
	Book.prototype.setUpFightControls = function (fight, callback) {
	  var slideLeft; var slideRight; var player;
	  player = fight.player;
	  slideLeft = function () {
	    player.currentMove.index -= 1;
	    if (player.currentMove.index < 0) {
	      player.currentMove.index = player.moves.length-1;
	    }
	    player.currentMove.data = player.moves[player.currentMove.index];
	    this.playerWindow.innerHTML = this.fightDisplay.fighter(player, player.currentMove.data);
	    this.playerWindow.innerHTML += '<br><div>' + this.fightComment + '</div><br>' + this.fightDisplay.fighter(fight.opponent, fight.opponent.currentMove);
	  }.bind(this);
	  slideRight = function () {
	    player.currentMove.index += 1;
	    if (player.currentMove.index >= player.moves.length) {
	      player.currentMove.index = 0;
	    }
	    player.currentMove.data = player.moves[player.currentMove.index];
	    this.playerWindow.innerHTML = this.fightDisplay.fighter(player, player.currentMove.data);
	    this.playerWindow.innerHTML += '<br><div>' + this.fightComment + '</div><br>' + this.fightDisplay.fighter(fight.opponent, fight.opponent.currentMove);
	  }.bind(this);
	  window.onkeydown = function (event) {
	    if (event.key == 'ArrowLeft') {
	      slideLeft();
	    }
	    if (event.key == 'ArrowRight') {
	      slideRight();
	    }
	    if (event.key == ' ') {
	      callback();
	    }
	  };
	};
	
	Book.prototype.unplugFightControls = function () {
	  window.onkeydown = null;
	};
	
	Book.prototype.updateFightDisplay = function (player, opponent, comment) {
	  if (comment) {
	    this.fightComment = comment;
	  }
	  this.playerWindow.innerHTML = this.fightDisplay.fighter(player, player.currentMove.data);
	  this.playerWindow.innerHTML += '<br><div>' + this.fightComment + '</div><br>' + this.fightDisplay.fighter(opponent, opponent.currentMove);
	};
	
	Book.prototype.printFightMove = function (move) {
	  this.playerWindow.innerHTML += "\n" + move.name;
	};
	
	Book.prototype.endFight = function () {
	  this.playerWindow.classname = 'player-window';
	};
	
	module.exports = Book;


/***/ },
/* 3 */
/***/ function(module, exports) {

	fight_display = {};
	fight_display.move = function (move) {
	  return ""+
	  "<ul class='move'> "+
	    "<li><span class='move-lefty'>◀</span> "+move.name+" <span class='move-righty'>▶</span></li>"+
	    "<li class='move-stat'>attack:</li> "+
	    "<v class='move-stat'>"+move.attack.crush+"♣ "+move.attack.cut+"♦ "+move.attack.blast+"♥ "+move.attack.stab+"♠"+"</v>"+
	    "<li class='move-stat'>defense:</li>  "+
	    "<n class='move-stat'>"+move.defense.crush+"♣ "+move.defense.cut+"♦ "+move.defense.blast+"♥ "+move.defense.stab+"♠ "+"</n>"+
	  "</ul> "+
	"  "+
	  "<style media='screen'>  "+
	    ".move { "+
	      "position: relative; "+
	      "right: 41px; "+
	      "text-align: center; "+
	      "width: 100%;  "+
	    "} "+
	  "</style>  "+
	"  ";
	};
	fight_display.fighter = function (fighter, move) {
	  return "  "+
	"  "+
	  "<section class='display'> "+
	    "<h1>"+fighter.name+"</h1> "+
	    "<h1 class='healthbar'>"+fighter.hitpointsString()+"</h1> "+
	    "<span>"+fight_display.move(move)+"</span> "+
	  "</section>  "+
	"  "+
	  "<style media='screen'>  "+
	    ".display {  "+
	      "h1, span {  "+
	        "margin: auto; "+
	        "text-align: center; "+
	        "width: 100% "+
	      "} "+
	    "} "+
	  "</style>  "+
	"";
	};
	
	module.exports = fight_display;


/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	var Fighter = __webpack_require__(5);
	
	Player = function (args) {
	  this.name = args.name;
	  this.book = args.book;
	  this.location = args.worldMap[args.spawnpoint];
	  this.moves = args.moves;
	  this.hitpoints = args.hitpoints;
	  this.inventory = [];
	  this.highlightOff = false;
	};
	
	Player.prototype.getInput = function (input) {
	  var command = this.parseInput(input);
	};
	
	Player.prototype.parseInput = function (input) {
	  input = input.toLowerCase();
	  if (input[0] === ' ') {
	    input = input.slice(1, input.length);
	  }
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
	      var exe = verb(noun, this);
	      if (exe) {
	        this.display(exe);
	      }
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
	
	  Player.prototype.startFight = function (target) {
	    var move = this.chooseMove();
	    this.attack(target, move);
	  };
	
	  Player.prototype.getMove = function (attacker, attackerMove) {
	    var move = this.moves[0];
	    this.attack(attacker, move);
	
	    // The player will choose from their list of moves, sometimes getting hints
	    // about their attacker's moves, if they are perceptive (stat).
	  };
	
	  Player.prototype.attack = function (target, move) {
	    target.isAttacked(this, move);
	  };
	
	  Player.prototype.isAttacked = function (opponent, move) {
	    var response = this.chooseMove(move);
	    // The Player can either engage or flee.
	  };
	
	  Player.prototype.haveFightDescribed = function (opponent, callback) {
	    this.book.describeFight(this, opponent, callback);
	  };
	
	  Player.prototype.concludeFight = function () {
	    this.book.concludeFight();
	  };
	
	  Player.prototype.listMoves = function () {
	    this.moves = [
	      {
	        name: 'punch',
	        attack: {
	          cut: 0,
	          stab: 0,
	          crush: 7,
	          blast: 0,
	        },
	        defense: {
	          cut: 0,
	          stab: 0,
	          crush: 1,
	          blast: 0,
	        },
	      },
	    ];
	    for (var ii=0; ii < this.inventory.length; ii++) {
	      if (this.inventory[ii].moves) {
	        this.moves = this.moves.concat(this.inventory[ii].moves);
	      }
	    }
	  };
	
	  Player.prototype.engage = function (opponent, move, response) {
	    var damage = 0;
	    var damageTypes = ['cut', 'stab', 'crush', 'blast'];
	
	    damageTypes.forEach(function (type) {
	      damage += (move.attack[type] - response.defense[type]) < 0 ?
	      0 : (move.attack[type] - response.defense[type]);
	    });
	
	    var dealtDamage = 0;
	    damageTypes.forEach(function (type) {
	      dealtDamage += (response.attack[type] - move.defense[type]) < 0 ?
	      0 : (response.attack[type] - move.defense[type]);
	    });
	
	    this.hitpoints -= damage;
	    var comment = 'You take ' + damage + ' damage and deal ' + dealtDamage + '.';
	    if (this.hitpoints > 0 && opponent.hitpoints > 0) {
	      this.book.updateFightDisplay(this, opponent, comment);
	    }
	  };
	};
	
	Player.prototype.die = function () {
	  window.alert("You've died.");
	  window.scrollTo(0, 0);
	  location.reload();
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
	      if (nouns.includes(text.slice(x, y).toLowerCase())) {
	        output = text;
	        if (text.slice(x-3, x) !== "<n>") {
	          output = [text.slice(0, x), "<n>", text.slice(x)].join('');
	          output = [output.slice(0, y+3), "</n>", output.slice(y+3)].join('');
	        }
	        text = output;
	      } else if (verbs.includes(text.slice(x, y).toLowerCase())) {
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
	
	Player.prototype.hitpointsString = Fighter.prototype.hitpointsString;
	
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
/* 5 */
/***/ function(module, exports) {

	/*jshint sub:true*/
	Fighter = function (args) {
	  this.checkText = args.checkText;
	  this.name = args.name;
	  this.verbs = args.verbs;
	  this.description = args.description;
	  this.hitpoints = args.hitpoints;
	  this.moves = args.moves;
	  this.onFight = args.onFight;
	  this.onDeath = args.onDeath;
	};
	
	Fighter.prototype["check"] = function (noun, player) {
	  player.display(noun.checkText);
	  if (this.onCheck) {
	    this.onCheck();
	  }
	};
	
	Fighter.prototype["attack"] = function (noun, player) {
	  player.getMove(noun);
	};
	
	Fighter.prototype.startFight = function (target) {
	  var move = this.chooseMove();
	  target.isAttacked(this, move);
	};
	
	Fighter.prototype.chooseMove = function (attackerMove) {
	  var move = this.moves[Math.floor(Math.random()*this.moves.length*0.99)];
	  this.currentMove = move;
	  return move;
	  // Move decision logic will be based on data in the Fighter's memory object
	  // about what has been most effective in the past.
	};
	
	Fighter.prototype.hitpointsString = function () {
	  var string = "";
	  for (var x = 0; x < this.hitpoints; x+=3) {
	    string += "█";
	  }
	  if (string.length < this.hitpoints/3) {
	    string += "▌";
	  }
	  return string;
	};
	
	Fighter.prototype.isAttacked = function (opponent, move) {
	  if (this.onFight) {
	    this.onFight();
	  }
	  var response = this.chooseMove(move);
	  // The Fighter will sometimes flee, otherwise they attack
	  if (opponent.haveFightDescribed) {
	    opponent.haveFightDescribed(this, function () {
	      this.engage(opponent, opponent.currentMove.data, response);
	      opponent.engage(this, response, opponent.currentMove.data);
	    }.bind(this));
	  }
	  if (opponent.book) {
	    this.attackInterval = window.setInterval(function () {
	      if (Math.round(Math.random())) {
	        this.chooseMove();
	        opponent.book.updateFightDisplay(opponent, this);
	      }
	    }.bind(this), 750);
	  }
	};
	
	Fighter.prototype.die = function (opponent) {
	  if (this.onDeath) {
	    this.onDeath();
	  }
	  clearInterval(this.attackInterval);
	  opponent.concludeFight();
	  this.engage = null;
	};
	
	Fighter.prototype.engage = function (opponent, move, response) {
	  this.chooseMove();
	  var damage = 0;
	  var damageTypes = ['cut', 'stab', 'crush', 'blast'];
	
	  damageTypes.forEach(function (type) {
	    damage += (move.attack[type] - response.defense[type]) < 0 ?
	    0 : (move.attack[type] - response.defense[type]);
	  });
	  this.hitpoints -= damage;
	  if (this.hitpoints <= 0) {
	    this.die(opponent);
	  }
	  if (opponent.hitpoints <= 0) {
	    opponent.die();
	  }
	};
	
	module.exports = Fighter;


/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	var Area = __webpack_require__(1);
	var Exit = __webpack_require__(7);
	var Feature = __webpack_require__(8);
	
	var worldMap = {};
	
	worldMap.backroom = __webpack_require__(9);
	worldMap.studio = __webpack_require__(11);
	worldMap.farmhouse = __webpack_require__(12);
	worldMap.wheatfield = __webpack_require__(14);
	worldMap.end = __webpack_require__(16);
	
	module.exports = worldMap;


/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

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
	    var worldMap = __webpack_require__(6);
	    player.location = worldMap[noun.destinationName];
	    if (this.onExit) { this.onExit(); }
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
	
	Exit.prototype.getDestination = function () {
	  var worldMap = __webpack_require__(6);
	  return worldMap[this.destinationName];
	};
	
	module.exports = Exit;


/***/ },
/* 8 */
/***/ function(module, exports) {

	Feature = function (args) {
	  this.checkText = args.checkText;
	  this.name = args.name;
	  this.verbs = args.verbs;
	  this.description = args.description;
	  this.onCheck = args.onCheck;
	};
	
	Feature.prototype["check"] = function (noun, player) {
	  player.display(noun.checkText);
	  if (noun.onCheck) { noun.onCheck(); }
	};
	
	Feature.prototype["@"] = function (noun, player) {
	  this["check"]();
	};
	
	module.exports = Feature;


/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	var Area = __webpack_require__(1);
	var Feature = __webpack_require__(8);
	var Item = __webpack_require__(10);
	var Exit = __webpack_require__(7);
	
	area = new Area ({
	  worldMap: this,
	  description: "A cramped back room in an artist's studio. Some pipes line the far wall.",
	  name: 'backroom',
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
/* 10 */
/***/ function(module, exports) {

	Item = function (args) {
	  this.checkText = args.checkText;
	  this.name = args.name;
	  this.verbs = args.verbs;
	  this.description = args.description;
	  this.onGet = args.onGet;
	  this.moves = args.moves;
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
	    if (noun.onGet) { noun.onGet(); }
	    var message = (noun.name + "</n>" + " added to your inventory." + '</br></br>' + noun.checkText);
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
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	var Area = __webpack_require__(1);
	var Feature = __webpack_require__(8);
	var Item = __webpack_require__(10);
	var Exit = __webpack_require__(7);
	
	var area = new Area ({
	  worldMap: this,
	  description: "A painter's studio. Overhead a ceiling fan drifts in steady circles.",
	  name: 'studio',
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
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	var Area = __webpack_require__(1);
	var Feature = __webpack_require__(8);
	var Box = __webpack_require__(13);
	var Item = __webpack_require__(10);
	var Exit = __webpack_require__(7);
	
	area = new Area ({
	  description: "A single-room building, about ten yards wide in either direction,",
	  name: 'farmhouse',
	  worldMap: this,
	  contents: [
	    new Feature ({
	      name: "walls",
	      description: "with walls made from cinder blocks and roughly applied concrete.",
	      checkText: "The blocks in the walls look like they were stacked by hand. They were built with a north window and a south window.",
	      verbs: ["check"],
	    }),
	    new Feature ({
	      name: "floor",
	      description: "The floor is lined by oak planks made grey with a thin coating of ash.",
	      checkText: "The ash on the floor is soft and feels as if it's still warm. The planks are in disrepair and have large cracks between them and splinters on their upward faces.",
	      verbs: ["check"],
	    }),
	    new Feature ({
	      name: "north window",
	      description: "",
	      checkText: "The view beyond the window is blocked by a large sliding shutter made from the same wood as the tables. There is no sunlight coming through, but you can hear the rattle of the cicadas from outside.",
	      verbs: ["check"],
	    }),
	    new Feature ({
	      name: "south window",
	      description: "",
	      checkText: "The view beyond the window is blocked by a large sliding shutter made from the same wood as the tables. You can smell something burning outside.",
	      verbs: ["check"],
	    }),
	    new Feature ({
	      name: "table",
	      description: "You are lying face-up on a wooden table. If you want to know more about the table, you can check it.",
	      checkText: "The table is made of a smooth, light wood, and is very cool to the touch, almost seeming to radiate cold into the warm humid air of the small concrete building.",
	      verbs: ["check"],
	
	      onCheck: function () {
	        this.description = "There is a wooden table in the middle of the room. If you want to know more about the table, you can check it.";
	      },
	    }),
	    new Feature ({
	      name: "other table",
	      description: "Nearby there is another table, the same as the first.",
	      checkText: "Like its twin, this one is made of a cool, light, smooth wood. There is a dead man lying face-up on top of it.",
	      verbs: ["check"],
	    }),
	    new Feature ({
	      name: "dead man",
	      description: "A dead man is lying on top of it.",
	      checkText: "The dead man looks like he's in his mid-forties, healthy aside from being dead. His eyes are open, looking up at the ceiling with a placid expression. He's wearing a loose-fitting white dress shirt and pants with pockets in them.",
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
	          checkText: "An aluminium ring of keys with a small silver key on it and a larger brass key.",
	          description: "a set of keys",
	          verbs: ["check", "get"],
	        }),
	        new Item ({
	          name: "dollar bill",
	          checkText: "A one dollar bill.",
	          description: "a dollar bill",
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
	
	    new Item ({
	      name: "machete",
	      checkText: "A machete. You can get it if you want it.",
	      description: "There is a machete leaning beside it.",
	      moves: [
	        {
	          name: 'forward thrust',
	          attack: {
	            cut: 0,
	            stab: 24,
	            crush: 0,
	            blast: 0,
	          },
	          defense: {
	            cut: 12,
	            stab: 0,
	            crush: 6,
	            blast: 0,
	          },
	        },
	        {
	          name: 'cross cut',
	          attack: {
	            cut: 24,
	            stab: 0,
	            crush: 0,
	            blast: 0,
	          },
	          defense: {
	            cut: 12,
	            stab: 3,
	            crush: 3,
	            blast: 0,
	          },
	        },
	      ],
	      verbs: ["check", "get"],
	
	      onGet: function () {
	        this.checkText = "A machete. It can be used to block as well as to attack, so it will protect you from cutting (<v>♦</v>) and stabbing (<v>♠</v>) damage while inflicting the same.<br><br>When fighting, use the left and right arrows to see your moves and the spacebar to select one.";
	      },
	    }),
	  ],
	});
	
	module.exports = area;


/***/ },
/* 13 */
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


/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	var Area = __webpack_require__(1);
	var Feature = __webpack_require__(8);
	var Fighter = __webpack_require__(5);
	var Box = __webpack_require__(13);
	var Item = __webpack_require__(10);
	var Exit = __webpack_require__(7);
	
	var kannuki = __webpack_require__(15);
	
	area = new Area ({
	  description: "A large barren courtyard,",
	  name: 'wheatfield',
	  worldMap: this,
	  contents: [
	    new Feature ({
	      name: "wall",
	      description: "walled in by high-piled stones that shield it from the night wind.",
	      checkText: "The high barrier creates a square courtyard with the east wall of the farmhouse as its fourth side. It looks older than the building beside it, made of porous stone flecked with pieces of shells.",
	      verbs: ["check"],
	    }),
	    new Exit ({
	      name: "near door",
	      description: "The near door back in to the farmhouse is behind you.",
	      checkText: "A green door. You can use it to go to the farmhouse interior again.",
	      destinationName: 'farmhouse',
	      verbs: ["check", "go to"],
	    }),
	    new Exit ({
	      name: "far door",
	      description: "There's a far door on the other side of the yard.",
	      checkText: "A heavy wooden door with a coat of chipped grey paint.",
	      destinationName: 'end',
	      verbs: ["check", "go to"],
	      locked: true,
	      lockCheck: "Kannuki is blocking the far door. You can't get past him."
	    }),
	
	    kannuki
	
	  ],
	});
	
	kannuki.location = area;
	
	module.exports = area;


/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	var Fighter = __webpack_require__(5);
	
	var fighter = new Fighter ({
	  name: "Kannuki",
	  description: "An old man, Kannuki, stands facing you, guarding the far door and holding a sword. He makes no move to attack.",
	  checkText: "A tall whitehaired man in a long coat holding a sword. He looks as if he's shrunken with age, but he still stands a head taller than you.",
	  verbs: ["check", "attack"],
	  hitpoints: 100,
	  onDeath: function () {
	    this.name = "Kannuki's body";
	    this.checkText = "The body of a tall whitehaired man, run through with wet red gouges.";
	    this.description = "Kannuki's body lies crumpled among the dust.";
	    this.location.getNouns();
	    var door = this.location.getNoun('far door');
	    door.locked = false;
	    this["attack"] = this["check"];
	    var table = this.location.getNoun('near door').getDestination().getNoun('other table');
	    var corpse = this.location.getNoun('near door').getDestination().getNoun('dead man');
	    table.checkText = 'Like its twin, this one is made of a cool, light, smooth wood.';
	    corpse.name = '';
	    corpse.description = '';
	
	  },
	  moves: [
	    {
	      name: 'cross cut',
	      attack: {
	        cut: 24,
	        stab: 0,
	        crush: 0,
	        blast: 0,
	      },
	      defense: {
	        cut: 12,
	        stab: 3,
	        crush: 3,
	        blast: 0,
	      },
	    },
	    {
	      name: 'upper cut',
	      attack: {
	        cut: 28,
	        stab: 0,
	        crush: 0,
	        blast: 0,
	      },
	      defense: {
	        cut: 8,
	        stab: 3,
	        crush: 0,
	        blast: 0,
	      },
	    },
	  ],
	});
	
	module.exports = fighter;


/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	var Area = __webpack_require__(1);
	var Feature = __webpack_require__(8);
	var Box = __webpack_require__(13);
	var Item = __webpack_require__(10);
	var Exit = __webpack_require__(7);
	
	area = new Area ({
	  description: "A vast empty white space stretching outward into boundless infinity. This is the end of the demo,",
	  name: 'end',
	  worldMap: this,
	  contents: [
	    new Exit ({
	      name: "door",
	      checkText: "A heavy wooden door with a coat of chipped grey paint.",
	      description: "the door's behind you.",
	      destinationName: 'wheatfield',
	      verbs: ["check", "go to"],
	    }),
	  ],
	});
	
	module.exports = area;


/***/ }
/******/ ]);
//# sourceMappingURL=wendigo.js.map