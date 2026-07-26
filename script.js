// Hides navbar when scrolling down, revealed when scrolling up
(function () 
{
  var navbar = document.querySelector('.navbar');
  if (!navbar) return;

  var DELTA = 6;          // ignores trackpad / momentum jitter
  var lastY = window.scrollY;
  var ticking = false;

  function update() {
    ticking = false;

    var y = Math.max(window.scrollY, 0);
    var moved = y - lastY;

    // Let small movements accumulate rather than acting on every pixel
    if (Math.abs(moved) < DELTA) return;

    if (moved < 0) {
      navbar.classList.remove('is-hidden');
    } else if (y > navbar.offsetHeight) {
      // Only hide once the bar's own height has been scrolled past
      navbar.classList.add('is-hidden');
    }

    lastY = y;
  }

  window.addEventListener('scroll', function () {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(update);
  }, { passive: true });

  // Navbar reappears when keyboard users tab back to it
  navbar.addEventListener('focusin', function () {
    navbar.classList.remove('is-hidden');
  });
}
)
();
