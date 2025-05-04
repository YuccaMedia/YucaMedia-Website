document.addEventListener("DOMContentLoaded", () => {
    // Get all elements
    const hexagonDots = document.getElementById("hexagonDots");
    const backgroundCircle = document.querySelector("circle:first-child");
    const outerCircle = document.querySelector("circle:nth-child(2)");
    const yPaths = document.querySelectorAll("path");
    const textElements = document.querySelectorAll("text");

    // Verify essential elements exist before proceeding
    if (!hexagonDots || !backgroundCircle || !outerCircle) {
        console.error("Essential SVG elements not found");
        return;
    }

    // Set initial states
    backgroundCircle.style.opacity = "1";
    outerCircle.style.opacity = "1";
    hexagonDots.style.opacity = "1";

    // Hide Y and text initially
    yPaths.forEach(path => {
        path.style.opacity = "0";
        path.style.transition = "opacity 2s ease-in-out";
    });

    textElements.forEach(text => {
        text.style.opacity = "0";
        text.style.transition = "opacity 2s ease-in-out";
    });

    // Fade in Y and text with delay
    setTimeout(() => {
        yPaths.forEach(path => {
            path.style.opacity = "1";
        });

        setTimeout(() => {
            textElements.forEach(text => {
                text.style.opacity = "1";
            });
        }, 1000); // Increased delay to 1 second
    }, 1000);
});