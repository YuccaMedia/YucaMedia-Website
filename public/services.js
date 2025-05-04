// Services Page 3D Effects and Interactions
console.log("Services.js is loaded and running");
document.addEventListener('DOMContentLoaded', function() {
    // Initialize Three.js for 3D background effects
    initThreeJSBackground();
    
    // Initialize particle system
    initParticles();
    
    // Set up service card interactions
    initServiceCards();
    
    // Setup scroll animations with GSAP
    initScrollAnimations();
});

// Three.js Background Scene
function initThreeJSBackground() {
    const container = document.getElementById('scene-container');
    
    // Create scene, camera, and renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    container.appendChild(renderer.domElement);
    
    // Add ambient light
    const ambientLight = new THREE.AmbientLight(0xc2c8c4, 0.5);
    scene.add(ambientLight);
    
    // Add directional light
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(1, 1, 1);
    scene.add(directionalLight);
    
    // Create service-specific 3D objects
    createBlockchainModel(scene);
    createWebDevModel(scene);
    createCreativeModel(scene);
    createConsultingModel(scene);
    
    // Position camera
    camera.position.z = 5;
    
    // Animation loop
    function animate() {
        requestAnimationFrame(animate);
        
        // Rotate objects
        scene.children.forEach(child => {
            if (child.type === 'Group') {
                child.rotation.y += 0.003;
                child.rotation.x += 0.001;
            }
        });
        
        renderer.render(scene, camera);
    }
    
    // Start animation
    animate();
    
    // Resize handler
    window.addEventListener('resize', () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    });
}

// Create a blockchain-themed 3D model
function createBlockchainModel(scene) {
    const group = new THREE.Group();
    group.name = 'blockchain-model';
    
    // Create a series of connected cubes representing blockchain
    const cubeGeometry = new THREE.BoxGeometry(0.5, 0.5, 0.5);
    const cubeMaterial = new THREE.MeshPhongMaterial({ 
        color: 0x2a9d8f,
        transparent: true,
        opacity: 0.7,
        emissive: 0x2a9d8f,
        emissiveIntensity: 0.2
    });
    
    // Create a chain of cubes
    for (let i = 0; i < 5; i++) {
        const cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
        cube.position.x = (i - 2) * 0.7;
        cube.position.y = Math.sin(i * 0.5) * 0.3;
        group.add(cube);
        
        // Add connecting lines
        if (i > 0) {
            const lineMaterial = new THREE.LineBasicMaterial({ color: 0x2a9d8f });
            const points = [
                new THREE.Vector3((i - 3) * 0.7, Math.sin((i - 1) * 0.5) * 0.3, 0),
                new THREE.Vector3((i - 2) * 0.7, Math.sin(i * 0.5) * 0.3, 0)
            ];
            const lineGeometry = new THREE.BufferGeometry().setFromPoints(points);
            const line = new THREE.Line(lineGeometry, lineMaterial);
            group.add(line);
        }
    }
    
    // Position the group
    group.position.set(-15, 5, -10);
    group.scale.set(2, 2, 2);
    
    scene.add(group);
}

// Create a web development themed 3D model
function createWebDevModel(scene) {
    const group = new THREE.Group();
    group.name = 'webdev-model';
    
    // Create a stylized code bracket
    const bracketMaterial = new THREE.MeshPhongMaterial({ 
        color: 0x4361ee,
        transparent: true,
        opacity: 0.7,
        emissive: 0x4361ee,
        emissiveIntensity: 0.2
    });
    
    // Left bracket
    const leftBracketGeometry = new THREE.TorusGeometry(0.5, 0.1, 16, 100, Math.PI);
    const leftBracket = new THREE.Mesh(leftBracketGeometry, bracketMaterial);
    leftBracket.rotation.z = Math.PI / 2;
    leftBracket.position.x = -0.5;
    group.add(leftBracket);
    
    // Right bracket
    const rightBracketGeometry = new THREE.TorusGeometry(0.5, 0.1, 16, 100, Math.PI);
    const rightBracket = new THREE.Mesh(rightBracketGeometry, bracketMaterial);
    rightBracket.rotation.z = -Math.PI / 2;
    rightBracket.position.x = 0.5;
    group.add(rightBracket);
    
    // Add some "code lines"
    const lineMaterial = new THREE.LineBasicMaterial({ color: 0x4361ee });
    
    for (let i = 0; i < 3; i++) {
        const points = [
            new THREE.Vector3(-0.3, 0.2 - (i * 0.2), 0),
            new THREE.Vector3(0.3, 0.2 - (i * 0.2), 0)
        ];
        const lineGeometry = new THREE.BufferGeometry().setFromPoints(points);
        const line = new THREE.Line(lineGeometry, lineMaterial);
        group.add(line);
    }
    
    // Position the group
    group.position.set(15, 2, -10);
    group.scale.set(2, 2, 2);
    
    scene.add(group);
}

// Create a creative services themed 3D model
function createCreativeModel(scene) {
    const group = new THREE.Group();
    group.name = 'creative-model';
    
    // Create a stylized camera or paintbrush
    const baseMaterial = new THREE.MeshPhongMaterial({ 
        color: 0x7209b7,
        transparent: true,
        opacity: 0.7,
        emissive: 0x7209b7,
        emissiveIntensity: 0.2
    });
    
    // Camera body
    const cameraGeometry = new THREE.BoxGeometry(0.8, 0.6, 0.4);
    const camera = new THREE.Mesh(cameraGeometry, baseMaterial);
    group.add(camera);
    
    // Camera lens
    const lensGeometry = new THREE.CylinderGeometry(0.2, 0.2, 0.3, 32);
    const lens = new THREE.Mesh(lensGeometry, baseMaterial);
    lens.rotation.x = Math.PI / 2;
    lens.position.z = 0.35;
    group.add(lens);
    
    // Position the group
    group.position.set(-12, -5, -10);
    group.scale.set(2, 2, 2);
    
    scene.add(group);
}

// Create a consulting themed 3D model
function createConsultingModel(scene) {
    const group = new THREE.Group();
    group.name = 'consulting-model';
    
    // Create a stylized chart or graph
    const chartMaterial = new THREE.MeshPhongMaterial({ 
        color: 0xe76f51,
        transparent: true,
        opacity: 0.7,
        emissive: 0xe76f51,
        emissiveIntensity: 0.2
    });
    
    // Base
    const baseGeometry = new THREE.BoxGeometry(1, 0.1, 0.5);
    const base = new THREE.Mesh(baseGeometry, chartMaterial);
    base.position.y = -0.45;
    group.add(base);
    
    // Bars for chart
    const heights = [0.3, 0.7, 0.5, 0.9];
    for (let i = 0; i < 4; i++) {
        const barGeometry = new THREE.BoxGeometry(0.15, heights[i], 0.15);
        const bar = new THREE.Mesh(barGeometry, chartMaterial);
        bar.position.x = -0.4 + (i * 0.25);
        bar.position.y = -0.45 + (heights[i] / 2);
        group.add(bar);
    }
    
    // Position the group
    group.position.set(12, -5, -10);
    group.scale.set(2, 2, 2);
    
    scene.add(group);
}

// Initialize particle system
function initParticles() {
    const particles = document.getElementById('particles');
    
    // Create 50 particle elements
    for (let i = 0; i < 50; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        
        // Random styles
        particle.style.position = 'absolute';
        particle.style.width = Math.random() * 5 + 'px';
        particle.style.height = particle.style.width;
        particle.style.background = 'rgba(194, 200, 196, ' + (Math.random() * 0.3 + 0.1) + ')';
        particle.style.borderRadius = '50%';
        particle.style.top = Math.random() * 100 + 'vh';
        particle.style.left = Math.random() * 100 + 'vw';
        
        // Animation
        particle.style.animation = 'float ' + (Math.random() * 10 + 5) + 's linear infinite';
        particle.style.animationDelay = Math.random() * 5 + 's';
        
        particles.appendChild(particle);
    }
    
    // Add keyframes if not already defined in CSS
    if (!document.getElementById('particle-keyframes')) {
        const style = document.createElement('style');
        style.id = 'particle-keyframes';
        style.innerHTML = `
            @keyframes float {
                0% {
                    transform: translateY(0) translateX(0) rotate(0deg);
                    opacity: 0;
                }
                20% {
                    opacity: 0.8;
                }
                80% {
                    opacity: 0.8;
                }
                100% {
                    transform: translateY(-100vh) translateX(${Math.random() * 50 - 25}px) rotate(360deg);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);
    }
}

// Initialize service card interactions
function initServiceCards() {
    const serviceCards = document.querySelectorAll('.service-card');
    
    serviceCards.forEach(card => {
        // Follow mouse movement for 3D effect
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const angleY = (x - centerX) / 30;
            const angleX = (centerY - y) / 30;
            
            card.style.transform = `rotateY(${angleY}deg) rotateX(${angleX}deg)`;
        });
        
        // Reset on mouse leave
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'rotateY(0) rotateX(0)';
        });
        
        // Micro animations for features
        const features = card.querySelectorAll('.feature');
        features.forEach((feature, index) => {
            feature.style.transitionDelay = `${index * 0.1}s`;
        });
    });
}

// Initialize scroll-based animations
function initScrollAnimations() {
    gsap.registerPlugin(ScrollTrigger);
    
    // Animate service cards as they come into view
    gsap.utils.toArray('.service-card-container').forEach((container, i) => {
        gsap.from(container, {
            y: 50,
            opacity: 0,
            duration: 1,
            scrollTrigger: {
                trigger: container,
                start: "top 80%",
                end: "top 50%",
                toggleActions: "play none none none"
            }
        });
        
        // Animate features with stagger
        gsap.from(container.querySelectorAll('.feature'), {
            y: 20,
            opacity: 0,
            duration: 0.5,
            stagger: 0.1,
            scrollTrigger: {
                trigger: container,
                start: "top 70%",
                end: "top 40%",
                toggleActions: "play none none none"
            }
        });
    });
    
    // Animate the section title
    gsap.from('.section-title', {
        y: -30,
        opacity: 0,
        duration: 1,
        scrollTrigger: {
            trigger: '.section-title',
            start: "top 80%",
            toggleActions: "play none none none"
        }
    });
    
    // Animate the floating icons
    gsap.utils.toArray('.float-container').forEach((container) => {
        gsap.to(container, {
            y: "random(-20, 20)",
            x: "random(-20, 20)",
            rotation: "random(-10, 10)",
            duration: "random(5, 10)",
            ease: "sine.inOut",
            repeat: -1,
            yoyo: true
        });
    });
}
