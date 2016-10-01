var Area = require('../area.js');
var Feature = require('../feature.js');
var Box = require('../box.js');
var Item = require('../item.js');
var Exit = require('../exit.js');

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
