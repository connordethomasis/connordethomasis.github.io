(function () {
  var navbar = document.querySelector('.navbar');
  if (!navbar) return;

  var menu = document.getElementById('nav-menu');
  var toggle = document.getElementById('nav-toggle');
  var toggleIcon = toggle && toggle.querySelector('i');
  var compact = window.matchMedia('(max-width: 68rem)'); // matches the nav breakpoint in style.css

  // --- Collapsible menu (small screens) ---------------------------------

  function menuOpen() {
    return !!menu && menu.classList.contains('is-open');
  }

  function setMenu(open) {
    if (!menu || !toggle) return;

    menu.classList.toggle('is-open', open);
    toggle.setAttribute('aria-expanded', open ? 'true' : 'false');

    if (toggleIcon) {
      toggleIcon.className = open ? 'fa-solid fa-xmark' : 'fa-solid fa-bars';
    }
  }

  if (toggle) {
    toggle.addEventListener('click', function () {
      setMenu(!menuOpen());
    });
  }

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && menuOpen()) {
      setMenu(false);
      toggle.focus();
    }
  });

  // Tapping anywhere outside the bar dismisses the menu
  document.addEventListener('click', function (e) {
    if (menuOpen() && !navbar.contains(e.target)) setMenu(false);
  });

  // The panel only exists below the breakpoint, so drop the open state with it
  function onBreakpoint(e) {
    if (!e.matches) setMenu(false);
  }

  if (compact.addEventListener) {
    compact.addEventListener('change', onBreakpoint);
  } else if (compact.addListener) {
    compact.addListener(onBreakpoint); // Safari < 14
  }

  // --- Current section marker -------------------------------------------

  var spy = [];

  Array.prototype.forEach.call(
    navbar.querySelectorAll('.nav-links a[href^="#"]'),
    function (link) {
      var section = document.getElementById(link.getAttribute('href').slice(1));
      if (section) spy.push({ link: link, section: section });
    }
  );

  function markCurrent() {
    if (!spy.length) return;

    var offset = navbar.offsetHeight + 24;
    var doc = document.documentElement;
    var atBottom = window.innerHeight + window.scrollY >= doc.scrollHeight - 2;
    var current = atBottom ? spy[spy.length - 1] : spy[0];

    if (!atBottom) {
      for (var i = 0; i < spy.length; i++) {
        if (spy[i].section.getBoundingClientRect().top <= offset) current = spy[i];
      }
    }

    spy.forEach(function (item) {
      var isCurrent = item === current;
      item.link.classList.toggle('is-current', isCurrent);

      if (isCurrent) {
        item.link.setAttribute('aria-current', 'true');
      } else {
        item.link.removeAttribute('aria-current');
      }
    });
  }

  // --- Hide the bar on the way down, bring it back on the way up --------

  var DELTA = 6;          // ignores trackpad / momentum jitter
  var lastY = window.scrollY;
  var ticking = false;
  var jumping = false;    // an in-page anchor jump is underway
  var jumpTimer;

  function updateBar() {
    var y = Math.max(window.scrollY, 0);
    var moved = y - lastY;

    // Let small movements accumulate rather than acting on every pixel
    if (Math.abs(moved) < DELTA) return;

    lastY = y;

    // Jump to a section is not the user scrolling away from the bar
    if (jumping || menuOpen()) return;

    if (moved < 0) {
      navbar.classList.remove('is-hidden');
    } else if (y > navbar.offsetHeight) {
      // Only hide once the bar's own height has been scrolled past
      navbar.classList.add('is-hidden');
    }
  }

  function update() {
    ticking = false;
    updateBar();
    markCurrent();
  }

  window.addEventListener('scroll', function () {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(update);
  }, { passive: true });

  window.addEventListener('resize', markCurrent, { passive: true });

  // Jumping to a section via nav link keeps navbar on screen
  document.addEventListener('click', function (e) {
    var link = e.target.closest && e.target.closest('a[href^="#"]');
    if (!link) return;

    setMenu(false);

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

  markCurrent();
})();

/* ---------------------------------------------------------------------
   Spec sheet accordions — homelab page only
   --------------------------------------------------------------------- */

(function () {
  var systems = Array.prototype.slice.call(document.querySelectorAll('.sys'));
  if (!systems.length) return;

  function setOpen(sys, open) {
    sys.classList.toggle('is-open', open);
    sys.querySelector('.sys-head').setAttribute('aria-expanded', open);
  }

  function setAll(open) {
    return function () {
      systems.forEach(function (sys) { setOpen(sys, open); });
    };
  }

  systems.forEach(function (sys) {
    sys.querySelector('.sys-head').addEventListener('click', function () {
      setOpen(sys, !sys.classList.contains('is-open'));
    });
  });

  document.getElementById('spec-expand').addEventListener('click', setAll(true));
  document.getElementById('spec-collapse').addEventListener('click', setAll(false));
})();
