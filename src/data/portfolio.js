export const personal = {
  name: 'Mohammed Javith J',
  shortName: 'Javith',
  role: 'Software Developer',
  tagline: 'Full-stack developer building production web & mobile applications.',
  location: 'Bengaluru, India',
  status: 'Open to opportunities',
  email: 'miistahjavith@gmail.com',
  phone: '+91 9788797896',
  linkedin: 'https://linkedin.com/in/mhd-javith22',
  linkedinHandle: 'mhd-javith22',
  github: 'https://github.com/',
};

export const summary =
  'Software Developer with professional experience building and maintaining production web and mobile applications, with additional freelance experience developing responsive websites for clients. Skilled across the full stack — from building REST APIs and real-time systems to shipping React Native apps to production.';

export const experience = [
  {
    role: 'Software Developer',
    company: 'Unipro Softwares Pte. Ltd.',
    url: 'https://uniprosg.com',
    period: 'Feb 2026 – Present',
    location: 'Bengaluru, India',
    points: [
      'Develop and maintain production software across frontend, backend, database, and system integrations.',
      'Build and integrate REST APIs, authentication, SQL queries, real-time communication, payment services, and third-party integrations.',
      'Provide direct technical support to clients in Singapore, troubleshoot production issues, and assist with deployment and maintenance.',
    ],
    tags: ['React Native', 'Node.js', 'MSSQL', 'Socket.IO', 'REST APIs'],
  },
];

export const education = [
  {
    degree: 'Master of Computer Applications (MCA)',
    institution: 'SRM Institute of Science and Technology',
    period: 'Sep 2024 – May 2026',
  },
  {
    degree: 'Bachelor of Computer Applications (BCA)',
    institution: 'The New College, Chennai',
    period: 'Nov 2021 – May 2024',
    grade: 'CGPA: 7.36',
  },
  {
    degree: 'Higher Secondary (XII)',
    institution: 'Sairam Matric. Hr. Sec. School',
    period: 'Apr 2021',
    grade: '82%',
  },
];

export const skills = [
  {
    category: 'Languages',
    items: ['JavaScript', 'TypeScript', 'Python', 'SQL'],
  },
  {
    category: 'Frontend',
    items: ['React', 'HTML', 'TailwindCSS', 'CSS'],
  },
  {
    category: 'Mobile',
    items: ['React Native', 'Expo', 'Expo Router', 'EAS'],
  },
  {
    category: 'Backend',
    items: ['Node.js', 'Express.js', 'REST APIs', 'JWT', 'Socket.IO'],
  },
  {
    category: 'Database',
    items: ['Microsoft SQL Server', 'MongoDB'],
  },
  {
    category: 'Cloud & Deployment',
    items: ['AWS', 'Railway', 'Netlify', 'Cloudflare', 'Expo EAS'],
  },
  {
    category: 'Tools',
    items: ['Git', 'GitHub', 'Postman', 'VS Code', 'npm'],
  },
  {
    category: 'Networking',
    items: ['TCP/IP', 'HTTP/HTTPS', 'WebSockets', 'CORS', 'SSL/TLS'],
  },
  {
    category: 'POS / Hardware',
    items: ['Thermal Printers', 'KDS', 'Cash Drawer', 'Customer Display', 'Print Bridge'],
  },
];

export const projects = [
  {
    id: 'smart-pos',
    title: 'Smart-POS',
    subtitle: 'Restaurant Point of Sale System',
    description:
      'Production POS platform for billing, orders, payments, kitchen operations, settlements, and reporting. Built with real-time order synchronization and full hardware integration.',
    points: [
      'Built with React Native, Node.js, Express.js, and Microsoft SQL Server.',
      'Integrated payment gateway and PayNow with QR processing.',
      'Real-time order sync via Socket.IO with JWT-secured REST APIs.',
      'Integrated printers, KDS, cash drawers, customer displays, and a local Print Bridge.',
    ],
    tags: ['React Native', 'Node.js', 'MSSQL', 'Socket.IO', 'JWT', 'PayNow'],
    featured: true,
    type: 'Production',
  },
  {
    id: 'hawker-pos',
    title: 'Hawker POS',
    subtitle: 'Lightweight Restaurant POS',
    description:
      'Lightweight POS application with menu management, cart, billing, sales reports, void bills, and transaction processing.',
    points: [
      'Menu management, cart, billing, sales reports, and void bills.',
      'Integrated payment gateway and Sunmi built-in printer SDK.',
    ],
    tags: ['React Native', 'Expo', 'Payment Gateway', 'Sunmi SDK'],
    featured: false,
    type: 'Production',
  },
  {
    id: 'freelance',
    title: 'Freelance Web Development',
    subtitle: 'Client Websites',
    description:
      'Developed and deployed responsive portfolio and advertising websites for clients.',
    points: [
      'Responsive, production-ready websites for multiple clients.',
      'Built with React, JavaScript, HTML, CSS, and TailwindCSS.',
    ],
    tags: ['React', 'TailwindCSS', 'Netlify', 'Cloudflare'],
    featured: false,
    type: 'Freelance',
  },
];

export const certifications = [
  {
    title: 'Full Stack Developer Certification',
    issuer: 'Error Makes Clever',
  },
];
