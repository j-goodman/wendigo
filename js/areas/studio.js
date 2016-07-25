var Area = require('../area.js');
var Feature = require('../feature.js');
var Exit = require('../exit.js');

var area = new Area ({
  description: "A painter's studio. A stretched, <n>empty canvas</n> leans against the east wall, the sun shines through a <n>window</n> opposite, on the west wall. Overhead a ceiling fan drifts in steady circles. In front of the window is an unfinished <n>painting</n>. Beside the empty canvases is a green <n>door</n>. There's a <n>locked door</n> on the north wall.",
  name: 'studio',
  nouns: ['door', 'painting', 'window', 'empty canvas', 'locked door'],
  verbs: ['@', 'check', 'go to'],
  worldMap: this,
  contents: [

    new Exit ({
      name: "door",
      checkText: "A green <n>door</n>. <v>go to</v>?",
      destinationName: 'backroom',
      verbs: ["check", "go to"],
    }),

    new Feature ({
      name: "painting",
      checkText: "Strokes of paint streak the canvas, not enough yet for them to unite into any shape with meaning. The colors are dark burning browns and yellows. Acrylic paint.",
      verbs: ["check"],
    }),

    new Feature ({
      name: "empty canvas",
      checkText: "It's a blank white canvas.",
      verbs: ["check"],
    }),

    new Feature ({
      name: "window",
      checkText: "The snow has melted away in the parking lot outside except for where it had already been gathered into piles.",
      verbs: ["check"],
    }),

    new Feature ({
      name: "locked door",
      checkText: "It's locked.",
      locked: true,
      lockCheck: "You can't get through the <n>locked door</n>",
      keyName: "small key",
      verbs: ["check", "go to"],
    }),

  ],
});

module.exports = area;
