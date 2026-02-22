/* ============================================
   PATHWAYS TO PROSPERITY DIFFUSION BY 2050
   JavaScript — Interactivity & Animations
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {

    // ——————————————————————————————————————
    // 1. Navbar scroll behavior
    // ——————————————————————————————————————
    const navbar = document.getElementById('navbar');
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('section[id]');

    function handleNavScroll() {
        if (window.scrollY > 60) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        // Active section highlighting
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            if (window.scrollY >= sectionTop) {
                current = section.getAttribute('id');
            }
        });
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === '#' + current) {
                link.classList.add('active');
            }
        });
    }

    window.addEventListener('scroll', handleNavScroll, { passive: true });
    handleNavScroll();

    // ——————————————————————————————————————
    // 2. Mobile nav toggle
    // ——————————————————————————————————————
    const navToggle = document.getElementById('navToggle');
    const navLinksContainer = document.getElementById('navLinks');

    navToggle.addEventListener('click', () => {
        navLinksContainer.classList.toggle('open');
    });

    // Close mobile nav on link click
    navLinksContainer.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            navLinksContainer.classList.remove('open');
        });
    });

    // ——————————————————————————————————————
    // 3. Animated counters in hero
    // ——————————————————————————————————————
    function animateCounter(el, target, duration = 2000) {
        let start = 0;
        const startTime = performance.now();

        function update(currentTime) {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            // Ease-out cubic
            const eased = 1 - Math.pow(1 - progress, 3);
            const current = Math.round(start + (target - start) * eased);
            el.textContent = current;
            if (progress < 1) {
                requestAnimationFrame(update);
            }
        }
        requestAnimationFrame(update);
    }

    const heroStatNumbers = document.querySelectorAll('.hero-stat-number[data-target]');
    let heroAnimated = false;

    function checkHeroAnimation() {
        if (heroAnimated) return;
        const heroSection = document.getElementById('hero');
        const rect = heroSection.getBoundingClientRect();
        if (rect.top < window.innerHeight && rect.bottom > 0) {
            heroAnimated = true;
            heroStatNumbers.forEach(el => {
                const target = parseInt(el.dataset.target, 10);
                animateCounter(el, target, 2200);
            });
        }
    }

    window.addEventListener('scroll', checkHeroAnimation, { passive: true });
    checkHeroAnimation();

    // ——————————————————————————————————————
    // 4. Intersection Observer for fade-in
    // ——————————————————————————————————————
    const observerOptions = {
        root: null,
        rootMargin: '0px 0px -60px 0px',
        threshold: 0.1
    };

    const fadeObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const delay = parseInt(entry.target.dataset.aosDelay || 0, 10);
                setTimeout(() => {
                    entry.target.classList.add('visible');
                }, delay);
                fadeObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe all animated elements
    document.querySelectorAll(
        '.framework-card, .finding-card, .barrier-item, .case-card, .policy-card, .data-table-wrapper, .oos-panel, .investment-panel, .sdg-panel'
    ).forEach(el => {
        fadeObserver.observe(el);
    });

    // ——————————————————————————————————————
    // 5. OOS bar chart animation
    // ——————————————————————————————————————
    const oosObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const bars = entry.target.querySelectorAll('.oos-bar');
                bars.forEach((bar, i) => {
                    const width = bar.dataset.width;
                    setTimeout(() => {
                        bar.style.width = width + '%';
                    }, i * 150);
                });
                oosObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.3 });

    document.querySelectorAll('.oos-chart').forEach(chart => {
        oosObserver.observe(chart);
    });

    // ——————————————————————————————————————
    // 6. Smooth scroll for anchor links
    // ——————————————————————————————————————
    document.querySelectorAll('a[href^="#"]').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const target = document.querySelector(link.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

});
