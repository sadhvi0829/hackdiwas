// DOM Elements
const themeToggle = document.getElementById('theme-toggle');
const loginForm = document.querySelector('.login-form');
const tabs = document.querySelectorAll('.tab');
const loginContainer = document.querySelector('.login-container');
const dashboard = document.querySelector('.dashboard');

// Theme Toggle
let isDarkMode = false;
themeToggle.addEventListener('click', () => {
    isDarkMode = !isDarkMode;
    document.body.setAttribute('data-theme', isDarkMode ? 'dark' : 'light');
    themeToggle.textContent = isDarkMode ? '☀️' : '🌙';
});

// Tab Switching
tabs.forEach(tab => {
    tab.addEventListener('click', () => {
        // Remove active class from all tabs
        tabs.forEach(t => t.classList.remove('active'));
        // Add active class to clicked tab
        tab.classList.add('active');
    });
});

// Form Submission
loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    
    // Simple validation
    if (email && password) {
        // Show loading state
        const submitButton = loginForm.querySelector('button[type="submit"]');
        submitButton.textContent = 'Loading...';
        
        // Simulate API call
        setTimeout(() => {
            // Success animation
            submitButton.textContent = 'Success ✓';
            
            // Show dashboard after delay
            setTimeout(() => {
                loginContainer.style.display = 'none';
                dashboard.classList.remove('hidden');
            }, 1000);
        }, 1500);
    }
});

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