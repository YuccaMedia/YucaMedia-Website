/**
 * Yuca Media Sound Effects and Background Music
 * 
 * This file provides functions to initialize the audio system and play sounds on various interactions.
 */

// Initialize audio context when user interacts with the page
let audioContext;
let isSoundInitialized = false;
let isMusicPlaying = false;
let backgroundMusic;
let musicVolume = 0.2; // Background music volume (0-1)
let effectsVolume = 0.3; // Sound effects volume (0-1)

// Sound effect buffers
let hoverSound;
let clickSound;
let transitionSound;

// Initialize the audio system
function initAudio() {
  if (isSoundInitialized) return;
  
  try {
    // Create audio context
    audioContext = new (window.AudioContext || window.webkitAudioContext)();
    
    // Load sounds
    loadHoverSound();
    loadClickSound();
    loadTransitionSound();
    loadBackgroundMusic();
    
    isSoundInitialized = true;
    console.log("Audio system initialized");
  } catch (error) {
    console.error("Error initializing audio system:", error);
  }
}

// Play hover sound
function playHoverSound() {
  if (!isSoundInitialized) initAudio();
  playSound(hoverSound, effectsVolume);
}

// Play click sound
function playClickSound() {
  if (!isSoundInitialized) initAudio();
  playSound(clickSound, effectsVolume);
}

// Play transition sound
function playTransitionSound() {
  if (!isSoundInitialized) initAudio();
  playSound(transitionSound, effectsVolume);
}

// Toggle background music
function toggleBackgroundMusic() {
  if (!isSoundInitialized) initAudio();
  
  if (isMusicPlaying) {
    pauseBackgroundMusic();
  } else {
    playBackgroundMusic();
  }
  
  return isMusicPlaying;
}

// Play background music
function playBackgroundMusic() {
  if (!backgroundMusic || !audioContext) return;
  
  try {
    // Create source if needed
    const source = audioContext.createBufferSource();
    source.buffer = backgroundMusic;
    
    // Create gain node for volume control
    const gainNode = audioContext.createGain();
    gainNode.gain.value = musicVolume;
    
    // Connect nodes
    source.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    // Loop the music
    source.loop = true;
    
    // Start playing
    source.start(0);
    
    isMusicPlaying = true;
    console.log("Background music started");
  } catch (error) {
    console.error("Error playing background music:", error);
  }
}

// Pause background music
function pauseBackgroundMusic() {
  // Implementation would suspend the audio context
  if (audioContext) {
    audioContext.suspend();
    isMusicPlaying = false;
    console.log("Background music paused");
  }
}

// Helper function to play a sound
function playSound(buffer, volume) {
  if (!buffer || !audioContext) return;
  
  try {
    // Create source
    const source = audioContext.createBufferSource();
    source.buffer = buffer;
    
    // Create gain node for volume control
    const gainNode = audioContext.createGain();
    gainNode.gain.value = volume;
    
    // Connect nodes
    source.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    // Start playing
    source.start(0);
  } catch (error) {
    console.error("Error playing sound:", error);
  }
}

// Helper functions to load sounds
function loadHoverSound() {
  // This would normally load from a URL or base64 data
  // For now, we'll create a simple beep sound
  createSimpleTone(hoverSound, 200, 0.1);
}

function loadClickSound() {
  // Create a simple click sound
  createSimpleTone(clickSound, 800, 0.1);
}

function loadTransitionSound() {
  // Create a simple transition sound
  createSimpleTone(transitionSound, 500, 0.3);
}

function loadBackgroundMusic() {
  // Would normally load from a URL or base64 data
  console.log("Background music would be loaded here");
}

// Helper function to create a simple tone
function createSimpleTone(buffer, frequency, duration) {
  if (!audioContext) return;
  
  // Create an empty buffer
  const sampleRate = audioContext.sampleRate;
  const bufferSize = duration * sampleRate;
  buffer = audioContext.createBuffer(1, bufferSize, sampleRate);
  
  // Fill the buffer
  const data = buffer.getChannelData(0);
  for (let i = 0; i < bufferSize; i++) {
    // Simple sine wave
    data[i] = Math.sin(2 * Math.PI * frequency * i / sampleRate) * 
              (1 - i / bufferSize); // Apply fade out
  }
}

// Setup event listeners
document.addEventListener('DOMContentLoaded', function() {
  // Initialize audio on first user interaction
  document.addEventListener('click', function initialInteraction() {
    initAudio();
    document.removeEventListener('click', initialInteraction);
  });
  
  // Add sound effects to buttons
  const buttons = document.querySelectorAll('button, .button-3d, .nav-button');
  buttons.forEach(button => {
    button.addEventListener('mouseenter', playHoverSound);
    button.addEventListener('click', playClickSound);
  });
  
  // Add transition sound to navigation
  const navDots = document.querySelectorAll('.nav-dot');
  navDots.forEach(dot => {
    dot.addEventListener('click', playTransitionSound);
  });
});

// Export functions for use in other scripts
window.soundEffects = {
  initAudio,
  playHoverSound,
  playClickSound,
  playTransitionSound,
  toggleBackgroundMusic,
  playBackgroundMusic,
  pauseBackgroundMusic
};
