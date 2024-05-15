// Function to initialize the carousel
function initializeCarousel() {
  // Initialize index
  let index = 0;
  let imgs = document.getElementsByClassName('carousel_box');
  let btns = document.getElementsByClassName('carousel_btn');
  let intervalId;

  // Check if carousel elements exist
  if (imgs.length === 0 || btns.length === 0) {
    return;
  }

  // Update carousel's visible image and active btn
  function updateCarousel() {
    for (let i = 0; i < imgs.length; i++) {
      imgs[i].style.opacity = '0';
      btns[i].style.backgroundColor = '';
    }
    imgs[index].style.opacity = '1';
    btns[index].style.backgroundColor = 'rgba(113, 113, 113, 0.65)';
  }

  // Start the automatic carousel rotation
  function startInterval() {
    intervalId = setInterval(function () {
      index = (index + 1) % imgs.length;
      updateCarousel();
    }, 3000);
  }

  // Attach click listeners to carousel btns
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

  // Attach event listeners to left and right navigation btns
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
}

// Function to initialize scrolling animation in the materials section
function initializeScrollingAnimation() {
  const materialsDiv = document.querySelector('.materials_div');
  const duration = 20000;
  let startTime = null;
  let elapsedTime = 0;
  let animationId = null;

  // Check if materialsDiv exists
  if (!materialsDiv) {
    return;
  }

  // Perform animation over time
  function animate(timestamp) {
    if (!startTime) startTime = timestamp - elapsedTime;
    elapsedTime = (timestamp - startTime) % duration;
    materialsDiv.style.transform = `translateX(${-elapsedTime / duration * 50}%)`;
    animationId = requestAnimationFrame(animate);
  }

  // Stop the animation when the mouse enters
  materialsDiv.addEventListener('mouseenter', () => {
    cancelAnimationFrame(animationId);
  });

  // Resume animation when the mouse leaves
  materialsDiv.addEventListener('mouseleave', () => {
    startTime = null;
    animationId = requestAnimationFrame(animate);
  });

  animationId = requestAnimationFrame(animate);
}

/* curator-feed-default-feed-layout */
(function () {
  var i, e, d = document, s = "script";
  i = d.createElement("script");
  i.async = 1;
  i.charset = "UTF-8";
  i.src = "https://cdn.curator.io/published/eba6ce2b-35d5-47c2-9958-66aa2df6fcb4.js";
  e = d.getElementsByTagName(s)[0];
  e.parentNode.insertBefore(i, e);
})();

// Function to initialize the navbar
function initializeNavbar() {
  const themeToggleButton = document.querySelector('.nav_mode a');

  const currentTheme = localStorage.getItem('theme');
  if (currentTheme) {
    document.body.classList.toggle('dark-mode', currentTheme === 'dark');
  }

  themeToggleButton.addEventListener('click', (event) => {
    event.preventDefault();
    document.body.classList.toggle('dark-mode');
    localStorage.setItem('theme', document.body.classList.contains('dark-mode') ? 'dark' : 'light');
  });
}

// Fetch and include the navbar, footer, and assignmentSticker
document.addEventListener('DOMContentLoaded', () => {
  // Fetch and include the navbar
  fetch('assembly/navbar.html')
    .then(response => response.text())
    .then(html => {
      document.getElementById('navbar-container').innerHTML = html;
      initializeNavbar();
    })
    .catch(error => {
      console.error('Error loading navbar:', error);
    });

  // Fetch and include the footer
  fetch('assembly/footer.html')
    .then(response => response.text())
    .then(html => {
      document.getElementById('footer-container').innerHTML = html;
    })
    .catch(error => {
      console.error('Error loading footer:', error);
    });

  // Fetch and include the assignment sticker
  fetch('assembly/assignmentSticker.html')
    .then(response => response.text())
    .then(html => {
      document.getElementById('assignmentSticker-container').innerHTML = html;
    })
    .catch(error => {
      console.error('Error loading assignment sticker:', error);
    });

  // Initialize other features
  initializeCarousel();
  initializeScrollingAnimation();
});
