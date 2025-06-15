
import React, { useState } from 'react';
import { motion } from 'framer-motion';

interface MenuItemProps {
  label: string;
  onClick: () => void;
  delay?: number;
}

const MenuItem: React.FC<MenuItemProps> = ({ label, onClick, delay = 0 }) => {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay, duration: 0.4, ease: "easeOut" }}
      className="group relative"
    >
      <button
        onClick={onClick}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className={`flex items-center px-3 py-1.5 font-exo text-base md:text-lg lg:text-xl transition-all duration-300 
          bg-black/15 backdrop-blur-md rounded-md border border-bio-cyan/20 shadow-lg ${
          isHovered ? 'text-bio-cyan bg-black/25' : 'text-bone-white'
        }`}
        style={{
          textShadow: isHovered ? '0 0 15px rgba(0, 196, 180, 0.7)' : 'none'
        }}
      >
        {label}

        {/* Underline animation */}
        <motion.div 
          className="absolute -bottom-1 left-0 h-0.5 bg-amber"
          initial={{ width: 0 }}
          animate={{ width: isHovered ? '100%' : 0 }}
          transition={{ duration: 0.3 }}
        />

        {/* Particle effect on hover - simulated with small dots */}
        {isHovered && (
          <motion.div 
            className="absolute -inset-2 pointer-events-none z-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {[...Array(5)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute h-1 w-1 rounded-full bg-bio-cyan/70"
                initial={{ 
                  x: 0, 
                  y: 0,
                  opacity: 0.7 
                }}
                animate={{ 
                  x: Math.random() * 40 - 20, 
                  y: Math.random() * 40 - 20,
                  opacity: 0 
                }}
                transition={{ 
                  duration: 1 + Math.random(), 
                  repeat: Infinity, 
                  repeatDelay: Math.random() * 0.5,
                  delay: Math.random() * 0.5
                }}
                style={{
                  left: `${10 + Math.random() * 80}%`,
                  top: `${Math.random() * 100}%`,
                }}
              />
            ))}
          </motion.div>
        )}
      </button>
    </motion.div>
  );
};

export default MenuItem;
