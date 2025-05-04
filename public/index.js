// Initialize Three.js scene
let scene, camera, renderer;
let particles = [];
let animationFrame;

// Set up the scene
function initScene() {
    // Create scene, camera and renderer
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    renderer = new THREE.WebGLRenderer({ 
        canvas: document.getElementById('scene-container'),
        alpha: true,
        antialias: true
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    
    // Set camera position
    camera.position.z = 30;
    
    // Add ambient light
    const ambientLight = new THREE.AmbientLight(0xc2c8c4, 0.5);
    scene.add(ambientLight);
    
    // Add directional light
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(10, 10, 10);
    scene.add(directionalLight);
    
    // Create particles
    createParticles();
    
    // Start animation loop
    animate();
    
    // Handle window resize
    window.addEventListener('resize', onWindowResize);
}

// Create floating particles
function createParticles() {
    const particleGeometry = new THREE.SphereGeometry(0.05, 8, 8);
    const particleMaterial = new THREE.MeshBasicMaterial({ 
        color: 0xc2c8c4,
        transparent: true,
        opacity: 0.6
    });
    
    // Create 100 particles scattered throughout the scene
    for (let i = 0; i < 100; i++) {
        const particle = new THREE.Mesh(particleGeometry, particleMaterial);
        
        // Randomize position
        particle.position.x = (Math.random() - 0.5) * 50;
        particle.position.y = (Math.random() - 0.5) * 30;
        particle.position.z = (Math.random() - 0.5) * 30;
        
        // Add custom properties for animation
        particle.velocity = {
            x: (Math.random() - 0.5) * 0.05,
            y: (Math.random() - 0.5) * 0.05,
            z: (Math.random() - 0.5) * 0.05
        };
        
        scene.add(particle);
        particles.push(particle);
    }
}

// Animation loop
function animate() {
    animationFrame = requestAnimationFrame(animate);
    
    // Animate particles
    particles.forEach(particle => {
        particle.position.x += particle.velocity.x;
        particle.position.y += particle.velocity.y;
        particle.position.z += particle.velocity.z;
        
        // Boundaries check and bounce
        if (Math.abs(particle.position.x) > 25) {
            particle.velocity.x *= -1;
        }
        if (Math.abs(particle.position.y) > 15) {
            particle.velocity.y *= -1;
        }
        if (Math.abs(particle.position.z) > 15) {
            particle.velocity.z *= -1;
        }
    });
    
    // Rotate camera slightly for a dynamic effect
    camera.position.x = Math.sin(Date.now() * 0.0001) * 3;
    camera.position.y = Math.cos(Date.now() * 0.0001) * 2;
    camera.lookAt(scene.position);
    
    renderer.render(scene, camera);
}

// Handle window resize
function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

// Scroll animation with GSAP
function initScrollAnimations() {
    // Register the ScrollTrigger plugin
    gsap.registerPlugin(ScrollTrigger);
    
    // Animate hidden elements to visible when scrolled into view
    const hiddenElements = document.querySelectorAll('.hidden');
    hiddenElements.forEach((el, index) => {
        gsap.to(el, {
            scrollTrigger: {
                trigger: el,
                start: "top 80%",
                end: "bottom 20%",
                toggleClass: {targets: el, className: "visible"},
                once: true
            },
            duration: 1,
            delay: index * 0.1
        });
    });
    
    // Hero section animations
    gsap.to('.hero-title', {
        opacity: 1,
        y: 0,
        duration: 1,
        delay: 0.3,
        ease: "power3.out"
    });
    
    gsap.to('.hero-subtitle', {
        opacity: 1,
        y: 0,
        duration: 1,
        delay: 0.5,
        ease: "power3.out"
    });
    
    gsap.to('.hero-buttons', {
        opacity: 1,
        y: 0,
        duration: 1,
        delay: 0.7,
        ease: "power3.out"
    });
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Create Three.js scene
    if (document.getElementById('scene-container')) {
        initScene();
    }
    
    // Initialize scroll animations
    initScrollAnimations();
    
    // Clean up on page leave
    window.addEventListener('beforeunload', function() {
        if (animationFrame) {
            cancelAnimationFrame(animationFrame);
        }
    });
});
