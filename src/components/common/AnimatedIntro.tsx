import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface AnimatedIntroProps {
  onComplete: () => void;
}

const AnimatedIntro = ({ onComplete }: AnimatedIntroProps) => {
  const [phase, setPhase] = useState<'name' | 'photo' | 'complete'>('name');

  useEffect(() => {
    // Name animation for 3 seconds
    const nameTimer = setTimeout(() => {
      setPhase('photo');
    }, 3000);

    // Photo animation for 3 seconds, then complete
    const photoTimer = setTimeout(() => {
      setPhase('complete');
      setTimeout(onComplete, 500); // Small delay before calling onComplete
    }, 6000);

    return () => {
      clearTimeout(nameTimer);
      clearTimeout(photoTimer);
    };
  }, [onComplete]);

  if (phase === 'complete') return null;

  return (
    <div className="fixed inset-0 z-50 bg-slate-950 flex items-center justify-center overflow-hidden">
      {phase === 'name' && <NameAnimation />}
      {phase === 'photo' && <PhotoAnimation />}
    </div>
  );
};

const NameAnimation = () => {
  const letters = ['M', 'A', 'N', 'O', 'J', ' - ', 'M', 'S'];
  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3
      }
    }
  };

  const letterVariants = {
    hidden: { 
      y: 400,
      opacity: 0
    },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 200
      }
    }
  };

  return (
    <div className="text-center">
      <motion.h1 
        className="text-6xl md:text-8xl font-bold text-white mb-8"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {letters.map((letter, index) => (
          <motion.span
            key={index}
            className="inline-block"
            variants={letterVariants}
            style={{
              textShadow: '0 0 10px rgba(59, 130, 246, 0.5)',
              animation: 'glow 2s ease-in-out infinite'
            }}
          >
            {letter}
          </motion.span>
        ))}
      </motion.h1>
      
      {/* Flickering light effects */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div 
          className="absolute top-1/4 left-1/4 w-2 h-2 bg-blue-400 rounded-full"
          animate={{
            opacity: [0.2, 1, 0.2],
            scale: [1, 1.2, 1]
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div 
          className="absolute top-1/3 right-1/4 w-1 h-1 bg-purple-400 rounded-full"
          animate={{
            opacity: [0.2, 1, 0.2],
            scale: [1, 1.2, 1]
          }}
          transition={{
            duration: 2.5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 0.5
          }}
        />
        <motion.div 
          className="absolute bottom-1/3 left-1/3 w-3 h-3 bg-cyan-400 rounded-full"
          animate={{
            opacity: [0.2, 1, 0.2],
            scale: [1, 1.2, 1]
          }}
          transition={{
            duration: 2.2,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 0.2
          }}
        />
        <motion.div 
          className="absolute bottom-1/4 right-1/3 w-1 h-1 bg-pink-400 rounded-full"
          animate={{
            opacity: [0.2, 1, 0.2],
            scale: [1, 1.2, 1]
          }}
          transition={{
            duration: 2.8,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 0.7
          }}
        />
        <motion.div 
          className="absolute top-1/2 left-1/6 w-2 h-2 bg-yellow-400 rounded-full"
          animate={{
            opacity: [0.2, 1, 0.2],
            scale: [1, 1.2, 1]
          }}
          transition={{
            duration: 2.3,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 0.3
          }}
        />
        <motion.div 
          className="absolute top-3/4 right-1/6 w-1 h-1 bg-green-400 rounded-full"
          animate={{
            opacity: [0.2, 1, 0.2],
            scale: [1, 1.2, 1]
          }}
          transition={{
            duration: 2.6,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 0.6
          }}
        />
      </div>
    </div>
  );
};

const PhotoAnimation = () => {
  return (
    <div className="text-center animate-fade-in">
      <div className="relative mb-8">
        <div className="w-64 h-64 mx-auto rounded-full overflow-hidden border-4 border-blue-400 animate-photo-reveal">
          <img
            src="img\manoj.jpg"
            alt="MANOJ MS"
            className="w-full h-full object-cover animate-photo-zoom"
          />
        </div>
        
        {/* Rotating circles around photo */}
        <div className="absolute inset-0 animate-spin-slow">
          <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-2 w-4 h-4 bg-blue-400 rounded-full animate-pulse"></div>
          <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-2 w-4 h-4 bg-purple-400 rounded-full animate-pulse"></div>
          <div className="absolute top-1/2 left-0 transform -translate-y-1/2 -translate-x-2 w-4 h-4 bg-cyan-400 rounded-full animate-pulse"></div>
          <div className="absolute top-1/2 right-0 transform -translate-y-1/2 translate-x-2 w-4 h-4 bg-pink-400 rounded-full animate-pulse"></div>
        </div>
      </div>
      
      <h2 className="text-3xl md:text-4xl font-light text-blue-300 animate-type-in overflow-hidden whitespace-nowrap border-r-2 border-blue-300">
        Software Developer & AI Enthusiast
      </h2>
    </div>
  );
};

export default AnimatedIntro;