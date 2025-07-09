import { Experience } from '../types';

export const experiences: Experience[] = [
  {
    id: "1",
    role: "Software Development Intern",
    production: "Tech Solutions Inc.",
    director: "John Smith",
    year: 2023,
    description: "Developed and maintained web applications using React and Node.js. Implemented RESTful APIs and integrated with databases. Collaborated with cross-functional teams to deliver high-quality software solutions.",
    images: [
      "/images/experience/tech-solutions.jpg",
      "/images/experience/tech-solutions-2.jpg"
    ],
    category: "tech"
  },
  {
    id: "2",
    role: "Machine Learning Research Assistant",
    production: "AI Research Lab",
    director: "Dr. Sarah Chen",
    year: 2022,
    description: "Conducted research on natural language processing and computer vision. Implemented and evaluated machine learning models using Python and TensorFlow. Published research findings in academic conferences.",
    images: [
      "/images/experience/ai-lab.jpg",
      "/images/experience/ai-lab-2.jpg"
    ],
    category: "research"
  },
  {
    id: "3",
    role: "Full Stack Developer",
    production: "Startup Accelerator",
    director: "Mike Johnson",
    year: 2021,
    description: "Built scalable web applications using modern technologies. Implemented CI/CD pipelines and automated testing. Mentored junior developers and conducted code reviews.",
    images: [
      "/images/experience/startup.jpg",
      "/images/experience/startup-2.jpg"
    ],
    category: "tech"
  },
  {
    id: "4",
    role: "Software Engineering Intern",
    production: "Enterprise Solutions",
    director: "Lisa Wang",
    year: 2020,
    description: "Developed backend services using Java and Spring Boot. Created database schemas and optimized query performance. Participated in agile development processes and sprint planning.",
    images: [
      "/images/experience/enterprise.jpg",
      "/images/experience/enterprise-2.jpg"
    ],
    category: "tech"
  }
]; 