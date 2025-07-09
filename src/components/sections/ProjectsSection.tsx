import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { ExternalLink, Github, Play, ChevronLeft, ChevronRight } from 'lucide-react';
import { useTheme } from '../../contexts/ThemeContext';
import { projects } from '../../data/projects';
import { Project } from '../../types';

export const ProjectsSection: React.FC = () => {
  const { theme } = useTheme();
  const [ref, inView] = useInView({ threshold: 0.2, triggerOnce: true });
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [filter, setFilter] = useState<string>('all');

  const filteredProjects = filter === 'all' 
    ? projects 
    : projects.filter(project => project.category === filter);

  const nextProject = () => {
    setCurrentIndex((prev) => (prev + 1) % filteredProjects.length);
  };

  const prevProject = () => {
    setCurrentIndex((prev) => (prev - 1 + filteredProjects.length) % filteredProjects.length);
  };

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

  const cardVariants = {
    hidden: { scale: 0.8, opacity: 0, rotateY: -15 },
    visible: {
      scale: 1,
      opacity: 1,
      rotateY: 0,
      transition: {
        type: 'spring',
        stiffness: 200,
        damping: 20,
      },
    },
    hover: {
      scale: 1.05,
      rotateY: 5,
      z: 50,
      transition: {
        type: 'spring',
        stiffness: 400,
        damping: 25,
      },
    },
  };

  return (
    <section id="projects" ref={ref} className="relative py-20 lg:py-32 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 opacity-10">
        {theme.mode === 'theatrical' ? (
          <div className="absolute inset-0 bg-gradient-to-br from-theatrical-crimson/20 via-transparent to-theatrical-gold/20" />
        ) : (
          <>
            <div className="absolute top-1/3 left-1/3 w-96 h-96 bg-gradient-radial from-neural-purple/20 to-transparent rounded-full animate-pulse" />
            <div className="absolute bottom-1/3 right-1/3 w-80 h-80 bg-gradient-radial from-tech-cyan/20 to-transparent rounded-full animate-pulse\" style={{ animationDelay: '1s' }} />
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
              Featured Projects
            </motion.h2>
            
            <motion.p
              className="text-xl text-white/70 max-w-3xl mx-auto font-body leading-relaxed"
            >
              A showcase of innovative AI/ML solutions and full-stack applications that bridge 
              technology with human-centered design.
            </motion.p>

            {/* Filter Buttons */}
            <motion.div
              variants={itemVariants}
              className="flex flex-wrap justify-center gap-4 mt-8"
            >
              {['all', 'ai-ml', 'web-dev', 'research'].map((category) => (
                <motion.button
                  key={category}
                  onClick={() => setFilter(category)}
                  className={`px-6 py-3 rounded-full font-tech font-medium transition-all duration-300 ${
                    filter === category
                      ? theme.mode === 'theatrical'
                        ? 'bg-theatrical-gold text-black'
                        : 'bg-tech-cyan text-black'
                      : 'bg-white/10 text-white/70 hover:bg-white/20 hover:text-white'
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {category === 'all' ? 'All Projects' : 
                   category === 'ai-ml' ? 'AI/ML' :
                   category === 'web-dev' ? 'Web Dev' : 'Research'}
                </motion.button>
              ))}
            </motion.div>
          </motion.div>

          {/* Projects Carousel */}
          <motion.div variants={itemVariants} className="relative">
            <div className="flex items-center justify-between mb-8">
              <motion.button
                onClick={prevProject}
                className={`p-3 rounded-full backdrop-blur-sm border transition-all duration-300 ${
                  theme.mode === 'theatrical'
                    ? 'bg-theatrical-gold/20 border-theatrical-gold/30 hover:bg-theatrical-gold/30'
                    : 'bg-tech-cyan/20 border-tech-cyan/30 hover:bg-tech-cyan/30'
                }`}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <ChevronLeft size={24} color={theme.primaryColor} />
              </motion.button>

              <div className="text-center">
                <span className="text-white/60 font-tech">
                  {currentIndex + 1} / {filteredProjects.length}
                </span>
              </div>

              <motion.button
                onClick={nextProject}
                className={`p-3 rounded-full backdrop-blur-sm border transition-all duration-300 ${
                  theme.mode === 'theatrical'
                    ? 'bg-theatrical-gold/20 border-theatrical-gold/30 hover:bg-theatrical-gold/30'
                    : 'bg-tech-cyan/20 border-tech-cyan/30 hover:bg-tech-cyan/30'
                }`}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <ChevronRight size={24} color={theme.primaryColor} />
              </motion.button>
            </div>

            {/* Project Cards */}
            <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentIndex}
                  variants={cardVariants}
                  initial="hidden"
                  animate="visible"
                  exit="hidden"
                  whileHover="hover"
                  className={`relative group cursor-pointer rounded-2xl overflow-hidden backdrop-blur-sm border transition-all duration-500 ${
                    theme.mode === 'theatrical'
                      ? 'bg-black/40 border-theatrical-gold/20 hover:border-theatrical-gold/40'
                      : 'bg-black/40 border-tech-cyan/20 hover:border-tech-cyan/40'
                  }`}
                  onClick={() => setSelectedProject(filteredProjects[currentIndex])}
                  style={{ transformStyle: 'preserve-3d' }}
                >
                  {/* Project Image */}
                  <div className="relative h-64 lg:h-80 overflow-hidden">
                    <motion.img
                      src={filteredProjects[currentIndex]?.images[0]}
                      alt={filteredProjects[currentIndex]?.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      whileHover={{ scale: 1.1 }}
                    />
                    <div className={`absolute inset-0 bg-gradient-to-t ${
                      theme.mode === 'theatrical'
                        ? 'from-black via-transparent to-theatrical-gold/20'
                        : 'from-black via-transparent to-tech-cyan/20'
                    }`} />
                    
                    {/* Featured Badge */}
                    {filteredProjects[currentIndex]?.featured && (
                      <motion.div
                        className={`absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-tech font-bold ${
                          theme.mode === 'theatrical'
                            ? 'bg-theatrical-gold text-black'
                            : 'bg-tech-cyan text-black'
                        }`}
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.5 }}
                      >
                        Featured
                      </motion.div>
                    )}
                  </div>

                  {/* Project Info */}
                  <div className="p-6 lg:p-8">
                    <motion.h3
                      className={`text-2xl lg:text-3xl font-dramatic font-bold mb-4 ${
                        theme.mode === 'theatrical' ? 'text-theatrical-gold' : 'text-tech-cyan'
                      }`}
                      layoutId={`title-${filteredProjects[currentIndex]?.id}`}
                    >
                      {filteredProjects[currentIndex]?.title}
                    </motion.h3>
                    
                    <motion.p
                      className="text-white/80 font-body leading-relaxed mb-6"
                      layoutId={`description-${filteredProjects[currentIndex]?.id}`}
                    >
                      {filteredProjects[currentIndex]?.description}
                    </motion.p>

                    {/* Technologies */}
                    <motion.div className="flex flex-wrap gap-2 mb-6">
                      {filteredProjects[currentIndex]?.technologies.slice(0, 4).map((tech, index) => (
                        <motion.span
                          key={tech}
                          className={`px-3 py-1 rounded-full text-xs font-tech font-medium ${
                            theme.mode === 'theatrical'
                              ? 'bg-theatrical-crimson/20 text-theatrical-crimson border border-theatrical-crimson/30'
                              : 'bg-neural-purple/20 text-neural-purple border border-neural-purple/30'
                          }`}
                          initial={{ opacity: 0, scale: 0 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: 0.1 * index }}
                        >
                          {tech}
                        </motion.span>
                      ))}
                    </motion.div>

                    {/* Action Buttons */}
                    <motion.div className="flex gap-4">
                      {filteredProjects[currentIndex]?.links.github && (
                        <motion.a
                          href={filteredProjects[currentIndex]?.links.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={`flex items-center space-x-2 px-4 py-2 rounded-full border transition-all duration-300 ${
                            theme.mode === 'theatrical'
                              ? 'border-theatrical-gold text-theatrical-gold hover:bg-theatrical-gold hover:text-black'
                              : 'border-tech-cyan text-tech-cyan hover:bg-tech-cyan hover:text-black'
                          }`}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={(e) => e.stopPropagation()}
                        >
                          <Github size={16} />
                          <span className="font-tech text-sm">Code</span>
                        </motion.a>
                      )}
                      
                      {filteredProjects[currentIndex]?.links.live && (
                        <motion.a
                          href={filteredProjects[currentIndex]?.links.live}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={`flex items-center space-x-2 px-4 py-2 rounded-full transition-all duration-300 ${
                            theme.mode === 'theatrical'
                              ? 'bg-theatrical-gold text-black hover:bg-theatrical-crimson'
                              : 'bg-tech-cyan text-black hover:bg-neural-purple'
                          }`}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={(e) => e.stopPropagation()}
                        >
                          <ExternalLink size={16} />
                          <span className="font-tech text-sm">Live Demo</span>
                        </motion.a>
                      )}
                    </motion.div>
                  </div>
                </motion.div>
              </AnimatePresence>

              {/* Project Details Panel */}
              <motion.div
                variants={itemVariants}
                className={`relative p-8 lg:p-10 rounded-2xl backdrop-blur-sm border ${
                  theme.mode === 'theatrical'
                    ? 'bg-black/40 border-theatrical-crimson/20'
                    : 'bg-black/40 border-neural-purple/20'
                }`}
              >
                <motion.h4
                  className={`text-xl font-dramatic font-bold mb-6 ${
                    theme.mode === 'theatrical' ? 'text-theatrical-crimson' : 'text-neural-purple'
                  }`}
                >
                  Project Insights
                </motion.h4>
                
                <motion.p
                  className="text-white/80 font-body leading-relaxed mb-6"
                >
                  {filteredProjects[currentIndex]?.longDescription}
                </motion.p>

                {/* All Technologies */}
                <div className="space-y-4">
                  <h5 className="text-white font-tech font-semibold">Technologies Used:</h5>
                  <div className="flex flex-wrap gap-2">
                    {filteredProjects[currentIndex]?.technologies.map((tech, index) => (
                      <motion.span
                        key={tech}
                        className={`px-3 py-1 rounded-full text-xs font-tech font-medium ${
                          theme.mode === 'theatrical'
                            ? 'bg-theatrical-gold/20 text-theatrical-gold border border-theatrical-gold/30'
                            : 'bg-tech-cyan/20 text-tech-cyan border border-tech-cyan/30'
                        }`}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.05 * index }}
                      >
                        {tech}
                      </motion.span>
                    ))}
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Project Modal */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/90 backdrop-blur-xl z-50 flex items-center justify-center p-6"
            onClick={() => setSelectedProject(null)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className={`relative max-w-4xl w-full max-h-[90vh] overflow-y-auto rounded-2xl backdrop-blur-sm border ${
                theme.mode === 'theatrical'
                  ? 'bg-black/80 border-theatrical-gold/30'
                  : 'bg-black/80 border-tech-cyan/30'
              }`}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-8">
                <motion.h3
                  className={`text-3xl lg:text-4xl font-dramatic font-bold mb-4 ${
                    theme.mode === 'theatrical' ? 'text-theatrical-gold' : 'text-tech-cyan'
                  }`}
                  layoutId={`title-${selectedProject.id}`}
                >
                  {selectedProject.title}
                </motion.h3>
                
                <motion.p
                  className="text-white/80 font-body leading-relaxed mb-6"
                  layoutId={`description-${selectedProject.id}`}
                >
                  {selectedProject.longDescription}
                </motion.p>

                <div className="grid md:grid-cols-2 gap-6 mb-6">
                  {selectedProject.images.map((image, index) => (
                    <motion.img
                      key={index}
                      src={image}
                      alt={`${selectedProject.title} ${index + 1}`}
                      className="w-full h-48 object-cover rounded-lg"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.1 * index }}
                    />
                  ))}
                </div>

                <div className="flex flex-wrap gap-4">
                  {selectedProject.links.github && (
                    <motion.a
                      href={selectedProject.links.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`flex items-center space-x-2 px-6 py-3 rounded-full border transition-all duration-300 ${
                        theme.mode === 'theatrical'
                          ? 'border-theatrical-gold text-theatrical-gold hover:bg-theatrical-gold hover:text-black'
                          : 'border-tech-cyan text-tech-cyan hover:bg-tech-cyan hover:text-black'
                      }`}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Github size={20} />
                      <span className="font-tech">View Code</span>
                    </motion.a>
                  )}
                  
                  {selectedProject.links.live && (
                    <motion.a
                      href={selectedProject.links.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`flex items-center space-x-2 px-6 py-3 rounded-full transition-all duration-300 ${
                        theme.mode === 'theatrical'
                          ? 'bg-theatrical-gold text-black hover:bg-theatrical-crimson'
                          : 'bg-tech-cyan text-black hover:bg-neural-purple'
                      }`}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <ExternalLink size={20} />
                      <span className="font-tech">Live Demo</span>
                    </motion.a>
                  )}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};