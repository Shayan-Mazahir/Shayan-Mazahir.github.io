// Smooth Scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Scroll Progress Bar
window.addEventListener('scroll', () => {
    const winScroll = document.documentElement.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (winScroll / height) * 100;
    document.querySelector('.scroll-progress').style.width = scrolled + '%';
});

// Custom Cursor
const cursorDot = document.querySelector('.cursor-dot');
const cursorOutline = document.querySelector('.cursor-outline');

window.addEventListener('mousemove', (e) => {
    cursorDot.style.left = e.clientX + 'px';
    cursorDot.style.top = e.clientY + 'px';

    cursorOutline.style.left = e.clientX + 'px';
    cursorOutline.style.top = e.clientY + 'px';
});

// Active Nav Item on Scroll
const sections = document.querySelectorAll('section');
const navItems = document.querySelectorAll('.nav-item');

window.addEventListener('scroll', () => {
    let current = '';

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (window.pageYOffset >= (sectionTop - 200)) {
            current = section.getAttribute('id');
        }
    });

    navItems.forEach(item => {
        item.classList.remove('active');
        if (item.getAttribute('href') === '#' + current) {
            item.classList.add('active');
        }
    });
});

// Stats Counter Animation with proper formatting
function animateValue(element, start, end, duration) {
    let startTimestamp = null;
    const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        const value = Math.floor(progress * (end - start) + start);

        // Format the display
        if (end >= 1000) {
            element.textContent = (value / 1000).toFixed(1) + 'K+';
        } else if (end > 10) {
            element.textContent = value + '+';
        } else {
            element.textContent = value + '+';
        }

        if (progress < 1) {
            window.requestAnimationFrame(step);
        } else {
            // Ensure final value is correct
            if (end >= 1000) {
                element.textContent = (end / 1000) + 'K+';
            } else {
                element.textContent = end + '+';
            }
        }
    };
    window.requestAnimationFrame(step);
}

// Trigger stats animation on page load
window.addEventListener('DOMContentLoaded', () => {
    const statValues = document.querySelectorAll('.stat-value');

    // Small delay for dramatic effect
    setTimeout(() => {
        statValues.forEach(stat => {
            const target = parseInt(stat.getAttribute('data-target'));
            animateValue(stat, 0, target, 2000);
        });
    }, 500);
});

// Also trigger when scrolling into view
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const statValues = entry.target.querySelectorAll('.stat-value');
            statValues.forEach(stat => {
                const target = parseInt(stat.getAttribute('data-target'));
                animateValue(stat, 0, target, 2000);
            });
            statsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

const statsGrid = document.querySelector('.stats-grid');
if (statsGrid) {
    statsObserver.observe(statsGrid);
}

// Card Hover Glow Effect
const projectCards = document.querySelectorAll('.project-card');

projectCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width) * 100;
        const y = ((e.clientY - rect.top) / rect.height) * 100;
        card.style.setProperty('--mouse-x', x + '%');
        card.style.setProperty('--mouse-y', y + '%');
    });
});

// Magnetic Button Effect
const magneticBtns = document.querySelectorAll('.cta-btn');

magneticBtns.forEach(btn => {
    btn.addEventListener('mouseenter', function (e) {
        this.style.transform = 'scale(1.05)';
    });

    btn.addEventListener('mouseleave', function () {
        this.style.transform = 'scale(1)';
    });
});

// Console Easter Egg
console.log('%c🚀 Hey there!', 'font-size: 24px; font-weight: bold; color: #00ffff;');
console.log('%cLooking at my code? I like that.', 'font-size: 14px; color: #a0a0a0;');
console.log('%cLet\'s build something: s26mazah@uwaterloo.ca', 'font-size: 14px; color: #00ffff; font-weight: bold;');

// Intersection Observer for Fade-in Animations
const fadeElements = document.querySelectorAll('.project-card, .skill-item, .contact-card');

const fadeObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            setTimeout(() => {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }, index * 100);
            fadeObserver.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
});

fadeElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    fadeObserver.observe(el);
});

// Cursor size change on hover
document.querySelectorAll('a, button, .project-card, .skill-item').forEach(el => {
    el.addEventListener('mouseenter', () => {
        cursorOutline.style.width = '50px';
        cursorOutline.style.height = '50px';
    });

    el.addEventListener('mouseleave', () => {
        cursorOutline.style.width = '30px';
        cursorOutline.style.height = '30px';
    });
});