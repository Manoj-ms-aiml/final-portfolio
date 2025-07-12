export interface Project {
  id: string;
  title: string;
  description: string;
  longDescription: string;
  technologies: string[];
  images: string[];
  links: {
    github?: string;
    live?: string;
    demo?: string;
  };
  category: 'ai-ml' | 'web-dev' | 'mobile' | 'research';
  featured: boolean;
}

export interface Experience {
  id: string;
  role: string;
  production: string;
  director: string;
  year: number;
  description: string;
  images: string[];
  category: 'tech' | 'research' | 'internship' | 'project';
}

export interface Skill {
  id: string;
  name: string;
  category: 'programming' | 'ai-ml' | 'web' | 'tools' | 'soft-skills';
  icon: string;
  color: string;
}

export interface Certificate {
  id: string;
  title: string;
  issuer: string;
  date: string;
  description: string;
  image: string;
  credentialId: string;
  verificationUrl: string;
  category: 'cloud' | 'ai-ml' | 'devops' | 'web-dev' | 'programming';
  featured: boolean;
}

export interface ThemeConfig {
  mode: 'theatrical' | 'tech';
  primaryColor: string;
  backgroundVideo: string;
  particleConfig: ParticleConfig;
}

export interface ParticleConfig {
  count: number;
  speed: number;
  color: string;
  connections: boolean;
}

export interface AnimationConfig {
  reducedMotion: boolean;
  performance: 'high' | 'medium' | 'low';
}

export interface Proficiency {
  id: string;
  name: string;
  proficiency: number;
}