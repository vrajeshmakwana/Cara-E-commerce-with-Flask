// Form validation
document.getElementById('billing-form').addEventListener('submit', (e) => {
    e.preventDefault();
    validateForm();
});

// Input focus effects
const inputs = document.querySelectorAll('input, textarea');
inputs.forEach(input => {
    input.addEventListener('focus', () => {
        input.parentElement.classList.add('focused');
    });
    
    input.addEventListener('blur', () => {
        input.parentElement.classList.remove('focused');
        // Validate on blur
        if (input.value.trim()) {
            validateField(input);
        }
    });
});

function validateField(input) {
    let isValid = true;
    const value = input.value.trim();

    switch(input.id) {
        case 'email':
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            isValid = emailRegex.test(value);
            break;
        case 'phone':
            const phoneRegex = /^\+?[\d\s-]{10,}$/;
            isValid = phoneRegex.test(value);
            break;
        default:
            isValid = value.length > 0;
    }

    if (!isValid) {
        highlightError(input, getErrorMessage(input.id));
    } else {
        removeError(input);
    }

    return isValid;
}

function validateForm() {
    const requiredFields = ['name', 'address', 'city', 'country', 'postcode', 'phone', 'email'];
    let isValid = true;

    requiredFields.forEach(field => {
        const input = document.getElementById(field);
        if (!validateField(input)) {
            isValid = false;
        }
    });

    if (isValid) {
        showSuccessMessage();
        // Submit form
        console.log('Form is valid, processing checkout...');
    }
}

function getErrorMessage(fieldId) {
    const messages = {
        email: 'Please enter a valid email address',
        phone: 'Please enter a valid phone number',
        default: 'This field is required'
    };
    return messages[fieldId] || messages.default;
}

function highlightError(element, message) {
    element.classList.add('error');
    if (!element.nextElementSibling?.classList.contains('error-message')) {
        const errorDiv = document.createElement('div');
        errorDiv.className = 'error-message';
        errorDiv.textContent = message;
        element.parentNode.insertBefore(errorDiv, element.nextSibling);
    }
}

function removeError(element) {
    element.classList.remove('error');
    const errorMessage = element.nextElementSibling;
    if (errorMessage?.classList.contains('error-message')) {
        errorMessage.remove();
    }
}



function showSuccessMessage() {
    const message = document.createElement('div');
    message.className = 'success-message';
    message.textContent = 'Form submitted successfully!';
    message.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: var(--success-color);
        color: white;
        padding: 1rem 2rem;
        border-radius: 8px;
        animation: slideIn 0.5s ease-out;
        z-index: 1000;
    `;

    document.body.appendChild(message);
    setTimeout(() => {
        message.style.animation = 'slideOut 0.5s ease-out';
        setTimeout(() => message.remove(), 500);
    }, 3000);
}

// Cart functionality
document.addEventListener('DOMContentLoaded', () => {
    updateCartCount();
    initializeCartInteractions();
});

function updateCartCount() {
    const cartItems = document.querySelectorAll('.cart-item').length;
    document.querySelector('.cart .count').textContent = cartItems;
}

function initializeCartInteractions() {
    const cartItems = document.querySelectorAll('.cart-item');
    
    cartItems.forEach(item => {
        item.addEventListener('mouseenter', () => {
            item.style.transform = 'translateX(5px)';
        });
        
        item.addEventListener('mouseleave', () => {
            item.style.transform = 'translateX(0)';
        });
    });
}

// Add smooth scroll behavior
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Add CSS animations
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }

    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);