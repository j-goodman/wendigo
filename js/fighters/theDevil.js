var Fighter = require('../fighter.js');

var fighter = new Fighter ({
  name: "the Devil",
  description: "The bridge is guarded by a tall man wearing a red horned mask of the Devil's face.",
  checkText: "He's wearing a smiling red painted mask with horns, yellow eyes, and a beard that looks like it's made of black steel wool. It's tied around the back of his head with a string. He's holding a white steel sword and facing you. He makes no move to attack you.",
  verbs: ["check", "attack"],
  hitpoints: 100,
  onDeath: function () {
    this.checkText = "";
    this.description = "";
    this.location.player.readArea(this.location);
    window.setTimeout(function () {
      this.description = "The Devil staggers backward, silent and blood striped, and careens off the bridge down into the river below.";
      this.location.player.readArea(this.location);
    }.bind(this), 1200);
    window.setTimeout(function () {
      this.description = "The Devil's body disappears into the water.";
      this.location.player.readArea(this.location);
    }.bind(this), 5500);
    window.setTimeout(function () {
      this.name = "~~";
      this.description = "";
      this.location.player.readArea(this.location);
    }.bind(this), 8500);
    this.location.getNouns();
    var door = this.location.getNoun('east bank');
    door.locked = false;
  },
  moves: [
    {
      name: 'cross cut',
      attack: {
        cut: 20,
        stab: 0,
        crush: 0,
        blast: 0,
      },
      defense: {
        cut: 8,
        stab: 1,
        crush: 0,
        blast: 0,
      },
    },
    {
      name: 'upper cut',
      attack: {
        cut: 24,
        stab: 0,
        crush: 0,
        blast: 0,
      },
      defense: {
        cut: 4,
        stab: 1,
        crush: 0,
        blast: 0,
      },
    },
  ],
});

module.exports = fighter;
