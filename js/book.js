Book = function (args) {
  this.input = document.getElementById(args.inputId);
  this.areaWindow = document.getElementById(args.areaId);
  this.playerWindow = document.getElementById(args.playerId);
  this.inventory = document.getElementById(args.inventory);
  this.highlighter = document.getElementById(args.highlighter);
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
  this.highlighter.onclick = function () {
    if (this.player.highlightOff) {
      this.player.highlightOff = false;
      this.highlighter.className = 'highlighter';
    } else {
      this.player.highlightOff = true;
      this.highlighter.className = 'off';
    }
    this.player.lookAround();
  }.bind(this);
};

Book.prototype.clearInventory = function () {
  this.inventory.innerHTML = "";
};

Book.prototype.displayInventory = function (item) {
  this.inventory.innerHTML += '<li>'+item.name+'</li>';
};

Book.prototype.readArea = function (area) {
  var description = "";
  description += area.description;
  for (var x = 0; x < area.contents.length; x++) {
    description += " " + area.contents[x].description;
  }
  if (area.postscript) {
    description += " " + area.postscript;
  }
  description = this.player.highlight(description);
  this.areaWindow.innerHTML = description;
};

module.exports = Book;
