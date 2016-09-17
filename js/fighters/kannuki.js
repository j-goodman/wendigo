var Fighter = require('../fighter.js');

var fighter = new Fighter ({
  name: "Kannuki",
  description: "An old man, Kannuki, stands facing you, holding a sword.",
  checkText: "A tall whitehaired man in a long coat holding a sword. He looks as if he's shrunken with age, but he still stands a head taller than you.",
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
