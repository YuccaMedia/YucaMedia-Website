import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';
import { gsap } from '../services/gsap-config';

const EnvelopeModel = () => {
  const mountRef = useRef(null);
  const envelopeRef = useRef(null);
  const sceneRef = useRef(null);
  const animationRef = useRef(null);
  const isHoveredRef = useRef(false);
  const isClickedRef = useRef(false);

  useEffect(() => {
    if (!mountRef.current) return;

    // Scene setup
    const scene = new THREE.Scene();
    sceneRef.current = scene;
    
    // Camera setup
    const camera = new THREE.PerspectiveCamera(
      50, 
      mountRef.current.clientWidth / mountRef.current.clientHeight, 
      0.1, 
      1000
    );
    camera.position.z = 10;
    
    // Renderer setup
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
    });
    renderer.setSize(mountRef.current.clientWidth, mountRef.current.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    mountRef.current.appendChild(renderer.domElement);
    
    // Lighting setup
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);
    
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(5, 5, 5);
    scene.add(directionalLight);
    
    const pointLight = new THREE.PointLight(0xffcc00, 0.8, 20);
    pointLight.position.set(0, 0, 5);
    scene.add(pointLight);
    
    // Create the envelope
    const createEnvelope = () => {
      // Group for the entire envelope
      const envelope = new THREE.Group();
      envelopeRef.current = envelope;
      
      // Materials
      const envelopeMaterial = new THREE.MeshStandardMaterial({
        color: 0xffcc00, // Bright yellow
        roughness: 0.3,
        metalness: 0.1,
      });
      
      // Main envelope body - slightly flattened box
      const bodyGeometry = new THREE.BoxGeometry(4, 3, 0.2);
      const body = new THREE.Mesh(bodyGeometry, envelopeMaterial);
      envelope.add(body);
      
      // Top flap - wider at the top
      const topFlapShape = new THREE.Shape();
      topFlapShape.moveTo(-2, 0);
      topFlapShape.lineTo(2, 0);
      topFlapShape.lineTo(1.5, 2);
      topFlapShape.lineTo(-1.5, 2);
      topFlapShape.lineTo(-2, 0);
      
      const topFlapGeometry = new THREE.ExtrudeGeometry(topFlapShape, {
        depth: 0.05,
        bevelEnabled: false,
      });
      
      const topFlap = new THREE.Mesh(topFlapGeometry, envelopeMaterial);
      topFlap.position.set(0, 1.5, 0.1);
      topFlap.rotation.x = Math.PI / 2;
      envelope.add(topFlap);
      
      // Bottom flap
      const bottomFlapShape = new THREE.Shape();
      bottomFlapShape.moveTo(-2, 0);
      bottomFlapShape.lineTo(2, 0);
      bottomFlapShape.lineTo(1.5, -1.5);
      bottomFlapShape.lineTo(-1.5, -1.5);
      bottomFlapShape.lineTo(-2, 0);
      
      const bottomFlapGeometry = new THREE.ExtrudeGeometry(bottomFlapShape, {
        depth: 0.05,
        bevelEnabled: false,
      });
      
      const bottomFlap = new THREE.Mesh(bottomFlapGeometry, envelopeMaterial);
      bottomFlap.position.set(0, -1.5, 0);
      bottomFlap.rotation.x = -Math.PI / 2;
      bottomFlap.visible = false; // Hidden initially
      envelope.add(bottomFlap);
      
      // Left flap
      const leftFlapShape = new THREE.Shape();
      leftFlapShape.moveTo(0, -1.5);
      leftFlapShape.lineTo(0, 1.5);
      leftFlapShape.lineTo(-1.5, 1);
      leftFlapShape.lineTo(-1.5, -1);
      leftFlapShape.lineTo(0, -1.5);
      
      const leftFlapGeometry = new THREE.ExtrudeGeometry(leftFlapShape, {
        depth: 0.05,
        bevelEnabled: false,
      });
      
      const leftFlap = new THREE.Mesh(leftFlapGeometry, envelopeMaterial);
      leftFlap.position.set(-2, 0, 0);
      leftFlap.rotation.y = Math.PI / 2;
      leftFlap.visible = false; // Hidden initially
      envelope.add(leftFlap);
      
      // Right flap
      const rightFlapShape = new THREE.Shape();
      rightFlapShape.moveTo(0, -1.5);
      rightFlapShape.lineTo(0, 1.5);
      rightFlapShape.lineTo(1.5, 1);
      rightFlapShape.lineTo(1.5, -1);
      rightFlapShape.lineTo(0, -1.5);
      
      const rightFlapGeometry = new THREE.ExtrudeGeometry(rightFlapShape, {
        depth: 0.05,
        bevelEnabled: false,
      });
      
      const rightFlap = new THREE.Mesh(rightFlapGeometry, envelopeMaterial);
      rightFlap.position.set(2, 0, 0);
      rightFlap.rotation.y = -Math.PI / 2;
      rightFlap.visible = false; // Hidden initially
      envelope.add(rightFlap);
      
      // Create @ symbol using basic geometries instead of text
      const atSymbolMaterial = new THREE.MeshStandardMaterial({
        color: 0x333333,
        emissive: 0xffcc00,
        emissiveIntensity: 0.2,
      });
      
      // Use a torus for the circular part of @
      const atSymbol = new THREE.Group();
      const circlePart = new THREE.Mesh(
        new THREE.TorusGeometry(0.8, 0.2, 16, 100),
        atSymbolMaterial
      );
      atSymbol.add(circlePart);
      
      // Add a vertical line for the @ symbol
      const lineGeometry = new THREE.CylinderGeometry(0.1, 0.1, 1.7, 32);
      const line = new THREE.Mesh(lineGeometry, atSymbolMaterial);
      line.position.x = 0.4;
      atSymbol.add(line);
      
      atSymbol.position.set(0, 0, 0.15);
      atSymbol.scale.set(0.8, 0.8, 0.8);
      envelope.add(atSymbol);
      
      // Initial position and scale - small and far away
      envelope.position.z = -20;
      envelope.scale.set(0.1, 0.1, 0.1);
      envelope.rotation.y = -Math.PI / 4;
      
      scene.add(envelope);
      return envelope;
    };
    
    const envelope = createEnvelope();
    
    // Animation for the envelope
    gsap.to(envelope.position, {
      z: 0,
      duration: 2,
      ease: "power3.out"
    });
    
    gsap.to(envelope.scale, {
      x: 1,
      y: 1,
      z: 1,
      duration: 2,
      ease: "power3.out"
    });
    
    gsap.to(envelope.rotation, {
      y: 0,
      duration: 2,
      ease: "elastic.out(1, 0.5)"
    });
    
    // Particle system around the envelope
    const createParticles = () => {
      const particlesCount = 50;
      const positions = new Float32Array(particlesCount * 3);
      const particleGeometry = new THREE.BufferGeometry();
      
      for (let i = 0; i < particlesCount; i++) {
        const i3 = i * 3;
        positions[i3] = (Math.random() - 0.5) * 10;
        positions[i3 + 1] = (Math.random() - 0.5) * 10;
        positions[i3 + 2] = (Math.random() - 0.5) * 10;
      }
      
      particleGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
      
      const particleMaterial = new THREE.PointsMaterial({
        color: 0xffcc00,
        size: 0.1,
        transparent: true,
        opacity: 0.7,
      });
      
      const particles = new THREE.Points(particleGeometry, particleMaterial);
      scene.add(particles);
      
      return particles;
    };
    
    const particles = createParticles();
    
    // Setup mouse interaction
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();
    
    const onMouseMove = (event) => {
      // Calculate mouse position in normalized device coordinates
      const rect = renderer.domElement.getBoundingClientRect();
      mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
      
      // Check for intersections
      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObjects(envelope.children);
      
      if (intersects.length > 0) {
        if (!isHoveredRef.current && !isClickedRef.current) {
          isHoveredRef.current = true;
          
          // Hover animation
          gsap.to(envelope.rotation, {
            x: 0.2,
            duration: 0.5,
            ease: "power2.out"
          });
          
          gsap.to(envelope.scale, {
            x: 1.1,
            y: 1.1,
            z: 1.1,
            duration: 0.5,
            ease: "power2.out"
          });
        }
      } else {
        if (isHoveredRef.current && !isClickedRef.current) {
          isHoveredRef.current = false;
          
          // Reset to normal state
          gsap.to(envelope.rotation, {
            x: 0,
            duration: 0.5,
            ease: "power2.out"
          });
          
          gsap.to(envelope.scale, {
            x: 1,
            y: 1,
            z: 1,
            duration: 0.5,
            ease: "power2.out"
          });
        }
      }
    };
    
    // Click to open the envelope
    const onClick = (event) => {
      const rect = renderer.domElement.getBoundingClientRect();
      mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
      
      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObjects(envelope.children);
      
      if (intersects.length > 0 && !isClickedRef.current) {
        isClickedRef.current = true;
        
        // Make hidden flaps visible
        envelope.children.forEach(child => {
          if (child.visible === false) {
            child.visible = true;
          }
        });
        
        // Open envelope animation
        gsap.to(envelope.rotation, {
          x: Math.PI / 2,
          y: 0,
          z: 0,
          duration: 1,
          ease: "power3.inOut"
        });
        
        // Fancy particles burst
        const burstParticles = createParticles();
        gsap.to(burstParticles.material, {
          opacity: 0,
          duration: 2,
          onComplete: () => {
            scene.remove(burstParticles);
          }
        });
        
        // Notify parent component that envelope was clicked
        const event = new CustomEvent('envelopeClicked');
        mountRef.current.dispatchEvent(event);
      }
    };
    
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('click', onClick);
    
    // Animation loop
    const animate = () => {
      // Floating animation for the envelope
      if (envelope && !isClickedRef.current) {
        envelope.position.y = Math.sin(Date.now() * 0.001) * 0.2;
      }
      
      // Animate particles
      if (particles) {
        particles.rotation.y += 0.002;
        
        const positions = particles.geometry.attributes.position.array;
        for (let i = 0; i < positions.length; i += 3) {
          positions[i] += Math.sin(Date.now() * 0.001 + i) * 0.01;
          positions[i + 1] += Math.cos(Date.now() * 0.001 + i) * 0.01;
        }
        particles.geometry.attributes.position.needsUpdate = true;
      }
      
      renderer.render(scene, camera);
      animationRef.current = requestAnimationFrame(animate);
    };
    
    animate();
    
    // Handle window resize
    const handleResize = () => {
      if (!mountRef.current) return;
      
      const width = mountRef.current.clientWidth;
      const height = mountRef.current.clientHeight;
      
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      
      renderer.setSize(width, height);
    };
    
    window.addEventListener('resize', handleResize);
    
    // Cleanup
    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('click', onClick);
      window.removeEventListener('resize', handleResize);
      
      cancelAnimationFrame(animationRef.current);
      mountRef.current.removeChild(renderer.domElement);
      
      // Dispose of geometries and materials
      scene.traverse((object) => {
        if (object.geometry) {
          object.geometry.dispose();
        }
        if (object.material) {
          if (Array.isArray(object.material)) {
            object.material.forEach(material => material.dispose());
          } else {
            object.material.dispose();
          }
        }
      });
      
      renderer.dispose();
    };
  }, []);
  
  return (
    <div 
      ref={mountRef} 
      className="envelope-container h-full w-full"
      style={{ 
        minHeight: '300px',
        position: 'relative'  
      }}
    />
  );
};

export default EnvelopeModel;
