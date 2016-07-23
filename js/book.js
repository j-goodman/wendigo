Book = function (args) {
  this.input = document.getElementById(args.inputId);
  this.areaWindow = document.getElementById(args.areaId);
  this.playerWindow = document.getElementById(args.playerId);
  this.player = args.player;
};

Book.prototype.init = function () {
  var input = document.getElementById('main-input');
  input.onkeydown = function (event) {
    input.value = this.player.highlight(input.value);
    if (event.keyCode === 13) {
      this.player.getInput(input.value);
      input.value = '';
    }
  }.bind(this);
};

Book.prototype.readArea = function (area) {
  this.areaWindow.innerHTML = area.description;
};

Book.prototype.readCheck = function (object) {
  this.playerWindow.value = object.check;
};

module.exports = Book;
