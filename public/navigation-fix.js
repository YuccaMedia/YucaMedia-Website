/**
 * YucaMedia Navigation Fix Script
 * This script ensures that navigation to services.html works properly
 * It fixes any navigation issues by directly handling click events on service links
 */

document.addEventListener('DOMContentLoaded', function() {
    console.log('Navigation fix script loaded');
    
    // Find the services link specifically
    const servicesLink = document.querySelector('a[href="/public/services.html"], a[href="services.html"], a#services-link');
    
    if (servicesLink) {
        console.log('Services link found, adding enhanced click handler');
        
        // Replace the onclick with a more robust version
        servicesLink.onclick = function(e) {
            e.preventDefault(); // Prevent default link behavior
            console.log('Services link clicked with enhanced handler');
            
            // Try multiple navigation methods in sequence
            setTimeout(function() {
                console.log('Navigating to services page');
                window.location.href = '/public/services.html';
            }, 100);
            
            return false; // Prevent default and stop propagation
        };
        
        console.log('Enhanced click handler added to services link');
    } else {
        console.warn('Services link not found in page');
    }
    
    // Add click tracking to all navigation links
    const allNavLinks = document.querySelectorAll('nav a');
    allNavLinks.forEach(function(link) {
        // Don't override the services link we've already enhanced
        if (!link.id || link.id !== 'services-link') {
            const originalOnClick = link.onclick;
            
            link.addEventListener('click', function(e) {
                console.log(`Nav link clicked: ${link.href}`);
                console.log(`Link text: ${link.innerText}`);
                
                // Let the original onclick handler execute if it exists
                if (typeof originalOnClick === 'function') {
                    return originalOnClick.call(this, e);
                }
            });
        }
    });
    
    console.log('Navigation fix setup complete');
});
