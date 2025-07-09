import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronDown, Sparkles, Brain, Theater, Code } from 'lucide-react';
import { useTheme } from '../../contexts/ThemeContext';
import { useScrollAnimation } from '../../hooks/useScrollAnimation';
import { gsap } from 'gsap';
import PhotoAnimation from '../common/AnimatedIntro';
import '../../styles/animations.css';

export const HeroSection: React.FC = () => {
  const { theme } = useTheme();
  const sectionRef = useScrollAnimation();
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const [showContent, setShowContent] = useState(false);
  const [currentRole, setCurrentRole] = useState('');
  const fireball1Ref = useRef<HTMLDivElement>(null);
  const fireball2Ref = useRef<HTMLDivElement>(null);
  const roleTextRef = useRef<HTMLDivElement>(null);

  const getRandomPosition = () => {
    const section = document.getElementById('hero');
    if (!section) return { x: 0, y: 0 };
    
    const rect = section.getBoundingClientRect();
    const padding = 50;
    return {
      x: padding + Math.random() * (rect.width - padding * 2),
      y: padding + Math.random() * (rect.height - padding * 2)
    };
  };

  const animateFireballs = () => {
    const moveFireball = (fireballRef: React.RefObject<HTMLDivElement>) => {
      const pos = getRandomPosition();
      
      gsap.to(fireballRef.current, {
        x: pos.x,
        y: pos.y,
        duration: 2 + Math.random() * 2,
        ease: 'power2.inOut',
        onComplete: () => moveFireball(fireballRef)
      });
    };

    moveFireball(fireball1Ref);
    moveFireball(fireball2Ref);
  };

  const animateRoles = () => {
    const roles = [' AI Engineer', ' DevOps Engineer', ' Software Engineer'];
    let currentIndex = 0;

    const showNextRole = () => {
      setCurrentRole(roles[currentIndex]);
      gsap.to(roleTextRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.4,
        ease: 'power2.out',
        onComplete: () => {
          setTimeout(() => {
            gsap.to(roleTextRef.current, {
              opacity: 0,
              y: -20,
              duration: 0.4,
              onComplete: () => {
                currentIndex = (currentIndex + 1) % roles.length;
                showNextRole();
              }
            });
          }, 2000); // Show each role for 2 seconds
        }
      });
    };

    showNextRole();
  };

  useEffect(() => {
    if (showContent) {
      animateFireballs();
      animateRoles();
    }
  }, [showContent]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 100, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: 'spring',
        stiffness: 100,
        damping: 15,
      },
    },
  };

  return (
    <section
      id="hero"
      ref={sectionRef}
      className={`hero-section ${theme.mode}`}
    >
      {!showContent && (
        <PhotoAnimation onComplete={() => setShowContent(true)} />
      )}

      {showContent && (
        <>
          {/* Spotlight Effect for Theatrical Mode */}
          {theme.mode === 'theatrical' && (
            <div className="absolute inset-0 pointer-events-none">
              <div className="absolute top-1/4 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-radial from-theatrical-spotlight/40 via-theatrical-spotlight/20 to-transparent rounded-full animate-spotlight" />
              <div className="absolute top-1/3 right-1/4 w-[600px] h-[600px] bg-gradient-radial from-theatrical-gold/20 to-transparent rounded-full animate-pulse" />
            </div>
          )}

          {/* Neural Network Grid for Tech Mode */}
          {theme.mode === 'tech' && (
            <div className="absolute inset-0 opacity-30">
              <svg className="w-full h-full">
                <defs>
                  <pattern id="heroGrid" width="60" height="60" patternUnits="userSpaceOnUse">
                    <path d="M 60 0 L 0 0 0 60" fill="none" stroke={theme.primaryColor} strokeWidth="0.5" opacity="0.3" />
                  </pattern>
                  <filter id="glow">
                    <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
                    <feMerge> 
                      <feMergeNode in="coloredBlur"/>
                      <feMergeNode in="SourceGraphic"/>
                    </feMerge>
                  </filter>
                </defs>
                <rect width="100%" height="100%" fill="url(#heroGrid)" />
                <circle cx="20%" cy="30%" r="3" fill={theme.primaryColor} className="animate-neural-pulse" filter="url(#glow)" />
                <circle cx="80%" cy="20%" r="2" fill={theme.primaryColor} className="animate-neural-pulse" filter="url(#glow)" style={{ animationDelay: '0.5s' }} />
                <circle cx="70%" cy="70%" r="4" fill={theme.primaryColor} className="animate-neural-pulse" filter="url(#glow)" style={{ animationDelay: '1s' }} />
                <circle cx="30%" cy="80%" r="2.5" fill={theme.primaryColor} className="animate-neural-pulse" filter="url(#glow)" style={{ animationDelay: '1.5s' }} />
              </svg>
            </div>
          )}

          {/* Fireball Container */}
          <div className="fireball-container">
            <div ref={fireball1Ref} className="fireball fireball-1" />
            <div ref={fireball2Ref} className="fireball fireball-2" />
          </div>

          {/* Main Content */}
          <div className="hero-content">
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="text-center"
            >
              {/* Main Title */}
              <div className="mb-8">
                <span className={`text-3xl md:text-4xl lg:text-5xl font-light me-4 ${
                  theme.mode === 'theatrical'
                    ? 'text-theatrical-spotlight'
                    : 'text-tech-electric'
                }`}>
                  Hi, I'm
                </span>
                <span className={`text-5xl md:text-6xl lg:text-7xl font-bold ${
                  theme.mode === 'theatrical'
                    ? 'bg-gradient-to-r from-theatrical-gold via-theatrical-spotlight to-theatrical-gold'
                    : 'bg-gradient-to-r from-tech-cyan via-tech-electric to-neural-purple'
                } bg-clip-text text-transparent drop-shadow-[0_0_10px_rgba(255,255,255,0.3)]`}>
                  MANOJ MS
                </span>
              </div>

              {/* Role Icons */}
              <div className="relative mb-16">
                <div className="flex justify-center items-center space-x-8 md:space-x-12">
                  <motion.div
                    className="role-icon p-4 rounded-full border-2"
                    whileHover={{ scale: 1.2, rotate: 360 }}
                    transition={{ duration: 0.5 }}
                    style={{
                      borderColor: theme.mode === 'theatrical' ? '#FFD700' : '#00FFFF',
                      backgroundColor: theme.mode === 'theatrical' ? 'rgba(255, 215, 0, 0.1)' : 'rgba(0, 255, 255, 0.1)'
                    }}
                  >
                    <Brain size={32} color={theme.mode === 'theatrical' ? '#FFD700' : '#00FFFF'} />
                  </motion.div>
                  <motion.div
                    className="text-4xl font-thin text-white/50"
                    animate={{ opacity: [0.3, 1, 0.3] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    ×
                  </motion.div>
                  <motion.div
                    className="role-icon p-4 rounded-full border-2"
                    whileHover={{ scale: 1.2, rotate: -360 }}
                    transition={{ duration: 0.5 }}
                    style={{
                      borderColor: theme.mode === 'theatrical' ? '#DC143C' : '#8A2BE2',
                      backgroundColor: theme.mode === 'theatrical' ? 'rgba(220, 20, 60, 0.1)' : 'rgba(138, 43, 226, 0.1)'
                    }}
                  >
                    <Code size={32} color={theme.mode === 'theatrical' ? '#DC143C' : '#8A2BE2'} />
                  </motion.div>
                  <motion.div
                    className="text-4xl font-thin text-white/50"
                    animate={{ opacity: [0.3, 1, 0.3] }}
                    transition={{ duration: 2, repeat: Infinity, delay: 1 }}
                  >
                    ×
                  </motion.div>
                  <motion.div
                    className="role-icon p-4 rounded-full border-2"
                    whileHover={{ scale: 1.2, rotate: 360 }}
                    transition={{ duration: 0.5 }}
                    style={{
                      borderColor: theme.mode === 'theatrical' ? '#FFF8DC' : '#39FF14',
                      backgroundColor: theme.mode === 'theatrical' ? 'rgba(255, 248, 220, 0.1)' : 'rgba(57, 255, 20, 0.1)'
                    }}
                  >
                    <Sparkles size={32} color={theme.mode === 'theatrical' ? '#FFF8DC' : '#39FF14'} />
                  </motion.div>
                </div>

                {/* Role Text */}
                <div
                  ref={roleTextRef}
                  className="role-text"
                  style={{
                    color: theme.mode === 'theatrical' ? '#FFD700' : '#00FFFF',
                    textShadow: `0 0 10px ${theme.mode === 'theatrical' ? '#FFD700' : '#00FFFF'}`
                  }}
                >
                  {currentRole}
                </div>
              </div>

              {/* Description */}
              <motion.p
                ref={subtitleRef}
                className={`text-xl md:text-2xl font-light mb-8 ${
                  theme.mode === 'theatrical'
                    ? 'text-theatrical-spotlight'
                    : 'text-tech-electric'
                }`}
              >
                Bridging the gap between artificial intelligence and human creativity
              </motion.p>

              {/* CTA Buttons */}
              <a href="src\components\sections\ProjectsSection.tsx" className="flex justify-center"></a>
              <div className="flex justify-center space-x-4">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
        
                  className={`px-8 py-3 rounded-full font-medium ${
                    theme.mode === 'theatrical'
                      ? 'bg-theatrical-gold text-black'
                      : 'bg-tech-electric text-black'
                  }`}
                >
                  View Projects
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`px-8 py-3 rounded-full font-medium border-2 ${
                    theme.mode === 'theatrical'
                      ? 'border-theatrical-gold text-theatrical-gold'
                      : 'border-tech-electric text-tech-electric'
                  }`}
                >
                  Contact Me
                </motion.button>
              </div>
            </motion.div>
          </div>

          {/* Scroll Button */}
          <motion.button
            onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}
            className="scroll-button"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <ChevronDown />
          </motion.button>
        </>
      )}
    </section>
  );
};