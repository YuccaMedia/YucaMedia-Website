document.addEventListener('DOMContentLoaded', () => {
    // Elements
    const loadingScreen = document.getElementById('loading-screen');
    const enterButton = document.getElementById('enter-loading-button');
    const pageContent = document.getElementById('page-content');
    const sections = document.querySelectorAll('section');
    const nextButtons = document.querySelectorAll('.next-section-button');
    const exploreButtons = document.querySelectorAll('.explore-dapp-button');
    const enthusiasmOptions = document.querySelectorAll('.enthusiasm-option');
    const investorContact = document.getElementById('investor-contact');
    const enterSite = document.getElementById('enter-site');
    const logoTitle = document.getElementById('logo-title');
    const logoTagline = document.getElementById('logo-tagline');
    
    // Apply letter-by-letter animation to logo text
    animateLogoText();
    
    // Show enter button after loading animation (1.5 seconds)
    setTimeout(() => {
        enterButton.classList.remove('hidden');
        enterButton.classList.add('visible');
    }, 1500);
    
    // Enter button click - transition to main content with 3D effect
    enterButton.addEventListener('click', () => {
        // First add a subtle 3D effect on button press
        gsap.to(enterButton.querySelector('button'), {
            scale: 0.95,
            rotateX: 10,
            duration: 0.2,
            onComplete: () => {
                // Hide loading screen
                loadingScreen.classList.add('hidden');
                
                // Show main content
                pageContent.classList.add('active');
                
                // Activate first section
                sections[0].classList.add('active');
                
                // Scroll to top
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Next section buttons
    nextButtons.forEach(button => {
        button.addEventListener('click', () => {
            const targetSectionId = button.getAttribute('data-section');
            const targetSection = document.getElementById(targetSectionId);
            
            // Hide current section
            sections.forEach(section => {
                section.classList.remove('active');
            });
            
            // Show target section
            targetSection.classList.add('active');
            
            // Scroll to section
            targetSection.scrollIntoView({ behavior: 'smooth' });
        });
    });
    
    // Explore DApp button
    exploreButtons.forEach(button => {
        button.addEventListener('click', () => {
            alert('The CryptoLottery DApp would launch here!');
        });
    });
    
    // Enthusiasm meter
    enthusiasmOptions.forEach(option => {
        option.addEventListener('click', () => {
            // First remove active class from all options
            enthusiasmOptions.forEach(opt => {
                opt.classList.remove('active');
            });
            
            // Add active class to clicked option
            option.classList.add('active');
            
            // Capture feedback
            const value = option.getAttribute('data-value');
            console.log('User feedback:', value);
        });
    });
    
    // Investor contact button
    if (investorContact) {
        investorContact.addEventListener('click', () => {
            window.location.href = 'mailto:investors@yucamedia.com?subject=Investment%20Inquiry&body=I%20am%20interested%20in%20investing%20in%20Yuca%20Media.';
        });
    }
    // Enter site button with 3D transition effect
    if (enterSite) {
        enterSite.addEventListener('click', (e) => {
            e.preventDefault();
            
            // Create full screen overlay for transition
            const overlay = document.createElement('div');
            overlay.style.position = 'fixed';
            overlay.style.top = '0';
            overlay.style.left = '0';
            overlay.style.width = '100%';
            overlay.style.height = '100%';
            overlay.style.backgroundColor = '#1a2b21';
            overlay.style.zIndex = '10000';
            overlay.style.opacity = '0';
            overlay.style.transition = 'opacity 0.7s ease';
            document.body.appendChild(overlay);
            
            // 3D button effect
            gsap.to(enterSite, {
                scale: 1.1,
                duration: 0.3,
                onComplete: () => {
                    // Fade in overlay
                    overlay.style.opacity = '1';
                    
                    // Navigate to main site after transition
                    setTimeout(() => {
                        window.location.href = '/home';
                    }, 700);
                }
            });
        });
    }
    
    // Create animated background particles
    createParticles();
    
    // Implement section visibility on scroll
    implementScrollEffects();
    
    // Initialize 3D background (if Three.js is available)
    if (typeof THREE !== 'undefined') {
        initThreeJsBackground();
    }
});

// Create animated background particles
function createParticles() {
    const particles = document.getElementById('particles');
    const particleCount = 50;
    
    if (!particles) return;
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.classList.add('particle');
        
        // Random size (1-3px)
        const size = Math.random() * 2 + 1;
        
        // Apply styles
        particle.style.position = 'absolute';
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        particle.style.backgroundColor = '#c2c8c4';
        particle.style.borderRadius = '50%';
        particle.style.opacity = Math.random() * 0.5 + 0.1;
        particle.style.pointerEvents = 'none';
        
        // Random position
        particle.style.left = `${Math.random() * 100}vw`;
        particle.style.top = `${Math.random() * 200}vh`;
        
        // Add to DOM
        particles.appendChild(particle);
    }
    
    // Add keyframes for floating animation
    const styleEl = document.createElement('style');
    styleEl.innerHTML = `
        @keyframes float {
            0%, 100% {
                transform: translate(0, 0) rotate(0deg);
            }
            25% {
                transform: translate(100px, 100px) rotate(90deg);
            }
            50% {
                transform: translate(0, 200px) rotate(180deg);
            }
            75% {
                transform: translate(-100px, 100px) rotate(270deg);
            }
        }
        
        .particle {
            animation: float 30s ease-in-out infinite;
            animation-delay: var(--delay);
            animation-duration: var(--duration);
        }
    `;
    document.head.appendChild(styleEl);
    
    // Apply random animation properties to each particle
    document.querySelectorAll('.particle').forEach(p => {
        p.style.setProperty('--delay', `${Math.random() * 30}s`);
        p.style.setProperty('--duration', `${Math.random() * 20 + 20}s`);
    });
}

// Implement scroll effects
function implementScrollEffects() {
    const sections = document.querySelectorAll('.section-fade');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                
                // Get the section ID and animate all text elements in that section
                const sectionId = entry.target.id;
                animateSectionText(sectionId);
                
                // Add glow effect to the section title
                const sectionTitle = entry.target.querySelector('h2');
                if (sectionTitle) {
                    animateHeading(sectionTitle);
                }
            }
        });
    }, { threshold: 0.3 });
    
    sections.forEach(section => {
        observer.observe(section);
    });
}

// Main function to animate all text in a section
function animateSectionText(sectionId) {
    // Map of section IDs to their text element IDs
    const sectionTextMap = {
        'who-we-are': ['whoWeAreText1', 'whoWeAreText2', 'whoWeAreText3', 'whoWeAreText4'],
        'why-we-exist': ['whyWeExistText1', 'whyWeExistText2', 'whyWeExistText3', 'whyWeExistText4', 'whyWeExistText5'],
        'crypto-lottery': ['cryptoLotteryText1', 'cryptoLotteryText2', 'cryptoLotteryText3'],
        'better-odds': ['betterOddsText1', 'betterOddsText2', 'betterOddsText3', 'betterOddsText4'],
        'yuca-studios': ['yucaStudiosText1', 'yucaStudiosText2', 'yucaStudiosText3', 'yucaStudiosText4', 'yucaStudiosText5'],
        'what-we-stand-for': ['standForText1', 'standForText2', 'standForText3'],
        'vision': ['visionText1', 'visionText2', 'visionText3'],
        'build-future': ['buildFutureText1', 'buildFutureText2', 'buildFutureText3', 'buildFutureText4']
    };
    
    // Get the list of text element IDs for this section
    const textElementIds = sectionTextMap[sectionId];
    
    // If we have text elements for this section, animate them
    if (textElementIds && textElementIds.length > 0) {
        textElementIds.forEach((id, index) => {
            const element = document.getElementById(id);
            if (element) {
                animateLetterByLetter(element, index);
            }
        });
    }
}

// Function to animate a heading with glow effect
function animateHeading(headingElement) {
    if (!headingElement) return;
    
    // Initially hide the heading
    gsap.set(headingElement, { opacity: 0, y: 30 });
    
    // Animate the heading with fade-in and enhanced glow
    gsap.to(headingElement, {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "power2.out",
        onComplete: () => {
            // Add pulsing glow animation
            gsap.to(headingElement, {
                textShadow: "0 0 30px rgba(42, 157, 143, 0.9)",
                duration: 2,
                repeat: -1,
                yoyo: true,
                ease: "sine.inOut"
            });
        }
    });
}

// Letter-by-letter animation for any text element
function animateLetterByLetter(element, index = 0) {
    if (!element) return;
    
    const text = element.textContent;
    element.textContent = '';
    
    // Create spans for each letter
    text.split('').forEach((letter, i) => {
        const span = document.createElement('span');
        span.textContent = letter === ' ' ? '\u00A0' : letter;
        span.classList.add('animated-letter');
        element.appendChild(span);
    });
    
    // Animate each letter with staggered delay
    const letters = element.querySelectorAll('.animated-letter');
    gsap.to(letters, {
        opacity: 1,
        y: 0,
        duration: 0.5,
        stagger: 0.02,
        delay: 0.3 + (index * 0.2), // slightly reduced delay between elements
        ease: "power2.out"
    });
}

// Animate logo text with a simpler fade-in and glow animation
function animateLogoText() {
    // Get the logo title and tagline elements
    const logoTitle = document.getElementById('logo-title');
    const logoTagline = document.getElementById('logo-tagline');
    
    if (!logoTitle || !logoTagline) return;
    
    // Initially set them to be invisible
    gsap.set([logoTitle, logoTagline], { opacity: 0 });
    
    // Animate the title with a fade-in and slight pulsing glow
    gsap.to(logoTitle, {
        opacity: 1,
        duration: 1,
        delay: 0.5,
        ease: "power1.inOut",
        onComplete: () => {
            // Add pulsing glow animation
            gsap.to(logoTitle, {
                filter: "drop-shadow(0 0 12px rgba(42, 157, 143, 1))",
                duration: 1.5,
                repeat: -1,
                yoyo: true,
                ease: "sine.inOut"
            });
        }
    });
    
    // Animate the tagline with a fade-in
    gsap.to(logoTagline, {
        opacity: 1,
        duration: 1,
        delay: 1.5,
        ease: "power1.inOut",
        onComplete: () => {
            // Add subtle glow animation
            gsap.to(logoTagline, {
                filter: "drop-shadow(0 0 8px rgba(42, 157, 143, 0.8))",
                duration: 2,
                repeat: -1,
                yoyo: true,
                ease: "sine.inOut"
            });
        }
    });
}

// Initialize Three.js background
function initThreeJsBackground() {
    try {
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        
        // Create renderer with transparent background
        const renderer = new THREE.WebGLRenderer({ alpha: true });
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setClearColor(0x000000, 0); // transparent background
        
        // Position the renderer
        renderer.domElement.style.position = 'fixed';
        renderer.domElement.style.top = '0';
        renderer.domElement.style.left = '0';
        renderer.domElement.style.zIndex = '0';
        renderer.domElement.style.pointerEvents = 'none';
        
        // Add renderer to the page
        document.body.appendChild(renderer.domElement);
        
        // Create floating particles
        const particleCount = 100;
        const particles = new THREE.Group();
        
        // Create a simple particle geometry
        const geometry = new THREE.SphereGeometry(0.1, 8, 8);
        const material = new THREE.MeshBasicMaterial({ 
            color: 0xc2c8c4,
            transparent: true, 
            opacity: 0.6 
        });
        
        // Create and position particles
        for (let i = 0; i < particleCount; i++) {
            const particle = new THREE.Mesh(geometry, material);
            
            particle.position.x = (Math.random() - 0.5) * 20;
            particle.position.y = (Math.random() - 0.5) * 20;
            particle.position.z = (Math.random() - 0.5) * 20 - 10;
            
            particle.userData = {
                speedX: (Math.random() - 0.5) * 0.03,
                speedY: (Math.random() - 0.5) * 0.03,
                speedZ: (Math.random() - 0.5) * 0.03
            };
            
            particles.add(particle);
        }
        
        scene.add(particles);
        
        // Position camera
        camera.position.z = 5;
        
        // Animation loop
        function animate() {
            requestAnimationFrame(animate);
            
            // Update particle positions
            particles.children.forEach(particle => {
                particle.position.x += particle.userData.speedX;
                particle.position.y += particle.userData.speedY;
                particle.position.z += particle.userData.speedZ;
                
                // Reset particle if it goes too far
                if (
                    Math.abs(particle.position.x) > 10 || 
                    Math.abs(particle.position.y) > 10 || 
                    Math.abs(particle.position.z) > 20
                ) {
                    particle.position.x = (Math.random() - 0.5) * 20;
                    particle.position.y = (Math.random() - 0.5) * 20;
                    particle.position.z = (Math.random() - 0.5) * 20 - 10;
                }
            });
            
            // Rotate the entire particle system slightly
            particles.rotation.x += 0.0003;
            particles.rotation.y += 0.0005;
            
            // Move camera slightly based on mouse position
            const mouseX = (window.innerWidth / 2 - (window.mouseX || 0)) * 0.001;
            const mouseY = (window.innerHeight / 2 - (window.mouseY || 0)) * 0.001;
            
            camera.position.x += (mouseX - camera.position.x) * 0.05;
            camera.position.y += (mouseY - camera.position.y) * 0.05;
            
            camera.lookAt(scene.position);
            
            renderer.render(scene, camera);
        }
        
        // Track mouse position
        window.mouseX = 0;
        window.mouseY = 0;
        
        document.addEventListener('mousemove', (e) => {
            window.mouseX = e.clientX;
            window.mouseY = e.clientY;
        });
        
        // Handle window resize
        window.addEventListener('resize', () => {
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(window.innerWidth, window.innerHeight);
        });
        
        // Start animation loop
        animate();
        
    } catch (error) {
        console.error('Error initializing Three.js background:', error);
    }
}
