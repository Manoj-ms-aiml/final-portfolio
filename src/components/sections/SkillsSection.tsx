import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Brain, Code, Globe, Wrench, Heart } from 'lucide-react';
import { useTheme } from '../../contexts/ThemeContext';
import { skills } from '../../data/skills';
import { Skill } from '../../types';

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
  const [ref, inView] = useInView({ threshold: 0.2, triggerOnce: true });
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);
  const sphereRef = useRef<HTMLDivElement>(null);

  const categories = Array.from(new Set(skills.map(skill => skill.category)));
  const filteredSkills = selectedCategory === 'all' 
    ? skills 
    : skills.filter(skill => skill.category === selectedCategory);

  useEffect(() => {
    if (inView && sphereRef.current) {
      // Create floating animation for skill orbs
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
      scale: 1.2,
      z: 50,
      transition: {
        type: 'spring',
        stiffness: 400,
        damping: 25,
      },
    },
  };

  return (
    <section id="skills" ref={ref} className="relative py-20 lg:py-32 overflow-hidden">
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

      <div className="relative max-w-7xl mx-auto px-6">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="space-y-16"
        >
          {/* Header */}
          <motion.div variants={itemVariants} className="text-center space-y-6">
            <motion.h2
              className={`text-5xl lg:text-7xl font-dramatic font-bold ${
                theme.mode === 'theatrical'
                  ? 'bg-gradient-to-r from-theatrical-gold to-theatrical-crimson'
                  : 'bg-gradient-to-r from-tech-cyan to-neural-purple'
              } bg-clip-text text-transparent leading-tight`}
            >
              Skills & Expertise
            </motion.h2>
            
            <motion.p
              className="text-xl text-white/70 max-w-3xl mx-auto font-body leading-relaxed"
            >
              A comprehensive toolkit spanning artificial intelligence, full-stack development, 
              and the soft skills gained from years of theatrical performance.
            </motion.p>
          </motion.div>

          {/* Category Filter */}
          <motion.div variants={itemVariants} className="flex flex-wrap justify-center gap-4">
            <motion.button
              onClick={() => setSelectedCategory('all')}
              className={`flex items-center space-x-2 px-6 py-3 rounded-full font-tech font-medium transition-all duration-300 ${
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
            
            {categories.map((category) => {
              const IconComponent = categoryIcons[category as keyof typeof categoryIcons];
              return (
                <motion.button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`flex items-center space-x-2 px-6 py-3 rounded-full font-tech font-medium transition-all duration-300 ${
                    selectedCategory === category
                      ? theme.mode === 'theatrical'
                        ? 'bg-theatrical-gold text-black'
                        : 'bg-tech-cyan text-black'
                      : 'bg-white/10 text-white/70 hover:bg-white/20 hover:text-white'
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <IconComponent size={16} />
                  <span>{categoryNames[category as keyof typeof categoryNames]}</span>
                </motion.button>
              );
            })}
          </motion.div>

          {/* Skills Sphere/Grid */}
          <motion.div 
            ref={sphereRef}
            variants={itemVariants} 
            className="relative min-h-[600px] flex items-center justify-center"
          >
            <div className="relative w-full max-w-5xl">
              <AnimatePresence mode="wait">
                <motion.div
                  key={selectedCategory}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.5 }}
                  className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 lg:gap-8"
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
                      <div className={`relative p-6 rounded-2xl backdrop-blur-sm border transition-all duration-500 ${
                        theme.mode === 'theatrical'
                          ? 'bg-black/40 border-theatrical-gold/20 hover:border-theatrical-gold/60'
                          : 'bg-black/40 border-tech-cyan/20 hover:border-tech-cyan/60'
                      }`}>
                        {/* Glow Effect */}
                        <div className={`absolute -inset-0.5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${
                          theme.mode === 'theatrical'
                            ? 'bg-gradient-to-r from-theatrical-gold/20 to-theatrical-crimson/20'
                            : 'bg-gradient-to-r from-tech-cyan/20 to-neural-purple/20'
                        } -z-10 blur-sm`} />

                        {/* Skill Icon */}
                        <motion.div
                          className="text-4xl mb-3 text-center"
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
                          className={`text-center font-tech font-semibold mb-3 ${
                            theme.mode === 'theatrical' ? 'text-theatrical-gold' : 'text-tech-cyan'
                          }`}
                        >
                          {skill.name}
                        </motion.h3>

                        {/* Proficiency Bar */}
                        <div className="relative">
                          <div className="w-full h-2 bg-white/20 rounded-full overflow-hidden">
                            <motion.div
                              className={`h-full rounded-full ${
                                theme.mode === 'theatrical'
                                  ? 'bg-gradient-to-r from-theatrical-gold to-theatrical-crimson'
                                  : 'bg-gradient-to-r from-tech-cyan to-neural-purple'
                              }`}
                              initial={{ width: 0 }}
                              animate={{ width: `${skill.proficiency}` }}
                              transition={{ delay: 0.5 + index * 0.1, duration: 1 }}
                            />
                          </div>
                          <motion.span
                            className="absolute -top-6 right-0 text-xs font-tech text-white/60"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 1 + index * 0.1 }}
                          >
                            {skill.proficiency}
                          </motion.span>
                        </div>

                        {/* Hover Details */}
                        <AnimatePresence>
                          {hoveredSkill === skill.id && (
                            <motion.div
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: 10 }}
                              className="absolute -top-16 left-1/2 transform -translate-x-1/2 z-20"
                            >
                              <div className={`px-3 py-2 rounded-lg text-xs font-tech whitespace-nowrap ${
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
            className="grid md:grid-cols-3 gap-8 mt-16"
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
                className={`text-center p-8 rounded-2xl backdrop-blur-sm border ${
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
                  className={`text-4xl font-bold font-tech mb-2 ${
                    theme.mode === 'theatrical' ? 'text-theatrical-gold' : 'text-tech-cyan'
                  }`}
                  initial={{ scale: 0 }}
                  animate={inView ? { scale: 1 } : { scale: 0 }}
                  transition={{ delay: 0.8 + index * 0.2, type: 'spring', stiffness: 200 }}
                >
                  {stat.count}+
                </motion.div>
                <h4 className="text-xl font-dramatic font-bold text-white mb-2">
                  {stat.title}
                </h4>
                <p className="text-white/60 font-body text-sm">
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