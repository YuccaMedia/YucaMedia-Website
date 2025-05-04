/**
 * Debug script for YucaMedia navigation issues
 * This script adds event listeners to help diagnose navigation problems
 */

document.addEventListener('DOMContentLoaded', function() {
    console.log('Navigation debugging script initialized');
    
    // Add click logging to all links
    const allLinks = document.querySelectorAll('a');
    allLinks.forEach((link, index) => {
        link.addEventListener('click', function(e) {
            console.log(`Link clicked: ${link.href}`);
            console.log(`Link text: ${link.innerText}`);
            console.log(`Link target: ${link.target}`);
            
            // For services page specifically, add extra debugging
            if (link.href.includes('services.html')) {
                console.log('Services link clicked!');
                
                // Only prevent default if debugging is enabled
                if (window.location.search.includes('debug=true')) {
                    e.preventDefault();
                    console.log('Default prevented for debugging');
                }
            }
        });
        
        // Add data attribute for easier identification
        link.setAttribute('data-link-id', `link-${index}`);
    });
    
    // Debug button is now disabled in production
    // The floating button has been removed as it's no longer needed
    console.log('Debug navigation active - link monitoring enabled');
    
    // Log browser details
    console.log('Browser details:');
    console.log('User Agent:', navigator.userAgent);
    console.log('Platform:', navigator.platform);
    
    // Log current URL details
    console.log('Current location:', window.location.href);
    console.log('Current pathname:', window.location.pathname);
    console.log('Current origin:', window.location.origin);
});
