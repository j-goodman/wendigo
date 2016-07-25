Book = function (args) {
  this.input = document.getElementById(args.inputId);
  this.areaWindow = document.getElementById(args.areaId);
  this.playerWindow = document.getElementById(args.playerId);
  // this.highlightedInput = document.getElementById(args.highlightId);
  this.inventory = document.getElementById(args.inventory);
  this.player = args.player;
};

Book.prototype.init = function () {
  var input = document.getElementById('main-input');
  input.onkeydown = function (event) {
    if (event.keyCode === 13) {
      this.player.getInput(input.value);
      input.value = '';
    }
  }.bind(this);
  input.onkeyup = function (event) {
    input.value = this.player.highlight(input.value);
  }.bind(this);
};

Book.prototype.clearInventory = function () {
  this.inventory.innerHTML = "";
};

Book.prototype.displayInventory = function (item) {
  this.inventory.innerHTML += '<li>'+item.name+'</li>';
};

Book.prototype.readArea = function (area) {
  this.areaWindow.innerHTML = area.description;
};

Book.prototype.readCheck = function (object) {
  this.playerWindow.value = object.check;
};

module.exports = Book;
