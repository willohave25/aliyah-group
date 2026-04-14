/**
 * ALIYAH GROUP - Main JavaScript
 * Created by W2K-DIGITAL
 */

(function() {
    'use strict';

    // ============================================
    // 1. MOBILE MENU TOGGLE
    // ============================================
    const menuToggle = document.getElementById('menuToggle');
    const navMenu = document.getElementById('navMenu');

    if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            
            // Animate menu toggle icon
            this.classList.toggle('active');
        });

        // Close menu when clicking outside
        document.addEventListener('click', function(event) {
            const isClickInside = navMenu.contains(event.target) || menuToggle.contains(event.target);
            
            if (!isClickInside && navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
                menuToggle.classList.remove('active');
            }
        });

        // Close menu when clicking on a link
        const navLinks = navMenu.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                if (window.innerWidth <= 992) {
                    navMenu.classList.remove('active');
                    menuToggle.classList.remove('active');
                }
            });
        });
    }

    // ============================================
    // 2. SMOOTH SCROLL FOR ANCHOR LINKS
    // ============================================
    const scrollLinks = document.querySelectorAll('a[href^="#"]');
    
    scrollLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // Skip if href is just "#"
            if (href === '#') return;
            
            const target = document.querySelector(href);
            
            if (target) {
                e.preventDefault();
                
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = target.offsetTop - headerHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // ============================================
    // 3. HEADER SCROLL EFFECT
    // ============================================
    const header = document.querySelector('.header');
    let lastScroll = 0;

    window.addEventListener('scroll', function() {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
        
        lastScroll = currentScroll;
    });

    // ============================================
    // 4. BACK TO TOP BUTTON
    // ============================================
    const backToTopBtn = document.getElementById('backToTop');

    if (backToTopBtn) {
        window.addEventListener('scroll', function() {
            if (window.pageYOffset > 300) {
                backToTopBtn.classList.add('show');
            } else {
                backToTopBtn.classList.remove('show');
            }
        });

        backToTopBtn.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // ============================================
    // 5. FORM VALIDATION (Contact & Devis)
    // ============================================
    const contactForm = document.getElementById('contactForm');
    const devisForm = document.getElementById('devisForm');

    // Simple validation function
    function validateForm(form) {
        let isValid = true;
        const requiredFields = form.querySelectorAll('[required]');
        
        requiredFields.forEach(field => {
            if (!field.value.trim()) {
                isValid = false;
                field.style.borderColor = '#f56565';
            } else {
                field.style.borderColor = '#cbd5e0';
            }
        });
        
        // Email validation
        const emailFields = form.querySelectorAll('input[type="email"]');
        emailFields.forEach(field => {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (field.value && !emailRegex.test(field.value)) {
                isValid = false;
                field.style.borderColor = '#f56565';
            }
        });
        
        return isValid;
    }

    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            if (!validateForm(this)) {
                e.preventDefault();
                alert('Veuillez remplir tous les champs obligatoires correctement.');
                return false;
            }
            
            // Success message (will be handled by Formspree)
            console.log('Formulaire de contact soumis');
        });
    }

    if (devisForm) {
        devisForm.addEventListener('submit', function(e) {
            if (!validateForm(this)) {
                e.preventDefault();
                alert('Veuillez remplir tous les champs obligatoires correctement.');
                return false;
            }
            
            console.log('Formulaire de devis soumis');
        });
    }

    // ============================================
    // 6. DEVIS FORM - CONDITIONAL FIELDS
    // ============================================
    if (devisForm) {
        const serviceRadios = document.querySelectorAll('input[name="service"]');
        const conditionalSections = {
            'fret': document.getElementById('fretDetails'),
            'btp': document.getElementById('btpDetails'),
            'location-residence': document.getElementById('residenceDetails'),
            'location-vehicule': document.getElementById('vehiculeDetails')
        };

        serviceRadios.forEach(radio => {
            radio.addEventListener('change', function() {
                // Hide all conditional sections
                Object.values(conditionalSections).forEach(section => {
                    if (section) {
                        section.style.display = 'none';
                    }
                });

                // Show selected section
                const selectedSection = conditionalSections[this.value];
                if (selectedSection) {
                    selectedSection.style.display = 'block';
                    
                    // Smooth scroll to the section
                    setTimeout(() => {
                        selectedSection.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
                    }, 100);
                }
            });
        });
    }

    // ============================================
    // 7. SCROLL ANIMATIONS (Fade in on scroll)
    // ============================================
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in-up');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Elements to animate
    const animateElements = document.querySelectorAll('.service-card, .value-card, .process-step, .feature-item, .vehicule-card');
    
    animateElements.forEach(el => {
        observer.observe(el);
    });

    // ============================================
    // 8. FORM INPUT FOCUS EFFECTS
    // ============================================
    const formInputs = document.querySelectorAll('input, textarea, select');
    
    formInputs.forEach(input => {
        input.addEventListener('focus', function() {
            this.parentElement.classList.add('focused');
        });
        
        input.addEventListener('blur', function() {
            this.parentElement.classList.remove('focused');
            
            // Reset border color if field is valid
            if (this.value.trim()) {
                this.style.borderColor = '#2d7a3e';
            } else if (this.hasAttribute('required')) {
                this.style.borderColor = '#cbd5e0';
            }
        });
    });

    // ============================================
    // 9. LOADING STATE
    // ============================================
    window.addEventListener('load', function() {
        document.body.classList.add('loaded');
    });

    // ============================================
    // 10. UTILITY FUNCTIONS
    // ============================================
    
    // Debounce function for scroll events
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

    // Log console message
    console.log('%c🚀 Site ALIYAH GROUP chargé avec succès!', 'color: #2d7a3e; font-size: 16px; font-weight: bold;');
    console.log('%cCréé par W2K-DIGITAL - https://w2k-digital.com', 'color: #4a5568; font-size: 12px;');

    // ============================================
    // SLIDESHOW FRET
    // ============================================
    function initFretSlideshow() {
        const slides = document.querySelectorAll('.fret-slideshow-section .slide');
        if (slides.length === 0) return;

        let currentSlide = 0;

        function nextSlide() {
            slides[currentSlide].classList.remove('active');
            currentSlide = (currentSlide + 1) % slides.length;
            slides[currentSlide].classList.add('active');
        }

        setInterval(nextSlide, 5000);
    }

    if (document.querySelector('.fret-slideshow-section')) {
        initFretSlideshow();
    }

    // ============================================
    // AUTO-SCROLL LENT ET CONTINU
    // ============================================
    let autoScrollEnabled = true;
    let autoScrollInterval;
    const SCROLL_SPEED = 0.5; // pixels par frame (lent)

    function startAutoScroll() {
        if (autoScrollInterval) clearInterval(autoScrollInterval);

        autoScrollInterval = setInterval(function() {
            if (!autoScrollEnabled) return;

            const scrollBottom = window.scrollY + window.innerHeight;
            const docHeight = document.documentElement.scrollHeight;

            if (scrollBottom >= docHeight - 5) {
                // En bas de la page : remonter en haut en douceur
                window.scrollTo({ top: 0, behavior: 'smooth' });
            } else {
                window.scrollBy(0, SCROLL_SPEED);
            }
        }, 30);
    }

    // Pause sur interaction utilisateur, reprise automatique après 30s
    let resumeTimeout;
    function pauseAutoScroll() {
        autoScrollEnabled = false;
        clearTimeout(resumeTimeout);
        resumeTimeout = setTimeout(function() {
            autoScrollEnabled = true;
        }, 30000);
    }

    // Détecter l'interaction utilisateur
    ['click', 'touchstart', 'keydown', 'mousedown'].forEach(function(evt) {
        document.addEventListener(evt, pauseAutoScroll, { passive: true });
    });

    // Bouton toggle
    const toggleBtn = document.getElementById('toggleAutoScroll');
    if (toggleBtn) {
        toggleBtn.addEventListener('click', function() {
            autoScrollEnabled = !autoScrollEnabled;
            this.querySelector('.icon').textContent = autoScrollEnabled ? '⏸️' : '▶️';
            if (!autoScrollEnabled) {
                clearTimeout(resumeTimeout);
            }
        });
    }

    // Démarrer l'auto-scroll 3 secondes après le chargement
    window.addEventListener('load', function() {
        setTimeout(startAutoScroll, 3000);
    });

})();
