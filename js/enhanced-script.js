// Enhanced METRICX JavaScript with GSAP Animations and Interactive Elements

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeParticles();
    initializeGSAPAnimations();
    initializeInteractiveElements();
    initializeScrollAnimations();
    initializeNavbarEffects();
    initializeCardHoverEffects();
    initializeFunElements();
});

// Particles.js Configuration
function initializeParticles() {
    if (typeof particlesJS !== 'undefined') {
        particlesJS('particles-js', {
            particles: {
                number: {
                    value: 80,
                    density: {
                        enable: true,
                        value_area: 800
                    }
                },
                color: {
                    value: ['#06B6D4', '#8B5CF6', '#EC4899']
                },
                shape: {
                    type: 'circle',
                    stroke: {
                        width: 0,
                        color: '#000000'
                    }
                },
                opacity: {
                    value: 0.5,
                    random: false,
                    anim: {
                        enable: true,
                        speed: 1,
                        opacity_min: 0.1,
                        sync: false
                    }
                },
                size: {
                    value: 3,
                    random: true,
                    anim: {
                        enable: true,
                        speed: 2,
                        size_min: 0.1,
                        sync: false
                    }
                },
                line_linked: {
                    enable: true,
                    distance: 150,
                    color: '#06B6D4',
                    opacity: 0.4,
                    width: 1
                },
                move: {
                    enable: true,
                    speed: 2,
                    direction: 'none',
                    random: false,
                    straight: false,
                    out_mode: 'out',
                    bounce: false,
                    attract: {
                        enable: false,
                        rotateX: 600,
                        rotateY: 1200
                    }
                }
            },
            interactivity: {
                detect_on: 'canvas',
                events: {
                    onhover: {
                        enable: true,
                        mode: 'repulse'
                    },
                    onclick: {
                        enable: true,
                        mode: 'push'
                    },
                    resize: true
                },
                modes: {
                    grab: {
                        distance: 400,
                        line_linked: {
                            opacity: 1
                        }
                    },
                    bubble: {
                        distance: 400,
                        size: 40,
                        duration: 2,
                        opacity: 8,
                        speed: 3
                    },
                    repulse: {
                        distance: 200,
                        duration: 0.4
                    },
                    push: {
                        particles_nb: 4
                    },
                    remove: {
                        particles_nb: 2
                    }
                }
            },
            retina_detect: true
        });
    }
}

// GSAP Animations
function initializeGSAPAnimations() {
    if (typeof gsap !== 'undefined') {
        // Hero section animations
        gsap.timeline()
            .from('#hero h1', {
                duration: 1.5,
                y: 100,
                opacity: 0,
                ease: 'power3.out'
            })
            .from('#hero p', {
                duration: 1,
                y: 50,
                opacity: 0,
                ease: 'power2.out'
            }, '-=0.5')
            .from('.hero-cta', {
                duration: 1,
                y: 30,
                opacity: 0,
                ease: 'power2.out'
            }, '-=0.3');

        // Navbar brand animation
        gsap.from('.navbar-brand', {
            duration: 1,
            x: -100,
            opacity: 0,
            ease: 'power2.out',
            delay: 0.5
        });

        // Navigation items stagger animation
        gsap.from('.navbar-nav .nav-item', {
            duration: 0.8,
            y: -30,
            opacity: 0,
            stagger: 0.1,
            ease: 'power2.out',
            delay: 0.8
        });

        // Cards entrance animation
        gsap.from('.conversion-card', {
            duration: 1,
            y: 100,
            opacity: 0,
            stagger: 0.2,
            ease: 'power3.out',
            scrollTrigger: {
                trigger: '#cards-section',
                start: 'top 80%',
                end: 'bottom 20%',
                toggleActions: 'play none none reverse'
            }
        });

        // Feature cards animation
        gsap.from('.feature-card', {
            duration: 1,
            scale: 0.8,
            opacity: 0,
            stagger: 0.2,
            ease: 'back.out(1.7)',
            scrollTrigger: {
                trigger: '#features-section',
                start: 'top 80%',
                end: 'bottom 20%',
                toggleActions: 'play none none reverse'
            }
        });

        // FAQ accordion animation
        gsap.from('.accordion-item', {
            duration: 0.8,
            x: -50,
            opacity: 0,
            stagger: 0.1,
            ease: 'power2.out',
            scrollTrigger: {
                trigger: '#faqs-section',
                start: 'top 80%',
                end: 'bottom 20%',
                toggleActions: 'play none none reverse'
            }
        });

        // Footer animation
        gsap.from('footer .col-lg-4, footer .col-lg-2', {
            duration: 1,
            y: 50,
            opacity: 0,
            stagger: 0.1,
            ease: 'power2.out',
            scrollTrigger: {
                trigger: 'footer',
                start: 'top 90%',
                end: 'bottom 20%',
                toggleActions: 'play none none reverse'
            }
        });
    }
}

// Interactive Elements
function initializeInteractiveElements() {
    // Smooth scrolling for anchor links
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

    // Search functionality
    const searchInput = document.querySelector('.form-control[type="search"]');
    const searchButton = document.querySelector('.btn-outline-light');
    
    if (searchInput && searchButton) {
        searchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                e.preventDefault();
                performSearch(this.value);
            }
        });
        
        searchButton.addEventListener('click', function(e) {
            e.preventDefault();
            performSearch(searchInput.value);
        });
    }

    // Dynamic typing effect for hero subtitle
    const heroSubtitle = document.querySelector('#hero p');
    if (heroSubtitle) {
        const originalText = heroSubtitle.textContent;
        heroSubtitle.textContent = '';
        typeWriter(heroSubtitle, originalText, 50);
    }
}

// Search functionality
function performSearch(query) {
    if (!query.trim()) return;
    
    // Show loading state
    const searchButton = document.querySelector('.btn-outline-light');
    const originalContent = searchButton.innerHTML;
    searchButton.innerHTML = '<div class="loading-spinner"></div>';
    
    // Simulate search (replace with actual search logic)
    setTimeout(() => {
        searchButton.innerHTML = originalContent;
        
        // Simple search through conversion cards
        const cards = document.querySelectorAll('.conversion-card');
        let found = false;
        
        cards.forEach(card => {
            const title = card.querySelector('.card-title').textContent.toLowerCase();
            const text = card.querySelector('.card-text').textContent.toLowerCase();
            
            if (title.includes(query.toLowerCase()) || text.includes(query.toLowerCase())) {
                card.scrollIntoView({ behavior: 'smooth', block: 'center' });
                card.style.transform = 'scale(1.05)';
                card.style.boxShadow = '0 0 30px rgba(6, 182, 212, 0.5)';
                found = true;
                
                setTimeout(() => {
                    card.style.transform = '';
                    card.style.boxShadow = '';
                }, 2000);
                
                return;
            }
        });
        
        if (!found) {
            showNotification('No results found for "' + query + '"', 'info');
        }
    }, 1000);
}

// Typewriter effect
function typeWriter(element, text, speed) {
    let i = 0;
    function type() {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    setTimeout(type, 2000); // Start after 2 seconds
}

// Scroll animations
function initializeScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    // Observe elements for scroll animations
    document.querySelectorAll('.fade-in-up').forEach(el => {
        observer.observe(el);
    });
}

// Navbar effects
function initializeNavbarEffects() {
    const navbar = document.querySelector('.navbar');
    let lastScrollTop = 0;

    window.addEventListener('scroll', () => {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        // Change navbar background on scroll
        if (scrollTop > 100) {
            navbar.style.background = 'rgba(15, 15, 35, 0.95)';
            navbar.style.backdropFilter = 'blur(20px)';
        } else {
            navbar.style.background = 'rgba(255, 255, 255, 0.1)';
            navbar.style.backdropFilter = 'blur(20px)';
        }
        
        // Hide/show navbar on scroll
        if (scrollTop > lastScrollTop && scrollTop > 200) {
            navbar.style.transform = 'translateY(-100%)';
        } else {
            navbar.style.transform = 'translateY(0)';
        }
        
        lastScrollTop = scrollTop;
    });
}

// Card hover effects
function initializeCardHoverEffects() {
    const cards = document.querySelectorAll('.conversion-card');
    
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            if (typeof gsap !== 'undefined') {
                gsap.to(this, {
                    duration: 0.3,
                    y: -15,
                    scale: 1.02,
                    ease: 'power2.out'
                });
                
                gsap.to(this.querySelector('.card-img-top'), {
                    duration: 0.3,
                    scale: 1.1,
                    ease: 'power2.out'
                });
            }
        });
        
        card.addEventListener('mouseleave', function() {
            if (typeof gsap !== 'undefined') {
                gsap.to(this, {
                    duration: 0.3,
                    y: 0,
                    scale: 1,
                    ease: 'power2.out'
                });
                
                gsap.to(this.querySelector('.card-img-top'), {
                    duration: 0.3,
                    scale: 1,
                    ease: 'power2.out'
                });
            }
        });
    });
}

// Fun interactive elements
function initializeFunElements() {
    // Floating action button
    createFloatingActionButton();
    
    // Easter egg - Konami code
    initializeKonamiCode();
    
    // Random color theme switcher
    initializeThemeSwitcher();
    
    // Cursor trail effect
    initializeCursorTrail();
    
    // Click ripple effect
    initializeRippleEffect();
}

// Floating action button
function createFloatingActionButton() {
    const fab = document.createElement('div');
    fab.className = 'floating-action-btn';
    fab.innerHTML = '<i class="fas fa-rocket"></i>';
    fab.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 60px;
        height: 60px;
        background: linear-gradient(45deg, var(--accent-cyan), var(--accent-purple));
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        color: white;
        font-size: 1.5rem;
        cursor: pointer;
        box-shadow: 0 4px 20px rgba(6, 182, 212, 0.4);
        transition: all 0.3s ease;
        z-index: 1000;
        opacity: 0;
        transform: scale(0);
    `;
    
    document.body.appendChild(fab);
    
    // Show FAB when scrolled down
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            fab.style.opacity = '1';
            fab.style.transform = 'scale(1)';
        } else {
            fab.style.opacity = '0';
            fab.style.transform = 'scale(0)';
        }
    });
    
    // Scroll to top on click
    fab.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        
        // Fun animation
        if (typeof gsap !== 'undefined') {
            gsap.to(fab, {
                duration: 0.3,
                rotation: 360,
                scale: 1.2,
                ease: 'power2.out',
                yoyo: true,
                repeat: 1
            });
        }
    });
}

// Konami code easter egg
function initializeKonamiCode() {
    const konamiCode = [
        'ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown',
        'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight',
        'KeyB', 'KeyA'
    ];
    let userInput = [];
    
    document.addEventListener('keydown', (e) => {
        userInput.push(e.code);
        
        if (userInput.length > konamiCode.length) {
            userInput.shift();
        }
        
        if (userInput.join(',') === konamiCode.join(',')) {
            activateEasterEgg();
            userInput = [];
        }
    });
}

// Easter egg activation
function activateEasterEgg() {
    // Create rainbow effect
    document.body.style.animation = 'rainbow 2s infinite';
    
    // Add rainbow keyframes if not exists
    if (!document.querySelector('#rainbow-keyframes')) {
        const style = document.createElement('style');
        style.id = 'rainbow-keyframes';
        style.textContent = `
            @keyframes rainbow {
                0% { filter: hue-rotate(0deg); }
                100% { filter: hue-rotate(360deg); }
            }
        `;
        document.head.appendChild(style);
    }
    
    // Show notification
    showNotification('🎉 Konami Code Activated! Rainbow Mode ON!', 'success');
    
    // Reset after 5 seconds
    setTimeout(() => {
        document.body.style.animation = '';
    }, 5000);
}

// Theme switcher
function initializeThemeSwitcher() {
    const themes = [
        { name: 'Ocean', colors: ['#006994', '#47B5FF', '#DDF2FD'] },
        { name: 'Sunset', colors: ['#FF6B6B', '#FFE66D', '#FF8E53'] },
        { name: 'Forest', colors: ['#2D5016', '#A4DE6C', '#76C893'] },
        { name: 'Galaxy', colors: ['#240046', '#7209B7', '#F72585'] }
    ];
    
    // Add theme switcher button to navbar
    const themeBtn = document.createElement('button');
    themeBtn.className = 'btn btn-outline-light ms-2';
    themeBtn.innerHTML = '<i class="fas fa-palette"></i>';
    themeBtn.title = 'Switch Theme';
    
    const searchForm = document.querySelector('.navbar-nav form');
    if (searchForm) {
        searchForm.appendChild(themeBtn);
    }
    
    let currentTheme = 0;
    themeBtn.addEventListener('click', () => {
        currentTheme = (currentTheme + 1) % themes.length;
        const theme = themes[currentTheme];
        
        // Apply theme colors
        document.documentElement.style.setProperty('--accent-cyan', theme.colors[0]);
        document.documentElement.style.setProperty('--accent-purple', theme.colors[1]);
        document.documentElement.style.setProperty('--accent-pink', theme.colors[2]);
        
        showNotification(`Theme switched to ${theme.name}!`, 'info');
    });
}

// Cursor trail effect
function initializeCursorTrail() {
    const trail = [];
    const trailLength = 10;
    
    for (let i = 0; i < trailLength; i++) {
        const dot = document.createElement('div');
        dot.className = 'cursor-trail';
        dot.style.cssText = `
            position: fixed;
            width: 4px;
            height: 4px;
            background: var(--accent-cyan);
            border-radius: 50%;
            pointer-events: none;
            z-index: 9999;
            opacity: ${1 - i / trailLength};
            transition: all 0.1s ease;
        `;
        document.body.appendChild(dot);
        trail.push(dot);
    }
    
    document.addEventListener('mousemove', (e) => {
        trail.forEach((dot, index) => {
            setTimeout(() => {
                dot.style.left = e.clientX + 'px';
                dot.style.top = e.clientY + 'px';
            }, index * 20);
        });
    });
}

// Ripple effect on clicks
function initializeRippleEffect() {
    document.addEventListener('click', (e) => {
        const ripple = document.createElement('div');
        ripple.className = 'ripple-effect';
        ripple.style.cssText = `
            position: fixed;
            width: 20px;
            height: 20px;
            background: radial-gradient(circle, var(--accent-cyan) 0%, transparent 70%);
            border-radius: 50%;
            pointer-events: none;
            z-index: 9999;
            left: ${e.clientX - 10}px;
            top: ${e.clientY - 10}px;
            animation: ripple 0.6s ease-out;
        `;
        
        // Add ripple keyframes if not exists
        if (!document.querySelector('#ripple-keyframes')) {
            const style = document.createElement('style');
            style.id = 'ripple-keyframes';
            style.textContent = `
                @keyframes ripple {
                    0% {
                        transform: scale(0);
                        opacity: 1;
                    }
                    100% {
                        transform: scale(4);
                        opacity: 0;
                    }
                }
            `;
            document.head.appendChild(style);
        }
        
        document.body.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
    });
}

// Notification system
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 1rem 1.5rem;
        background: var(--glass-bg);
        backdrop-filter: blur(20px);
        border: 1px solid var(--glass-border);
        border-radius: 10px;
        color: white;
        z-index: 10000;
        transform: translateX(100%);
        transition: transform 0.3s ease;
        max-width: 300px;
        box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
    `;
    
    notification.textContent = message;
    document.body.appendChild(notification);
    
    // Slide in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Slide out and remove
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 3000);
}

// Performance optimization
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Lazy loading for images
function initializeLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}

// Initialize lazy loading
initializeLazyLoading();

