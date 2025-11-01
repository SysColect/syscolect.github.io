// Navigation scroll effect
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Mobile menu toggle
const menuToggle = document.getElementById('menuToggle');
const navMenu = document.getElementById('navMenu');

if (menuToggle && navMenu) {
    menuToggle.addEventListener('click', function() {
        navMenu.classList.toggle('active');
        const icon = menuToggle.querySelector('.material-icons');
        if (navMenu.classList.contains('active')) {
            icon.textContent = 'close';
        } else {
            icon.textContent = 'menu';
        }
    });

    // Close menu when clicking outside
    document.addEventListener('click', function(event) {
        const isClickInsideNav = navMenu.contains(event.target) || menuToggle.contains(event.target);
        if (!isClickInsideNav && navMenu.classList.contains('active')) {
            navMenu.classList.remove('active');
            menuToggle.querySelector('.material-icons').textContent = 'menu';
        }
    });

    // Close menu when clicking on a link
    const navLinks = navMenu.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navMenu.classList.remove('active');
            menuToggle.querySelector('.material-icons').textContent = 'menu';
        });
    });
}

// Smooth scroll for hero scroll indicator
const heroScroll = document.querySelector('.hero-scroll');
if (heroScroll) {
    heroScroll.addEventListener('click', function() {
        const solutionsSection = document.querySelector('.solutions');
        if (solutionsSection) {
            solutionsSection.scrollIntoView({ behavior: 'smooth' });
        }
    });
}

// Intersection Observer for fade-in animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe solution cards and feature items
document.addEventListener('DOMContentLoaded', function() {
    const animatedElements = document.querySelectorAll('.solution-card, .feature-item');
    animatedElements.forEach((el, index) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = `opacity 0.6s ease-out ${index * 0.1}s, transform 0.6s ease-out ${index * 0.1}s`;
        observer.observe(el);
    });
});

// Add hover effect enhancement for cards
document.addEventListener('DOMContentLoaded', function() {
    const cards = document.querySelectorAll('.solution-card, .feature-item');
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px) scale(1.02)';
        });
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
});

// Copy email functionality
document.addEventListener('DOMContentLoaded', function() {
    const copyBtn = document.getElementById('copyEmailBtn');
    const email = 'contato@syscolect.com';
    
    if (copyBtn) {
        copyBtn.addEventListener('click', async function(e) {
            e.stopPropagation(); // Prevent triggering the card click
            e.preventDefault(); // Prevent default button behavior
            
            try {
                await navigator.clipboard.writeText(email);
                
                // Update button state
                copyBtn.classList.add('copied');
                const tooltip = copyBtn.querySelector('.copy-tooltip');
                const originalText = tooltip.textContent;
                tooltip.textContent = 'Copiado!';
                
                // Reset after 2 seconds
                setTimeout(() => {
                    copyBtn.classList.remove('copied');
                    tooltip.textContent = originalText;
                }, 2000);
            } catch (err) {
                // Fallback for older browsers
                const textArea = document.createElement('textarea');
                textArea.value = email;
                textArea.style.position = 'fixed';
                textArea.style.opacity = '0';
                document.body.appendChild(textArea);
                textArea.select();
                
                try {
                    document.execCommand('copy');
                    copyBtn.classList.add('copied');
                    const tooltip = copyBtn.querySelector('.copy-tooltip');
                    const originalText = tooltip.textContent;
                    tooltip.textContent = 'Copiado!';
                    
                    setTimeout(() => {
                        copyBtn.classList.remove('copied');
                        tooltip.textContent = originalText;
                    }, 2000);
                } catch (fallbackErr) {
                    console.error('Failed to copy email:', fallbackErr);
                }
                
                document.body.removeChild(textArea);
            }
        });
    }
});
