var Area = require('./area.js');
var Exit = require('./exit.js');
var Feature = require('./feature.js');

var worldMap = {};

worldMap.backroom = new Area ({
  description: "A cramped back room in an artist's studio. Some pipes line the far wall, on another wall is a <n>green door</n>. There is a set of <n>keys</n> and a <n>magazine</n> on the floor. You can <v>check</v> something to get a description of it (i.e., \"<v>check</v> <n>keys</n>\"). You can also <v>go to</v> the <n>green door</n>.",
  name: 'backroom',
  nouns: ['keys', 'green door', 'magazine'],
  verbs: ['@', 'check', 'go to'],
  worldMap: this,
  exits: [

    new Exit ({
      name: "green door",
      checkText: "A <n>green door</n>. <v>go to</v>?",
      destinationName: 'studio',
      verbs: ["check", "go to"],
    })

  ],
  features: [

    new Feature ({
      name: "magazine",
      checkText: "It's a copy of an old science fiction <n>magazine</n>.",
      verbs: ["check"],
    }),

    new Feature ({
      name: "keys",
      checkText: "A ring with two <n>keys</n> on it.",
      verbs: ["check"],
    }),

  ],
});

worldMap.studio = new Area ({
  description: "A painter's studio. A stretched, <n>empty canvas</n> leans against the east wall, the sun shines through a <n>window</n> opposite, on the west wall. Overhead a ceiling fan drifts in steady circles. In front of the window is an unfinished <n>painting</n>. Beside the empty canvases is a <n>green door</n>. There's a <n>locked door</n> on the north wall.",
  name: 'studio',
  nouns: ['green door', 'painting', 'window', 'empty canvas', 'locked door'],
  verbs: ['@', 'check', 'go to'],
  worldMap: this,
  exits: [

    new Exit ({
      name: "green door",
      checkText: "A <n>green door</n>. <v>go to</v>?",
      destinationName: 'backroom',
      verbs: ["check", "go to"],
    }),

  ],
  features: [

    new Feature ({
      name: "painting",
      checkText: "Strokes of paint streak the canvas, not enough yet for them to unite into any shape with meaning. The colors are dark burning browns and yellows. Acrylic paint.",
      verbs: ["check"],
    }),

    new Feature ({
      name: "empty canvas",
      checkText: "It's a blank white <n>canvas</n>.",
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
      verbs: ["check", "go to"],
    }),

  ],
});

module.exports = worldMap;
