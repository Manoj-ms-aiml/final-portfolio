import React, { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { GraduationCap, Award, Code2, Server } from 'lucide-react';
import { useTheme } from '../../contexts/ThemeContext';
import { gsap } from 'gsap';

interface StatItem {
  icon: React.ReactNode;
  number: string;
  label: string;
  description: string;
}

const stats: StatItem[] = [
  {
    icon: <GraduationCap size={32} />,
    number: '8.98',
    label: 'CGPA',
    description: 'Computer Science'
  },
  {
    icon: <Code2 size={32} />,
    number: '200+',
    label: 'Problems Solved',
    description: 'LeetCode & DSA'
  },
  {
    icon: <Award size={32} />,
    number: '15+',
    label: 'Certifications',
    description: 'Cloud & DevOps'
  },
  {
    icon: <Server size={32} />,
    number: '10+',
    label: 'Projects',
    description: 'AI & Full-Stack'
  }
];

export const AboutSection: React.FC = () => {
  const { theme } = useTheme();
  const [ref, inView] = useInView({ threshold: 0.3, triggerOnce: true });
  const splitTextRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    if (inView && splitTextRef.current) {
      const text = splitTextRef.current.textContent || '';
      const words = text.split(' ');
      
      splitTextRef.current.innerHTML = words
        .map((word, i) => `<span style="display: inline-block; opacity: 0; transform: translateY(50px);">${word}&nbsp;</span>`)
        .join('');

      gsap.to(splitTextRef.current.children, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.05,
        ease: 'power2.out',
        delay: 0.5,
      });
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

  const statsVariants = {
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
  };

  return (
    <section id="about" ref={ref} className="relative py-20 lg:py-32 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 opacity-10">
        {theme.mode === 'theatrical' ? (
          <div className="absolute inset-0 bg-gradient-to-br from-theatrical-gold/20 via-transparent to-theatrical-crimson/20" />
        ) : (
          <>
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-radial from-tech-cyan/20 to-transparent rounded-full animate-pulse" />
            <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gradient-radial from-neural-purple/20 to-transparent rounded-full animate-pulse\" style={{ animationDelay: '1s' }} />
          </>
        )}
      </div>

      <div className="relative max-w-7xl mx-auto px-6">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="grid lg:grid-cols-2 gap-16 lg:gap-20 items-center"
        >
          {/* Left Column - Text Content */}
          <div className="space-y-8">
            <motion.div variants={itemVariants} className="space-y-6">
              <motion.h2
                className={`text-5xl lg:text-7xl font-dramatic font-bold ${
                  theme.mode === 'theatrical'
                    ? 'bg-gradient-to-r from-theatrical-gold to-theatrical-crimson'
                    : 'bg-gradient-to-r from-tech-cyan to-neural-purple'
                } bg-clip-text text-transparent leading-tight`}
              >
                About Me
              </motion.h2>
              
              <motion.div
                className={`w-24 h-1 ${
                  theme.mode === 'theatrical'
                    ? 'bg-gradient-to-r from-theatrical-gold to-theatrical-crimson'
                    : 'bg-gradient-to-r from-tech-cyan to-neural-purple'
                }`}
                initial={{ width: 0 }}
                animate={inView ? { width: 96 } : { width: 0 }}
                transition={{ duration: 1, delay: 0.5 }}
              />
            </motion.div>

            <motion.p
              ref={splitTextRef}
              variants={itemVariants}
              className="text-lg lg:text-xl text-white/80 leading-relaxed font-body"
            >
              I'm a Computer Science Engineering student specializing in Artificial Intelligence and Machine Learning, 
              with a strong focus on DevOps and software development. Currently pursuing my B.E. at 
              Vidyavardhaka College of Engineering with an 8.98 CGPA, I combine cutting-edge AI technologies 
              with robust software engineering practices to build scalable, efficient solutions.
            </motion.p>

            <motion.p
              variants={itemVariants}
              className="text-lg text-white/70 leading-relaxed font-body"
            >
              My expertise spans across AI/ML engineering, DevOps practices, and full-stack development. 
              I'm passionate about creating intelligent systems that drive innovation while ensuring 
              reliability, scalability, and performance. Whether I'm developing machine learning models, 
              setting up CI/CD pipelines, or building web applications, I strive to deliver high-quality 
              solutions that make a real impact.
            </motion.p>

            <motion.div
              variants={itemVariants}
              className="flex flex-wrap gap-4"
            >
              {['AI/ML Engineering', 'DevOps', 'Full-Stack Development', 'Cloud Computing'].map((skill, index) => (
                <motion.span
                  key={skill}
                  className={`px-4 py-2 rounded-full text-sm font-tech font-medium ${
                    theme.mode === 'theatrical'
                      ? 'bg-theatrical-gold/20 text-theatrical-gold border border-theatrical-gold/30'
                      : 'bg-tech-cyan/20 text-tech-cyan border border-tech-cyan/30'
                  }`}
                  whileHover={{ scale: 1.05, y: -2 }}
                  transition={{ delay: index * 0.1 }}
                >
                  {skill}
                </motion.span>
              ))}
            </motion.div>
          </div>

          {/* Right Column - Stats Grid */}
          <motion.div
            variants={itemVariants}
            className="grid grid-cols-2 gap-6"
          >
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                variants={statsVariants}
                whileHover={{ 
                  scale: 1.05, 
                  y: -10,
                  rotateY: 5,
                }}
                className={`relative p-6 lg:p-8 rounded-2xl backdrop-blur-sm border transition-all duration-300 ${
                  theme.mode === 'theatrical'
                    ? 'bg-black/40 border-theatrical-gold/20 hover:border-theatrical-gold/40 hover:shadow-lg hover:shadow-theatrical-gold/20'
                    : 'bg-black/40 border-tech-cyan/20 hover:border-tech-cyan/40 hover:shadow-lg hover:shadow-tech-cyan/20'
                }`}
                style={{ 
                  transformStyle: 'preserve-3d',
                  perspective: 1000 
                }}
              >
                {/* Glow Effect */}
                <div className={`absolute -inset-0.5 rounded-2xl opacity-0 hover:opacity-100 transition-opacity duration-300 ${
                  theme.mode === 'theatrical'
                    ? 'bg-gradient-to-r from-theatrical-gold/20 to-theatrical-crimson/20'
                    : 'bg-gradient-to-r from-tech-cyan/20 to-neural-purple/20'
                } -z-10 blur-sm`} />

                <div className="relative z-10">
                  <motion.div
                    className={`mb-4 ${
                      theme.mode === 'theatrical' ? 'text-theatrical-gold' : 'text-tech-cyan'
                    }`}
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.6 }}
                  >
                    {stat.icon}
                  </motion.div>
                  
                  <motion.div
                    className={`text-3xl lg:text-4xl font-bold font-tech mb-2 ${
                      theme.mode === 'theatrical' ? 'text-theatrical-gold' : 'text-tech-cyan'
                    }`}
                    initial={{ scale: 0 }}
                    animate={inView ? { scale: 1 } : { scale: 0 }}
                    transition={{ delay: 0.8 + index * 0.1, type: 'spring', stiffness: 200 }}
                  >
                    {stat.number}
                  </motion.div>
                  
                  <h4 className="text-white font-semibold text-lg mb-1 font-body">
                    {stat.label}
                  </h4>
                  
                  <p className="text-white/60 text-sm font-body">
                    {stat.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        {/* Bottom Quote */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ delay: 1.5, duration: 1 }}
          className="mt-20 text-center"
        >
          <blockquote className={`text-2xl lg:text-3xl font-dramatic italic max-w-4xl mx-auto ${
            theme.mode === 'theatrical' ? 'text-theatrical-spotlight' : 'text-tech-electric'
          }`}>
            "The stage taught me to understand human emotion; 
            now I teach machines to do the same."
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
      </div>
    </section>
  );
};