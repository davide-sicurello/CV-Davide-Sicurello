// DOM Elements
const versionToggle = document.getElementById('versionToggle');
const experienceBase = document.getElementById('experienceBase');
const experienceComplete = document.getElementById('experienceComplete');
const linkedinBtn = document.getElementById('linkedinBtn');
const floatingLinkedin = document.getElementById('floatingLinkedin');

// PASSWORD PROTECTION FOR COMPLETE VERSION
const COMPLETE_VERSION_PASSWORD = "prova"; // Cambia questa password!

// Animation Observer
const observerOptions = {
    root: null,
    rootMargin: '0px 0px -100px 0px',
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate');
        }
    });
}, observerOptions);

// Initialize animations
function initAnimations() {
    const sections = document.querySelectorAll('.section');
    sections.forEach(section => {
        observer.observe(section);
    });
}

// PROTECTED TOGGLE FUNCTION
function toggleExperience() {
    const isComplete = versionToggle.checked;
    
    // Se sta cercando di attivare la versione completa
    if (isComplete) {
        const password = prompt("Inserisci la password:");
        
        // Se password sbagliata o cancellato
        if (password !== COMPLETE_VERSION_PASSWORD) {
            // Rimette il toggle su false
            versionToggle.checked = false;
            if (password !== null) { // Solo se non ha cancellato
                alert("Password errata!");
            }
            return;
        }
    }
    
    // Hide both sections first
    experienceBase.style.display = 'none';
    experienceComplete.style.display = 'none';
    
    // Remove active class from both
    experienceBase.classList.remove('active');
    experienceComplete.classList.remove('active');
    
    // Show the appropriate version after a short delay for smooth transition
    setTimeout(() => {
        if (isComplete) {
            experienceComplete.style.display = 'block';
            experienceComplete.classList.add('active');
        } else {
            experienceBase.style.display = 'block';
            experienceBase.classList.add('active');
        }
    }, 100);
    
    // Log for debugging
    console.log(`Toggled to ${isComplete ? 'complete' : 'base'} version`);
}

// LinkedIn functionality
function openLinkedIn() {
    const confirmed = confirm('Vuoi visitare LinkedIn per cercare Davide Sicurello?');
    if (confirmed) {
        window.open('https://www.linkedin.com/in/davide-sicurello', '_blank');
    }
}

// Smooth scroll to top functionality
function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

// Add scroll-to-top functionality on logo click
function initScrollToTop() {
    const heroName = document.querySelector('.hero-name');
    if (heroName) {
        heroName.style.cursor = 'pointer';
        heroName.addEventListener('click', scrollToTop);
        heroName.title = 'Clicca per tornare all\'inizio';
    }
}

// Add floating effect to cards
function initCardEffects() {
    const cards = document.querySelectorAll('.card');
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-4px)';
            this.style.transition = 'transform 0.3s ease';
        });

        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
}

// Add typing effect to hero subtitle
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.textContent = '';
    function type() {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    type();
}

// Initialize typing effect
function initTypingEffect() {
    const subtitle = document.querySelector('.hero-subtitle');
    if (subtitle) {
        const originalText = subtitle.textContent;
        // Start typing effect after a short delay
        setTimeout(() => {
            typeWriter(subtitle, originalText, 80);
        }, 1000);
    }
}

// Add parallax effect to hero section
function initParallax() {
    const hero = document.querySelector('.hero');
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.5;
        if (hero && scrolled < window.innerHeight) {
            hero.style.transform = `translateY(${rate}px)`;
        }
    });
}

// Add skill tag click effects
function initSkillTags() {
    const skillTags = document.querySelectorAll('.skill-tag');
    skillTags.forEach(tag => {
        tag.addEventListener('click', function(e) {
            // Create a ripple effect
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = (e.clientX - rect.left - size / 2) + 'px';
            ripple.style.top = (e.clientY - rect.top - size / 2) + 'px';
            ripple.classList.add('ripple');
            this.appendChild(ripple);

            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
}

// Add CSS for ripple effect
function addRippleCSS() {
    const style = document.createElement('style');
    style.textContent = `
        .skill-tag {
            position: relative;
            overflow: hidden;
        }
        .ripple {
            position: absolute;
            border-radius: 50%;
            background: rgba(255, 255, 255, 0.3);
            transform: scale(0);
            animation: ripple-animation 0.6s ease-out;
            pointer-events: none;
        }
        @keyframes ripple-animation {
            to {
                transform: scale(2);
                opacity: 0;
            }
        }
        .card {
            transition: transform 0.3s ease, box-shadow 0.3s ease;
        }
    `;
    document.head.appendChild(style);
}

// Initialize navbar scroll effect
function initNavbarEffect() {
    let lastScrollTop = 0;
    window.addEventListener('scroll', () => {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        // Add class to body based on scroll position
        if (scrollTop > 100) {
            document.body.classList.add('scrolled');
        } else {
            document.body.classList.remove('scrolled');
        }
        lastScrollTop = scrollTop;
    });
}

// Add contact form functionality
function initContactForm() {
    const contactButtons = document.querySelectorAll('.contact-buttons .btn');
    contactButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            if (this.id === 'linkedinBtn') {
                e.preventDefault();
                openLinkedIn();
            }
        });
    });
}

// Add loading animation
function initLoadingAnimation() {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease-in-out';
    window.addEventListener('load', () => {
        document.body.style.opacity = '1';
    });
}

// Initialize keyboard navigation
function initKeyboardNavigation() {
    document.addEventListener('keydown', (e) => {
        // Press 'T' to toggle experience version (with password protection)
        if (e.key === 't' || e.key === 'T') {
            if (!e.target.matches('input, textarea, select')) {
                versionToggle.checked = !versionToggle.checked;
                toggleExperience();
            }
        }
        // Press 'L' to open LinkedIn
        if (e.key === 'l' || e.key === 'L') {
            if (!e.target.matches('input, textarea, select')) {
                openLinkedIn();
            }
        }
        // Press 'Home' to scroll to top
        if (e.key === 'Home') {
            e.preventDefault();
            scrollToTop();
        }
    });
}

// Initialize the experience sections correctly
function initExperienceSections() {
    // Make sure base version is shown by default
    experienceBase.style.display = 'block';
    experienceComplete.style.display = 'none';
    experienceBase.classList.add('active');
    experienceComplete.classList.remove('active');
    // Ensure toggle is unchecked by default
    versionToggle.checked = false;
}

// Main initialization function
function init() {
    // Core functionality
    initLoadingAnimation();
    initExperienceSections(); // Initialize experience sections first
    initAnimations();
    initScrollToTop();
    initCardEffects();
    initTypingEffect();
    initParallax();
    initSkillTags();
    addRippleCSS();
    initNavbarEffect();
    initContactForm();
    initKeyboardNavigation();

    // Event listeners
    if (versionToggle) {
        versionToggle.addEventListener('change', toggleExperience);
    }

    if (linkedinBtn) {
        linkedinBtn.addEventListener('click', function(e) {
            e.preventDefault();
            openLinkedIn();
        });
    }

    if (floatingLinkedin) {
        floatingLinkedin.addEventListener('click', function(e) {
            e.preventDefault();
            openLinkedIn();
        });
    }

    // Add hover effects to buttons
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px)';
            this.style.transition = 'transform 0.3s ease';
        });

        button.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });

    // Show welcome message in console
    console.log('🚀 Davide Sicurello - CV Digitale caricato con successo!');
    console.log('💡 Scorciatoie da tastiera:');
    console.log(' T - Cambia versione esperienza (richiede password)');
    console.log(' L - Apri LinkedIn');
    console.log(' Home - Torna all\'inizio');
    console.log('🔒 Versione completa protetta da password');
}

// Start the application when DOM is loaded
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}

// Export functions for potential external use
window.CVApp = {
    toggleExperience,
    openLinkedIn,
    scrollToTop
};
