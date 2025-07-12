import { Certificate } from '../types';

export const certificates: Certificate[] = [
  {
    id: 'aws-cloud-practitioner',
    title: 'AWS Certified Cloud Practitioner',
    issuer: 'Amazon Web Services',
    date: '2024',
    description: 'Foundational understanding of AWS Cloud concepts, services, security, architecture, pricing, and support.',
    image: 'https://images.pexels.com/photos/1181675/pexels-photo-1181675.jpeg?auto=compress&cs=tinysrgb&w=800',
    credentialId: 'AWS-CCP-2024-001',
    verificationUrl: 'https://aws.amazon.com/certification/verify',
    category: 'cloud',
    featured: true
  },
  {
    id: 'tensorflow-developer',
    title: 'TensorFlow Developer Certificate',
    issuer: 'Google',
    date: '2024',
    description: 'Demonstrates proficiency in using TensorFlow to solve deep learning and machine learning problems.',
    image: 'https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&cs=tinysrgb&w=800',
    credentialId: 'TF-DEV-2024-002',
    verificationUrl: 'https://www.credential.net/verify',
    category: 'ai-ml',
    featured: true
  },
  {
    id: 'azure-fundamentals',
    title: 'Microsoft Azure Fundamentals (AZ-900)',
    issuer: 'Microsoft',
    date: '2023',
    description: 'Foundational knowledge of cloud services and how those services are provided with Microsoft Azure.',
    image: 'https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpeg?auto=compress&cs=tinysrgb&w=800',
    credentialId: 'AZ-900-2023-003',
    verificationUrl: 'https://learn.microsoft.com/en-us/certifications/verify',
    category: 'cloud',
    featured: true
  },
  {
    id: 'docker-certified',
    title: 'Docker Certified Associate',
    issuer: 'Docker Inc.',
    date: '2023',
    description: 'Validates skills in containerization, Docker platform, and container orchestration.',
    image: 'https://images.pexels.com/photos/442576/pexels-photo-442576.jpeg?auto=compress&cs=tinysrgb&w=800',
    credentialId: 'DCA-2023-004',
    verificationUrl: 'https://docker.com/certification/verify',
    category: 'devops',
    featured: false
  },
  {
    id: 'kubernetes-admin',
    title: 'Certified Kubernetes Administrator (CKA)',
    issuer: 'Cloud Native Computing Foundation',
    date: '2023',
    description: 'Demonstrates skills required to be a successful Kubernetes Administrator in industry today.',
    image: 'https://images.pexels.com/photos/5082579/pexels-photo-5082579.jpeg?auto=compress&cs=tinysrgb&w=800',
    credentialId: 'CKA-2023-005',
    verificationUrl: 'https://training.linuxfoundation.org/certification/verify',
    category: 'devops',
    featured: false
  },
  {
    id: 'react-advanced',
    title: 'Advanced React Development',
    issuer: 'Meta',
    date: '2023',
    description: 'Advanced concepts in React including hooks, context, performance optimization, and testing.',
    image: 'https://images.pexels.com/photos/7862662/pexels-photo-7862662.jpeg?auto=compress&cs=tinysrgb&w=800',
    credentialId: 'META-REACT-2023-006',
    verificationUrl: 'https://coursera.org/verify',
    category: 'web-dev',
    featured: false
  },
  {
    id: 'python-advanced',
    title: 'Python for Data Science and AI',
    issuer: 'IBM',
    date: '2022',
    description: 'Comprehensive understanding of Python programming for data science and artificial intelligence applications.',
    image: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=800',
    credentialId: 'IBM-PY-2022-007',
    verificationUrl: 'https://ibm.com/training/verify',
    category: 'programming',
    featured: false
  },
  {
    id: 'gcp-associate',
    title: 'Google Cloud Associate Cloud Engineer',
    issuer: 'Google Cloud',
    date: '2022',
    description: 'Demonstrates ability to deploy applications, monitor operations, and maintain cloud projects on Google Cloud.',
    image: 'https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg?auto=compress&cs=tinysrgb&w=800',
    credentialId: 'GCP-ACE-2022-008',
    verificationUrl: 'https://cloud.google.com/certification/verify',
    category: 'cloud',
    featured: false
  }
];