// Mobile menu toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger?.addEventListener('click', () => {
    navMenu?.classList.toggle('active');
    hamburger.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-menu a').forEach(link => {
    link.addEventListener('click', () => {
        navMenu?.classList.remove('active');
        hamburger?.classList.remove('active');
    });
});

// Smooth scrolling for navigation links
function scrollToSection(sectionId) {
    const element = document.getElementById(sectionId);
    if (element) {
        const offsetTop = element.offsetTop - 70; // Account for fixed header
        window.scrollTo({
            top: offsetTop,
            behavior: 'smooth'
        });
    }
}

// Navigation scroll effect will be handled by the debounced handler below

// Modal functionality
const modal = document.getElementById('bookingModal');
const closeBtn = document.querySelector('.close');

function openBookingModal() {
    if (modal) {
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden';

        // Set minimum date to today
        const dateInput = document.getElementById('date');
        if (dateInput) {
            const today = new Date().toISOString().split('T')[0];
            dateInput.min = today;
            dateInput.value = today;
        }
    }
}

function closeBookingModal() {
    if (modal) {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
}

// Close modal when clicking the X
closeBtn?.addEventListener('click', closeBookingModal);

// Close modal when clicking outside of it
window.addEventListener('click', (event) => {
    if (event.target === modal) {
        closeBookingModal();
    }
});

// Close modal with Escape key
document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && modal?.style.display === 'block') {
        closeBookingModal();
    }
});

// Form submission handling
document.addEventListener('DOMContentLoaded', () => {
    // Contact form
    const contactForm = document.querySelector('.contact-form form');
    contactForm?.addEventListener('submit', (e) => {
        e.preventDefault();

        // Get form data
        const formData = new FormData(contactForm);
        const data = Object.fromEntries(formData);

        // Simulate form submission
        alert('Thank you for your message! We\'ll get back to you within 24 hours.');
        contactForm.reset();
    });

    // Booking form
    const bookingForm = document.querySelector('.booking-form');
    bookingForm?.addEventListener('submit', (e) => {
        e.preventDefault();

        const date = document.getElementById('date')?.value;
        const time = document.getElementById('time')?.value;
        const duration = document.getElementById('duration')?.value;
        const players = document.getElementById('players')?.value;

        if (!date || !time || !duration || !players) {
            alert('Please fill in all fields.');
            return;
        }

        // Calculate total cost
        const hourlyRate = 45;
        const totalCost = hourlyRate * parseInt(duration);

        // Show confirmation
        const timeDisplay = time.includes(':') ? time : `${time}:00`;
        const confirmationMessage = `
Booking Confirmation:
• Date: ${new Date(date).toLocaleDateString()}
• Time: ${timeDisplay}
• Duration: ${duration} hour(s)
• Players: ${players}
• Total Cost: $${totalCost}

Click OK to proceed to payment.
        `;

        if (confirm(confirmationMessage)) {
            alert('Redirecting to payment... (This is a demo)');
            closeBookingModal();
            bookingForm.reset();
        }
    });
});

// Intersection Observer for animations
const observeElements = () => {
    const options = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
            }
        });
    }, options);

    // Observe feature cards, pricing cards, and testimonials
    document.querySelectorAll('.feature-card, .pricing-card, .testimonial-card').forEach(el => {
        observer.observe(el);
    });
};

// Initialize animations when DOM is loaded
document.addEventListener('DOMContentLoaded', observeElements);

// Parallax effect will be handled by the debounced handler below

// Dynamic pricing updates
function updatePricing() {
    const durationSelect = document.getElementById('duration');
    if (!durationSelect) return;

    durationSelect.addEventListener('change', (e) => {
        const duration = parseInt(e.target.value);
        if (duration) {
            const totalCost = 45 * duration;
            // Update any display elements showing the total cost
            console.log(`Selected ${duration} hours for $${totalCost}`);
        }
    });
}

// Initialize pricing updates
document.addEventListener('DOMContentLoaded', updatePricing);

// Add loading states to buttons
function addLoadingState(button) {
    const originalText = button.innerHTML;
    button.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Loading...';
    button.disabled = true;

    setTimeout(() => {
        button.innerHTML = originalText;
        button.disabled = false;
    }, 2000);
}

// Add click handlers for CTA buttons
document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('button[onclick="openBookingModal()"]').forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            openBookingModal();
        });
    });
});

// Testimonials carousel (auto-rotate)
function initTestimonialsCarousel() {
    const testimonials = document.querySelectorAll('.testimonial-card');
    if (testimonials.length === 0) return;

    let currentIndex = 0;

    const showTestimonial = (index) => {
        testimonials.forEach((testimonial, i) => {
            testimonial.style.opacity = i === index ? '1' : '0.3';
            testimonial.style.transform = i === index ? 'scale(1)' : 'scale(0.95)';
        });
    };

    // Auto-rotate every 5 seconds
    setInterval(() => {
        currentIndex = (currentIndex + 1) % testimonials.length;
        showTestimonial(currentIndex);
    }, 5000);

    // Initialize first testimonial
    showTestimonial(0);
}

// Initialize carousel when DOM is loaded
document.addEventListener('DOMContentLoaded', initTestimonialsCarousel);

// Bounce effect will be handled by the debounced handler below

// Add CSS for bounce animation
const bounceStyle = document.createElement('style');
bounceStyle.textContent = `
    @keyframes bounce {
        0%, 20%, 50%, 80%, 100% {
            transform: translateY(0);
        }
        40% {
            transform: translateY(-10px);
        }
        60% {
            transform: translateY(-5px);
        }
    }

    .navbar.scrolled {
        background: rgba(10, 14, 26, 0.98);
        backdrop-filter: blur(20px);
        box-shadow: 0 2px 20px rgba(0, 217, 255, 0.2);
    }

    .feature-card.animate,
    .pricing-card.animate,
    .testimonial-card.animate {
        animation: fadeInUp 0.6s ease forwards;
    }
`;
document.head.appendChild(bounceStyle);

// Add keyboard navigation for modal
document.addEventListener('keydown', (e) => {
    if (modal?.style.display === 'block') {
        const focusableElements = modal.querySelectorAll('input, select, button');
        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];

        if (e.key === 'Tab') {
            if (e.shiftKey) {
                if (document.activeElement === firstElement) {
                    e.preventDefault();
                    lastElement.focus();
                }
            } else {
                if (document.activeElement === lastElement) {
                    e.preventDefault();
                    firstElement.focus();
                }
            }
        }
    }
});

// Performance optimization: Debounce scroll events
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

// Simplified scroll handler with requestAnimationFrame for better performance
let ticking = false;

function updateNavbar() {
    const navbar = document.querySelector('.navbar');
    const scrolled = window.pageYOffset;

    // Navbar effect only
    if (scrolled > 50) {
        navbar?.classList.add('scrolled');
    } else {
        navbar?.classList.remove('scrolled');
    }

    ticking = false;
}

const optimizedScrollHandler = () => {
    if (!ticking) {
        requestAnimationFrame(updateNavbar);
        ticking = true;
    }
};

window.addEventListener('scroll', optimizedScrollHandler, { passive: true });

// Error handling for form validation
function validateBookingForm() {
    const requiredFields = ['date', 'time', 'duration', 'players'];
    const errors = [];

    requiredFields.forEach(fieldId => {
        const field = document.getElementById(fieldId);
        if (!field?.value) {
            errors.push(`${fieldId.charAt(0).toUpperCase() + fieldId.slice(1)} is required`);
        }
    });

    // Validate date is not in the past
    const dateField = document.getElementById('date');
    if (dateField?.value) {
        const selectedDate = new Date(dateField.value);
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        if (selectedDate < today) {
            errors.push('Please select a future date');
        }
    }

    return errors;
}

// Enhanced form submission with validation
document.addEventListener('DOMContentLoaded', () => {
    const bookingForm = document.querySelector('.booking-form');
    bookingForm?.addEventListener('submit', (e) => {
        e.preventDefault();

        const errors = validateBookingForm();
        if (errors.length > 0) {
            alert('Please correct the following errors:\n• ' + errors.join('\n• '));
            return;
        }

        // If validation passes, proceed with booking
        const submitButton = bookingForm.querySelector('button[type="submit"]');
        addLoadingState(submitButton);

        setTimeout(() => {
            const date = document.getElementById('date')?.value;
            const time = document.getElementById('time')?.value;
            const duration = document.getElementById('duration')?.value;
            const players = document.getElementById('players')?.value;

            const totalCost = 45 * parseInt(duration);
            const timeDisplay = time.includes(':') ? time : `${time}:00`;

            alert(`Booking confirmed for ${new Date(date).toLocaleDateString()} at ${timeDisplay} for ${duration} hour(s) with ${players} player(s). Total: $${totalCost}`);
            closeBookingModal();
            bookingForm.reset();
        }, 2000);
    });
});