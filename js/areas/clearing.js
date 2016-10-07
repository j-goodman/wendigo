var Area = require('../area.js');
var Feature = require('../feature.js');
var Box = require('../box.js');
var Item = require('../item.js');
var Exit = require('../exit.js');

area = new Area ({
  description: "You come into a clearing where the ground under your feet is cold grey rock. You can hear the trees around you moving with the wind.",
  name: 'clearing',
  worldMap: this,
  contents: [
    new Exit ({
      name: "boulder",
      description: "There's a boulder twenty yards or so ahead of you.",
      checkText: "It's a tall grey boulder among the trees. You can go to it to see if there's anything behind it.",
      destinationName: 'boulder',
      verbs: ["check", "go to"],
    }),
    new Exit ({
      name: "woods",
      description: "The woods are becoming thicker around you.",
      checkText: "You can go back into the woods to try to find the road again.",
      destinationName: 'woods',
      verbs: ["check", "go to"],
    }),
    new Box ({
      name: "log",
      description: "There's a hollowed out log leaning against a tree at the edge of the clearing.",
      contents: [
        new Item ({
          name: "key",
          checkText: "It's a small key on a ring of wire. You can get it if you want it.",
          description: "a nickel silver key",
          verbs: ["check", "get"],
          onGet: function () {
            this.checkText = "It's a nickel silver key on a ring of wire.";
          },
        }),
        // * ALSO: An angry raccoon that fights you and you have to punch it to death
        new Item ({
          name: "machete",
          checkText: "It's a machete with a plain wood handle. It looks very sharp.",
          description: "a machete",
          moves: [
            {
              name: 'forward thrust',
              attack: {
                cut: 0,
                stab: 16,
                crush: 0,
                blast: 0,
              },
              defense: {
                cut: 8,
                stab: 0,
                crush: 0,
                blast: 0,
              },
            },
            {
              name: 'cross cut',
              attack: {
                cut: 16,
                stab: 0,
                crush: 0,
                blast: 0,
              },
              defense: {
                cut: 6,
                stab: 2,
                crush: 0,
                blast: 0,
              },
            },
          ],
          verbs: ["check", "get"],
          onGet: function () {
            this.checkText = "A machete. It can be used to block as well as to attack, so it will protect you from cutting (<v>♦</v>) and stabbing (<v>♠</v>) damage while inflicting the same.<br><br>When fighting, use the left and right arrows to see your moves and the spacebar to select one.";
          },
        }),
      ],
      checkText: "The log looks like it was deliberately made hollow. It contains",
      verbs: ["check"],
    }),
  ],
});

module.exports = area;
