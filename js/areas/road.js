var Area = require('../area.js');
var Feature = require('../feature.js');
var Box = require('../box.js');
var Item = require('../item.js');
var Exit = require('../exit.js');

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
