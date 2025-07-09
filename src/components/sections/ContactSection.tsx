import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Linkedin, 
  Github, 
  Send, 
  CheckCircle,
  AlertCircle,
  User,
  MessageSquare
} from 'lucide-react';
import { useTheme } from '../../contexts/ThemeContext';

interface FormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  subject?: string;
  message?: string;
}

export const ContactSection: React.FC = () => {
  const { theme } = useTheme();
  const [ref, inView] = useInView({ threshold: 0.2, triggerOnce: true });
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const formRef = useRef<HTMLFormElement>(null);

  const contactInfo = [
    {
      icon: Mail,
      label: 'Email',
      value: 'manojmsaiml@gmail.com',
      href: 'mailto:manojmsaiml@gmail.com'
    },
    {
      icon: Phone,
      label: 'Phone',
      value: '+91 6360099113',
      href: 'tel:+916360099113'
    },
    {
      icon: MapPin,
      label: 'Location',
      value: 'Mysore, Karnataka - 570016',
      href: '#'
    },
    {
      icon: Linkedin,
      label: 'LinkedIn',
      value: 'manoj-ms-aiml',
      href: 'https://linkedin.com/in/manoj-ms-aiml'
    },
    {
      icon: Github,
      label: 'GitHub',
      value: 'manoj-ms-aiml',
      href: 'https://github.com/manoj-ms-aiml'
    }
  ];

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }

    if (!formData.subject.trim()) {
      newErrors.subject = 'Subject is required';
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    } else if (formData.message.trim().length < 10) {
      newErrors.message = 'Message must be at least 10 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error when user starts typing
    if (errors[name as keyof FormErrors]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      setSubmitStatus('success');
      setFormData({ name: '', email: '', subject: '', message: '' });
      
      // Reset success status after 5 seconds
      setTimeout(() => setSubmitStatus('idle'), 5000);
    } catch (error) {
      setSubmitStatus('error');
      setTimeout(() => setSubmitStatus('idle'), 5000);
    } finally {
      setIsSubmitting(false);
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

  const inputVariants = {
    focus: {
      scale: 1.02,
      transition: { type: 'spring', stiffness: 300 }
    },
    blur: {
      scale: 1,
      transition: { type: 'spring', stiffness: 300 }
    }
  };

  return (
    <section id="contact" ref={ref} className="relative py-20 lg:py-32 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 opacity-10">
        {theme.mode === 'theatrical' ? (
          <>
            <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-gradient-radial from-theatrical-gold/30 to-transparent rounded-full animate-pulse" />
            <div className="absolute bottom-1/4 left-1/4 w-80 h-80 bg-gradient-radial from-theatrical-crimson/30 to-transparent rounded-full animate-pulse\" style={{ animationDelay: '1s' }} />
          </>
        ) : (
          <>
            <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-gradient-radial from-tech-cyan/20 to-transparent rounded-full animate-pulse" />
            <div className="absolute bottom-1/3 right-1/4 w-80 h-80 bg-gradient-radial from-neural-purple/20 to-transparent rounded-full animate-pulse" style={{ animationDelay: '1s' }} />
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
              Let's Connect
            </motion.h2>
            
            <motion.p
              className="text-xl text-white/70 max-w-3xl mx-auto font-body leading-relaxed"
            >
              Ready to collaborate on innovative AI solutions or discuss how theatre principles 
              can enhance technology? Let's start a conversation.
            </motion.p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-16 lg:gap-20">
            {/* Contact Information */}
            <motion.div variants={itemVariants} className="space-y-8">
              <motion.h3
                className={`text-3xl font-dramatic font-bold mb-8 ${
                  theme.mode === 'theatrical' ? 'text-theatrical-gold' : 'text-tech-cyan'
                }`}
              >
                Get In Touch
              </motion.h3>

              <div className="space-y-6">
                {contactInfo.map((info, index) => {
                  const IconComponent = info.icon;
                  return (
                    <motion.div
                      key={info.label}
                      variants={itemVariants}
                      whileHover={{ x: 10, scale: 1.02 }}
                      className="group"
                    >
                      <motion.a
                        href={info.href}
                        target={info.href.startsWith('http') ? '_blank' : undefined}
                        rel={info.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                        className={`flex items-center space-x-4 p-4 rounded-xl backdrop-blur-sm border transition-all duration-300 ${
                          theme.mode === 'theatrical'
                            ? 'bg-black/40 border-theatrical-gold/20 hover:border-theatrical-gold/40 hover:bg-theatrical-gold/10'
                            : 'bg-black/40 border-tech-cyan/20 hover:border-tech-cyan/40 hover:bg-tech-cyan/10'
                        }`}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <motion.div
                          className={`p-3 rounded-full ${
                            theme.mode === 'theatrical'
                              ? 'bg-theatrical-gold/20 text-theatrical-gold'
                              : 'bg-tech-cyan/20 text-tech-cyan'
                          }`}
                          whileHover={{ rotate: 360 }}
                          transition={{ duration: 0.5 }}
                        >
                          <IconComponent size={24} />
                        </motion.div>
                        <div>
                          <h4 className="font-tech font-semibold text-white">
                            {info.label}
                          </h4>
                          <p className="text-white/70 font-body">
                            {info.value}
                          </p>
                        </div>
                      </motion.a>
                    </motion.div>
                  );
                })}
              </div>

              {/* Call to Action */}
              <motion.div
                variants={itemVariants}
                className={`p-6 rounded-xl backdrop-blur-sm border ${
                  theme.mode === 'theatrical'
                    ? 'bg-theatrical-gold/10 border-theatrical-gold/30'
                    : 'bg-tech-cyan/10 border-tech-cyan/30'
                }`}
              >
                <h4 className={`font-dramatic font-bold text-xl mb-3 ${
                  theme.mode === 'theatrical' ? 'text-theatrical-gold' : 'text-tech-cyan'
                }`}>
                  Open to Opportunities
                </h4>
                <p className="text-white/80 font-body leading-relaxed">
                  I'm actively seeking opportunities in AI/ML engineering, full-stack development, 
                  and innovative projects that bridge technology with human creativity. 
                  Let's explore how we can work together!
                </p>
              </motion.div>
            </motion.div>

            {/* Contact Form */}
            <motion.div variants={itemVariants}>
              <motion.form
                ref={formRef}
                onSubmit={handleSubmit}
                className={`p-8 rounded-2xl backdrop-blur-sm border ${
                  theme.mode === 'theatrical'
                    ? 'bg-black/40 border-theatrical-crimson/20'
                    : 'bg-black/40 border-neural-purple/20'
                }`}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                <motion.h3
                  className={`text-2xl font-dramatic font-bold mb-6 ${
                    theme.mode === 'theatrical' ? 'text-theatrical-crimson' : 'text-neural-purple'
                  }`}
                >
                  Send a Message
                </motion.h3>

                <div className="space-y-6">
                  {/* Name Field */}
                  <motion.div variants={inputVariants}>
                    <label className="block text-white font-tech font-medium mb-2">
                      <User size={16} className="inline mr-2" />
                      Name *
                    </label>
                    <motion.input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-3 rounded-lg bg-white/10 border backdrop-blur-sm text-white placeholder-white/50 font-body transition-all duration-300 focus:outline-none focus:ring-2 ${
                        errors.name
                          ? 'border-red-500 focus:ring-red-500/50'
                          : theme.mode === 'theatrical'
                          ? 'border-theatrical-gold/30 focus:border-theatrical-gold focus:ring-theatrical-gold/50'
                          : 'border-tech-cyan/30 focus:border-tech-cyan focus:ring-tech-cyan/50'
                      }`}
                      placeholder="Your full name"
                      whileFocus="focus"
                      onBlur={() => inputVariants.blur}
                    />
                    <AnimatePresence>
                      {errors.name && (
                        <motion.p
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          className="text-red-400 text-sm mt-1 flex items-center"
                        >
                          <AlertCircle size={14} className="mr-1" />
                          {errors.name}
                        </motion.p>
                      )}
                    </AnimatePresence>
                  </motion.div>

                  {/* Email Field */}
                  <motion.div variants={inputVariants}>
                    <label className="block text-white font-tech font-medium mb-2">
                      <Mail size={16} className="inline mr-2" />
                      Email *
                    </label>
                    <motion.input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-3 rounded-lg bg-white/10 border backdrop-blur-sm text-white placeholder-white/50 font-body transition-all duration-300 focus:outline-none focus:ring-2 ${
                        errors.email
                          ? 'border-red-500 focus:ring-red-500/50'
                          : theme.mode === 'theatrical'
                          ? 'border-theatrical-gold/30 focus:border-theatrical-gold focus:ring-theatrical-gold/50'
                          : 'border-tech-cyan/30 focus:border-tech-cyan focus:ring-tech-cyan/50'
                      }`}
                      placeholder="your.email@example.com"
                      whileFocus="focus"
                      onBlur={() => inputVariants.blur}
                    />
                    <AnimatePresence>
                      {errors.email && (
                        <motion.p
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          className="text-red-400 text-sm mt-1 flex items-center"
                        >
                          <AlertCircle size={14} className="mr-1" />
                          {errors.email}
                        </motion.p>
                      )}
                    </AnimatePresence>
                  </motion.div>

                  {/* Subject Field */}
                  <motion.div variants={inputVariants}>
                    <label className="block text-white font-tech font-medium mb-2">
                      Subject *
                    </label>
                    <motion.input
                      type="text"
                      name="subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-3 rounded-lg bg-white/10 border backdrop-blur-sm text-white placeholder-white/50 font-body transition-all duration-300 focus:outline-none focus:ring-2 ${
                        errors.subject
                          ? 'border-red-500 focus:ring-red-500/50'
                          : theme.mode === 'theatrical'
                          ? 'border-theatrical-gold/30 focus:border-theatrical-gold focus:ring-theatrical-gold/50'
                          : 'border-tech-cyan/30 focus:border-tech-cyan focus:ring-tech-cyan/50'
                      }`}
                      placeholder="What's this about?"
                      whileFocus="focus"
                      onBlur={() => inputVariants.blur}
                    />
                    <AnimatePresence>
                      {errors.subject && (
                        <motion.p
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          className="text-red-400 text-sm mt-1 flex items-center"
                        >
                          <AlertCircle size={14} className="mr-1" />
                          {errors.subject}
                        </motion.p>
                      )}
                    </AnimatePresence>
                  </motion.div>

                  {/* Message Field */}
                  <motion.div variants={inputVariants}>
                    <label className="block text-white font-tech font-medium mb-2">
                      <MessageSquare size={16} className="inline mr-2" />
                      Message *
                    </label>
                    <motion.textarea
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      rows={5}
                      className={`w-full px-4 py-3 rounded-lg bg-white/10 border backdrop-blur-sm text-white placeholder-white/50 font-body transition-all duration-300 focus:outline-none focus:ring-2 resize-none ${
                        errors.message
                          ? 'border-red-500 focus:ring-red-500/50'
                          : theme.mode === 'theatrical'
                          ? 'border-theatrical-gold/30 focus:border-theatrical-gold focus:ring-theatrical-gold/50'
                          : 'border-tech-cyan/30 focus:border-tech-cyan focus:ring-tech-cyan/50'
                      }`}
                      placeholder="Tell me about your project, idea, or opportunity..."
                      whileFocus="focus"
                      onBlur={() => inputVariants.blur}
                    />
                    <AnimatePresence>
                      {errors.message && (
                        <motion.p
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          className="text-red-400 text-sm mt-1 flex items-center"
                        >
                          <AlertCircle size={14} className="mr-1" />
                          {errors.message}
                        </motion.p>
                      )}
                    </AnimatePresence>
                  </motion.div>

                  {/* Submit Button */}
                  <motion.button
                    type="submit"
                    disabled={isSubmitting}
                    className={`w-full flex items-center justify-center space-x-2 px-8 py-4 rounded-lg font-tech font-semibold transition-all duration-300 ${
                      isSubmitting
                        ? 'bg-white/20 text-white/50 cursor-not-allowed'
                        : theme.mode === 'theatrical'
                        ? 'bg-gradient-to-r from-theatrical-gold to-theatrical-crimson text-black hover:shadow-2xl hover:shadow-theatrical-gold/30'
                        : 'bg-gradient-to-r from-tech-cyan to-neural-purple text-white hover:shadow-2xl hover:shadow-tech-cyan/30'
                    }`}
                    whileHover={!isSubmitting ? { scale: 1.02, y: -2 } : {}}
                    whileTap={!isSubmitting ? { scale: 0.98 } : {}}
                  >
                    {isSubmitting ? (
                      <>
                        <motion.div
                          className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full"
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                        />
                        <span>Sending...</span>
                      </>
                    ) : (
                      <>
                        <Send size={20} />
                        <span>Send Message</span>
                      </>
                    )}
                  </motion.button>
                </div>

                {/* Status Messages */}
                <AnimatePresence>
                  {submitStatus === 'success' && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      className="mt-6 p-4 rounded-lg bg-green-500/20 border border-green-500/30 text-green-400 flex items-center"
                    >
                      <CheckCircle size={20} className="mr-2" />
                      <span className="font-tech">Message sent successfully! I'll get back to you soon.</span>
                    </motion.div>
                  )}
                  
                  {submitStatus === 'error' && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      className="mt-6 p-4 rounded-lg bg-red-500/20 border border-red-500/30 text-red-400 flex items-center"
                    >
                      <AlertCircle size={20} className="mr-2" />
                      <span className="font-tech">Failed to send message. Please try again or contact me directly.</span>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.form>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};