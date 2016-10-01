var Area = require('../area.js');
var Feature = require('../feature.js');
var Box = require('../box.js');
var Item = require('../item.js');
var Exit = require('../exit.js');

area = new Area ({
  description: "",
  name: '',
  worldMap: this,
  contents: [
    new Feature ({
      name: "boulder",
      description: "It's a grey boulder about twice your height. It's too steep to climb and there's nothing behind it.",
      checkText: "The boulder is made of grey rock with five or six long streaks of lighter grey going across it diagonally.",
      'climb': function () {
        console.log('You did it. You climbed on up the boulder and into the console.');
        // Gives you a 50/50 chance of being able to climb the boulder and see farther of falling down and maybe hurting yourself.
      },
      verbs: ["check", "climb"],
    }),
    new Exit ({
      name: "bog",
      description: "You can see the bog",
      checkText: "It's a muddy bog nearby. The water doesn't seem to reflect any light at all.",
      destinationName: 'bog',
      verbs: ["check", "go to"],
    }),
    new Exit ({
      name: "clearing",
      description: "and the clearing from here.",
      checkText: "It's a clearing between the treas up ahead.",
      destinationName: 'clearing',
      verbs: ["check", "go to"],
    }),

  ],
});

module.exports = area;
