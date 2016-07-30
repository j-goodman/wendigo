var Area = require('../area.js');
var Feature = require('../feature.js');
var Box = require('../box.js');
var Item = require('../item.js');
var Exit = require('../exit.js');

area = new Area ({
  description: "A single-room building, about ten yards wide in either direction, with walls made from cinder blocks and roughly applied concrete.",
  name: 'farmhouse',
  worldMap: this,
  contents: [
    new Feature ({
      name: "floor",
      description: "The floor is lined by oak planks made grey with a thin coating of ash.",
      checkText: "The ash on the floor is soft and feels as if it's still warm. The planks are in disrepair and have large cracks between them and splinters on their upward faces.",
      verbs: ["check"],
    }),
    new Feature ({
      name: "table",
      description: "You are lying face-up on a wooden table. If you want to know more about the table, you can check it.",
      checkText: "The table is made of a smooth, light wood, and is very cool to the touch, almost seeming to radiate cold into the warm humid air of the small concrete building.",
      verbs: ["check"],

      onCheck: function () {
        this.desctiption = "There is a wooden table in the middle of the room.";
      },
    }),
    new Feature ({
      name: "other table",
      description: "Nearby there is an other table, very similar to the first",
      checkText: "Like its twin, this one is made of a cool, light, smooth wood. There is a dead man lying face-up on top of it.",
      verbs: ["check"],
    }),
    new Feature ({
      name: "dead man",
      description: "A dead man is lying on top of it.",
      checkText: "The dead man looks like he's in is mid-forties, healthy aside from being dead. His eyes are open, looking up a the ceiling with a placid expression. He's wearing a loose-fitting white dress shirt and pants with pockets in them.",
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
          checkText: "An aluminium ring of keys with a small silver key on it and a larger black car key.",
          description: "a set of keys",
          verbs: ["check", "get"],
        }),
        new Item ({
          name: "dollar bill",
          checkText: "A one dollar bill. If you want to take it with you, you can get it.",
          description: "a dollar bill",
          verbs: ["check", "get"],
        }),
        new Item ({
          name: "phone",
          checkText: "It's a smartphone. It has run out of charge.",
          description: "a phone",
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
  ],
});

module.exports = area;
