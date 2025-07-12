import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Brain, Code, Globe, Wrench, Heart, Play, Pause, Clock, ChevronLeft, ChevronRight } from 'lucide-react';
import { useTheme } from '../../contexts/ThemeContext';
import { skills } from '../../data/skills';

const categoryIcons = {
  'programming': Code,
  'ai-ml': Brain,
  'web': Globe,
  'tools': Wrench,
  'soft-skills': Heart,
};

const categoryNames = {
  'programming': 'Programming Languages',
  'ai-ml': 'AI/ML Frameworks',
  'web': 'Web Technologies',
  'tools': 'Tools & Platforms',
  'soft-skills': 'Soft Skills',
};

export const SkillsSection: React.FC = () => {
  const { theme } = useTheme();
  const [ref, inView] = useInView({ threshold: 0.1, triggerOnce: true });
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [isPresentationMode, setIsPresentationMode] = useState(false);
  const [currentCategoryIndex, setCurrentCategoryIndex] = useState(0);
  const sphereRef = useRef<HTMLDivElement>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const categories = ['all', ...Array.from(new Set(skills.map(skill => skill.category)))];
  const filteredSkills = selectedCategory === 'all' 
    ? skills 
    : skills.filter(skill => skill.category === selectedCategory);

  // Auto-presentation logic
  useEffect(() => {
    if (isAutoPlaying && isPresentationMode && categories.length > 1) {
      intervalRef.current = setInterval(() => {
        setCurrentCategoryIndex((prev) => {
          const nextIndex = (prev + 1) % categories.length;
          setSelectedCategory(categories[nextIndex]);
          return nextIndex;
        });
      }, 4000); // 4 seconds per category
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isAutoPlaying, isPresentationMode, categories.length]);

  // Start presentation mode when section comes into view
  useEffect(() => {
    if (inView && !isPresentationMode) {
      setIsPresentationMode(true);
    }
  }, [inView]);

  const nextCategory = () => {
    const nextIndex = (currentCategoryIndex + 1) % categories.length;
    setCurrentCategoryIndex(nextIndex);
    setSelectedCategory(categories[nextIndex]);
  };

  const prevCategory = () => {
    const prevIndex = (currentCategoryIndex - 1 + categories.length) % categories.length;
    setCurrentCategoryIndex(prevIndex);
    setSelectedCategory(categories[prevIndex]);
  };

  const handleCategoryClick = (category: string) => {
    setIsAutoPlaying(false);
    setIsPresentationMode(false);
    setSelectedCategory(category);
    setCurrentCategoryIndex(categories.indexOf(category));
  };

  const toggleAutoPlay = () => {
    setIsAutoPlaying(!isAutoPlaying);
    if (!isAutoPlaying) {
      setIsPresentationMode(true);
    }
  };

  useEffect(() => {
    if (inView && sphereRef.current) {
      const skillOrbs = sphereRef.current.querySelectorAll('.skill-orb');
      skillOrbs.forEach((orb, index) => {
        const element = orb as HTMLElement;
        const delay = index * 0.1;
        const duration = 3 + Math.random() * 2;
        
        element.style.animationDelay = `${delay}s`;
        element.style.animationDuration = `${duration}s`;
        element.classList.add('animate-float');
      });
    }
  }, [inView, filteredSkills]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 60, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: 'spring',
        stiffness: 100,
        damping: 12,
      },
    },
  };

  const skillVariants = {
    hidden: { scale: 0, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        type: 'spring',
        stiffness: 200,
        damping: 15,
      },
    },
    hover: {
      scale: 1.1,
      z: 50,
      transition: {
        type: 'spring',
        stiffness: 400,
        damping: 25,
      },
    },
  };

  return (
    <section id="skills" ref={ref} className="relative py-12 sm:py-16 md:py-20 lg:py-32 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 opacity-10">
        {theme.mode === 'theatrical' ? (
          <div className="absolute inset-0 bg-gradient-to-br from-theatrical-spotlight/20 via-transparent to-theatrical-crimson/20" />
        ) : (
          <>
            {/* Neural Network Background */}
            <svg className="absolute inset-0 w-full h-full">
              <defs>
                <pattern id="skillsGrid" width="80" height="80" patternUnits="userSpaceOnUse">
                  <path d="M 80 0 L 0 0 0 80" fill="none" stroke={theme.primaryColor} strokeWidth="0.5" opacity="0.3" />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#skillsGrid)" />
              
              {/* Animated Neural Nodes */}
              <circle cx="15%" cy="25%" r="2" fill={theme.primaryColor} className="animate-neural-pulse" />
              <circle cx="85%" cy="35%" r="3" fill={theme.primaryColor} className="animate-neural-pulse" style={{ animationDelay: '0.5s' }} />
              <circle cx="25%" cy="75%" r="2.5" fill={theme.primaryColor} className="animate-neural-pulse" style={{ animationDelay: '1s' }} />
              <circle cx="75%" cy="15%" r="2" fill={theme.primaryColor} className="animate-neural-pulse" style={{ animationDelay: '1.5s' }} />
              <circle cx="50%" cy="60%" r="3" fill={theme.primaryColor} className="animate-neural-pulse" style={{ animationDelay: '2s' }} />
            </svg>
          </>
        )}
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="space-y-8 sm:space-y-12 md:space-y-16"
        >
          {/* Header */}
          <motion.div variants={itemVariants} className="text-center space-y-4 sm:space-y-6">
            <motion.h2
              className={`text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-dramatic font-bold ${
                theme.mode === 'theatrical'
                  ? 'bg-gradient-to-r from-theatrical-gold to-theatrical-crimson'
                  : 'bg-gradient-to-r from-tech-cyan to-neural-purple'
              } bg-clip-text text-transparent leading-tight`}
            >
              Skills & Expertise
            </motion.h2>
            
            <motion.p
              className="text-base sm:text-lg md:text-xl text-white/70 max-w-3xl mx-auto font-body leading-relaxed px-4"
            >
              A comprehensive toolkit spanning artificial intelligence, full-stack development, 
              and the soft skills gained from years of theatrical performance.
            </motion.p>
          </motion.div>

          {/* Auto-play Controls */}
          <motion.div variants={itemVariants} className="flex items-center justify-center space-x-4 mb-8">
            <motion.button
              onClick={prevCategory}
              className={`p-2 sm:p-3 rounded-full backdrop-blur-sm border transition-all duration-300 ${
                theme.mode === 'theatrical'
                  ? 'bg-theatrical-gold/20 border-theatrical-gold/30 hover:bg-theatrical-gold/30'
                  : 'bg-tech-cyan/20 border-tech-cyan/30 hover:bg-tech-cyan/30'
              }`}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <ChevronLeft size={20} color={theme.primaryColor} />
            </motion.button>

            <motion.button
              onClick={toggleAutoPlay}
              className={`flex items-center space-x-2 px-4 py-2 rounded-full backdrop-blur-sm border transition-all duration-300 ${
                theme.mode === 'theatrical'
                  ? 'bg-theatrical-crimson/20 border-theatrical-crimson/30 hover:bg-theatrical-crimson/30'
                  : 'bg-neural-purple/20 border-neural-purple/30 hover:bg-neural-purple/30'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {isAutoPlaying ? (
                <Pause size={16} color={theme.mode === 'theatrical' ? '#DC143C' : '#8A2BE2'} />
              ) : (
                <Play size={16} color={theme.mode === 'theatrical' ? '#DC143C' : '#8A2BE2'} />
              )}
              <span className="text-sm font-tech text-white/70">
                {isAutoPlaying ? 'Pause' : 'Play'}
              </span>
            </motion.button>

            <div className="text-center">
              <span className="text-white/60 font-tech text-sm">
                {currentCategoryIndex + 1} / {categories.length}
              </span>
              {isAutoPlaying && (
                <div className="flex items-center space-x-1 mt-1">
                  <Clock size={12} className="text-white/40" />
                  <span className="text-xs text-white/40">Auto</span>
                </div>
              )}
            </div>

            <motion.button
              onClick={nextCategory}
              className={`p-2 sm:p-3 rounded-full backdrop-blur-sm border transition-all duration-300 ${
                theme.mode === 'theatrical'
                  ? 'bg-theatrical-gold/20 border-theatrical-gold/30 hover:bg-theatrical-gold/30'
                  : 'bg-tech-cyan/20 border-tech-cyan/30 hover:bg-tech-cyan/30'
              }`}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <ChevronRight size={20} color={theme.primaryColor} />
            </motion.button>
          </motion.div>

          {/* Progress Bar */}
          {isAutoPlaying && (
            <div className="w-full h-1 bg-white/20 rounded-full mb-8 mx-4">
              <motion.div
                className={`h-full rounded-full ${
                  theme.mode === 'theatrical'
                    ? 'bg-gradient-to-r from-theatrical-gold to-theatrical-crimson'
                    : 'bg-gradient-to-r from-tech-cyan to-neural-purple'
                }`}
                initial={{ width: '0%' }}
                animate={{ width: '100%' }}
                transition={{ duration: 4, ease: 'linear' }}
                key={currentCategoryIndex}
              />
            </div>
          )}

          {/* Category Filter */}
          <motion.div variants={itemVariants} className="flex flex-wrap justify-center gap-2 sm:gap-3 md:gap-4 px-4">
            <motion.button
              onClick={() => handleCategoryClick('all')}
              className={`flex items-center space-x-1 sm:space-x-2 px-3 sm:px-4 md:px-6 py-2 sm:py-3 rounded-full font-tech font-medium transition-all duration-300 text-xs sm:text-sm ${
                selectedCategory === 'all'
                  ? theme.mode === 'theatrical'
                    ? 'bg-theatrical-gold text-black'
                    : 'bg-tech-cyan text-black'
                  : 'bg-white/10 text-white/70 hover:bg-white/20 hover:text-white'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span>All Skills</span>
            </motion.button>
            
            {Object.keys(categoryIcons).map((category) => {
              const IconComponent = categoryIcons[category as keyof typeof categoryIcons];
              return (
                <motion.button
                  key={category}
                  onClick={() => handleCategoryClick(category)}
                  className={`flex items-center space-x-1 sm:space-x-2 px-3 sm:px-4 md:px-6 py-2 sm:py-3 rounded-full font-tech font-medium transition-all duration-300 text-xs sm:text-sm ${
                    selectedCategory === category
                      ? theme.mode === 'theatrical'
                        ? 'bg-theatrical-gold text-black'
                        : 'bg-tech-cyan text-black'
                      : 'bg-white/10 text-white/70 hover:bg-white/20 hover:text-white'
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <IconComponent size={14} className="sm:w-4 sm:h-4" />
                  <span className="hidden sm:inline">{categoryNames[category as keyof typeof categoryNames]}</span>
                  <span className="sm:hidden">{category.replace('-', ' ')}</span>
                </motion.button>
              );
            })}
          </motion.div>

          {/* Skills Grid */}
          <motion.div 
            ref={sphereRef}
            variants={itemVariants} 
            className="relative min-h-[400px] sm:min-h-[500px] md:min-h-[600px] flex items-center justify-center px-4"
          >
            <div className="relative w-full max-w-6xl">
              <AnimatePresence mode="wait">
                <motion.div
                  key={selectedCategory}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.5 }}
                  className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 sm:gap-4 md:gap-6 lg:gap-8"
                >
                  {filteredSkills.map((skill, index) => (
                    <motion.div
                      key={skill.id}
                      variants={skillVariants}
                      initial="hidden"
                      animate="visible"
                      whileHover="hover"
                      className={`skill-orb relative group cursor-pointer`}
                      onMouseEnter={() => setHoveredSkill(skill.id)}
                      onMouseLeave={() => setHoveredSkill(null)}
                      style={{ 
                        animationDelay: `${index * 0.1}s`,
                        transformStyle: 'preserve-3d' 
                      }}
                    >
                      {/* Skill Card */}
                      <div className={`relative p-3 sm:p-4 md:p-6 rounded-xl sm:rounded-2xl backdrop-blur-sm border transition-all duration-500 ${
                        theme.mode === 'theatrical'
                          ? 'bg-black/40 border-theatrical-gold/20 hover:border-theatrical-gold/60'
                          : 'bg-black/40 border-tech-cyan/20 hover:border-tech-cyan/60'
                      }`}>
                        {/* Glow Effect */}
                        <div className={`absolute -inset-0.5 rounded-xl sm:rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${
                          theme.mode === 'theatrical'
                            ? 'bg-gradient-to-r from-theatrical-gold/20 to-theatrical-crimson/20'
                            : 'bg-gradient-to-r from-tech-cyan/20 to-neural-purple/20'
                        } -z-10 blur-sm`} />

                        {/* Skill Icon */}
                        <motion.div
                          className="text-2xl sm:text-3xl md:text-4xl mb-2 sm:mb-3 text-center"
                          animate={{ 
                            rotate: hoveredSkill === skill.id ? 360 : 0,
                            scale: hoveredSkill === skill.id ? 1.2 : 1
                          }}
                          transition={{ duration: 0.5 }}
                        >
                          {skill.icon}
                        </motion.div>

                        {/* Skill Name */}
                        <motion.h3
                          className={`text-center font-tech font-semibold mb-2 sm:mb-3 text-xs sm:text-sm md:text-base ${
                            theme.mode === 'theatrical' ? 'text-theatrical-gold' : 'text-tech-cyan'
                          }`}
                        >
                          {skill.name}
                        </motion.h3>

                        {/* Proficiency Bar */}
                        <div className="relative">
                          <div className="w-full h-1.5 sm:h-2 bg-white/20 rounded-full overflow-hidden">
                            <motion.div
                              className={`h-full rounded-full ${
                                theme.mode === 'theatrical'
                                  ? 'bg-gradient-to-r from-theatrical-gold to-theatrical-crimson'
                                  : 'bg-gradient-to-r from-tech-cyan to-neural-purple'
                              }`}
                              initial={{ width: 0 }}
                              animate={{ width: `85%` }}
                              transition={{ delay: 0.5 + index * 0.1, duration: 1 }}
                            />
                          </div>
                          <motion.span
                            className="absolute -top-4 sm:-top-6 right-0 text-xs font-tech text-white/60"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 1 + index * 0.1 }}
                          >
                            85%
                          </motion.span>
                        </div>

                        {/* Hover Details */}
                        <AnimatePresence>
                          {hoveredSkill === skill.id && (
                            <motion.div
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: 10 }}
                              className="absolute -top-12 sm:-top-16 left-1/2 transform -translate-x-1/2 z-20"
                            >
                              <div className={`px-2 sm:px-3 py-1 sm:py-2 rounded-lg text-xs font-tech whitespace-nowrap ${
                                theme.mode === 'theatrical'
                                  ? 'bg-theatrical-gold text-black'
                                  : 'bg-tech-cyan text-black'
                              }`}>
                                {skill.category.replace('-', ' ').toUpperCase()}
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              </AnimatePresence>
            </div>
          </motion.div>

          {/* Skills Summary */}
          <motion.div
            variants={itemVariants}
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 md:gap-8 mt-12 sm:mt-16 px-4"
          >
            {[
              { 
                title: 'Technical Mastery', 
                count: skills.filter(s => ['programming', 'ai-ml', 'web', 'tools'].includes(s.category)).length,
                description: 'Programming languages, frameworks, and development tools'
              },
              { 
                title: 'AI/ML Expertise', 
                count: skills.filter(s => s.category === 'ai-ml').length,
                description: 'Machine learning frameworks and neural network architectures'
              },
              { 
                title: 'Soft Skills', 
                count: skills.filter(s => s.category === 'soft-skills').length,
                description: 'Leadership, communication, and collaborative abilities'
              }
            ].map((stat, index) => (
              <motion.div
                key={stat.title}
                className={`text-center p-4 sm:p-6 md:p-8 rounded-xl sm:rounded-2xl backdrop-blur-sm border ${
                  theme.mode === 'theatrical'
                    ? 'bg-black/40 border-theatrical-gold/20'
                    : 'bg-black/40 border-tech-cyan/20'
                }`}
                whileHover={{ 
                  scale: 1.05, 
                  y: -10,
                  boxShadow: theme.mode === 'theatrical' 
                    ? '0 20px 40px rgba(255, 215, 0, 0.2)' 
                    : '0 20px 40px rgba(0, 245, 255, 0.2)'
                }}
              >
                <motion.div
                  className={`text-2xl sm:text-3xl md:text-4xl font-bold font-tech mb-2 ${
                    theme.mode === 'theatrical' ? 'text-theatrical-gold' : 'text-tech-cyan'
                  }`}
                  initial={{ scale: 0 }}
                  animate={inView ? { scale: 1 } : { scale: 0 }}
                  transition={{ delay: 0.8 + index * 0.2, type: 'spring', stiffness: 200 }}
                >
                  {stat.count}+
                </motion.div>
                <h4 className="text-lg sm:text-xl font-dramatic font-bold text-white mb-2">
                  {stat.title}
                </h4>
                <p className="text-white/60 font-body text-xs sm:text-sm">
                  {stat.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>

      {/* Custom CSS for floating animation */}
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          25% { transform: translateY(-10px) rotate(1deg); }
          50% { transform: translateY(-5px) rotate(-1deg); }
          75% { transform: translateY(-15px) rotate(0.5deg); }
        }
        .animate-float {
          animation: float 4s ease-in-out infinite;
        }
      `}</style>
    </section>
  );
};