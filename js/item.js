Item = function (args) {
  this.checkText = args.checkText;
  this.name = args.name;
  this.verbs = args.verbs;
};

Item.prototype["check"] = function (noun, player) {
  player.display(noun.checkText);
};

Item.prototype["use"] = function (noun, player) {
  player.display(noun.checkText);
  console.log("Used item.");
};

Item.prototype["get"] = function (noun, player) {
  player.display(noun.checkText);
  player.inventory.push(noun);
  player.updateInventory();
  // remove self from area
};

Item.prototype["@"] = function (noun, player) {
  Item.prototype["use"](noun, player);
};

module.exports = Item;
