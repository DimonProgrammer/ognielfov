// Mobile Menu — hamburger toggle + fullscreen drawer
(function () {
  const btn = document.getElementById('mobile-menu-btn');
  const drawer = document.getElementById('mobile-menu');
  if (!btn || !drawer) return;

  const iconOpen = btn.querySelector('.icon-open');
  const iconClose = btn.querySelector('.icon-close');

  function open() {
    drawer.classList.remove('pointer-events-none', 'opacity-0');
    drawer.classList.add('opacity-100');
    iconOpen.classList.add('hidden');
    iconClose.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
  }

  function close() {
    drawer.classList.add('opacity-0');
    drawer.classList.remove('opacity-100');
    iconOpen.classList.remove('hidden');
    iconClose.classList.add('hidden');
    document.body.style.overflow = '';
    setTimeout(function () { drawer.classList.add('pointer-events-none'); }, 300);
  }

  btn.addEventListener('click', function () {
    drawer.classList.contains('opacity-0') ? open() : close();
  });

  // Close on link click
  drawer.querySelectorAll('a').forEach(function (a) {
    a.addEventListener('click', close);
  });

  // Close on Escape
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && !drawer.classList.contains('opacity-0')) close();
  });
})();
