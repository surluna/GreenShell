(function () {
  let index = 0;
  let imgs = document.getElementsByClassName('carousel_box');
  let btns = document.getElementsByClassName('carousel_btn');
  let intervalId;

  function updateCarousel() {
    for (let i = 0; i < imgs.length; i++) {
      imgs[i].style.opacity = '0';
      btns[i].style.backgroundColor = '';
    }
    imgs[index].style.opacity = '1';
    btns[index].style.backgroundColor = 'rgba(113, 113, 113, 0.65)';
  }

  function startInterval() {
    intervalId = setInterval(function () {
      index = (index + 1) % imgs.length;
      updateCarousel();
    }, 3000);
  }

  function btnListeners() {
    for (let i = 0; i < btns.length; i++) {
      btns[i].addEventListener('click', function () {
        clearInterval(intervalId);
        index = i;

        updateCarousel();
        startInterval();
      });
    }
  }

  document.getElementById('carousel_left').addEventListener('click', function () {
    clearInterval(intervalId);
    index = (index > 0) ? index - 1 : imgs.length - 1;
    updateCarousel();
    startInterval();
  });

  document.getElementById('carousel_right').addEventListener('click', function () {
    clearInterval(intervalId);
    index = (index < imgs.length - 1) ? index + 1 : 0;
    updateCarousel();
    startInterval();
  });

  updateCarousel();
  btnListeners();
  startInterval();
})();


// 获取模态窗口
var modal = document.getElementById('loginModal');

// 获取打开模态窗口的链接
var loginLink = document.querySelector('.nav_log_in a');

// 获取关闭按钮
var closeBtn = document.querySelector('.modal .close');

// 点击登录链接时打开模态窗口
loginLink.onclick = function (event) {
  event.preventDefault();
  modal.style.display = 'block';
}

// 点击关闭按钮时关闭模态窗口
closeBtn.onclick = function () {
  modal.style.display = 'none';
}

// 点击窗口外区域时关闭模态窗口
window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = 'none';
  }
}
