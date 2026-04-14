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
            'fret':               document.getElementById('fretDetails'),
            'btp':                document.getElementById('btpDetails'),
            'location-residence': document.getElementById('residenceDetails'),
            'location-vehicule':  document.getElementById('vehiculeDetails'),
            'marketing-digital':  document.getElementById('marketingDetails')
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

    // ============================================
    // BOUTON WHATSAPP FLOTTANT
    // ============================================
    var WA_NUMBER = '33634028048'; // Numéro Paris sans le +

    var waCSS = `
        .wa-float {
            position: fixed;
            bottom: 80px;
            right: 20px;
            width: 52px;
            height: 52px;
            background: #25d366;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            box-shadow: 0 4px 12px rgba(37,211,102,0.4);
            cursor: pointer;
            z-index: 9998;
            transition: transform 0.2s, box-shadow 0.2s;
            text-decoration: none;
        }
        .wa-float:hover {
            transform: scale(1.1);
            box-shadow: 0 6px 16px rgba(37,211,102,0.55);
        }
        .wa-float svg {
            width: 28px;
            height: 28px;
            fill: white;
        }
        .wa-tooltip {
            position: absolute;
            right: 60px;
            background: #333;
            color: white;
            font-size: 0.78rem;
            padding: 5px 10px;
            border-radius: 6px;
            white-space: nowrap;
            opacity: 0;
            pointer-events: none;
            transition: opacity 0.2s;
        }
        .wa-float:hover .wa-tooltip { opacity: 1; }
        @media (max-width: 600px) {
            .wa-float { bottom: 70px; right: 14px; width: 46px; height: 46px; }
        }
    `;

    var waHTML = '<a class="wa-float" href="https://wa.me/' + WA_NUMBER + '" target="_blank" rel="noopener" aria-label="Contacter sur WhatsApp">' +
        '<span class="wa-tooltip">WhatsApp</span>' +
        '<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">' +
            '<path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>' +
            '<path d="M12 0C5.373 0 0 5.373 0 12c0 2.123.554 4.118 1.528 5.849L.057 23.571a.5.5 0 0 0 .6.628l5.879-1.453A11.952 11.952 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.812 9.812 0 0 1-5.032-1.386l-.36-.214-3.733.922.955-3.624-.235-.373A9.818 9.818 0 0 1 2.182 12C2.182 6.57 6.57 2.182 12 2.182S21.818 6.57 21.818 12 17.43 21.818 12 21.818z"/>' +
        '</svg>' +
    '</a>';

    // Injecter le style et le bouton
    var waStyle = document.createElement('style');
    waStyle.textContent = waCSS;
    document.head.appendChild(waStyle);

    document.addEventListener('DOMContentLoaded', function() {
        var el = document.createElement('div');
        el.innerHTML = waHTML;
        document.body.appendChild(el.firstChild);
    });

    if (document.readyState !== 'loading') {
        var el = document.createElement('div');
        el.innerHTML = waHTML;
        document.body.appendChild(el.firstChild);
    }

})();
