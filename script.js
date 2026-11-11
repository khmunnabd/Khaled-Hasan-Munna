const loader = document.querySelector('.loader');
window.addEventListener('load', () => {
    if (loader) setTimeout(() => loader.classList.add('done'), 550);
});

const topbar = document.querySelector('.topbar');
window.addEventListener('scroll', () => {
    if (topbar) topbar.classList.toggle('scrolled', window.scrollY > 30);
}, { passive: true });

const menu = document.querySelector('.menu-toggle');
const mobile = document.querySelector('.mobile-nav');

if (menu && mobile) {
    menu.addEventListener('click', () => {
        const isOpen = mobile.classList.toggle('open');
        menu.setAttribute('aria-expanded', String(isOpen));
    });

    mobile.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            mobile.classList.remove('open');
            menu.setAttribute('aria-expanded', 'false');
        });
    });
}

const themeToggle = document.querySelector('.theme-toggle');
if (themeToggle) {
    themeToggle.addEventListener('click', () => {
        document.body.classList.toggle('dark');
        themeToggle.setAttribute(
            'aria-pressed',
            String(document.body.classList.contains('dark'))
        );
    });
}

if ('IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                revealObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.12 });

    document.querySelectorAll('.reveal').forEach(element => {
        revealObserver.observe(element);
    });
} else {
    document.querySelectorAll('.reveal').forEach(element => {
        element.classList.add('visible');
    });
}

const filterButtons = document.querySelectorAll('.filter-tabs button');
filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        filterButtons.forEach(item => item.classList.remove('selected'));
        button.classList.add('selected');

        document.querySelectorAll('.project').forEach(card => {
            const matches = button.dataset.filter === 'all'
                || card.dataset.type === button.dataset.filter;
            card.classList.toggle('hidden', !matches);
        });
    });
});

const year = document.getElementById('year');
if (year) year.textContent = new Date().getFullYear();
