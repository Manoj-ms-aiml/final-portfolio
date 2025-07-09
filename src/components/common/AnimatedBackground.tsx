import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../../contexts/ThemeContext';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface BackgroundVideo {
  id: string;
  src: string;
  section: string;
  poster: string;
}

const backgroundVideos: BackgroundVideo[] = [
  {
    id: 'hero',
    src: 'https://www.w3schools.com/html/mov_bbb.mp4',
    section: 'hero',
    poster: 'https://images.pexels.com/photos/3396664/pexels-photo-3396664.jpeg?auto=compress&cs=tinysrgb&w=1920'
  },
  {
    id: 'about',
    src: 'https://www.w3schools.com/html/movie.mp4',
    section: 'about',
    poster: 'https://images.pexels.com/photos/5082579/pexels-photo-5082579.jpeg?auto=compress&cs=tinysrgb&w=1920'
  },
  {
    id: 'projects',
    src: 'https://www.w3schools.com/html/mov_bbb.mp4',
    section: 'projects',
    poster: 'https://images.pexels.com/photos/442576/pexels-photo-442576.jpeg?auto=compress&cs=tinysrgb&w=1920'
  },
  {
    id: 'theatre',
    src: 'https://www.w3schools.com/html/movie.mp4',
    section: 'theatre',
    poster: 'https://images.pexels.com/photos/6899260/pexels-photo-6899260.jpeg?auto=compress&cs=tinysrgb&w=1920'
  },
  {
    id: 'skills',
    src: 'https://www.w3schools.com/html/mov_bbb.mp4',
    section: 'skills',
    poster: 'https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&cs=tinysrgb&w=1920'
  },
  {
    id: 'contact',
    src: 'https://www.w3schools.com/html/movie.mp4',
    section: 'contact',
    poster: 'https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg?auto=compress&cs=tinysrgb&w=1920'
  }
];

const ParticleField: React.FC = () => {
  const { theme } = useTheme();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles: Array<{
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      opacity: number;
    }> = [];

    // Create particles
    for (let i = 0; i < theme.particleConfig.count; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * theme.particleConfig.speed,
        vy: (Math.random() - 0.5) * theme.particleConfig.speed,
        size: Math.random() * 3 + 1,
        opacity: Math.random() * 0.8 + 0.2,
      });
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((particle, index) => {
        // Update particle position
        particle.x += particle.vx;
        particle.y += particle.vy;

        // Bounce off edges
        if (particle.x < 0 || particle.x > canvas.width) particle.vx *= -1;
        if (particle.y < 0 || particle.y > canvas.height) particle.vy *= -1;

        // Draw particle
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fillStyle = `${theme.particleConfig.color}${Math.floor(particle.opacity * 255).toString(16).padStart(2, '0')}`;
        ctx.fill();

        // Draw connections
        if (theme.particleConfig.connections) {
          particles.slice(index + 1).forEach(otherParticle => {
            const dx = particle.x - otherParticle.x;
            const dy = particle.y - otherParticle.y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < 100) {
              ctx.beginPath();
              ctx.moveTo(particle.x, particle.y);
              ctx.lineTo(otherParticle.x, otherParticle.y);
              ctx.strokeStyle = `${theme.particleConfig.color}${Math.floor((1 - distance / 100) * 50).toString(16).padStart(2, '0')}`;
              ctx.lineWidth = 1;
              ctx.stroke();
            }
          });
        }
      });

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      window.removeEventListener('resize', handleResize);
    };
  }, [theme.particleConfig]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none opacity-30"
      style={{ mixBlendMode: 'screen' }}
    />
  );
};

export const AnimatedBackground: React.FC = () => {
  const { theme } = useTheme();
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const videoRefs = useRef<HTMLVideoElement[]>([]);

  useEffect(() => {
    // Set up scroll-triggered video transitions
    const sections = ['hero', 'about', 'projects', 'theatre', 'skills', 'contact'];
    
    sections.forEach((section, index) => {
      ScrollTrigger.create({
        trigger: `#${section}`,
        start: 'top 50%',
        end: 'bottom 50%',
        onEnter: () => setCurrentVideoIndex(index),
        onEnterBack: () => setCurrentVideoIndex(index),
      });
    });

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  useEffect(() => {
    // Smooth transition between videos
    videoRefs.current.forEach((video, index) => {
      if (video) {
        if (index === currentVideoIndex) {
          gsap.to(video, { opacity: 1, duration: 1.5, ease: 'power2.inOut' });
          video.play().catch(console.error);
        } else {
          gsap.to(video, { opacity: 0, duration: 1.5, ease: 'power2.inOut' });
        }
      }
    });
  }, [currentVideoIndex]);

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      {/* Video Backgrounds */}
      {backgroundVideos.map((video, index) => (
        <motion.video
          key={video.id}
          ref={(el) => {
            if (el) videoRefs.current[index] = el;
          }}
          className="absolute inset-0 w-full h-full object-cover"
          style={{ opacity: index === currentVideoIndex ? 1 : 0 }}
          autoPlay
          muted
          loop
          playsInline
          poster={video.poster}
        >
          <source src={video.src} type="video/mp4" />
        </motion.video>
      ))}

      {/* Gradient Overlays */}
      <div className={`absolute inset-0 bg-gradient-to-b ${
        theme.mode === 'theatrical'
          ? 'from-black/70 via-theatrical-curtain/50 to-black/90'
          : 'from-tech-matrix/80 via-tech-circuit/60 to-black/95'
      }`} />

      {/* Particle Field */}
      <ParticleField />

      {/* Neural Network Lines (Tech Mode) */}
      {theme.mode === 'tech' && (
        <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-20">
          <defs>
            <pattern id="grid\" width="100\" height="100\" patternUnits="userSpaceOnUse">
              <path d="M 100 0 L 0 0 0 100\" fill="none\" stroke={theme.primaryColor} strokeWidth="1" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      )}

      {/* Spotlight Effect (Theatrical Mode) */}
      {theme.mode === 'theatrical' && (
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-radial from-theatrical-spotlight/30 to-transparent rounded-full animate-spotlight" />
        </div>
      )}
    </div>
  );
};