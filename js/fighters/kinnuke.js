var Fighter = require('../fighter.js');

var fighter = new Fighter ({
  name: "old man",
  description: "An old man stands facing you, holding a sword.",
  checkText: "A tall whitehaired man in a long coat holding a sword.",
  verbs: ["check", "attack"],
  hitpoints: 100,
  moves: [
    {
      name: 'cross cut',
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
  ],
});

module.exports = fighter;
