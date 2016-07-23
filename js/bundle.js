window.onload = function () {
  var input = document.getElementById('main-input');
  input.onkeydown = function (event) {
    if (event.keyCode === 13) {
      console.log(input.value);
      input.value = '';
    }
  };
};
