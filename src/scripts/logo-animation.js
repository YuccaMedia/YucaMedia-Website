import * as THREE from 'three';

const initAnimation = () => {
  // Create a scene
  const scene = new THREE.Scene();
  
  // Create a camera
  const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
  camera.position.z = 5;
  
  // Create a renderer that will draw to the logo-animation-container
  const container = document.getElementById('logo-animation-container');
  if (!container) {
    console.warn('Logo animation container not found');
    return;
  }
  
  const renderer = new THREE.WebGLRenderer({ 
    alpha: true,
    antialias: true
  });
  renderer.setSize(400, 400);
  
  // Clear the container and add the renderer
  while (container.firstChild) {
    container.removeChild(container.firstChild);
  }
  container.appendChild(renderer.domElement);
  
  // Create the hexagon vertices
  const hexagonGeometry = new THREE.BufferGeometry();
  const vertices = [];
  const radius = 2;
  
  for (let i = 0; i < 6; i++) {
    const angle = (Math.PI / 3) * i;
    vertices.push(
      radius * Math.cos(angle), 
      radius * Math.sin(angle), 
      0
    );
  }
  
  hexagonGeometry.setAttribute(
    'position', 
    new THREE.Float32BufferAttribute(vertices, 3)
  );
  
  // Create lines for the hexagon shape
  const linesMaterial = new THREE.LineBasicMaterial({ 
    color: 0xc2c8c4,
    linewidth: 2
  });
  
  const hexagonLines = new THREE.LineLoop(hexagonGeometry, linesMaterial);
  scene.add(hexagonLines);
  
  // Create dots at each vertex
  const dotGeometry = new THREE.SphereGeometry(0.08, 16, 16);
  const dotMaterial = new THREE.MeshBasicMaterial({ color: 0xc2c8c4 });
  
  const dots = [];
  for (let i = 0; i < 6; i++) {
    const dot = new THREE.Mesh(dotGeometry, dotMaterial);
    const angle = (Math.PI / 3) * i;
    dot.position.x = radius * Math.cos(angle);
    dot.position.y = radius * Math.sin(angle);
    scene.add(dot);
    dots.push(dot);
  }
  
  // Create central logo shape
  const circleGeometry = new THREE.CircleGeometry(1.2, 32);
  const circleMaterial = new THREE.MeshBasicMaterial({ 
    color: 0x1a2b21,
    side: THREE.DoubleSide
  });
  const centralCircle = new THREE.Mesh(circleGeometry, circleMaterial);
  scene.add(centralCircle);
  
  // Add a thin ring around the circle
  const ringGeometry = new THREE.RingGeometry(1.2, 1.3, 32);
  const ringMaterial = new THREE.MeshBasicMaterial({ 
    color: 0xc2c8c4,
    side: THREE.DoubleSide
  });
  const ring = new THREE.Mesh(ringGeometry, ringMaterial);
  scene.add(ring);
  
  // Animation loop
  const animate = () => {
    requestAnimationFrame(animate);
    
    // Rotate the hexagon
    hexagonLines.rotation.z += 0.002;
    
    // Update dot positions and make them pulse
    for (let i = 0; i < dots.length; i++) {
      const dot = dots[i];
      const angle = (Math.PI / 3) * i + hexagonLines.rotation.z;
      dot.position.x = radius * Math.cos(angle);
      dot.position.y = radius * Math.sin(angle);
      
      // Pulse effect
      const time = Date.now() * 0.001;
      const pulse = Math.sin(time + i) * 0.4 + 0.6;
      dot.scale.set(pulse, pulse, pulse);
    }
    
    renderer.render(scene, camera);
  };
  
  // Handle window resize
  const handleResize = () => {
    const size = Math.min(container.clientWidth, 400);
    renderer.setSize(size, size);
    camera.aspect = 1;
    camera.updateProjectionMatrix();
  };
  
  window.addEventListener('resize', handleResize);
  handleResize();
  
  // Start animation
  animate();
  
  // Return cleanup function
  return () => {
    window.removeEventListener('resize', handleResize);
    renderer.dispose();
    if (container && renderer.domElement) {
      container.removeChild(renderer.domElement);
    }
  };
};

export default initAnimation;
