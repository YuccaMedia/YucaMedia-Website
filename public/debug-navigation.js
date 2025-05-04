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
    
    // Add a direct navigation button for testing
    const debugButton = document.createElement('button');
    debugButton.innerHTML = 'Direct to Services Page';
    debugButton.style.position = 'fixed';
    debugButton.style.bottom = '60px';
    debugButton.style.right = '10px';
    debugButton.style.zIndex = '9999';
    debugButton.style.padding = '10px';
    debugButton.style.background = '#2a9d8f';
    debugButton.style.color = 'white';
    debugButton.style.border = 'none';
    debugButton.style.borderRadius = '5px';
    debugButton.style.cursor = 'pointer';
    
    debugButton.addEventListener('click', function() {
        console.log('Debug button clicked - attempting direct navigation');
        window.location.href = '/public/services.html';
    });
    
    document.body.appendChild(debugButton);
    
    // Log browser details
    console.log('Browser details:');
    console.log('User Agent:', navigator.userAgent);
    console.log('Platform:', navigator.platform);
    
    // Log current URL details
    console.log('Current location:', window.location.href);
    console.log('Current pathname:', window.location.pathname);
    console.log('Current origin:', window.location.origin);
});
