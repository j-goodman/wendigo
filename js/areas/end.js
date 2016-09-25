var Area = require('../area.js');
var Feature = require('../feature.js');
var Box = require('../box.js');
var Item = require('../item.js');
var Exit = require('../exit.js');

area = new Area ({
  description: "A vast empty white space. This is the end of the demo!",
  name: 'end',
  worldMap: this,
  contents: [
    new Exit ({
      name: "door",
      checkText: "A heavy wooden door with a coat of chipped grey paint.",
      description: "The door is behind you.",
      destinationName: 'wheatfield',
      verbs: ["check", "go to"],
    }),
  ],
});

module.exports = area;
