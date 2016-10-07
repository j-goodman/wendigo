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
