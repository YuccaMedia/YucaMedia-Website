import React, { useRef, useState } from 'react';
import { Link } from 'react-router-dom';

const ServiceCard = ({ 
  title, 
  description, 
  features, 
  ctaText, 
  ctaLink, 
  className, 
  serviceType
}) => {
  const cardRef = useRef(null);
  const [transform, setTransform] = useState('');
  
  // Set background gradient based on service type
  const cardStyles = {
    blockchain: "bg-gradient-to-br from-[rgba(42,157,143,0.1)] to-[rgba(26,43,33,0.95)] border-l-[5px] border-[#2a9d8f]",
    webdev: "bg-gradient-to-br from-[rgba(67,97,238,0.1)] to-[rgba(26,43,33,0.95)] border-l-[5px] border-[#4361ee]",
    creative: "bg-gradient-to-br from-[rgba(114,9,183,0.1)] to-[rgba(26,43,33,0.95)] border-l-[5px] border-[#7209b7]",
    consulting: "bg-gradient-to-br from-[rgba(231,111,81,0.1)] to-[rgba(26,43,33,0.95)] border-l-[5px] border-[#e76f51]"
  };
  
  // Calculate icon color based on service type
  const iconColor = {
    blockchain: "text-[#2a9d8f]",
    webdev: "text-[#4361ee]",
    creative: "text-[#7209b7]",
    consulting: "text-[#e76f51]"
  };
  
  // CTA button styles based on service type
  const ctaStyles = {
    blockchain: "bg-[#2a9d8f] hover:bg-[#238a7e]",
    webdev: "bg-[#4361ee] hover:bg-[#3a54d0]",
    creative: "bg-[#7209b7] hover:bg-[#6308a0]",
    consulting: "bg-[#e76f51] hover:bg-[#d85a3d]"
  };
  
  // Handle mouse movement for enhanced 3D effect
  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    // Enhanced 3D effect with more pronounced angles 
    const angleY = (x - centerX) / 20; // More pronounced rotation (was /30)
    const angleX = (centerY - y) / 20; // More pronounced rotation (was /30)
    
    // Add subtle movement along Z axis based on mouse position
    const zTranslation = Math.abs((x - centerX) / centerX * (y - centerY) / centerY) * 5;
    
    setTransform(`rotateY(${angleY}deg) rotateX(${angleX}deg) translateZ(${zTranslation}px)`);
    
    // Update lighting effect based on mouse position
    const lightX = ((x - centerX) / centerX).toFixed(2);
    const lightY = ((y - centerY) / centerY).toFixed(2);
    
    // Create a reflection effect by updating the ::before pseudo element
    if (cardRef.current) {
      cardRef.current.style.setProperty('--light-x', lightX);
      cardRef.current.style.setProperty('--light-y', lightY);
    }
  };
  
  // Reset on mouse leave with smooth transition
  const handleMouseLeave = () => {
    setTransform('rotateY(0deg) rotateX(0deg) translateZ(0px)');
    
    if (cardRef.current) {
      cardRef.current.style.setProperty('--light-x', '0');
      cardRef.current.style.setProperty('--light-y', '0');
    }
  };
  
  return (
    <div 
      className="perspective-[1000px] w-full mb-16 service-card-container"
      data-service={serviceType}
    >
      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className={`
          min-h-[500px] rounded-2xl p-8 flex flex-col items-center text-center 
          transition-all duration-300 ease-out shadow-[0_20px_40px_rgba(0,0,0,0.2)]
          relative transform-style-preserve-3d overflow-hidden service-card
          ${cardStyles[serviceType] || cardStyles.blockchain}
          ${className || ''}
        `}
        style={{ transform }}
      >
        {/* Enhanced glass reflection overlay with dynamic light reflection */}
        <div 
          className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent pointer-events-none z-[1]"
          style={{
            background: `radial-gradient(
              circle at calc(50% + var(--light-x, 0) * 50%) calc(50% + var(--light-y, 0) * 30%), 
              rgba(255, 255, 255, 0.15) 0%,
              transparent 80%
            )`
          }}
        ></div>
        
        {/* Icon */}
        <div className="w-36 h-36 mb-8 relative z-[2] service-icon">
          {/* Replace with actual icon based on service type */}
          <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={`w-full h-full ${iconColor[serviceType] || ''}`}>
            {serviceType === 'blockchain' && (
              <>
                <path d="M10.75 13.25H6.75V17.25H10.75V13.25Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M17.25 13.25H13.25V17.25H17.25V13.25Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M10.75 6.75H6.75V10.75H10.75V6.75Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M17.25 6.75H13.25V10.75H17.25V6.75Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </>
            )}
            {serviceType === 'webdev' && (
              <>
                <path d="M15.5 9L15.6716 9.17157C17.0049 10.5049 17.6716 11.1716 17.6716 12C17.6716 12.8284 17.0049 13.4951 15.6716 14.8284L15.5 15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M13.5 7.5L10.5 16.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M8.5 9L8.32843 9.17157C6.99509 10.5049 6.32843 11.1716 6.32843 12C6.32843 12.8284 6.99509 13.4951 8.32843 14.8284L8.5 15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M22 12C22 16.714 22 19.0711 20.5355 20.5355C19.0711 22 16.714 22 12 22C7.28595 22 4.92893 22 3.46447 20.5355C2 19.0711 2 16.714 2 12C2 7.28595 2 4.92893 3.46447 3.46447C4.92893 2 7.28595 2 12 2C16.714 2 19.0711 2 20.5355 3.46447C22 4.92893 22 7.28595 22 12Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </>
            )}
            {serviceType === 'creative' && (
              <>
                <path d="M2 12C2 7.28595 2 4.92893 3.46447 3.46447C4.92893 2 7.28595 2 12 2C16.714 2 19.0711 2 20.5355 3.46447C22 4.92893 22 7.28595 22 12C22 16.714 22 19.0711 20.5355 20.5355C19.0711 22 16.714 22 12 22C7.28595 22 4.92893 22 3.46447 20.5355C2 19.0711 2 16.714 2 12Z" stroke="currentColor" strokeWidth="1.5"/>
                <path d="M17 9.5V8.1C17 7.53995 17 7.25992 16.891 7.04601C16.7951 6.85785 16.6422 6.70487 16.454 6.60899C16.2401 6.5 15.96 6.5 15.4 6.5H14.5M7 10.5V7.1C7 6.53995 7 6.25992 7.10899 6.04601C7.20487 5.85785 7.35785 5.70487 7.54601 5.60899C7.75992 5.5 8.03995 5.5 8.6 5.5H10.5L12.5 7.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                <path d="M10.5 7.5H12.5L17 12M10.5 7.5V11.5H8.5M17 12L14 15H10M17 12L19 14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M11.5 15L10 18.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                <path d="M13.5 15L15 18.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
              </>
            )}
            {serviceType === 'consulting' && (
              <>
                <path d="M21 15C21 15.5304 20.7893 16.0391 20.4142 16.4142C20.0391 16.7893 19.5304 17 19 17H7L3 21V5C3 4.46957 3.21071 3.96086 3.58579 3.58579C3.96086 3.21071 4.46957 3 5 3H19C19.5304 3 20.0391 3.21071 20.4142 3.58579C20.7893 3.96086 21 4.46957 21 5V15Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M12 7V13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M12 17.01L12.01 16.999" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </>
            )}
          </svg>
        </div>
        
        {/* Content */}
        <h2 className="text-2xl font-bold mb-6 text-white relative z-[2] service-title">{title}</h2>
        <p className="text-lg leading-relaxed mb-8 relative z-[2] max-w-2xl service-description">{description}</p>
        
        {/* Features */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full my-8 relative z-[2] service-features">
          {features && features.map((feature, index) => (
            <div 
              key={index} 
              className="bg-black/20 rounded-lg p-6 text-left transition-transform duration-300 hover:translate-y-[-5px] hover:bg-black/30 feature"
              style={{ transitionDelay: `${index * 0.1}s` }}
            >
              <h4 className="font-semibold mb-2 text-lg">{feature.title}</h4>
              <p className="text-sm opacity-90">{feature.description}</p>
            </div>
          ))}
        </div>
        
        {/* CTA Button */}
        <Link 
          to={ctaLink || '#'} 
          className={`inline-block text-white px-8 py-4 rounded-full font-semibold mt-8 transition-all duration-300 
          hover:translate-y-[-5px] hover:shadow-[0_10px_20px_rgba(0,0,0,0.2)] relative z-[2] service-cta
          ${ctaStyles[serviceType] || ctaStyles.blockchain}`}
        >
          {ctaText || 'Learn More'}
        </Link>
      </div>
    </div>
  );
};

export default ServiceCard;
