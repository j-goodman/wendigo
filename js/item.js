Item = function (args) {
  this.checkText = args.checkText;
  this.name = args.name;
  this.verbs = args.verbs;
  this.description = args.description;
  this.onGet = args.onGet;
};

Item.prototype["check"] = function (noun, player) {
  player.display(noun.checkText);
};

Item.prototype["use"] = function (noun, player) {
  player.display(noun.checkText);
  console.log("Used item.");
};

Item.prototype["get"] = function (noun, player) {
  if (!player.inventory.includes(noun)) {
    var message = (noun.name + "</n>" + " added to your inventory.");
    var firstLetter = message.slice(0, 1);
    message = message.slice(1, message.length);
    message = '<n>' + firstLetter.toUpperCase() + message;
    player.inventory.push(noun);
    player.display(message);
    player.updateInventory();
    for (var x = 0; x < player.location.contents.length; x++) {
      if (player.location.contents[x].name === noun.name) {
        player.location.contents.splice(x, 1);
        x--;
      }
      if (player.location.contents[x].contents) {
        for (var y = 0; y < player.location.contents[x].contents.length; y++) {
          if (player.location.contents[x].contents[y].name === noun.name) {
            player.location.contents[x].contents.splice(y, 1);
            y--;
          }
        }
      }
    }
    if (noun.onGet) {
      noun.onGet();
    }
    player.book.readArea(player.location);
  } else {
    player.display("You already have that.");
  }
};

Item.prototype["@"] = function (noun, player) {
  Item.prototype["use"](noun, player);
};

module.exports = Item;
