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
        
        // Create a new simple button next to the services link
        const servicesButton = document.createElement('button');
        servicesButton.textContent = 'Services';
        servicesButton.className = 'hover:text-[#c2c8c4] transition-colors ml-1';
        servicesButton.style.background = 'none';
        servicesButton.style.border = 'none';
        servicesButton.style.color = 'white';
        servicesButton.style.cursor = 'pointer';
        servicesButton.style.fontFamily = 'inherit';
        servicesButton.style.fontSize = 'inherit';
        servicesButton.style.padding = '0';
        
        servicesButton.onclick = function() {
            console.log('Services button clicked - direct navigation');
            // Direct navigation with no delay or preventDefault
            window.location.href = '/public/services.html';
        };
        
        // Insert the button after the link
        servicesLink.parentNode.insertBefore(servicesButton, servicesLink.nextSibling);
        
        // Keep the original link but with console debugging
        servicesLink.onclick = function(e) {
            console.log('Original services link clicked');
            console.log('Link href:', servicesLink.href);
            console.log('Attempting navigation...');
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
