


document.addEventListener('DOMContentLoaded', function() {
    // Navigation Menu Functionality
    const navItems = document.querySelectorAll('.nav-item');
    
    navItems.forEach(item => {
        item.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Remove active class from all items
            navItems.forEach(nav => nav.classList.remove('active'));
            
            // Add active class to clicked item
            this.classList.add('active');
            
            // Here you would typically handle section switching
            const section = this.dataset.section;
            console.log(`Switching to ${section} section`);
        });
    });

    // Add to Cart Button Functionality
    const addToCartButtons = document.querySelectorAll('.add-to-cart');
    
    addToCartButtons.forEach(button => {
        button.addEventListener('click', function() {
            const item = this.parentElement;
            const itemName = item.querySelector('h4').textContent;
            
            // Simulate adding to cart
            this.textContent = 'Added to Cart';
            this.style.backgroundColor = '#22c55e';
            
            setTimeout(() => {
                this.textContent = 'Add to Cart';
                this.style.backgroundColor = '#2c3e50';
            }, 2000);
            
            console.log(`Added ${itemName} to cart`);
        });
    });

    // Search Functionality
    const searchInput = document.querySelector('.search-bar input');
    
    searchInput.addEventListener('input', function() {
        const searchTerm = this.value.toLowerCase();
        console.log(`Searching for: ${searchTerm}`);
        // Here you would typically implement search functionality
    });

    // Notifications Click Handler
    const notifications = document.querySelector('.notifications');
    
    notifications.addEventListener('click', function() {
        console.log('Opening notifications panel');
        // Here you would typically show a notifications panel
    });

    // User Profile Click Handler
    const userProfile = document.querySelector('.user-profile');
    
    userProfile.addEventListener('click', function() {
        console.log('Opening user menu');
        // Here you would typically show a user menu
    });
});