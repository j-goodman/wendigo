var Area = require('../area.js');
var Feature = require('../feature.js');
var Box = require('../box.js');
var Item = require('../item.js');
var Exit = require('../exit.js');

area = new Area ({
  description: "A large barren courtyard, walled in by high-piled stones.",
  name: 'wheatfield',
  worldMap: this,
  contents: [
    new Exit ({
      name: "door",
      description: "The door back in to the farmhouse is behind you.",
      checkText: "A green door.",
      destinationName: 'farmhouse',
      verbs: ["check", "go to"],
    }),
  ],
});

module.exports = area;
