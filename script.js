(() => {
  const body = document.body;
  body.classList.add('js-ready');

  const preloader = document.querySelector('.preloader');
  window.addEventListener('load', () => {
    window.setTimeout(() => preloader?.classList.add('done'), 350);
  });
  // Safety fallback: never leave the page covered if a load event is delayed.
  window.setTimeout(() => preloader?.classList.add('done'), 2200);

  const header = document.querySelector('.site-header');
  const updateHeader = () => header?.classList.toggle('scrolled', window.scrollY > 24);
  updateHeader();
  window.addEventListener('scroll', updateHeader, { passive: true });

  const menuButton = document.querySelector('.menu-toggle');
  const mobileNav = document.querySelector('.mobile-nav');
  const closeMenu = () => {
    mobileNav?.classList.remove('open');
    menuButton?.setAttribute('aria-expanded', 'false');
  };
  menuButton?.addEventListener('click', () => {
    const open = mobileNav?.classList.toggle('open') ?? false;
    menuButton.setAttribute('aria-expanded', String(open));
    menuButton.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');
  });
  mobileNav?.querySelectorAll('a').forEach(link => link.addEventListener('click', closeMenu));
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape') closeMenu();
  });

  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.08, rootMargin: '0px 0px -35px 0px' });
    document.querySelectorAll('.reveal').forEach(item => observer.observe(item));
  } else {
    document.querySelectorAll('.reveal').forEach(item => item.classList.add('is-visible'));
  }

  const filterButtons = document.querySelectorAll('.filter-button');
  const workCards = document.querySelectorAll('.work-card');
  filterButtons.forEach(button => {
    button.addEventListener('click', () => {
      filterButtons.forEach(item => item.classList.toggle('active', item === button));
      const filter = button.dataset.filter;
      workCards.forEach(card => {
        const show = filter === 'all' || card.dataset.category === filter;
        card.hidden = !show;
      });
    });
  });

  const year = document.getElementById('year');
  if (year) year.textContent = new Date().getFullYear();

  // Close the mobile menu if the viewport returns to desktop width.
  window.addEventListener('resize', () => {
    if (window.innerWidth > 700) closeMenu();
  });
})();