/**
 * Yuca Media Sound Effects and Background Music
 * Simple implementation using HTML5 Audio
 */

document.addEventListener('DOMContentLoaded', function() {
    // Create audio elements
    const hoverSound = new Audio();
    const clickSound = new Audio();
    const transitionSound = new Audio();
    
    // Set sources to simple tones
    hoverSound.src = "data:audio/mpeg;base64,SUQzBAAAAAABEVRYWFgAAAAtAAADY29tbWVudABCaWdTb3VuZEJhbmsuY29tIC8gTGFTb25vdGhlcXVlLm9yZwBURU5DAAAAHQAAA1N3aXRjaCBQbHVzIMKpIE5DSCBTb2Z0d2FyZQBUSVQyAAAABgAAAzIyMzUAVFNTRQAAAA8AAANMYXZmNTcuODMuMTAwAAAAAAAAAAAAAAD/80DEAAAAA0gAAAAATEFNRTMuMTAwVVVVVVVVVVVVVUxBTUUzLjEwMFVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVf/zQsRbAAADSAAAAABVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVf/zQMSkAAADSAAAAABVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVV";
    clickSound.src = "data:audio/mpeg;base64,SUQzBAAAAAABEVRYWFgAAAAtAAADY29tbWVudABCaWdTb3VuZEJhbmsuY29tIC8gTGFTb25vdGhlcXVlLm9yZwBURU5DAAAAHQAAA1N3aXRjaCBQbHVzIMKpIE5DSCBTb2Z0d2FyZQBUSVQyAAAABgAAAzIyMzUAVFNTRQAAAA8AAANMYXZmNTcuODMuMTAwAAAAAAAAAAAAAAD/80DEAAAAA0gAAAAATEFNRTMuMTAwVVVVVVVVVVVVVUxBTUUzLjEwMFVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVf/zQsRbAAADSAAAAABVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVf/zQMSkAAADSAAAAABVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVV";
    transitionSound.src = "data:audio/mpeg;base64,SUQzBAAAAAABEVRYWFgAAAAtAAADY29tbWVudABCaWdTb3VuZEJhbmsuY29tIC8gTGFTb25vdGhlcXVlLm9yZwBURU5DAAAAHQAAA1N3aXRjaCBQbHVzIMKpIE5DSCBTb2Z0d2FyZQBUSVQyAAAABgAAAzIyMzUAVFNTRQAAAA8AAANMYXZmNTcuODMuMTAwAAAAAAAAAAAAAAD/80DEAAAAA0gAAAAATEFNRTMuMTAwVVVVVVVVVVVVVUxBTUUzLjEwMFVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVf/zQsRbAAADSAAAAABVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVf/zQMSkAAADSAAAAABVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVV";
    
    // Set volume
    hoverSound.volume = 0.3;
    clickSound.volume = 0.5; 
    transitionSound.volume = 0.4;
    
    // Preload
    hoverSound.load();
    clickSound.load();
    transitionSound.load();
    
    // Flag to track if sounds were loaded
    let soundsInitialized = false;
    
    // Function to initialize all sounds at once
    function initSounds() {
        if (soundsInitialized) return;
        
        // Play and immediately pause to initialize (works around autoplay restrictions)
        try {
            hoverSound.play().then(() => hoverSound.pause());
            clickSound.play().then(() => clickSound.pause());
            transitionSound.play().then(() => transitionSound.pause());
            console.log("Sounds initialized successfully");
            soundsInitialized = true;
        } catch (e) {
            console.error("Failed to initialize sounds:", e);
        }
    }
    
    // Initialize sounds on first user interaction
    document.addEventListener('click', function initOnFirstClick() {
        initSounds();
        document.removeEventListener('click', initOnFirstClick);
    });
    
    // Play hover sound
    function playHoverSound() {
        if (!soundsInitialized) {
            initSounds();
            setTimeout(playHoverSound, 100);
            return;
        }
        
        hoverSound.currentTime = 0;
        hoverSound.play().catch(err => console.log('Error playing hover sound:', err));
    }
    
    // Play click sound
    function playClickSound() {
        if (!soundsInitialized) {
            initSounds();
            setTimeout(playClickSound, 100);
            return;
        }
        
        clickSound.currentTime = 0;
        clickSound.play().catch(err => console.log('Error playing click sound:', err));
    }
    
    // Play transition sound
    function playTransitionSound() {
        if (!soundsInitialized) {
            initSounds();
            setTimeout(playTransitionSound, 100);
            return;
        }
        
        transitionSound.currentTime = 0;
        transitionSound.play().catch(err => console.log('Error playing transition sound:', err));
    }
    
    // Add sounds to buttons
    const buttons = document.querySelectorAll('button, .button-3d, .nav-button, .donation-button, .enthusiasm-option');
    buttons.forEach(button => {
        button.addEventListener('mouseenter', playHoverSound);
        button.addEventListener('click', playClickSound);
    });
    
    // Add transition sound to navigation
    const nextButtons = document.querySelectorAll('.next-section-button');
    nextButtons.forEach(button => {
        button.addEventListener('click', playTransitionSound);
    });
    
    const navDots = document.querySelectorAll('.nav-dot');
    navDots.forEach(dot => {
        dot.addEventListener('click', playTransitionSound);
    });
    
    // Log that the script has loaded
    console.log('Sound effects script loaded successfully');
    
    // Expose sound functions
    window.soundEffects = {
        playHoverSound,
        playClickSound,
        playTransitionSound
    };
});
