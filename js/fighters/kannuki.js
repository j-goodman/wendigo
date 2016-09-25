var Fighter = require('../fighter.js');

var fighter = new Fighter ({
  name: "Kannuki",
  description: "An old man, Kannuki, stands facing you, holding a sword. He makes no move to attack.",
  checkText: "A tall whitehaired man in a long coat holding a sword. He looks as if he's shrunken with age, but he still stands a head taller than you.",
  verbs: ["check", "attack"],
  hitpoints: 100,
  onFight: function () {
    window.alert('Use the left and right keys to see what moves you know, then use the spacebar to choose.');
    this.onFight = null;
  }.bind(this),
  onDeath: function () {
    this.name = "Kannuki's body";
    this.checkText = "The body of a tall whitehaired man, cut through with red slash wounds.";
    this.description = "Kannuki's body lies crumpled among the dust.";
    this.location.getNouns();
  },
  moves: [
    {
      name: 'cross cut',
      attack: {
        cut: 24,
        stab: 0,
        crush: 0,
        blast: 0,
      },
      defense: {
        cut: 12,
        stab: 3,
        crush: 3,
        blast: 0,
      },
    },
  ],
});

module.exports = fighter;
