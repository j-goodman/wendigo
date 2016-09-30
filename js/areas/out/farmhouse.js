var Area = require('../area.js');
var Feature = require('../feature.js');
var Box = require('../box.js');
var Item = require('../item.js');
var Exit = require('../exit.js');

area = new Area ({
  description: "A single-room building, about ten yards wide in either direction,",
  name: 'farmhouse',
  worldMap: this,
  contents: [
    new Feature ({
      name: "walls",
      description: "with walls made from cinder blocks and roughly applied concrete.",
      checkText: "The blocks in the walls look like they were stacked by hand. They were built with a north window and a south window.",
      verbs: ["check"],
    }),
    new Feature ({
      name: "floor",
      description: "The floor is lined by oak planks made grey with a thin coating of ash.",
      checkText: "The ash on the floor is soft and feels as if it's still warm. The planks are in disrepair and have large cracks between them and splinters on their upward faces.",
      verbs: ["check"],
    }),
    new Feature ({
      name: "north window",
      description: "",
      checkText: "The view beyond the window is blocked by a large sliding shutter made from the same wood as the tables. There is no sunlight coming through, but you can hear the rattle of the cicadas from outside.",
      verbs: ["check"],
    }),
    new Feature ({
      name: "south window",
      description: "",
      checkText: "The view beyond the window is blocked by a large sliding shutter made from the same wood as the tables. You can smell something burning outside.",
      verbs: ["check"],
    }),
    new Feature ({
      name: "table",
      description: "You are lying face-up on a wooden table. If you want to know more about the table, you can check it.",
      checkText: "The table is made of a smooth, light wood, and is very cool to the touch, almost seeming to radiate cold into the warm humid air of the small concrete building.",
      verbs: ["check"],

      onCheck: function () {
        this.description = "There is a wooden table in the middle of the room. If you want to know more about the table, you can check it.";
      },
    }),
    new Feature ({
      name: "other table",
      description: "Nearby there is another table, the same as the first.",
      checkText: "Like its twin, this one is made of a cool, light, smooth wood. There is a dead man lying face-up on top of it.",
      verbs: ["check"],
    }),
    new Feature ({
      name: "dead man",
      description: "A dead man is lying on top of it.",
      checkText: "The dead man looks like he's in his mid-forties, healthy aside from being dead. His eyes are open, looking up at the ceiling with a placid expression. He's wearing a loose-fitting white dress shirt and pants with pockets in them.",
      verbs: ["check"],
    }),
    new Box ({
      name: "pockets",
      description: "",
      contents: [
        new Item ({
          name: "watch",
          checkText: "It's a wrist watch with a fraying leather band that feels slightly moist and smells like sweat. It's eleven thirty.",
          description: "a watch",
          verbs: ["check", "get"],
        }),
        new Item ({
          name: "keys",
          checkText: "An aluminium ring of keys with a small silver key on it and a larger brass key.",
          description: "a set of keys",
          verbs: ["check", "get"],
        }),
        new Item ({
          name: "dollar bill",
          checkText: "A one dollar bill.",
          description: "a dollar bill",
          verbs: ["check", "get"],
        }),
      ],
      checkText: "The dead man's pockets contain",
      verbs: ["check"],
    }),

    new Exit ({
      name: "door",
      checkText: "A green wooden door. You can go to it to leave the building. Outside you can hear insects buzzing in the night.",
      description: "On the wall next to you is a green door.",
      destinationName: 'wheatfield',
      verbs: ["check", "go to"],
    }),

    new Item ({
      name: "machete",
      checkText: "A machete. You can get it if you want it.",
      description: "There is a machete leaning beside it.",
      moves: [
        {
          name: 'forward thrust',
          attack: {
            cut: 0,
            stab: 24,
            crush: 0,
            blast: 0,
          },
          defense: {
            cut: 12,
            stab: 0,
            crush: 6,
            blast: 0,
          },
        },
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
      verbs: ["check", "get"],

      onGet: function () {
        this.checkText = "A machete. It can be used to block as well as to attack, so it will protect you from cutting (<v>♦</v>) and stabbing (<v>♠</v>) damage while inflicting the same.<br><br>When fighting, use the left and right arrows to see your moves and the spacebar to select one.";
      },
    }),
  ],
});

module.exports = area;
