var Area = require('../area.js');
var Feature = require('../feature.js');
var Box = require('../box.js');
var Item = require('../item.js');
var Exit = require('../exit.js');

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
