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
	    name: 'Swift Runner',
	    moves: [],
	    hitpoints: 100,
	    spawnpoint: 'road',
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
	  this.onEnter = args.onEnter;
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
	  this.location.player = this;
	};
	
	Player.prototype.readArea = function (area) {
	  this.book.readArea(area);
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
	
	// worldMap.backroom = require('./areas/backroom.js');
	// worldMap.studio = require('./areas/studio.js');
	// worldMap.farmhouse = require('./areas/farmhouse.js');
	// worldMap.wheatfield = require('./areas/wheatfield.js');
	// worldMap.end = require('./areas/end.js');
	worldMap.road = __webpack_require__(9);
	worldMap.bridge = __webpack_require__(12);
	worldMap.woods = __webpack_require__(14);
	worldMap.bog = __webpack_require__(15);
	worldMap.clearing = __webpack_require__(16);
	worldMap.boulder = __webpack_require__(17);
	
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
	    if (player.location.onEnter) { player.location.onEnter(); }
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
	var Box = __webpack_require__(10);
	var Item = __webpack_require__(11);
	var Exit = __webpack_require__(7);
	
	area = new Area ({
	  description: "You're walking east down a dirt road.",
	  name: 'road',
	  worldMap: this,
	  onExit: function () {
	    this.description = "";
	  },
	  contents: [
	    new Exit ({
	      name: "trees",
	      description: "You can hear cicadas rattling in the trees surrounding you",
	      checkText: "The trees are growing smaller and farther apart here in the higher altitudes of the plateau. Past the river ahead of you they seem to die out entirely except for the dry shrubby acacias.",
	      destinationName: 'woods',
	      verbs: ["check"],
	    }),
	    new Feature ({
	      name: "river",
	      description: "",
	      checkText: "The river runs north to south, across the road you're walking. It's too deep to ford.",
	      verbs: ["check"],
	    }),
	    new Exit ({
	      name: "bridge",
	      description: "and you can smell the residue from the paper mill that's upstream on the river that flows under the bridge you're approaching. You've never heard or smelled either of those things before and you assume they're associated somehow. You can check the bridge to look closer at it.",
	      checkText: "You can go to the bridge if you want to cross the river. On the other side the dirt road stretches out through dry prairies towards a town that you can just make out through the dust in the distance.",
	      destinationName: 'bridge',
	      verbs: ["check", "go to"],
	    }),
	    new Item ({
	      name: "dead snake",
	      checkText: "It's a dull-scaled twenty inch snake, red with streaks of black. It looks about a day dead.",
	      description: "There's a dead snake in the road. You could get it if you wanted it.",
	      verbs: ["check", "get"],
	    }),
	  ],
	});
	
	module.exports = area;


/***/ },
/* 10 */
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
/* 11 */
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
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	var Area = __webpack_require__(1);
	var Feature = __webpack_require__(8);
	var Box = __webpack_require__(10);
	var Item = __webpack_require__(11);
	var Exit = __webpack_require__(7);
	
	var theDevil = __webpack_require__(13);
	
	area = new Area ({
	  description: "You step out onto the steel bridge.",
	  name: 'bridge',
	  worldMap: this,
	  onExit: function () {
	    console.log('exit.');
	    var east; var west;
	    east = this.getNoun('east bank');
	    west = this.getNoun('west bank');
	    east.description = "From here you can go to the east bank";
	    west.description = "or the west bank.";
	  },
	  contents: [
	    new Feature ({
	      name: "bridge",
	      description: "",
	      checkText: "It's a steel truss bridge, with rusted beams meeting overhead in a row of three triangles on each side. It looks like it was once painted green, but that's mostly chipped off.",
	      verbs: ["check"],
	    }),
	    new Feature ({
	      name: "river",
	      description: "",
	      checkText: "The river runs fast and loudly some fifteen yards under your feet.",
	      verbs: ["check"],
	    }),
	    new Exit ({
	      name: "west bank",
	      description: "From here you can return back the way you came to the west bank,",
	      checkText: "That's the side you came from initially. From here it's a long walk back to Snoqualmie Falls.",
	      destinationName: 'road',
	      verbs: ["check", "go to"],
	    }),
	    new Exit ({
	      name: "east bank",
	      description: "or go to the east bank.",
	      checkText: "The dirt road continues on the other side of the bridge and stretches out through dry prairies towards a town in the distance.",
	      destinationName: 'road',
	      locked: true,
	      lockCheck: "You can't cross the bridge with the Devil in the way.",
	      verbs: ["check", "go to"],
	    }),
	
	    theDevil
	
	  ],
	});
	
	module.exports = area;


/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	var Fighter = __webpack_require__(5);
	
	var fighter = new Fighter ({
	  name: "the Devil",
	  description: "The bridge is guarded by a tall man wearing a red horned mask of the Devil's face.",
	  checkText: "He's wearing a smiling red painted mask with horns, yellow eyes, and a beard that looks like it's made of black steel wool. It's tied around the back of his head with a string. He's holding a white steel sword and facing you. He makes no move to attack you.",
	  verbs: ["check", "attack"],
	  hitpoints: 100,
	  onDeath: function () {
	    this.checkText = "";
	    this.description = "";
	    this.location.player.readArea(this.location);
	    window.setTimeout(function () {
	      this.description = "The Devil staggers backward, silent and blood striped, and careens off the bridge down into the river below.";
	      this.location.player.readArea(this.location);
	    }.bind(this), 1200);
	    window.setTimeout(function () {
	      this.description = "The Devil's body disappears into the water.";
	      this.location.player.readArea(this.location);
	    }.bind(this), 5500);
	    window.setTimeout(function () {
	      this.name = "~~";
	      this.description = "";
	      this.location.player.readArea(this.location);
	    }.bind(this), 8500);
	    this.location.getNouns();
	    var door = this.location.getNoun('east bank');
	    door.locked = false;
	  },
	  moves: [
	    {
	      name: 'cross cut',
	      attack: {
	        cut: 20,
	        stab: 0,
	        crush: 0,
	        blast: 0,
	      },
	      defense: {
	        cut: 8,
	        stab: 1,
	        crush: 0,
	        blast: 0,
	      },
	    },
	    {
	      name: 'upper cut',
	      attack: {
	        cut: 24,
	        stab: 0,
	        crush: 0,
	        blast: 0,
	      },
	      defense: {
	        cut: 4,
	        stab: 1,
	        crush: 0,
	        blast: 0,
	      },
	    },
	  ],
	});
	
	module.exports = fighter;


/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	var Area = __webpack_require__(1);
	var Feature = __webpack_require__(8);
	var Box = __webpack_require__(10);
	var Item = __webpack_require__(11);
	var Exit = __webpack_require__(7);
	
	area = new Area ({
	  description: "You walk off into the sparse woods surrounding",
	  name: 'woods',
	  worldMap: this,
	  contents: [
	    new Exit ({
	      name: "road",
	      description: "the east-west road.",
	      checkText: "It's the road you arrived by.",
	      destinationName: 'road',
	      verbs: ["check", "go to"],
	    }),
	    new Feature ({
	      name: "trees",
	      description: "Most of the trees are around your height, with ferns and grass gathering up around their bases.",
	      checkText: "Most of them are the hemlocks, oaks and aspens you've been seeing for the past few days as you walked south, but spread around them are a few out of place acacias.",
	      verbs: ["check"],
	    }),
	    new Exit ({
	      name: "clearing",
	      description: "You can see a clearing up ahead to your right,",
	      checkText: "It's a bare spot between the trees up ahead and to the right.",
	      destinationName: 'clearing',
	      verbs: ["check", "go to"],
	    }),
	    new Exit ({
	      name: "bog",
	      description: "and to the left you can smell the damp rot of a nearby bog.",
	      checkText: "You can't see the bog from here, but you can smell it. You could go to it for a closer look.",
	      destinationName: 'bog',
	      verbs: ["check", "go to"],
	    }),
	  ],
	});
	
	module.exports = area;


/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	var Area = __webpack_require__(1);
	var Feature = __webpack_require__(8);
	var Box = __webpack_require__(10);
	var Item = __webpack_require__(11);
	var Exit = __webpack_require__(7);
	
	area = new Area ({
	  description: "The bog is a dark, sunken spot among the trees, a muddy pool with some dead leaves floating in it.",
	  name: 'bog',
	  worldMap: this,
	  contents: [
	    new Exit ({
	      name: "trees",
	      description: "The trees around you look like their roots are becoming choked with rot.",
	      checkText: "You can go back into the trees to try to find the road again.",
	      destinationName: 'woods',
	      verbs: ["check", "go to"],
	    }),
	    new Exit ({
	      name: "boulder",
	      description: "You can see a tall boulder nearby.",
	      checkText: "It's a tall grey boulder about fifteen yards away.",
	      destinationName: 'boulder',
	      verbs: ["check", "go to"],
	    }),
	  ],
	});
	
	module.exports = area;


/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	var Area = __webpack_require__(1);
	var Feature = __webpack_require__(8);
	var Box = __webpack_require__(10);
	var Item = __webpack_require__(11);
	var Exit = __webpack_require__(7);
	
	area = new Area ({
	  description: "You come into a clearing where the ground under your feet is cold grey rock. You can hear the trees around you moving with the wind.",
	  name: 'clearing',
	  worldMap: this,
	  contents: [
	    new Exit ({
	      name: "boulder",
	      description: "There's a boulder twenty yards or so ahead of you.",
	      checkText: "It's a tall grey boulder among the trees. You can go to it to see if there's anything behind it.",
	      destinationName: 'boulder',
	      verbs: ["check", "go to"],
	    }),
	    new Exit ({
	      name: "trees",
	      description: "The trees are becoming thicker around you.",
	      checkText: "You can go back into the trees to try to find the road again.",
	      destinationName: 'woods',
	      verbs: ["check", "go to"],
	    }),
	    new Box ({
	      name: "log",
	      description: "There's a hollowed out log leaning against a tree at the edge of the clearing.",
	      contents: [
	        new Item ({
	          name: "key",
	          checkText: "It's a small key on a ring of wire. You can get it if you want it.",
	          description: "a nickel silver key",
	          verbs: ["check", "get"],
	          onGet: function () {
	            this.checkText = "It's a nickel silver key on a ring of wire.";
	          },
	        }),
	        // * ALSO: An angry raccoon that fights you and you have to punch it to death
	        new Item ({
	          name: "machete",
	          checkText: "It's a machete with a plain wood handle. It looks very sharp.",
	          description: "a machete",
	          moves: [
	            {
	              name: 'forward thrust',
	              attack: {
	                cut: 0,
	                stab: 16,
	                crush: 0,
	                blast: 0,
	              },
	              defense: {
	                cut: 8,
	                stab: 0,
	                crush: 0,
	                blast: 0,
	              },
	            },
	            {
	              name: 'cross cut',
	              attack: {
	                cut: 16,
	                stab: 0,
	                crush: 0,
	                blast: 0,
	              },
	              defense: {
	                cut: 6,
	                stab: 2,
	                crush: 0,
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
	      checkText: "The log looks like it was deliberately carved out. It contains",
	      verbs: ["check"],
	    }),
	  ],
	});
	
	module.exports = area;


/***/ },
/* 17 */
/***/ function(module, exports, __webpack_require__) {

	var Area = __webpack_require__(1);
	var Feature = __webpack_require__(8);
	var Box = __webpack_require__(10);
	var Item = __webpack_require__(11);
	var Exit = __webpack_require__(7);
	
	area = new Area ({
	  description: "",
	  name: '',
	  worldMap: this,
	  contents: [
	    new Feature ({
	      name: "dirt",
	      description: "",
	      checkText: "It's got an almost sandy texture. It doesn't look like anything should be able to grow in this.",
	      verbs: ["check", "climb"],
	    }),
	    new Exit ({
	      name: "bog",
	      description: "You can see the bog",
	      checkText: "It's a muddy bog nearby. The water doesn't seem to reflect any light at all.",
	      destinationName: 'bog',
	      verbs: ["check", "go to"],
	    }),
	    new Exit ({
	      name: "clearing",
	      description: "and the clearing from here.<br><br>",
	      checkText: "It's a clearing between the treas up ahead.",
	      destinationName: 'clearing',
	      verbs: ["check", "go to"],
	    }),
	    new Feature ({
	      name: "boulder",
	      description: "Between them is a grey boulder about twice your height. It's too steep to climb and there's nothing behind it.",
	      checkText: "The boulder is made of grey rock with five or six long streaks of lighter grey going across it diagonally.",
	      verbs: ["check", "climb"],
	    }),
	  ],
	});
	
	area.onEnter = function () {
	  this.getNoun('boulder').description = "It's a grey boulder about twice your height. It's too steep to climb and there's nothing behind it.";
	  this.contents = this.contents.slice(0, 4);
	  this.progress = false;
	}.bind(area);
	
	area.getNoun('boulder').climb = function () {
	  var dice = Math.random();
	  if (!this.progress) {
	    if (dice < 0.3) {
	      this.description = "You make it halfway up the boulder, then slip and fall back into the dry dirt.";
	    } else if (dice < 0.6) {
	      this.description = "You manage to grab a handhold two thirds up the rock, but you can't find a place to put your feet and you fall.";
	    } else {
	      this.description = "You get a grip in a crack two thirds up the face of the rock and find a small raised jut to put your right foot on. You can climb the boulder to the top from here.";
	      this.progress = 'halfway';
	    }
	  } else if (this.progress === 'halfway') {
	    if (dice < 0.2) {
	      this.description = "Your foot slips as you prepare to reach for the top of the boulder, sending you tumbling backwards into the dirt.";
	      this.progress = false;
	    } else if (dice < 0.5) {
	      this.description = "You can't get a grip on the top of the rock, and you fall back down it.";
	      this.progress = false;
	    } else {
	      this.progress = 'top';
	      this.description = "You reach the top of the boulder.";
	      this.location.contents.push(
	        new Feature ({
	          name: "trees",
	          description: "Over the trees you can see",
	          checkText: "The trees are growing thick and fast around the boulder and the bog, but seem to thin out on the other side of the river. In fact, beyond the river you can only see the strange scraggled acacias that have started to surround you in the past few miles of your journey.",
	          verbs: ["check"],
	        })
	      );
	      this.location.contents.push(
	        new Feature ({
	          name: "road",
	          description: "the road you came from,",
	          checkText: "It's a long dirt road extending far into the west, and leading over the bridge to a town in the east.",
	          verbs: ["check"],
	        })
	      );
	      this.location.contents.push(
	        new Feature ({
	          name: "river",
	          description: "as well as the river",
	          checkText: "The river is a deep blue streak from north to south across the landscape.",
	          verbs: ["check"],
	        })
	      );
	      this.location.contents.push(
	        new Feature ({
	          name: "bridge",
	          description: "and the steel beam bridge beyond it.",
	          checkText: "It's a rusting steel truss bridge. There's a man standing on it, wearing a red mask and holding something. He looks like he's guarding it.",
	          verbs: ["check"],
	        })
	      );
	    }
	  }
	  this.location.getNouns();
	  this.location.player.readArea(this.location);
	}.bind(area.getNoun('boulder'));
	
	module.exports = area;


/***/ }
/******/ ]);
//# sourceMappingURL=wendigo.js.map