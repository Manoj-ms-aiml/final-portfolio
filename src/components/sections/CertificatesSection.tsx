import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { ExternalLink, Award, ChevronLeft, ChevronRight, Play, Pause, Clock } from 'lucide-react';
import { useTheme } from '../../contexts/ThemeContext';
import { certificates } from '../../data/certificates';
import { Certificate } from '../../types';

export const CertificatesSection: React.FC = () => {
  const { theme } = useTheme();
  const [ref, inView] = useInView({ threshold: 0.2, triggerOnce: true });
  const [selectedCertificate, setSelectedCertificate] = useState<Certificate | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [filter, setFilter] = useState<string>('all');
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [isPresentationMode, setIsPresentationMode] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const filteredCertificates = filter === 'all' 
    ? certificates 
    : certificates.filter(cert => cert.category === filter);

  // Auto-presentation logic
  useEffect(() => {
    if (isAutoPlaying && isPresentationMode && filteredCertificates.length > 1) {
      intervalRef.current = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % filteredCertificates.length);
      }, 2000); // 2 seconds per certificate
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
  }, [isAutoPlaying, isPresentationMode, filteredCertificates.length]);

  // Start presentation mode when section comes into view
  useEffect(() => {
    if (inView && !isPresentationMode) {
      setIsPresentationMode(true);
    }
  }, [inView]);

  const nextCertificate = () => {
    setCurrentIndex((prev) => (prev + 1) % filteredCertificates.length);
  };

  const prevCertificate = () => {
    setCurrentIndex((prev) => (prev - 1 + filteredCertificates.length) % filteredCertificates.length);
  };

  const handleCertificateClick = () => {
    setIsAutoPlaying(false);
    setIsPresentationMode(false);
  };

  const toggleAutoPlay = () => {
    setIsAutoPlaying(!isAutoPlaying);
    if (!isAutoPlaying) {
      setIsPresentationMode(true);
    }
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
    <section id="certificates" ref={ref} className="relative py-12 sm:py-16 md:py-20 lg:py-32 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 opacity-10">
        {theme.mode === 'theatrical' ? (
          <div className="absolute inset-0 bg-gradient-to-br from-theatrical-gold/20 via-transparent to-theatrical-spotlight/20" />
        ) : (
          <>
            <div className="absolute top-1/3 left-1/3 w-96 h-96 bg-gradient-radial from-neural-purple/20 to-transparent rounded-full animate-pulse" />
            <div className="absolute bottom-1/3 right-1/3 w-80 h-80 bg-gradient-radial from-tech-cyan/20 to-transparent rounded-full animate-pulse" style={{ animationDelay: '1s' }} />
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
              Certifications
            </motion.h2>
            
            <motion.p
              className="text-base sm:text-lg md:text-xl text-white/70 max-w-3xl mx-auto font-body leading-relaxed px-4"
            >
              Professional certifications validating expertise in cloud computing, AI/ML, 
              DevOps, and modern development practices.
            </motion.p>

            {/* Filter Buttons */}
            <motion.div
              variants={itemVariants}
              className="flex flex-wrap justify-center gap-2 sm:gap-3 md:gap-4 mt-6 sm:mt-8 px-4"
            >
              {['all', 'cloud', 'ai-ml', 'devops', 'web-dev', 'programming'].map((category) => (
                <motion.button
                  key={category}
                  onClick={() => setFilter(category)}
                  className={`px-3 sm:px-4 md:px-6 py-2 sm:py-3 rounded-full font-tech font-medium transition-all duration-300 text-xs sm:text-sm ${
                    filter === category
                      ? theme.mode === 'theatrical'
                        ? 'bg-theatrical-gold text-black'
                        : 'bg-tech-cyan text-black'
                      : 'bg-white/10 text-white/70 hover:bg-white/20 hover:text-white'
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {category === 'all' ? 'All Certificates' : 
                   category === 'ai-ml' ? 'AI/ML' :
                   category === 'web-dev' ? 'Web Dev' : 
                   category.charAt(0).toUpperCase() + category.slice(1)}
                </motion.button>
              ))}
            </motion.div>
          </motion.div>

          {/* Certificates Carousel */}
          <motion.div variants={itemVariants} className="relative">
            {/* Controls */}
            <div className="flex items-center justify-between mb-6 sm:mb-8 px-4">
              <motion.button
                onClick={prevCertificate}
                className={`p-2 sm:p-3 rounded-full backdrop-blur-sm border transition-all duration-300 ${
                  theme.mode === 'theatrical'
                    ? 'bg-theatrical-gold/20 border-theatrical-gold/30 hover:bg-theatrical-gold/30'
                    : 'bg-tech-cyan/20 border-tech-cyan/30 hover:bg-tech-cyan/30'
                }`}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <ChevronLeft size={20} color={theme.primaryColor} className="sm:w-6 sm:h-6" />
              </motion.button>

              <div className="flex items-center space-x-4">
                {/* Auto-play toggle */}
                <motion.button
                  onClick={toggleAutoPlay}
                  className={`flex items-center space-x-2 px-3 sm:px-4 py-2 rounded-full backdrop-blur-sm border transition-all duration-300 ${
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
                  <span className="text-xs sm:text-sm font-tech text-white/70">
                    {isAutoPlaying ? 'Pause' : 'Play'}
                  </span>
                </motion.button>

                {/* Progress indicator */}
                <div className="text-center">
                  <span className="text-white/60 font-tech text-xs sm:text-sm">
                    {currentIndex + 1} / {filteredCertificates.length}
                  </span>
                  {isAutoPlaying && (
                    <div className="flex items-center space-x-1 mt-1">
                      <Clock size={12} className="text-white/40" />
                      <span className="text-xs text-white/40">Auto</span>
                    </div>
                  )}
                </div>
              </div>

              <motion.button
                onClick={nextCertificate}
                className={`p-2 sm:p-3 rounded-full backdrop-blur-sm border transition-all duration-300 ${
                  theme.mode === 'theatrical'
                    ? 'bg-theatrical-gold/20 border-theatrical-gold/30 hover:bg-theatrical-gold/30'
                    : 'bg-tech-cyan/20 border-tech-cyan/30 hover:bg-tech-cyan/30'
                }`}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <ChevronRight size={20} color={theme.primaryColor} className="sm:w-6 sm:h-6" />
              </motion.button>
            </div>

            {/* Progress Bar */}
            {isAutoPlaying && (
              <div className="w-full h-1 bg-white/20 rounded-full mb-6 sm:mb-8 mx-4">
                <motion.div
                  className={`h-full rounded-full ${
                    theme.mode === 'theatrical'
                      ? 'bg-gradient-to-r from-theatrical-gold to-theatrical-crimson'
                      : 'bg-gradient-to-r from-tech-cyan to-neural-purple'
                  }`}
                  initial={{ width: '0%' }}
                  animate={{ width: '100%' }}
                  transition={{ duration: 2, ease: 'linear' }}
                  key={currentIndex}
                />
              </div>
            )}

            {/* Certificate Cards */}
            <div className="grid lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12 px-4">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentIndex}
                  variants={cardVariants}
                  initial="hidden"
                  animate="visible"
                  exit="hidden"
                  whileHover="hover"
                  className={`relative group cursor-pointer rounded-xl sm:rounded-2xl overflow-hidden backdrop-blur-sm border transition-all duration-500 ${
                    theme.mode === 'theatrical'
                      ? 'bg-black/40 border-theatrical-gold/20 hover:border-theatrical-gold/40'
                      : 'bg-black/40 border-tech-cyan/20 hover:border-tech-cyan/40'
                  }`}
                  onClick={handleCertificateClick}
                  style={{ transformStyle: 'preserve-3d' }}
                >
                  {/* Certificate Image */}
                  <div className="relative h-48 sm:h-64 lg:h-80 overflow-hidden">
                    <motion.img
                      src={filteredCertificates[currentIndex]?.image}
                      alt={filteredCertificates[currentIndex]?.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      whileHover={{ scale: 1.1 }}
                    />
                    <div className={`absolute inset-0 bg-gradient-to-t ${
                      theme.mode === 'theatrical'
                        ? 'from-black via-transparent to-theatrical-gold/20'
                        : 'from-black via-transparent to-tech-cyan/20'
                    }`} />
                    
                    {/* Featured Badge */}
                    {filteredCertificates[currentIndex]?.featured && (
                      <motion.div
                        className={`absolute top-3 sm:top-4 right-3 sm:right-4 px-2 sm:px-3 py-1 rounded-full text-xs font-tech font-bold ${
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

                  {/* Certificate Info */}
                  <div className="p-4 sm:p-6 lg:p-8">
                    <motion.h3
                      className={`text-xl sm:text-2xl lg:text-3xl font-dramatic font-bold mb-3 sm:mb-4 ${
                        theme.mode === 'theatrical' ? 'text-theatrical-gold' : 'text-tech-cyan'
                      }`}
                      layoutId={`title-${filteredCertificates[currentIndex]?.id}`}
                    >
                      {filteredCertificates[currentIndex]?.title}
                    </motion.h3>
                    
                    <motion.p
                      className="text-white/80 font-body leading-relaxed mb-4 sm:mb-6 text-sm sm:text-base"
                      layoutId={`description-${filteredCertificates[currentIndex]?.id}`}
                    >
                      {filteredCertificates[currentIndex]?.description}
                    </motion.p>

                    {/* Certificate Details */}
                    <div className="space-y-2 sm:space-y-3 mb-4 sm:mb-6">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-white/60 font-tech">Issuer:</span>
                        <span className="text-white font-tech">{filteredCertificates[currentIndex]?.issuer}</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-white/60 font-tech">Date:</span>
                        <span className="text-white font-tech">{filteredCertificates[currentIndex]?.date}</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-white/60 font-tech">ID:</span>
                        <span className="text-white font-tech font-mono text-xs">{filteredCertificates[currentIndex]?.credentialId}</span>
                      </div>
                    </div>

                    {/* Action Button */}
                    <motion.a
                      href={filteredCertificates[currentIndex]?.verificationUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`flex items-center justify-center space-x-2 px-4 sm:px-6 py-2 sm:py-3 rounded-full transition-all duration-300 w-full ${
                        theme.mode === 'theatrical'
                          ? 'bg-theatrical-gold text-black hover:bg-theatrical-crimson'
                          : 'bg-tech-cyan text-black hover:bg-neural-purple'
                      }`}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={(e) => e.stopPropagation()}
                    >
                      <ExternalLink size={16} className="sm:w-5 sm:h-5" />
                      <span className="font-tech text-sm sm:text-base">Verify Certificate</span>
                    </motion.a>
                  </div>
                </motion.div>
              </AnimatePresence>

              {/* Certificate Details Panel */}
              <motion.div
                variants={itemVariants}
                className={`relative p-4 sm:p-6 lg:p-8 lg:p-10 rounded-xl sm:rounded-2xl backdrop-blur-sm border ${
                  theme.mode === 'theatrical'
                    ? 'bg-black/40 border-theatrical-crimson/20'
                    : 'bg-black/40 border-neural-purple/20'
                }`}
              >
                <motion.h4
                  className={`text-lg sm:text-xl font-dramatic font-bold mb-4 sm:mb-6 ${
                    theme.mode === 'theatrical' ? 'text-theatrical-crimson' : 'text-neural-purple'
                  }`}
                >
                  Certification Details
                </motion.h4>
                
                <motion.p
                  className="text-white/80 font-body leading-relaxed mb-4 sm:mb-6 text-sm sm:text-base"
                >
                  This certification validates my expertise in {filteredCertificates[currentIndex]?.category.replace('-', ' ')} 
                  and demonstrates my commitment to staying current with industry best practices and emerging technologies.
                </motion.p>

                {/* Category Badge */}
                <div className="space-y-4">
                  <h5 className="text-white font-tech font-semibold text-sm sm:text-base">Category:</h5>
                  <motion.span
                    className={`inline-block px-3 sm:px-4 py-1 sm:py-2 rounded-full text-xs sm:text-sm font-tech font-medium ${
                      theme.mode === 'theatrical'
                        ? 'bg-theatrical-gold/20 text-theatrical-gold border border-theatrical-gold/30'
                        : 'bg-tech-cyan/20 text-tech-cyan border border-tech-cyan/30'
                    }`}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                  >
                    {filteredCertificates[currentIndex]?.category.replace('-', ' ').toUpperCase()}
                  </motion.span>
                </div>

                {/* Skills Gained */}
                <div className="mt-6 sm:mt-8">
                  <h5 className="text-white font-tech font-semibold mb-3 sm:mb-4 text-sm sm:text-base">Skills Validated:</h5>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3">
                    {[
                      'Technical Proficiency',
                      'Best Practices',
                      'Industry Standards',
                      'Problem Solving'
                    ].map((skill, index) => (
                      <motion.div
                        key={skill}
                        className="flex items-center space-x-2 text-white/70 text-xs sm:text-sm"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.7 + index * 0.1 }}
                      >
                        <Award size={14} className={theme.mode === 'theatrical' ? 'text-theatrical-gold' : 'text-tech-cyan'} />
                        <span className="font-body">{skill}</span>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};