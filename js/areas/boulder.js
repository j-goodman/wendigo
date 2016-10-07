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
          description: "Checking the horizon over the trees reveals",
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
