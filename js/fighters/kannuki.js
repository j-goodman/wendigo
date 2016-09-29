var Fighter = require('../fighter.js');

var fighter = new Fighter ({
  name: "Kannuki",
  description: "An old man, Kannuki, stands facing you, guarding the far door and holding a sword. He makes no move to attack.",
  checkText: "A tall whitehaired man in a long coat holding a sword. He looks as if he's shrunken with age, but he still stands a head taller than you.",
  verbs: ["check", "attack"],
  hitpoints: 100,
  onDeath: function () {
    this.name = "Kannuki's body";
    this.checkText = "The body of a tall whitehaired man, run through with wet red gouges.";
    this.description = "Kannuki's body lies crumpled among the dust.";
    this.location.getNouns();
    var door = this.location.getNoun('far door');
    door.locked = false;
    var table = this.location.getNoun('near door').getDestination().getNoun('other table');
    var corpse = this.location.getNoun('near door').getDestination().getNoun('dead man');
    table.checkText = 'Like its twin, this one is made of a cool, light, smooth wood.';
    corpse.name = '';
    corpse.description = '';

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
    {
      name: 'upper cut',
      attack: {
        cut: 28,
        stab: 0,
        crush: 0,
        blast: 0,
      },
      defense: {
        cut: 8,
        stab: 3,
        crush: 0,
        blast: 0,
      },
    },
  ],
});

module.exports = fighter;
