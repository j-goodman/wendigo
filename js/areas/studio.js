var Area = require('../area.js');
var Feature = require('../feature.js');
var Item = require('../item.js');
var Exit = require('../exit.js');

var area = new Area ({
  worldMap: this,
  description: "A painter's studio. Overhead a ceiling fan drifts in steady circles.",
  name: 'studio',
  contents: [

    new Feature ({
      name: "empty canvas",
      checkText: "It's a blank white canvas.",
      description: "A stretched, <n>empty canvas</n> leans against the east wall.",
      verbs: ["check"],
    }),

    new Exit ({
      name: "door",
      checkText: "A green <n>door</n>. <v>go to</v>?",
      description: "Beside the empty canvases is a green <n>door</n>.",
      destinationName: 'backroom',
      verbs: ["check", "go to"],
    }),

    new Feature ({
      name: "window",
      checkText: "The snow has melted away in the parking lot outside except for where it had already been gathered into piles.",
      description: "The sun shines through a <n>window</n> opposite, on the west wall.",
      verbs: ["check"],
    }),

    new Feature ({
      name: "painting",
      checkText: "Strokes of paint streak the canvas, not enough yet for them to unite into any shape with meaning. The colors are dark burning browns and yellows. Acrylic paint.",
      description: "In front of the window is an unfinished <n>painting</n>.",
      verbs: ["check"],
    }),

    new Feature ({
      name: "locked door",
      checkText: "It's locked.",
      description: "There's a <n>locked door</n> on the north wall.",
      locked: true,
      lockCheck: "You can't get through the <n>locked door</n>",
      keyName: "small key",
      verbs: ["check", "go to"],
    }),

  ],
});

module.exports = area;
