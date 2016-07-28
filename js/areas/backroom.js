var Area = require('../area.js');
var Feature = require('../feature.js');
var Item = require('../item.js');
var Exit = require('../exit.js');

area = new Area ({
  description: "A cramped back room in an artist's studio. Some pipes line the far wall.",
  name: 'backroom',
  nouns: ['small key', 'door', 'magazine'],
  verbs: ['@', 'check', 'go to', 'get'],
  worldMap: this,
  contents: [
    new Exit ({
      name: "door",
      checkText: "A green <n>door</n>. You can <v>go to</v> <n>door</n> to leave the room.",
      description: "On the wall next to you is a green <n>door</n>.",
      destinationName: 'studio',
      verbs: ["check", "go to"],
    }),

    new Item ({
      name: "magazine",
      checkText: "It looks like an old science fiction <n>magazine</n>, but you can't read the language.",
      description: "On a low table in the corner is a <n>magazine</n>. You can <v>check</v> something to get a description of it (i.e., \"<v>check</v> <n>magazine</n>\").",
      verbs: ["check"],
    }),

    new Item ({
      name: "small key",
      checkText: "An old key ring with one <n>small key</n> on it. If you want to take it with you you can <v>get</v> it.",
      description: "There is a <n>small key</n> on the floor.",
      verbs: ["check", "get"],
      onGet: function () {
        this.checkText = "An old key ring with one <n>small key</n> on it.";
      },
    }),

  ],
});

module.exports = area;
