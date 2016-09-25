var Area = require('../area.js');
var Feature = require('../feature.js');
var Fighter = require('../fighter.js');
var Box = require('../box.js');
var Item = require('../item.js');
var Exit = require('../exit.js');

var kannuki = require('../fighters/kannuki');

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
      description: "The green door back in to the farmhouse is behind you.",
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
