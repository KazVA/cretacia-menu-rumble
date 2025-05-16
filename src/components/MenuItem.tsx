
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

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
      transition={{ delay: delay, duration: 0.3 }}
      className="group"
    >
      <button
        onClick={onClick}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className={`flex items-center font-exo font-semibold text-lg md:text-xl text-bone-white hover:text-bio-cyan transition-colors duration-200 ${
          isHovered ? 'text-bio-cyan' : 'text-bone-white'
        }`}
      >
        <motion.span
          initial={{ opacity: 0, width: 0 }}
          animate={{ opacity: isHovered ? 1 : 0, width: isHovered ? '20px' : 0 }}
          transition={{ duration: 0.2 }}
        >
          <ArrowRight size={20} className="mr-2" />
        </motion.span>
        {label}
      </button>
    </motion.div>
  );
};

export default MenuItem;
