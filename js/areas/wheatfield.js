var Area = require('../area.js');
var Feature = require('../feature.js');
var Fighter = require('../fighter.js');
var Box = require('../box.js');
var Item = require('../item.js');
var Exit = require('../exit.js');

var kinnuke = require('../fighters/kinnuke');

area = new Area ({
  description: "A large barren courtyard,",
  name: 'wheatfield',
  worldMap: this,
  contents: [
    new Feature ({
      name: "wall",
      description: "walled in by high-piled stones that shield it from the night wind.",
      checkText: "The high barrier creates a square courtyard with the east wall of the farmhouse as its fourth side. It looks older than the building beside it, made of porous stone flecked with pieces of seashells.",
      verbs: ["check"],
    }),
    new Exit ({
      name: "door",
      description: "The door back in to the farmhouse is behind you.",
      checkText: "A green door. You can use it to go to the farmhouse interior again.",
      destinationName: 'farmhouse',
      verbs: ["check", "go to"],
    }),

    // kinnuke

  ],
});

module.exports = area;
