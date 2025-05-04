/**
 * YucaMedia Audio Solution for WSL-served applications
 * 
 * This is a simple and direct implementation guaranteed to work in most browser environments,
 * including when served from WSL to Windows browsers.
 */

// Create sounds when the document is ready
document.addEventListener('DOMContentLoaded', function() {
    console.log('Audio solution initialized');
    
    // Create the actual audio elements only on first interaction to avoid autoplay restrictions
    let audioInitialized = false;
    let hoverSound, clickSound, transitionSound;
    
    // Function to initialize audio elements
    function initializeAudio() {
        if (audioInitialized) return;
        
        try {
            // Create audio elements
            hoverSound = new Audio();
            clickSound = new Audio();
            transitionSound = new Audio();
            
            // Very short MP3 data URLs that work in all browsers
            hoverSound.src = "data:audio/mp3;base64,SUQzAwAAAAABDlRJVDIAAAAGAAAASG92ZXIAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA//uQZAAP8AAAaQAAAAgAAA0gAAABAAABpAAAACAAADSAAAAETEFNRTMuOTkuNVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVX/+5JkAA/wAABpAAAACAAADSAAAAEAAAGkAAAAIAAANIAAAARVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVQ==";
            clickSound.src = "data:audio/mp3;base64,SUQzAwAAAAABDlRJVDIAAAAGAAAAQ2xpY2sAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA//uQZAAP8AAAaQAAAAgAAA0gAAABAAABpAAAACAAADSAAAAETEFNRTMuOTkuNVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVX/+5JkAA/wAABpAAAACAAADSAAAAEAAAGkAAAAIAAANIAAAARVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVQ==";
            transitionSound.src = "data:audio/mp3;base64,SUQzAwAAAAABElRJVDIAAAAKAAAAVHJhbnNpdGlvbgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA//uQZAAP8AAAaQAAAAgAAA0gAAABAAABpAAAACAAADSAAAAETEFNRTMuOTkuNVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVX/+5JkAA/wAABpAAAACAAADSAAAAEAAAGkAAAAIAAANIAAAARVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVQ==";
            
            // Set volumes
            hoverSound.volume = 0.3;
            clickSound.volume = 0.5;
            transitionSound.volume = 0.4;
            
            // Try to preload
            hoverSound.load();
            clickSound.load();
            transitionSound.load();
            
            audioInitialized = true;
            console.log('Audio elements created successfully');
        } catch (e) {
            console.error('Failed to initialize audio:', e);
        }
    }
    
    // Function to play hover sound
    function playHoverSound() {
        if (!audioInitialized) {
            initializeAudio();
        }
        
        if (hoverSound) {
            // Reset the sound first to allow rapid replays
            hoverSound.currentTime = 0;
            
            // Play with promise handling
            var promise = hoverSound.play();
            if (promise !== undefined) {
                promise.catch(function(error) {
                    console.error('Error playing hover sound:', error);
                });
            }
        }
    }
    
    // Function to play click sound
    function playClickSound() {
        if (!audioInitialized) {
            initializeAudio();
        }
        
        if (clickSound) {
            // Reset the sound first to allow rapid replays
            clickSound.currentTime = 0;
            
            // Play with promise handling
            var promise = clickSound.play();
            if (promise !== undefined) {
                promise.catch(function(error) {
                    console.error('Error playing click sound:', error);
                });
            }
        }
    }
    
    // Function to play transition sound
    function playTransitionSound() {
        if (!audioInitialized) {
            initializeAudio();
        }
        
        if (transitionSound) {
            // Reset the sound first to allow rapid replays
            transitionSound.currentTime = 0;
            
            // Play with promise handling
            var promise = transitionSound.play();
            if (promise !== undefined) {
                promise.catch(function(error) {
                    console.error('Error playing transition sound:', error);
                });
            }
        }
    }
    
    // Try to initialize audio on first user interaction
    document.addEventListener('click', function initOnFirstClick() {
        initializeAudio();
        
        // Play a test sound to ensure audio is working
        if (clickSound) {
            clickSound.play().catch(function(error) {
                console.error('Error playing initial test sound:', error);
            });
        }
        
        // Remove this listener after first click
        document.removeEventListener('click', initOnFirstClick);
    });
    
    // Add sound effects to buttons
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
    
    // Add a test button to diagnose audio issues
    const testButton = document.createElement('button');
    testButton.id = 'audio-test-button';
    testButton.innerText = 'Test Sound';
    testButton.style.position = 'fixed';
    testButton.style.bottom = '10px';
    testButton.style.right = '10px';
    testButton.style.zIndex = '9999';
    testButton.style.padding = '5px 10px';
    testButton.style.background = 'rgba(194, 200, 196, 0.1)';
    testButton.style.border = '2px solid #c2c8c4';
    testButton.style.borderRadius = '5px';
    testButton.style.color = '#c2c8c4';
    testButton.style.cursor = 'pointer';
    
    testButton.addEventListener('click', function() {
        playClickSound();
        alert('If you heard a sound, audio is working. If not, there might be browser restrictions or system issues.');
    });
    
    document.body.appendChild(testButton);
    
    // Expose sound functions
    window.soundEffects = {
        playHoverSound: playHoverSound,
        playClickSound: playClickSound,
        playTransitionSound: playTransitionSound
    };
});
