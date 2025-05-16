
import { useState, useEffect, useRef } from 'react';
import MenuItem from './MenuItem';
import { ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

const MainMenu = () => {
  const [spores, setSpores] = useState<{ id: number; left: string; top: string; animationDuration: string }[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Generate spores for the bioluminescent effect
    const generateSpores = () => {
      const newSpores = [];
      const sporeCount = 30; // Number of spores to generate
      
      for (let i = 0; i < sporeCount; i++) {
        newSpores.push({
          id: i,
          left: `${Math.random() * 100}%`,
          top: `${Math.random() * 100}%`,
          animationDuration: `${5 + Math.random() * 10}s`, // Random duration between 5-15s
        });
      }
      
      setSpores(newSpores);
    };

    generateSpores();

    // Simulate T-Rex rumble every 20 seconds
    const trexInterval = setInterval(() => {
      if (containerRef.current) {
        containerRef.current.classList.add('shake');
        
        // Play T-Rex sound (we'll just simulate this with console log)
        console.log('T-Rex rumble played');
        
        setTimeout(() => {
          if (containerRef.current) {
            containerRef.current.classList.remove('shake');
          }
        }, 1000);
      }
    }, 20000);

    return () => {
      clearInterval(trexInterval);
    };
  }, []);

  const menuItems = [
    { label: 'New Game', action: () => console.log('New Game clicked') },
    { label: 'Load Game', action: () => console.log('Load Game clicked') },
    { label: 'Settings', action: () => console.log('Settings clicked') },
    { label: 'Credits', action: () => console.log('Credits clicked') },
    { label: 'Exit', action: () => console.log('Exit clicked') },
  ];

  return (
    <div 
      ref={containerRef}
      className="relative w-full min-h-screen bg-jungle-green overflow-hidden flex flex-col items-center justify-center"
      style={{ 
        backgroundImage: `url('https://images.unsplash.com/photo-1500673922987-e212871fec22?auto=format&fit=crop&q=80')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      {/* Bioluminescent spores */}
      {spores.map((spore) => (
        <div
          key={spore.id}
          className="floating-spore"
          style={{
            left: spore.left,
            top: spore.top,
            animationDuration: spore.animationDuration,
          }}
        />
      ))}

      {/* Dark overlay - reducing opacity to make background image more visible */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/70 z-0"></div>
      
      {/* T-Rex silhouette - using a CSS shadow instead of an image */}
      <div className="absolute right-20 bottom-10 hidden md:block">
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.4 }}
          transition={{ delay: 1.5, duration: 2 }}
          className="w-40 h-32 md:w-56 md:h-40"
        >
          <svg viewBox="0 0 538 400" className="h-full w-full fill-black/30">
            <path d="M345.345,169.644c-0.938-0.378-1.661-0.634-1.661-0.634s-25.16-9.161-25.16-1.144
            c0,0-1.14-1.144-9.14,1.144c-8,2.288-2.288,11.428-2.288,11.428s-17.14,1.144-17.14,11.428c0,10.284-2.288,28.568-2.288,28.568
            s-7.428,5.14-15.996,5.14c-8.568,0-9.712,8-9.712,8s-13.144,6.284-13.144,10.284s5.38,7.211,5.38,7.211
            c-19.195,0-29.709-12.571-29.709-12.571s5.14-30.856-19.424-30.856c-24.564,0-34.845,15.093-34.845,15.093
            s-25.874,6.047-35.874,13.047c-10,7-22.288,23.428-28.568,35.996c-6.28,12.568-3.428,16.568-3.428,16.568
            s-17.14,1.144-17.14,10.284c0,9.14,0,12.568,0,12.568s-9.712,0-13.14,5.712c-3.428,5.712-7.996,17.14-7.996,17.14
            s2.284,5.996,12.568,5.996c10.284,0,52.564-2.284,52.564-2.284l17.14-17.14c0,0,10.284-9.14,11.428-10.284
            c1.144-1.144,36.565-4.572,36.565-4.572s23.433,37.149,80.569,37.149c57.136,0,80.002-12.571,80.002-12.571
            s15.996-1.144,21.708-2.288c5.712-1.144,11.996-10.284,11.996-14.852s10.284-2.288,10.284-2.288s26.28,4.576,31.992,4.576
            c5.712,0,33.137-15.996,33.137-15.996s-2.284-18.284,0-23.996c2.284-5.712,5.515-21.884,6.856-26.28
            c1.341-4.396,14.708-10.284,14.708-10.284l-19.844-9.716l-16.5-3.5l-22.5-18.93l-22.929-8.643L345.345,169.644z"/>
          </svg>
        </motion.div>
      </div>

      {/* Menu content */}
      <div className="relative z-10 flex flex-col items-center justify-center w-full h-full">
        <motion.h1 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="font-orbitron font-bold text-5xl md:text-7xl lg:text-8xl text-bone-white title-glow animate-pulse-glow mb-10"
        >
          <span className="text-bio-cyan">CRE</span>TACIA
        </motion.h1>

        {/* Menu buttons - moved to bottom left and made smaller */}
        <div className="fixed bottom-20 left-10 flex flex-col items-start space-y-4 z-20">
          {menuItems.map((item, index) => (
            <MenuItem 
              key={index} 
              label={item.label} 
              onClick={item.action} 
              delay={index * 0.1 + 0.5}
            />
          ))}
        </div>

        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.8 }}
          transition={{ delay: 2, duration: 1 }}
          className="fixed bottom-10 left-10 font-exo text-xs text-bone-white/60 flex items-center gap-2 z-20"
        >
          <span>Press</span>
          <ArrowRight size={14} className="text-bio-cyan" />
          <span>to select</span>
        </motion.div>
      </div>

      {/* Version info */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.6 }}
        transition={{ delay: 2.5, duration: 1 }}
        className="absolute bottom-4 right-4 text-bone-white/40 font-exo text-xs z-10"
      >
        ALPHA v0.1 | © 2025 Cretacia Studios
      </motion.div>
    </div>
  );
};

export default MainMenu;
