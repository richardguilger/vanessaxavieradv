document.addEventListener('DOMContentLoaded', () => {
    // Force scroll to top on reload to ensure "carregar no topo"
    window.onbeforeunload = function () {
        window.scrollTo(0, 0);
    };

    if ('scrollRestoration' in history) {
        history.scrollRestoration = 'manual';
    }
    window.scrollTo(0, 0);

    // Register GSAP plugins
    gsap.registerPlugin(ScrollTrigger);

    // Set initial states for elements with .reveal
    // This ensures they are only hidden if JS is active
    gsap.set('.reveal', { opacity: 0, y: 30 });

    // Initial Loading Animation
    const tl = gsap.timeline();

    tl.from('.logo', {
        duration: 1,
        y: -30,
        opacity: 0,
        ease: 'power3.out'
    }, 0.2)
        .from('.nav-links li', {
            duration: 0.8,
            y: -20,
            opacity: 0,
            stagger: 0.1,
            ease: 'power3.out'
        }, 0.4)
        .from('.hero-pretitle', {
            duration: 0.8,
            y: 20,
            opacity: 0,
            ease: 'power3.out'
        }, 0.6)
        .from('.hero-title', {
            duration: 1,
            y: 30,
            opacity: 0,
            ease: 'power3.out'
        }, 0.8)
        .from('.hero-description', {
            duration: 1,
            y: 20,
            opacity: 0,
            ease: 'power3.out'
        }, 1.0)
        .from('.hero-cta', {
            duration: 1,
            y: 20,
            opacity: 0,
            ease: 'power3.out'
        }, 1.2)
        .from('.hero-image', {
            duration: 1.5,
            scale: 1.05,
            opacity: 0,
            ease: 'power3.out'
        }, 0.8);

    // Scroll Animations
    const reveals = document.querySelectorAll('.reveal');

    reveals.forEach((el) => {
        gsap.to(el, {
            scrollTrigger: {
                trigger: el,
                start: 'top 85%',
                toggleActions: 'play none none none'
            },
            duration: 1,
            y: 0,
            opacity: 1,
            ease: 'power3.out'
        });
    });

    // Special handling for Hero items that are already revealed by the timeline
    // (None needed as they aren't usually marked .reveal)

    // Header Color Change on Scroll
    ScrollTrigger.create({
        start: 'top -50',
        onEnter: () => gsap.to('header', { backgroundColor: 'rgba(230, 228, 217, 0.98)', boxShadow: '0 5px 20px rgba(0,0,0,0.05)', duration: 0.3 }),
        onLeaveBack: () => gsap.to('header', { backgroundColor: 'rgba(230, 228, 217, 0.95)', boxShadow: 'none', duration: 0.3 })
    });

    // Mobile Menu Toggle
    const mobileMenuIcon = document.getElementById('mobile-menu-icon');
    const navLinks = document.querySelector('.nav-links');

    if (mobileMenuIcon && navLinks) {
        mobileMenuIcon.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            if (navLinks.classList.contains('active')) {
                gsap.to(navLinks, { display: 'flex', opacity: 1, y: 0, duration: 0.3 });
            } else {
                gsap.to(navLinks, { opacity: 0, y: -20, duration: 0.3, onComplete: () => navLinks.style.display = 'none' });
            }
        });
    }
});
