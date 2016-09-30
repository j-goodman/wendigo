var Fighter = require('../fighter.js');

var fighter = new Fighter ({
  name: "the Devil",
  description: "The bridge is guarded by a tall man wearing a red horned mask of the Devil's face.",
  checkText: "He's wearing a smiling red painted mask with horns, a coarse black beard, and yellow eyes. It's tied around the back of his head with a string. He's holding a white steel sword and looking unmoving towards your direction. He makes no move to attack you.",
  verbs: ["check", "attack"],
  hitpoints: 100,
  onDeath: function () {
    this.name = "";
    this.checkText = "";
    this.description = "";
    this.location.getNouns();
    var door = this.location.getNoun('east bank');
    door.locked = false;
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
