var Area = require('../area.js');
var Feature = require('../feature.js');
var Box = require('../box.js');
var Item = require('../item.js');
var Exit = require('../exit.js');

var theDevil = require('../fighters/theDevil');

area = new Area ({
  description: "You step out onto the steel bridge.",
  name: 'bridge',
  worldMap: this,
  contents: [
    new Feature ({
      name: "bridge",
      description: "",
      checkText: "It's a steel truss bridge, with rusted beams meeting overhead in a row of three triangles on each side. It looks like it was once painted green, but that's mostly chipped off.",
      verbs: ["check"],
    }),
    new Exit ({
      name: "east bank",
      description: "From here you can go to the east bank",
      checkText: "The dirt road continues on the other side of the bridge and stretches out through dry prairies towards a town in the distance.",
      destinationName: 'road',
      locked: true,
      lockCheck: "You can't cross the bridge with the Devil in the way.",
      verbs: ["check", "go to"],
    }),
    new Exit ({
      name: "west bank",
      description: "or the west bank.",
      checkText: "That's the side you came from initially. From here it's a long walk back to Snoqualmie Falls.",
      destinationName: 'road',
      verbs: ["check", "go to"],
    }),

    theDevil

  ],
});

module.exports = area;
