window.onload = function () {
  var input = document.getElementById('main-input');
  input.onkeydown = function (e) {
    if (event.keyCode === 13) {
      console.log(input.value);
      input.value = '';
    }
  };
};
