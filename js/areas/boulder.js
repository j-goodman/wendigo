var Area = require('../area.js');
var Feature = require('../feature.js');
var Box = require('../box.js');
var Item = require('../item.js');
var Exit = require('../exit.js');

area = new Area ({
  description: "",
  name: '',
  worldMap: this,
  contents: [
    new Feature ({
      name: "boulder",
      description: "It's a grey boulder about twice your height. It's too steep to climb and there's nothing behind it.",
      checkText: "The boulder is made of grey rock with five or six long streaks of lighter grey going across it diagonally.",
      verbs: ["check", "climb"],
    }),
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
      description: "and the clearing from here.",
      checkText: "It's a clearing between the treas up ahead.",
      destinationName: 'clearing',
      verbs: ["check", "go to"],
    }),

  ],
});

area.contents[0].level = 0;
area.contents[0].reset = function () {
  this.description = "It's a grey boulder about twice your height. It's too steep to climb and there's nothing behind it.";
  this.location.player.readArea(this.location);
}.bind(area.contents[0]);
area.contents[0].fall = function () {
  this.description = "You lose your grip on the rock and fall back into the dirt.";
  this.location.player.readArea(this.location);
  window.setTimeout(function () {
    this.reset();
  }.bind(this), 3500);
}.bind(area.contents[0]);
area.contents[0].climb = function () {
  var dice;
  var rando = function (max_inclusive) {
    return Math.floor(Math.random()*max_inclusive)+1;
  };
  if (this.level === 0) {
    dice = rando(6)+rando(6);
    if (dice < 5) {
      this.description = "You jump up onto the boulder, trying to climb to a spot eight or nine feet up where the stone slopes forward. You're not able to get a grip on it and you fall back into the dry dirt.";
      window.clearTimeout(this.clock2);
      this.clock2 = window.setTimeout(function () {
        this.reset();
      }.bind(this), 6000);
    } else if (dice < 9) {
      this.description = "You jump up onto the boulder, trying to climb to a spot where the stone slopes forward. You get a grip on the ledge with your right hand but when your foot swings forward it doesn't find purchase below you. You slide off the boulder.";
      window.clearTimeout(this.clock2);
      this.clock2 = window.setTimeout(function () {
        this.reset();
      }.bind(this), 6000);
    } else {
      this.description = "You manage to grab an angle about eight feet off the ground, and find a foothold in the boulder's face below you. You can try to climb to the top from here.";
      this.level = 1;
      this.clock = window.setTimeout(function () {
        this.fall();
        this.level = 0;
      }.bind(this), 5500);
    }
  } else if (this.level === 1) {
    dice = rando(6)+rando(6);
    if (dice < 8) {
      this.description = "You lose your footing and you fall back into the dry dirt.";
      window.clearTimeout(this.clock);
      window.clearTimeout(this.clock2);
      this.clock2 = window.setTimeout(function () {
        this.reset();
      }.bind(this), 6000);
    } else if (dice < 9) {
      this.description = "You make it to the top of the boulder but accidentally bring yourself up with too much momentum, losing your balance and rolling back down into the dirt.";
      window.clearTimeout(this.clock);
      window.clearTimeout(this.clock2);
      this.clock2 = window.setTimeout(function () {
        this.reset();
      }.bind(this), 6000);
    } else {
      this.description = "You reach the top of the boulder. From here you can see the clearing and the bog, as well as the road beyond them through the trees and the river flowing from north to south.";
      this.level = 2;
      window.clearTimeout(this.clock);
      this.clock = window.setTimeout(function () {
        this.fall();
        this.level = 0;
      }.bind(this), 20000);
    }
  }
  this.location.player.readArea(this.location);
  // Gives you a 50/50 chance of being able to climb the boulder and see farther of falling down and maybe hurting yourself.
}.bind(area.contents[0]);

module.exports = area;
