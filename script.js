// DOM Elements
const themeToggle = document.getElementById('theme-toggle');
const loginForm = document.querySelector('.login-form');
const tabs = document.querySelectorAll('.tab');
const loginContainer = document.querySelector('.login-container');
const dashboard = document.querySelector('.dashboard');

// Theme Toggle
let isDarkMode = false;
if (themeToggle) {
    themeToggle.addEventListener('click', () => {
        isDarkMode = !isDarkMode;
        document.body.setAttribute('data-theme', isDarkMode ? 'dark' : 'light');
        // Update the SVG icon based on theme
        const svg = themeToggle.querySelector('svg');
        if (svg) {
            svg.innerHTML = isDarkMode ? 
                '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />' :
                '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />';
        }
    });
}

// Tab Switching
if (tabs.length > 0) {
    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            // Remove active class from all tabs
            tabs.forEach(t => t.classList.remove('active'));
            // Add active class to clicked tab
            tab.classList.add('active');
        });
    });
}

// Form Submission
if (loginForm) {
    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const email = document.getElementById('email')?.value;
        const password = document.getElementById('password')?.value;
        
        // Simple validation
        if (email && password) {
            // Show loading state
            const submitButton = loginForm.querySelector('button[type="submit"]');
            if (submitButton) {
                submitButton.textContent = 'Loading...';
                
                // Simulate API call
                setTimeout(() => {
                    // Success animation
                    submitButton.textContent = 'Success ✓';
                    
                    // Show dashboard after delay
                    if (loginContainer && dashboard) {
                        setTimeout(() => {
                            loginContainer.style.display = 'none';
                            dashboard.classList.remove('hidden');
                        }, 1000);
                    }
                }, 1500);
            }
        }
    });
}

// Floating Label Animation
const inputs = document.querySelectorAll('.input-group input');
inputs.forEach(input => {
    // Add placeholder to make the :not(:placeholder-shown) selector work
    input.setAttribute('placeholder', ' ');
    
    input.addEventListener('focus', () => {
        input.parentElement.classList.add('focused');
    });
    
    input.addEventListener('blur', () => {
        if (!input.value) {
            input.parentElement.classList.remove('focused');
        }
    });
});

// Add some loading animation to cards
const cards = document.querySelectorAll('.card');
cards.forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-8px)';
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0)';
    });
});

// Testimonials Carousel
document.addEventListener('DOMContentLoaded', function() {
    const track = document.querySelector('.testimonials-track');
    const prevButton = document.querySelector('.carousel-button.prev');
    const nextButton = document.querySelector('.carousel-button.next');
    
    if (track && prevButton && nextButton) {
        let currentPosition = 0;
        const cardWidth = 300; // Width of each card including gap
        const cardsToShow = 3; // Number of cards visible at once

        function updateCarousel() {
            track.style.transform = `translateX(${currentPosition}px)`;
        }

        prevButton.addEventListener('click', () => {
            currentPosition = Math.min(currentPosition + cardWidth, 0);
            updateCarousel();
        });

        nextButton.addEventListener('click', () => {
            const maxPosition = -(cardWidth * (track.children.length - cardsToShow));
            currentPosition = Math.max(currentPosition - cardWidth, maxPosition);
            updateCarousel();
        });

        // Auto-scroll every 5 seconds
        setInterval(() => {
            const maxPosition = -(cardWidth * (track.children.length - cardsToShow));
            if (currentPosition <= maxPosition) {
                currentPosition = 0;
            } else {
                currentPosition -= cardWidth;
            }
            updateCarousel();
        }, 5000);
    }
}); 