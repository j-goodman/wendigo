Item = function (args) {
  this.checkText = args.checkText;
  this.name = args.name;
  this.verbs = args.verbs;
  this.description = args.description;
};

Item.prototype["check"] = function (noun, player) {
  player.display(noun.checkText);
};

Item.prototype["use"] = function (noun, player) {
  player.display(noun.checkText);
  console.log("Used item.");
};

Item.prototype["get"] = function (noun, player) {
  var message = (noun.name + " added to your inventory.");
  var firstLetter = message.slice(0, 1);
  message = message.slice(1, message.length);
  message = firstLetter.toUpperCase()+message;
  player.inventory.push(noun);
  player.display(message);
  player.updateInventory();
  for (var x = 0; x < player.location.contents.length; x++) {
    if (player.location.contents[x].name === noun.name) {
      player.location.contents.splice(x, 1);
      x--;
    }
  }
  player.book.readArea(player.location);
};

Item.prototype["@"] = function (noun, player) {
  Item.prototype["use"](noun, player);
};

module.exports = Item;
