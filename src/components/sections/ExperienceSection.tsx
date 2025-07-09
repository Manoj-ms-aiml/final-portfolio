import React, { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Calendar, User, Award, Play } from 'lucide-react';
import { useTheme } from '../../contexts/ThemeContext';
import { experiences } from '../../data/experience';
import { gsap } from 'gsap';

export const ExperienceSection: React.FC = () => {
  const { theme } = useTheme();
  const [ref, inView] = useInView({ threshold: 0.2, triggerOnce: true });
  const timelineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (inView && timelineRef.current) {
      const timeline = gsap.timeline();
      
      // Animate timeline items sequentially
      timeline.fromTo(
        '.timeline-item',
        { 
          opacity: 0, 
          x: -100,
          rotateY: -15 
        },
        {
          opacity: 1,
          x: 0,
          rotateY: 0,
          duration: 1,
          stagger: 0.3,
          ease: 'power3.out',
        }
      );

      // Animate connecting lines
      timeline.fromTo(
        '.timeline-line',
        { scaleY: 0 },
        { 
          scaleY: 1, 
          duration: 1.5, 
          ease: 'power2.inOut' 
        },
        '-=1'
      );
    }
  }, [inView]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
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

  return (
    <section id="experience" ref={ref} className="relative py-20 lg:py-32 overflow-hidden">
      {/* Theatrical Background */}
      <div className="absolute inset-0">
        {theme.mode === 'theatrical' && (
          <>
            {/* Stage Curtains */}
            <div className="absolute top-0 left-0 w-32 h-full bg-gradient-to-r from-theatrical-curtain to-transparent opacity-60" />
            <div className="absolute top-0 right-0 w-32 h-full bg-gradient-to-l from-theatrical-curtain to-transparent opacity-60" />
            
            {/* Spotlight Effects */}
            <div className="absolute top-1/4 left-1/2 transform -translate-x-1/2 w-[600px] h-[600px] bg-gradient-radial from-theatrical-spotlight/30 to-transparent rounded-full animate-spotlight" />
            <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-gradient-radial from-theatrical-gold/20 to-transparent rounded-full animate-pulse" />
          </>
        )}
        
        {theme.mode === 'tech' && (
          <div className="absolute inset-0 opacity-20">
            <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-gradient-radial from-neural-purple/30 to-transparent rounded-full animate-pulse" />
            <div className="absolute bottom-1/3 right-1/4 w-80 h-80 bg-gradient-radial from-tech-cyan/30 to-transparent rounded-full animate-pulse" style={{ animationDelay: '1s' }} />
          </div>
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
              Experience Journey
            </motion.h2>
            
            <motion.p
              className="text-xl text-white/70 max-w-3xl mx-auto font-body leading-relaxed"
            >
              Where storytelling meets technology. My experiences have shaped my approach 
              to creating more empathetic and human-centered AI systems.
            </motion.p>

            {/* Stage Quote */}
            <motion.blockquote
              variants={itemVariants}
              className={`text-2xl lg:text-3xl font-dramatic italic mt-8 ${
                theme.mode === 'theatrical' ? 'text-theatrical-spotlight' : 'text-tech-electric'
              }`}
            >
              "All the world's a stage, and all the algorithms merely players"
            </motion.blockquote>
          </motion.div>

          {/* Experience Timeline */}
          <motion.div 
            ref={timelineRef}
            variants={itemVariants} 
            className="relative"
          >
            {/* Central Timeline Line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-transparent via-theatrical-gold to-transparent timeline-line" />

            <div className="space-y-16">
              {experiences.map((experience, index) => (
                <motion.div
                  key={experience.id}
                  className={`timeline-item relative flex items-center ${
                    index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'
                  }`}
                  whileHover={{ scale: 1.02 }}
                >
                  {/* Timeline Dot */}
                  <div className="absolute left-1/2 transform -translate-x-1/2 z-10">
                    <motion.div
                      className={`w-6 h-6 rounded-full border-4 ${
                        theme.mode === 'theatrical'
                          ? 'bg-theatrical-gold border-black'
                          : 'bg-tech-cyan border-black'
                      }`}
                      whileHover={{ scale: 1.5 }}
                      transition={{ type: 'spring', stiffness: 400 }}
                    />
                  </div>

                  {/* Content Card */}
                  <div className={`w-full lg:w-5/12 ${index % 2 === 0 ? 'lg:pr-16' : 'lg:pl-16'}`}>
                    <motion.div
                      className={`relative p-8 rounded-2xl backdrop-blur-sm border transition-all duration-500 ${
                        theme.mode === 'theatrical'
                          ? 'bg-black/60 border-theatrical-gold/30 hover:border-theatrical-gold/60'
                          : 'bg-black/60 border-tech-cyan/30 hover:border-tech-cyan/60'
                      }`}
                      whileHover={{ 
                        y: -10,
                        boxShadow: theme.mode === 'theatrical' 
                          ? '0 20px 40px rgba(255, 215, 0, 0.2)' 
                          : '0 20px 40px rgba(0, 245, 255, 0.2)'
                      }}
                    >
                      {/* Year Badge */}
                      <motion.div
                        className={`absolute -top-4 left-8 px-4 py-2 rounded-full text-sm font-tech font-bold ${
                          theme.mode === 'theatrical'
                            ? 'bg-theatrical-crimson text-white'
                            : 'bg-neural-purple text-white'
                        }`}
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.5 + index * 0.1 }}
                      >
                        {experience.year}
                      </motion.div>

                      {/* Production Image */}
                      <div className="relative h-48 mb-6 rounded-lg overflow-hidden">
                        <motion.img
                          src={experience.images[0]}
                          alt={experience.production}
                          className="w-full h-full object-cover transition-transform duration-700"
                          whileHover={{ scale: 1.1 }}
                        />
                        <div className={`absolute inset-0 bg-gradient-to-t ${
                          theme.mode === 'theatrical'
                            ? 'from-black/80 via-transparent to-theatrical-gold/20'
                            : 'from-black/80 via-transparent to-tech-cyan/20'
                        }`} />
                        
                        {/* Play Button Overlay */}
                        <motion.div
                          className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300"
                          whileHover={{ scale: 1.1 }}
                        >
                          <div className={`p-4 rounded-full backdrop-blur-sm ${
                            theme.mode === 'theatrical'
                              ? 'bg-theatrical-gold/20 border border-theatrical-gold/40'
                              : 'bg-tech-cyan/20 border border-tech-cyan/40'
                          }`}>
                            <Play size={32} color={theme.primaryColor} />
                          </div>
                        </motion.div>
                      </div>

                      {/* Content */}
                      <div className="space-y-4">
                        <motion.h3
                          className={`text-2xl font-dramatic font-bold ${
                            theme.mode === 'theatrical' ? 'text-theatrical-gold' : 'text-tech-cyan'
                          }`}
                        >
                          {experience.production}
                        </motion.h3>

                        <div className="flex items-center space-x-6 text-white/60 font-tech text-sm">
                          <div className="flex items-center space-x-2">
                            <User size={16} />
                            <span>{experience.role}</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Award size={16} />
                            <span>Dir. {experience.director}</span>
                          </div>
                        </div>

                        <motion.p
                          className="text-white/80 font-body leading-relaxed"
                        >
                          {experience.description}
                        </motion.p>

                        {/* Category Badge */}
                        <motion.span
                          className={`inline-block px-3 py-1 rounded-full text-xs font-tech font-medium ${
                            theme.mode === 'theatrical'
                              ? 'bg-theatrical-crimson/20 text-theatrical-crimson border border-theatrical-crimson/30'
                              : 'bg-neural-purple/20 text-neural-purple border border-neural-purple/30'
                          }`}
                          initial={{ opacity: 0, scale: 0 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: 0.8 + index * 0.1 }}
                        >
                          {experience.category.charAt(0).toUpperCase() + experience.category.slice(1)}
                        </motion.span>
                      </div>
                    </motion.div>
                  </div>

                  {/* Spacer for opposite side */}
                  <div className="hidden lg:block w-5/12" />
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Bottom Quote */}
          <motion.div
            variants={itemVariants}
            className="text-center mt-20"
          >
            <blockquote className={`text-xl lg:text-2xl font-dramatic italic max-w-4xl mx-auto ${
              theme.mode === 'theatrical' ? 'text-theatrical-spotlight' : 'text-tech-electric'
            }`}>
              "Experience taught me that every character has a story, every emotion has depth. 
              Now I bring that understanding to AI—creating systems that don't just process data, 
              but truly comprehend the human experience."
            </blockquote>
            <motion.div
              className={`w-32 h-0.5 mx-auto mt-6 ${
                theme.mode === 'theatrical'
                  ? 'bg-gradient-to-r from-transparent via-theatrical-gold to-transparent'
                  : 'bg-gradient-to-r from-transparent via-tech-cyan to-transparent'
              }`}
              initial={{ scaleX: 0 }}
              animate={inView ? { scaleX: 1 } : { scaleX: 0 }}
              transition={{ delay: 2, duration: 1 }}
            />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};