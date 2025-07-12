import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Home, 
  User, 
  Code, 
  Award,
  Briefcase, 
  Zap, 
  Mail, 
  Menu, 
  X,
  Sun,
  Moon
} from 'lucide-react';
import { useTheme } from '../../contexts/ThemeContext';
import { useSmoothScroll } from '../../hooks/useSmoothScroll';

interface NavItem {
  id: string;
  label: string;
  icon: React.ReactNode;
  section: string;
}

const navItems: NavItem[] = [
  { id: 'hero', label: 'Home', icon: <Home size={20} />, section: 'hero' },
  { id: 'about', label: 'About', icon: <User size={20} />, section: 'about' },
  { id: 'projects', label: 'Projects', icon: <Code size={20} />, section: 'projects' },
  { id: 'certificates', label: 'Certificates', icon: <Award size={20} />, section: 'certificates' },
  { id: 'experience', label: 'Experience', icon: <Briefcase size={20} />, section: 'experience' },
  { id: 'skills', label: 'Skills', icon: <Zap size={20} />, section: 'skills' },
  { id: 'contact', label: 'Contact', icon: <Mail size={20} />, section: 'contact' },
];

export const Navigation: React.FC = () => {
  const { theme, toggleTheme, currentSection, setCurrentSection } = useTheme();
  const { scrollTo } = useSmoothScroll();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (section: string) => {
    setCurrentSection(section);
    scrollTo(`#${section}`, { offset: -100 });
    setIsMenuOpen(false);
  };

  const navVariants = {
    hidden: { y: -100, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { 
        type: 'spring',
        stiffness: 100,
        damping: 20 
      }
    }
  };

  const menuVariants = {
    closed: { 
      opacity: 0, 
      x: '100%',
      transition: { 
        type: 'spring',
        stiffness: 400,
        damping: 40 
      }
    },
    open: { 
      opacity: 1, 
      x: 0,
      transition: { 
        type: 'spring',
        stiffness: 400,
        damping: 40 
      }
    }
  };

  const itemVariants = {
    closed: { opacity: 0, x: 50 },
    open: (i: number) => ({
      opacity: 1,
      x: 0,
      transition: {
        delay: i * 0.1,
        type: 'spring',
        stiffness: 400,
        damping: 25
      }
    })
  };

  return (
    <>
      {/* Desktop Navigation */}
      <motion.nav
        variants={navVariants}
        initial="hidden"
        animate="visible"
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled 
            ? 'bg-black/90 backdrop-blur-md border-b border-white/10' 
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="font-dramatic text-2xl font-bold"
              style={{ color: theme.primaryColor }}
            >
              M<span className="text-white">S</span>
            </motion.div>

            {/* Desktop Menu */}
            <div className="hidden lg:flex items-center space-x-8">
              {navItems.map((item) => (
                <motion.button
                  key={item.id}
                  onClick={() => handleNavClick(item.section)}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-full transition-all duration-300 ${
                    currentSection === item.id
                      ? `bg-gradient-to-r ${
                          theme.mode === 'theatrical'
                            ? 'from-theatrical-gold/20 to-theatrical-crimson/20 text-theatrical-gold'
                            : 'from-tech-cyan/20 to-tech-electric/20 text-tech-cyan'
                        }`
                      : 'text-white/70 hover:text-white'
                  }`}
                  whileHover={{ 
                    scale: 1.05,
                    backgroundColor: currentSection === item.id ? undefined : 'rgba(255,255,255,0.1)'
                  }}
                  whileTap={{ scale: 0.95 }}
                >
                  <motion.div
                    animate={{ 
                      rotate: currentSection === item.id ? 360 : 0,
                      color: currentSection === item.id ? theme.primaryColor : undefined
                    }}
                    transition={{ duration: 0.5 }}
                  >
                    {item.icon}
                  </motion.div>
                  <span className="font-tech text-sm font-medium">{item.label}</span>
                </motion.button>
              ))}
              
              {/* Theme Toggle */}
              <motion.button
                onClick={toggleTheme}
                className="p-3 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/20 transition-all duration-300"
                whileHover={{ scale: 1.05, rotate: 180 }}
                whileTap={{ scale: 0.95 }}
              >
                <motion.div
                  animate={{ rotate: theme.mode === 'tech' ? 180 : 0 }}
                  transition={{ duration: 0.5 }}
                >
                  {theme.mode === 'theatrical' ? (
                    <Moon size={20} color={theme.primaryColor} />
                  ) : (
                    <Sun size={20} color={theme.primaryColor} />
                  )}
                </motion.div>
              </motion.button>
            </div>

            {/* Mobile Menu Button */}
            <motion.button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden p-2 rounded-full bg-white/10 backdrop-blur-sm"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <motion.div
                animate={{ rotate: isMenuOpen ? 180 : 0 }}
                transition={{ duration: 0.3 }}
              >
                {isMenuOpen ? (
                  <X size={24} color={theme.primaryColor} />
                ) : (
                  <Menu size={24} color={theme.primaryColor} />
                )}
              </motion.div>
            </motion.button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            variants={menuVariants}
            initial="closed"
            animate="open"
            exit="closed"
            className="fixed top-0 right-0 bottom-0 w-80 bg-black/95 backdrop-blur-xl border-l border-white/10 z-50 lg:hidden"
          >
            <div className="flex flex-col h-full pt-20 pb-8 px-6">
              {navItems.map((item, index) => (
                <motion.button
                  key={item.id}
                  custom={index}
                  variants={itemVariants}
                  onClick={() => handleNavClick(item.section)}
                  className={`flex items-center space-x-4 px-6 py-4 rounded-xl mb-2 transition-all duration-300 ${
                    currentSection === item.id
                      ? `bg-gradient-to-r ${
                          theme.mode === 'theatrical'
                            ? 'from-theatrical-gold/20 to-theatrical-crimson/20 text-theatrical-gold'
                            : 'from-tech-cyan/20 to-tech-electric/20 text-tech-cyan'
                        }`
                      : 'text-white/70 hover:text-white hover:bg-white/5'
                  }`}
                  whileHover={{ x: 10 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <motion.div
                    animate={{ 
                      rotate: currentSection === item.id ? 360 : 0,
                      color: currentSection === item.id ? theme.primaryColor : undefined
                    }}
                    transition={{ duration: 0.5 }}
                  >
                    {item.icon}
                  </motion.div>
                  <span className="font-tech text-lg font-medium">{item.label}</span>
                </motion.button>
              ))}

              <div className="mt-auto pt-8 border-t border-white/10">
                <motion.button
                  onClick={toggleTheme}
                  className="flex items-center space-x-4 px-6 py-4 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/20 transition-all duration-300 w-full"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <motion.div
                    animate={{ rotate: theme.mode === 'tech' ? 180 : 0 }}
                    transition={{ duration: 0.5 }}
                  >
                    {theme.mode === 'theatrical' ? (
                      <Moon size={20} color={theme.primaryColor} />
                    ) : (
                      <Sun size={20} color={theme.primaryColor} />
                    )}
                  </motion.div>
                  <span className="font-tech text-lg font-medium text-white">
                    {theme.mode === 'theatrical' ? 'Tech Mode' : 'Theatre Mode'}
                  </span>
                </motion.button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile Menu Backdrop */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden"
            onClick={() => setIsMenuOpen(false)}
          />
        )}
      </AnimatePresence>
    </>
  );
};