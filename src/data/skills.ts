import { Skill } from '../types';

export const skills: Skill[] = [
  // Programming Languages
  { id: 'python', name: 'Python', category: 'programming', icon: '🐍', color: '#3776ab' },
  { id: 'javascript', name: 'JavaScript', category: 'programming', icon: '🟨', color: '#f7df1e' },
  { id: 'java', name: 'Java', category: 'programming', icon: '☕', color: '#007396' },
  { id: 'cpp', name: 'C++', category: 'programming', icon: '⚡', color: '#00599c' },
  { id: 'sql', name: 'SQL', category: 'programming', icon: '🗃️', color: '#336791' },

  // AI/ML
  { id: 'tensorflow', name: 'TensorFlow', category: 'ai-ml', icon: '🧠', color: '#ff6f00' },
  { id: 'pytorch', name: 'PyTorch', category: 'ai-ml', icon: '🔥', color: '#ee4c2c' },
  { id: 'sklearn', name: 'Scikit-learn', category: 'ai-ml', icon: '📊', color: '#f7931e' },
  { id: 'keras', name: 'Keras', category: 'ai-ml', icon: '🎯', color: '#d00000' },
  { id: 'opencv', name: 'OpenCV', category: 'ai-ml', icon: '👁️', color: '#5c3ee8' },

  // Web Technologies
  { id: 'react', name: 'React.js', category: 'web', icon: '⚛️', color: '#61dafb' },
  { id: 'nodejs', name: 'Node.js', category: 'web', icon: '🟢', color: '#339933' },
  { id: 'express', name: 'Express.js', category: 'web', icon: '🚂', color: '#000000' },
  { id: 'flask', name: 'Flask', category: 'web', icon: '🌶️', color: '#000000' },
  { id: 'html5', name: 'HTML5', category: 'web', icon: '🏗️', color: '#e34f26' },
  { id: 'css3', name: 'CSS3', category: 'web', icon: '🎨', color: '#1572b6' },

  // Tools & Technologies
  { id: 'git', name: 'Git', category: 'tools', icon: '📝', color: '#f05032' },
  { id: 'docker', name: 'Docker', category: 'tools', icon: '🐳', color: '#2496ed' },
  { id: 'aws', name: 'AWS', category: 'tools', icon: '☁️', color: '#ff9900' },
  { id: 'gcp', name: 'Google Cloud', category: 'tools', icon: '🌐', color: '#4285f4' },
  { id: 'mysql', name: 'MySQL', category: 'tools', icon: '🐬', color: '#4479a1' },
  { id: 'postgresql', name: 'PostgreSQL', category: 'tools', icon: '🐘', color: '#336791' },

  // Soft Skills
  { id: 'leadership', name: 'Leadership', category: 'soft-skills', icon: '👑', color: '#ffd700' },
  { id: 'communication', name: 'Communication', category: 'soft-skills', icon: '🗣️', color: '#20b2aa' },
  { id: 'teamwork', name: 'Team Collaboration', category: 'soft-skills', icon: '🤝', color: '#32cd32' },
  { id: 'problem-solving', name: 'Problem Solving', category: 'soft-skills', icon: '🧩', color: '#9370db' },
  { id: 'adaptability', name: 'Adaptability', category: 'soft-skills', icon: '🦋', color: '#ff69b4' }
];