// Contact Page Animation Script
document.addEventListener('DOMContentLoaded', function() {
    // Initialize Three.js scene for the contact page hero
    if (document.getElementById('contact-scene')) {
        initContactScene();
    }

    // Add animation to hero content
    const heroTitle = document.querySelector('.hero-title');
    const heroSubtitle = document.querySelector('.hero-subtitle');
    
    if (heroTitle && heroSubtitle) {
        gsap.from(heroTitle, {
            y: 30,
            opacity: 0,
            duration: 1,
            ease: "power3.out",
            delay: 0.2
        });
        
        gsap.from(heroSubtitle, {
            y: 30,
            opacity: 0,
            duration: 1,
            ease: "power3.out",
            delay: 0.4
        });
    }

    // Add scroll animations
    initScrollAnimations();
});

// Initialize Three.js scene for the hero section
function initContactScene() {
    const canvas = document.getElementById('contact-scene');
    
    // Create scene, camera, and renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, canvas.clientWidth / canvas.clientHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ 
        canvas: canvas,
        alpha: true,
        antialias: true
    });
    
    renderer.setSize(canvas.clientWidth, canvas.clientHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    
    // Add ambient light
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);
    
    // Add directional light
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.7);
    directionalLight.position.set(10, 10, 10);
    scene.add(directionalLight);
    
    // Create hexagon particles
    const particlesGeometry = new THREE.BufferGeometry();
    const particlesCount = 150;
    
    const positionArray = new Float32Array(particlesCount * 3);
    const scaleArray = new Float32Array(particlesCount);
    
    for (let i = 0; i < particlesCount; i++) {
        // Position
        positionArray[i * 3] = (Math.random() - 0.5) * 15; // x
        positionArray[i * 3 + 1] = (Math.random() - 0.5) * 15; // y
        positionArray[i * 3 + 2] = (Math.random() - 1) * 10; // z (mostly behind camera)
        
        // Scale
        scaleArray[i] = Math.random();
    }
    
    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(positionArray, 3));
    particlesGeometry.setAttribute('scale', new THREE.BufferAttribute(scaleArray, 1));
    
    // Create hexagon shape for particles
    const hexShape = new THREE.Shape();
    const size = 0.05;
    
    for (let i = 0; i < 6; i++) {
        const angle = (Math.PI / 3) * i;
        const x = size * Math.cos(angle);
        const y = size * Math.sin(angle);
        
        if (i === 0) {
            hexShape.moveTo(x, y);
        } else {
            hexShape.lineTo(x, y);
        }
    }
    
    hexShape.closePath();
    
    const hexGeometry = new THREE.ShapeGeometry(hexShape);
    
    // Create instanced mesh for better performance
    const material = new THREE.MeshStandardMaterial({
        color: 0x2a9d8f,
        transparent: true,
        opacity: 0.3,
        side: THREE.DoubleSide
    });
    
    const instancedMesh = new THREE.InstancedMesh(hexGeometry, material, particlesCount);
    
    const matrix = new THREE.Matrix4();
    const position = new THREE.Vector3();
    const quaternion = new THREE.Quaternion();
    const scale = new THREE.Vector3();
    
    for (let i = 0; i < particlesCount; i++) {
        position.set(
            positionArray[i * 3],
            positionArray[i * 3 + 1],
            positionArray[i * 3 + 2]
        );
        
        const scaleValue = scaleArray[i] * 2 + 0.5;
        scale.set(scaleValue, scaleValue, scaleValue);
        
        // Random rotation
        quaternion.setFromEuler(new THREE.Euler(
            Math.random() * Math.PI,
            Math.random() * Math.PI,
            Math.random() * Math.PI
        ));
        
        matrix.compose(position, quaternion, scale);
        instancedMesh.setMatrixAt(i, matrix);
    }
    
    scene.add(instancedMesh);
    
    // Position camera
    camera.position.z = 5;
    
    // Animation variables
    const speeds = [];
    for (let i = 0; i < particlesCount; i++) {
        speeds.push((Math.random() + 0.5) * 0.005);
    }
    
    // Handle window resize
    window.addEventListener('resize', () => {
        camera.aspect = canvas.clientWidth / canvas.clientHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(canvas.clientWidth, canvas.clientHeight);
    });
    
    // Animation function
    function animate() {
        requestAnimationFrame(animate);
        
        for (let i = 0; i < particlesCount; i++) {
            instancedMesh.getMatrixAt(i, matrix);
            matrix.decompose(position, quaternion, scale);
            
            // Slow rotation
            quaternion.multiply(new THREE.Quaternion().setFromEuler(
                new THREE.Euler(0.001, 0.001, speeds[i])
            ));
            
            // Slight movement
            position.y += Math.sin(Date.now() * 0.001 + i) * 0.001;
            
            matrix.compose(position, quaternion, scale);
            instancedMesh.setMatrixAt(i, matrix);
        }
        
        instancedMesh.instanceMatrix.needsUpdate = true;
        
        renderer.render(scene, camera);
    }
    
    animate();
}

// Initialize GSAP scroll animations
function initScrollAnimations() {
    // Form section animations
    const formItems = document.querySelectorAll('.contact-form > div');
    gsap.from(formItems, {
        y: 30,
        opacity: 0,
        duration: 0.6,
        stagger: 0.1,
        ease: "power2.out",
        scrollTrigger: {
            trigger: '.contact-form',
            start: 'top 80%'
        }
    });
    
    // Contact info animations
    const infoSections = document.querySelectorAll('.lg\\:pl-8 > div');
    gsap.from(infoSections, {
        x: 50,
        opacity: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: "power2.out",
        scrollTrigger: {
            trigger: '.lg\\:pl-8',
            start: 'top 70%'
        }
    });
    
    // FAQ animations
    const faqItems = document.querySelectorAll('.space-y-6 > div');
    gsap.from(faqItems, {
        y: 40,
        opacity: 0,
        duration: 0.6,
        stagger: 0.15,
        ease: "back.out(1.2)",
        scrollTrigger: {
            trigger: '.space-y-6',
            start: 'top 75%'
        }
    });
}
