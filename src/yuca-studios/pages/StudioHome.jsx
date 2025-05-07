import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

const StudioHome = () => {
  useEffect(() => {
    // Set page title
    document.title = "Yuca Studios - Home";
    
    // You can add additional initialization here
    
    return () => {
      // Cleanup if needed
    };
  }, []);

  return (
    <div className="studio-home bg-[#0e4930] min-h-screen text-[#f1f1f1]">
      <header className="py-6 border-b border-[#d4b95b] border-opacity-30">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <div className="flex items-center">
            <img 
              src="/src/yuca-studios/assets/yuca-studios-logo-small.svg" 
              alt="Yuca Studios" 
              className="h-12 w-12"
            />
            <h1 className="text-2xl font-bold ml-3 text-[#d4b95b]">YUCA STUDIOS</h1>
          </div>
          
          <nav>
            <ul className="flex gap-8">
              <li><a href="#about" className="hover:text-[#d4b95b] transition-colors">About</a></li>
              <li><a href="#productions" className="hover:text-[#d4b95b] transition-colors">Productions</a></li>
              <li><a href="#team" className="hover:text-[#d4b95b] transition-colors">Team</a></li>
              <li><a href="#contact" className="hover:text-[#d4b95b] transition-colors">Contact</a></li>
              <li><Link to="/studios/dashboard" className="hover:text-[#d4b95b] transition-colors">Creator Dashboard</Link></li>
              <li><Link to="/home" className="hover:text-[#d4b95b] transition-colors">Yuca Media</Link></li>
            </ul>
          </nav>
        </div>
      </header>
      
      <main>
        {/* Hero Section */}
        <section className="py-20 px-4">
          <div className="container mx-auto text-center max-w-4xl">
            <h2 className="text-5xl font-bold mb-6 text-[#d4b95b]">Storytelling Reimagined</h2>
            <p className="text-xl mb-10">
              Yuca Studios brings together visionary filmmakers, animators, and storytellers to 
              create unforgettable cinematic experiences. From concept to screen, we craft stories 
              that captivate, inspire, and endure.
            </p>
            <div className="flex justify-center gap-4">
              <button className="bg-[#d4b95b] text-[#0e4930] px-8 py-3 rounded font-bold hover:bg-opacity-90 transition-all">
                View Our Work
              </button>
              <button className="border-2 border-[#d4b95b] text-[#d4b95b] px-8 py-3 rounded font-bold hover:bg-[#d4b95b] hover:bg-opacity-10 transition-all">
                Meet The Team
              </button>
            </div>
          </div>
        </section>
        
        {/* Featured Project Section */}
        <section className="py-16 bg-[#082418]">
          <div className="container mx-auto px-4">
            <h3 className="text-3xl font-bold mb-12 text-center text-[#d4b95b]">Featured Projects</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Project Cards would go here */}
              {[1, 2, 3].map(i => (
                <div key={i} className="bg-[#0e4930] rounded-lg overflow-hidden shadow-lg">
                  <div className="h-48 bg-gray-700">
                    {/* Project image would go here */}
                  </div>
                  <div className="p-6">
                    <h4 className="text-xl font-bold mb-2 text-[#d4b95b]">Project Title</h4>
                    <p className="text-[#f1f1f1] text-opacity-80 mb-4">
                      A short description of the project and its significance.
                    </p>
                    <button className="text-[#d4b95b] font-medium hover:underline">
                      Learn More →
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
        
        {/* About Section */}
        <section id="about" className="py-20 px-4">
          <div className="container mx-auto max-w-4xl">
            <h3 className="text-3xl font-bold mb-6 text-center text-[#d4b95b]">Our Story</h3>
            <p className="text-lg mb-6">
              Founded in 2023, Yuca Studios emerged from a collective vision to create films 
              that blend artistic excellence with meaningful storytelling. Our name, inspired by 
              the yuca plant's deep roots and resilience, reflects our commitment to stories 
              with profound cultural connections and lasting impact.
            </p>
            <p className="text-lg mb-6">
              We believe in the power of diverse voices and perspectives to enrich the cinematic 
              landscape. Through a collaborative approach that values innovation, authenticity, 
              and technical excellence, we're building a studio that nurtures talent and pushes 
              creative boundaries.
            </p>
            <p className="text-lg">
              As we grow, we remain committed to our founding principles: telling stories that matter, 
              supporting visionary artists, and creating films that resonate across cultures and generations.
            </p>
          </div>
        </section>
      </main>
      
      <footer className="bg-[#082418] py-10">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-6 md:mb-0">
              <h4 className="text-[#d4b95b] font-bold text-xl mb-2">Yuca Studios</h4>
              <p className="text-[#f1f1f1] text-opacity-60">Rooted in Story. Grown by Artists.</p>
            </div>
            
            <div className="flex gap-6">
              <a href="#" className="text-[#f1f1f1] hover:text-[#d4b95b]">Terms</a>
              <a href="#" className="text-[#f1f1f1] hover:text-[#d4b95b]">Privacy</a>
              <a href="#" className="text-[#f1f1f1] hover:text-[#d4b95b]">Contact</a>
            </div>
          </div>
          
          <div className="mt-8 pt-6 border-t border-[#d4b95b] border-opacity-30 text-center text-[#f1f1f1] text-opacity-60">
            <p>&copy; {new Date().getFullYear()} Yuca Studios. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default StudioHome;
