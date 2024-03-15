window.onload = function () {
  var index = 0;
  var imgs = document.getElementsByClassName('carousel_box');

  setInterval(function () {
    for (var i = 0; i < imgs.length; i++) {
      imgs[i].style.opacity = '0';
    }
    imgs[index].style.opacity = '1';

    index++;
    if (index >= imgs.length) {
      index = 0;
    }
  }, 2000);
}

