var Area = require('../area.js');
var Feature = require('../feature.js');
var Item = require('../item.js');
var Exit = require('../exit.js');

area = new Area ({
  description: "A cramped back room in an artist's studio. Some pipes line the far wall, on another wall is a green <n>door</n>. There is a <n>small key</n> and a <n>magazine</n> on the floor. You can <v>check</v> something to get a description of it (i.e., \"<v>check</v> <n>magazine</n>\"). You can also <v>go to</v> the green <n>door</n>.",
  name: 'backroom',
  nouns: ['small key', 'door', 'magazine'],
  verbs: ['@', 'check', 'go to', 'get'],
  worldMap: this,
  contents: [
    new Exit ({
      name: "door",
      checkText: "A green <n>door</n>. <v>go to</v>?",
      destinationName: 'studio',
      verbs: ["check", "go to"],
    }),
    new Feature ({
      name: "magazine",
      checkText: "It looks like an old science fiction <n>magazine</n>, but you can't read the language.",
      verbs: ["check"],
    }),

    new Item ({
      name: "small key",
      checkText: "An old key ring with one <n>small key</n> on it.",
      verbs: ["check", "get"],
    }),

  ],
});

module.exports = area;
