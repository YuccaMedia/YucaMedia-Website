document.addEventListener('DOMContentLoaded', function() {
    // Initialize sections
    const sections = document.querySelectorAll('.section');
    sections.forEach(section => {
        const content = section.querySelector('.section-content');
        if (content) {
            content.classList.add('visible');
        }
    });
    
    // Navigation dots functionality
    const navDots = document.querySelectorAll('.nav-dot');
    navDots.forEach(dot => {
        dot.addEventListener('click', function() {
            const targetSection = this.getAttribute('data-section');
            document.getElementById(targetSection).scrollIntoView({ behavior: 'smooth' });
        });
    });
    
    // Scroll down button
    const scrollDown = document.querySelector('.scroll-down');
    if (scrollDown) {
        scrollDown.addEventListener('click', function() {
            document.getElementById('who-we-are').scrollIntoView({ behavior: 'smooth' });
        });
    }
    
    // Interactive buttons to reveal content
    const buttons = {
        'show-who-we-are': 'who-we-are',
        'show-why-we-exist': 'why-we-exist',
        'show-crypto-lottery': 'crypto-lottery',
        'show-do-better': 'do-better-content',
        'show-yuca-studios': 'yuca-studios',
        'show-what-we-stand-for': 'what-we-stand-for',
        'show-vision': 'vision-content',
        'show-lets-build': 'lets-build',
        'show-donate': 'donate-content'
    };
    
    Object.keys(buttons).forEach(buttonId => {
        const button = document.getElementById(buttonId);
        if (button) {
            button.addEventListener('click', function() {
                const targetId = buttons[buttonId];
                
                // If it's a hidden section, toggle it
                if (targetId.endsWith('-content')) {
                    const hiddenSection = document.getElementById(targetId);
                    if (hiddenSection) {
                        if (hiddenSection.style.display === 'block') {
                            hiddenSection.style.display = 'none';
                        } else {
                            hiddenSection.style.display = 'block';
                        }
                    }
                } else {
                    // Otherwise scroll to the section
                    document.getElementById(targetId).scrollIntoView({ behavior: 'smooth' });
                }
            });
        }
    });
    
    // Donation buttons animations
    const donationButtons = document.querySelectorAll('.donation-button');
    donationButtons.forEach(button => {
        button.addEventListener('mouseover', function() {
            gsap.to(this, {
                y: -5,
                duration: 0.3,
                ease: 'power1.out'
            });
        });
        
        button.addEventListener('mouseout', function() {
            gsap.to(this, {
                y: 0,
                duration: 0.3,
                ease: 'power1.out'
            });
        });
        
        button.addEventListener('click', function() {
            gsap.to(this, {
                scale: 0.95,
                duration: 0.1,
                yoyo: true,
                repeat: 1
            });
        });
    });
    
    // 3D buttons animations
    const button3d = document.querySelectorAll('.button-3d');
    button3d.forEach(button => {
        button.addEventListener('mouseover', function() {
            gsap.to(this, {
                y: -6,
                rotationX: 10,
                duration: 0.3,
                ease: 'power1.out',
                boxShadow: '0 15px 25px rgba(0, 0, 0, 0.3)'
            });
        });
        
        button.addEventListener('mouseout', function() {
            gsap.to(this, {
                y: 0,
                rotationX: 0,
                duration: 0.3,
                ease: 'power1.out',
                boxShadow: '0 10px 20px rgba(0, 0, 0, 0.2)'
            });
        });
        
        button.addEventListener('click', function() {
            gsap.to(this, {
                scale: 0.95,
                duration: 0.1,
                yoyo: true,
                repeat: 1
            });
        });
    });
    
    // Scroll event to update active navigation dot
    window.addEventListener('scroll', function() {
        const scrollPosition = window.scrollY;
        
        // Find which section is currently in view
        const allSections = document.querySelectorAll('section');
        allSections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            
            if (scrollPosition >= sectionTop - 200 && scrollPosition < sectionTop + sectionHeight - 200) {
                const sectionId = section.getAttribute('id');
                
                // Update active dot
                navDots.forEach(dot => {
                    if (dot.getAttribute('data-section') === sectionId) {
                        dot.classList.add('active');
                    } else {
                        dot.classList.remove('active');
                    }
                });
            }
        });
    });
    
    // Initialize GSAP ScrollTrigger for section animations
    if (typeof ScrollTrigger !== 'undefined') {
        gsap.registerPlugin(ScrollTrigger);
        
        sections.forEach(section => {
            const content = section.querySelector('.section-content');
            if (content) {
                gsap.from(content, {
                    y: 30,
                    opacity: 0,
                    duration: 0.8,
                    scrollTrigger: {
                        trigger: section,
                        start: 'top 70%',
                        end: 'bottom 70%',
                        toggleActions: 'play none none none'
                    }
                });
            }
        });
    }
});
