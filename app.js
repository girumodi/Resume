// Resume Application JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // Initialize the resume application
    initializeResume();
});

function initializeResume() {
    // Add smooth hover effects for interactive elements
    addHoverEffects();
    
    // Add keyboard navigation support
    addKeyboardSupport();
    
    // Add print optimization
    optimizePrintLayout();
    
    // Add contact link tracking
    addContactLinkHandlers();
}

// Print Resume Function
function printResume() {
    // Show loading state
    const printBtn = document.querySelector('.print-btn');
    const originalText = printBtn.innerHTML;
    printBtn.innerHTML = '🖨️ Preparing...';
    printBtn.disabled = true;
    
    // Small delay to show loading state
    setTimeout(() => {
        // Trigger print dialog
        window.print();
        
        // Reset button after print dialog
        setTimeout(() => {
            printBtn.innerHTML = originalText;
            printBtn.disabled = false;
        }, 1000);
    }, 300);
}

// Add hover effects for better interactivity
function addHoverEffects() {
    // Skill tags hover effect
    const skillTags = document.querySelectorAll('.skill-tag');
    skillTags.forEach(tag => {
        tag.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px) scale(1.05)';
        });
        
        tag.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
    
    // Interest tags hover effect
    const interestTags = document.querySelectorAll('.interest-tag');
    interestTags.forEach(tag => {
        tag.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-3px) scale(1.05)';
        });
        
        tag.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
    
    // Section hover effects
    const sections = document.querySelectorAll('.section');
    sections.forEach(section => {
        section.addEventListener('mouseenter', function() {
            const title = this.querySelector('.section-title');
            if (title) {
                title.style.transform = 'translateX(5px)';
                title.style.transition = 'transform 0.3s ease';
            }
        });
        
        section.addEventListener('mouseleave', function() {
            const title = this.querySelector('.section-title');
            if (title) {
                title.style.transform = 'translateX(0)';
            }
        });
    });
}

// Add keyboard navigation support
function addKeyboardSupport() {
    // Make print button accessible via keyboard
    const printBtn = document.querySelector('.print-btn');
    printBtn.addEventListener('keydown', function(e) {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            printResume();
        }
    });
    
    // Add keyboard navigation for contact links
    const contactLinks = document.querySelectorAll('.contact-item a');
    contactLinks.forEach(link => {
        link.addEventListener('keydown', function(e) {
            if (e.key === 'Enter') {
                this.click();
            }
        });
    });
}

// Optimize print layout
function optimizePrintLayout() {
    // Listen for before print event
    window.addEventListener('beforeprint', function() {
        // Add print-specific class to body
        document.body.classList.add('printing');
        
        // Temporarily adjust layout for better printing
        const leftColumn = document.querySelector('.left-column');
        const rightColumn = document.querySelector('.right-column');
        
        if (leftColumn && rightColumn) {
            leftColumn.style.pageBreakAfter = 'avoid';
            rightColumn.style.pageBreakBefore = 'avoid';
        }
    });
    
    // Listen for after print event
    window.addEventListener('afterprint', function() {
        // Remove print-specific class
        document.body.classList.remove('printing');
        
        // Reset any temporary styles
        const leftColumn = document.querySelector('.left-column');
        const rightColumn = document.querySelector('.right-column');
        
        if (leftColumn && rightColumn) {
            leftColumn.style.pageBreakAfter = '';
            rightColumn.style.pageBreakBefore = '';
        }
    });
}

// Add contact link handlers
function addContactLinkHandlers() {
    // Email link
    const emailLink = document.querySelector('a[href^="mailto:"]');
    if (emailLink) {
        emailLink.addEventListener('click', function(e) {
            // Add visual feedback
            this.style.opacity = '0.7';
            setTimeout(() => {
                this.style.opacity = '1';
            }, 200);
        });
    }
    
    // Phone link
    const phoneLink = document.querySelector('a[href^="tel:"]');
    if (phoneLink) {
        phoneLink.addEventListener('click', function(e) {
            // Add visual feedback
            this.style.opacity = '0.7';
            setTimeout(() => {
                this.style.opacity = '1';
            }, 200);
        });
    }
    
    // External links (LinkedIn, GitHub)
    const externalLinks = document.querySelectorAll('a[target="_blank"]');
    externalLinks.forEach(link => {
        link.addEventListener('click', function() {
            // Add visual feedback for external links
            this.style.opacity = '0.7';
            setTimeout(() => {
                this.style.opacity = '1';
            }, 200);
        });
    });
}

// Utility function to add smooth scroll to sections (if needed for navigation)
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        section.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
}

// Add animation on scroll for better user experience
function addScrollAnimations() {
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
    
    // Observe all sections for scroll animations
    const sections = document.querySelectorAll('.section');
    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(20px)';
        section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(section);
    });
}

// Initialize scroll animations after page load
window.addEventListener('load', function() {
    // Add a small delay to ensure all styles are loaded
    setTimeout(() => {
        addScrollAnimations();
    }, 100);
});

// Handle responsive behavior
function handleResponsiveFeatures() {
    const mediaQuery = window.matchMedia('(max-width: 768px)');
    
    function handleTabletChange(e) {
        if (e.matches) {
            // Mobile/tablet specific behavior
            const header = document.querySelector('.resume-header');
            header.style.textAlign = 'center';
        } else {
            // Desktop behavior
            const header = document.querySelector('.resume-header');
            header.style.textAlign = 'left';
        }
    }
    
    mediaQuery.addListener(handleTabletChange);
    handleTabletChange(mediaQuery);
}

// Initialize responsive features
handleResponsiveFeatures();

// Add error handling for any potential issues
window.addEventListener('error', function(e) {
    console.warn('Resume app error:', e.message);
    // Graceful degradation - ensure basic functionality works
});

// Expose print function globally for HTML onclick
window.printResume = printResume;