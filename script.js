// Hides navbar when scrolling down, revealed when scrolling up
(function () 
{
  var navbar = document.querySelector('.navbar');
  if (!navbar) return;

  var DELTA = 6;          // ignores trackpad / momentum jitter
  var lastY = window.scrollY;
  var ticking = false;
  var jumping = false;    // an in-page anchor jump is underway
  var jumpTimer;

  function update() {
    ticking = false;

    var y = Math.max(window.scrollY, 0);
    var moved = y - lastY;

    // Let small movements accumulate rather than acting on every pixel
    if (Math.abs(moved) < DELTA) return;

    lastY = y;

    // Jump to a section is not the user scrolling away from the bar
    if (jumping) return;

    if (moved < 0) {
      navbar.classList.remove('is-hidden');
    } else if (y > navbar.offsetHeight) {
      // Only hide once the bar's own height has been scrolled past
      navbar.classList.add('is-hidden');
    }
  }

  window.addEventListener('scroll', function () {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(update);
  }, { passive: true });

  // Jumping to a section via nav link keeps navbar on screen
  document.addEventListener('click', function (e) {
    var link = e.target.closest && e.target.closest('a[href^="#"]');
    if (!link) return;

    jumping = true;
    navbar.classList.remove('is-hidden');

    clearTimeout(jumpTimer);
    jumpTimer = setTimeout(endJump, 1000); // fallback if scrollend never fires
  });

  function endJump() {
    clearTimeout(jumpTimer);
    jumping = false;
    lastY = Math.max(window.scrollY, 0);
  }

  if ('onscrollend' in window) {
    window.addEventListener('scrollend', function () {
      if (jumping) endJump();
    });
  }

  // Navbar reappears when keyboard users tab back to it
  navbar.addEventListener('focusin', function () {
    navbar.classList.remove('is-hidden');
  });
}
)
();
