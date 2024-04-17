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

// materialsDiv scroll
const materialsDiv = document.querySelector('.materials_div');
const duration = 20000;
let startTime = null;
let elapsedTime = 0;
let animationId = null;

function animate(timestamp) {
  if (!startTime) startTime = timestamp - elapsedTime;
  elapsedTime = (timestamp - startTime) % duration;
  materialsDiv.style.transform = `translateX(${-elapsedTime / duration * 50}%)`;
  animationId = requestAnimationFrame(animate);
}

materialsDiv.addEventListener('mouseenter', () => {
  cancelAnimationFrame(animationId);
});

materialsDiv.addEventListener('mouseleave', () => {
  startTime = null;
  animationId = requestAnimationFrame(animate);
});

animationId = requestAnimationFrame(animate);

//login modal
var modal = document.getElementById('loginModal');

var loginLink = document.querySelector('.nav_log_in a');

var closeBtn = document.querySelector('.modal .close');

loginLink.onclick = function (event) {
  event.preventDefault();
  modal.style.display = 'block';
}

closeBtn.onclick = function () {
  modal.style.display = 'none';
}

window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = 'none';
  }
}
