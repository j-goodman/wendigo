var Area = require('../area.js');
var Feature = require('../feature.js');
var Box = require('../box.js');
var Item = require('../item.js');
var Exit = require('../exit.js');

area = new Area ({
  description: "You're walking east down a dirt road, towards a town in the distance. This is as far as you can go right now.",
  name: 'eastroad',
  worldMap: this,
  contents: [
    new Exit ({
      name: "bridge",
      description: "The bridge is behind you.",
      checkText: "It's the bridge you crossed to get here.",
      destinationName: 'bridge',
      verbs: ["check", "go to"],
    }),
  ],
});

module.exports = area;
