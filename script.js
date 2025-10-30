// Mobile Navigation Toggle
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('nav-menu');

// Use passive event listeners for better performance
hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
}, { passive: true });

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(n => n.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
}, { passive: true }));

// Smooth scrolling for navigation links
function scrollToSection(sectionId) {
    const element = document.getElementById(sectionId);
    if (element) {
        const offsetTop = element.offsetTop - 80; // Account for fixed navbar
        
        window.scrollTo({
            top: offsetTop,
            behavior: 'smooth'
        });
    }
}

// Handle navigation clicks
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href').substring(1);
        if (targetId) {
            scrollToSection(targetId);
        }
    }, { passive: false });
});

// WhatsApp Order Function
function orderWhatsApp() {
    const phoneNumber = '923357314408'; // Your WhatsApp number
    const message = 'Hi! I want to place an order from Cheesy Feast. Please share your menu and deals.';
    const whatsappURL = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappURL, '_blank');
}

// Order Now Function
function orderNow() {
    orderWhatsApp();
}

// Navbar scroll effect with throttling for performance
let ticking = false;
window.addEventListener('scroll', () => {
    if (!ticking) {
        requestAnimationFrame(() => {
            const navbar = document.querySelector('.navbar');
            if (window.scrollY > 100) {
                navbar.style.background = 'linear-gradient(135deg, rgba(0,0,0,0.95) 0%, rgba(26,26,26,0.95) 100%)';
                navbar.style.backdropFilter = 'blur(10px)';
            } else {
                navbar.style.background = 'linear-gradient(135deg, #000 0%, #1a1a1a 100%)';
                navbar.style.backdropFilter = 'none';
            }
            ticking = false;
        });
        ticking = true;
    }
}, { passive: true });

// Intersection Observer for animations with better performance
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for animation
document.addEventListener('DOMContentLoaded', () => {
    const animateElements = document.querySelectorAll('.menu-item, .deal-card, .contact-item');
    
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        // Add hardware acceleration
        el.style.willChange = 'opacity, transform';
        observer.observe(el);
    });

    // Add descriptive ARIA labels for deal buttons
    const dealButtons = document.querySelectorAll('.deal-card .btn-deal');
    dealButtons.forEach((btn) => {
        const card = btn.closest('.deal-card');
        const title = card?.querySelector('h3')?.textContent?.trim();
        const price = card?.querySelector('.price')?.textContent?.trim();
        const label = title && price ? `Order Now: ${title} — ${price}` : 'Order Now';
        btn.setAttribute('aria-label', label);
    });

    // Sync hamburger aria-expanded state
    const hamburger = document.getElementById('hamburger');
    const primaryMenu = document.getElementById('primary-menu');
    if (hamburger && primaryMenu) {
        hamburger.addEventListener('click', () => {
            const expanded = hamburger.getAttribute('aria-expanded') === 'true';
            hamburger.setAttribute('aria-expanded', (!expanded).toString());
        }, { passive: true });
    }
});

// Add loading animation
window.addEventListener('load', () => {
    document.body.style.opacity = '1';
});

// Initialize page
document.addEventListener('DOMContentLoaded', () => {
    // Add initial loading state
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease';
    
    // Show page after load
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
});

// Add click effects to buttons with better performance
document.addEventListener('click', (e) => {
    if (e.target.matches('button, .btn-primary, .btn-secondary, .btn-deal')) {
        // Use CSS class instead of direct style manipulation for better performance
        e.target.classList.add('clicked');
        setTimeout(() => {
            e.target.classList.remove('clicked');
        }, 150);
    }
}, { passive: true });

// Add floating animation to pizza emoji
document.addEventListener('DOMContentLoaded', () => {
    const pizza = document.querySelector('.pizza');
    if (pizza) {
        // Use CSS animation instead of JavaScript for better performance
        pizza.style.animation = 'float 3s ease-in-out infinite';
    }
});

// Lazy Loading Implementation with performance improvements
class LazyLoader {
    constructor() {
        this.imageObserver = null;
        this.init();
    }

    init() {
        if ('IntersectionObserver' in window) {
            this.imageObserver = new IntersectionObserver((entries, observer) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        this.loadImage(img);
                        observer.unobserve(img);
                    }
                });
            }, {
                rootMargin: '50px 0px',
                threshold: 0.01
            });

            this.observeImages();
        } else {
            // Fallback for older browsers
            this.loadAllImages();
        }
    }

    observeImages() {
        const lazyImages = document.querySelectorAll('.lazy-load');
        lazyImages.forEach(img => {
            this.imageObserver.observe(img);
        });
    }

    loadImage(img) {
        const src = img.getAttribute('data-src');
        if (src) {
            // Preload image for better performance
            const image = new Image();
            image.onload = () => {
                img.src = src;
                img.classList.add('loaded');
                img.removeAttribute('data-src');
                
                // Also update parent picture element sources if they exist
                const picture = img.closest('picture');
                if (picture) {
                    const sources = picture.querySelectorAll('source[data-srcset]');
                    sources.forEach(source => {
                        source.srcset = source.getAttribute('data-srcset');
                        source.removeAttribute('data-srcset');
                    });
                }
            };
            image.src = src;
        }
    }

    loadAllImages() {
        const lazyImages = document.querySelectorAll('.lazy-load');
        lazyImages.forEach(img => this.loadImage(img));
    }
}

// Initialize lazy loading when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    new LazyLoader();
});

// Descriptive ARIA labels for deal buttons
document.addEventListener('DOMContentLoaded', () => {
    // Descriptive ARIA labels for deal buttons
    const dealButtons = document.querySelectorAll('.deal-card .btn-deal');
    dealButtons.forEach((btn) => {
        const card = btn.closest('.deal-card');
        const title = card?.querySelector('h3')?.textContent?.trim();
        const price = card?.querySelector('.price')?.textContent?.trim();
        const label = title && price ? `Order Now: ${title} — ${price}` : 'Order Now';
        btn.setAttribute('aria-label', label);
    });

    // Sync hamburger aria-expanded state
    const hamburger = document.getElementById('hamburger');
    const primaryMenu = document.getElementById('primary-menu');
    if (hamburger && primaryMenu) {
        hamburger.addEventListener('click', () => {
            const expanded = hamburger.getAttribute('aria-expanded') === 'true';
            hamburger.setAttribute('aria-expanded', (!expanded).toString());
        }, { passive: true });
    }
});