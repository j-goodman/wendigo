var Fighter = require('../fighter.js');

var fighter = new Fighter ({
  name: "Kinnuke",
  description: "A large man, Kinnuke, stands facing you, holding a sword.",
  checkText: "A tall man in a long coat holding a sword.",
  verbs: ["check", "fight"],
  stats: {
    hitpoints: 100,
    defense: {
      cut: 2,
      stab: 1,
      crush: 3,
      blast: 0,
    },
    speed: 3, // out of 10
  },
  moves: {
    'cross cut': {
      attack: {
        cut: 14,
        stab: 0,
        crush: 6,
        blast: 0,
      },
      defense: {
        cut: 4,
        stab: 7,
        crush: 2,
        blast: 0,
      },
    },
  },
});

module.exports = fighter;
