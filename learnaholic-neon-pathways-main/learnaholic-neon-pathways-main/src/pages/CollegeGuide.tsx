
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { ArrowLeft, BookOpen, Award, Cpu, Code, Server, Cog } from 'lucide-react';

type Department = {
  id: string;
  name: string;
  icon: JSX.Element;
  description: string;
  coreCourses: string[];
  recommendedElectives: string[];
  certifications: string[];
  projectIdeas: string[];
  skills: string[];
  competitions: string[];
};

const departments: Record<string, Department> = {
  'ai-ds': {
    id: 'ai-ds',
    name: 'AI & Data Science',
    icon: <Cpu className="h-10 w-10 text-neon-purple" />,
    description: 'Artificial Intelligence and Data Science focuses on developing systems that can perform tasks requiring human intelligence.',
    coreCourses: ['Mathematics for ML', 'Programming Fundamentals', 'Data Structures', 'Database Systems', 'Machine Learning', 'Deep Learning', 'Big Data Analytics'],
    recommendedElectives: ['Computer Vision', 'Natural Language Processing', 'Reinforcement Learning', 'Data Visualization', 'Cloud Computing'],
    certifications: ['TensorFlow Developer', 'AWS Machine Learning Specialty', 'IBM Data Science Professional', 'Google Data Analytics'],
    projectIdeas: ['Sentiment Analysis Tool', 'Image Recognition System', 'Recommendation Engine', 'Fraud Detection System', 'Chatbot Development'],
    skills: ['Python', 'SQL', 'TensorFlow/PyTorch', 'Data Visualization', 'Statistical Analysis', 'Algorithm Design'],
    competitions: ['Kaggle Competitions', 'DataHack', 'HackerEarth ML Challenges', 'Google AI Challenge', 'Microsoft Imagine Cup']
  },
  'cse': {
    id: 'cse',
    name: 'Computer Science Engineering',
    icon: <Code className="h-10 w-10 text-neon-orange" />,
    description: 'Computer Science Engineering deals with the theory, design, development, and application of software and computer systems.',
    coreCourses: ['Data Structures & Algorithms', 'Operating Systems', 'Computer Networks', 'Database Management', 'Software Engineering', 'Web Development'],
    recommendedElectives: ['Artificial Intelligence', 'Cloud Computing', 'Cybersecurity', 'Mobile App Development', 'Blockchain Technology'],
    certifications: ['AWS Certified Solutions Architect', 'Microsoft Certified: Azure Developer', 'Oracle Java Certification', 'CompTIA Security+'],
    projectIdeas: ['E-commerce Platform', 'Social Media App', 'Inventory Management System', 'File Sharing Application', 'Network Security Tool'],
    skills: ['Java/C++/Python', 'Data Structures', 'Web Technologies', 'Database Design', 'Version Control', 'Problem Solving'],
    competitions: ['ACM ICPC', 'Google Code Jam', 'Facebook Hacker Cup', 'HackerRank Contests', 'CodeChef Competitions']
  },
  'it': {
    id: 'it',
    name: 'Information Technology',
    icon: <Server className="h-10 w-10 text-neon-blue" />,
    description: 'Information Technology focuses on the application of technology to solve business and organizational problems.',
    coreCourses: ['Database Systems', 'Networking', 'Web Development', 'System Administration', 'IT Project Management', 'Information Security'],
    recommendedElectives: ['Cloud Services', 'DevOps', 'Business Intelligence', 'Mobile Computing', 'IT Service Management'],
    certifications: ['CompTIA A+', 'CISCO CCNA', 'Microsoft Certified: Azure Administrator', 'ITIL Foundation', 'Certified Information Systems Security Professional'],
    projectIdeas: ['IT Helpdesk Portal', 'Network Monitoring Tool', 'Cloud Migration Strategy', 'Automated Backup System', 'Security Audit Tool'],
    skills: ['System Administration', 'Networking', 'Cloud Services', 'Security Fundamentals', 'Database Management', 'Technical Support'],
    competitions: ['Cisco NetRiders', 'Microsoft Imagine Cup', 'DEFCON CTF', 'IBM Hack Challenge', 'Tech Support Showdown']
  },
  'ece': {
    id: 'ece',
    name: 'Electronics and Communication',
    icon: <Cog className="h-10 w-10 text-neon-magenta" />,
    description: 'Electronics and Communication Engineering deals with electronic devices, circuits, communication systems, and signal processing.',
    coreCourses: ['Circuit Theory', 'Digital Electronics', 'Signals and Systems', 'Microprocessors', 'Communication Systems', 'VLSI Design'],
    recommendedElectives: ['Embedded Systems', 'IoT', 'Wireless Communication', 'Image Processing', 'Robotics'],
    certifications: ['Certified Electronics Technician', 'FPGA Design', 'Cisco CCENT', 'IoT Foundation', 'Embedded Systems Certification'],
    projectIdeas: ['Home Automation System', 'Wireless Sensor Network', 'Digital Signal Processing Application', 'RFID-based Projects', 'Communication Protocol Implementation'],
    skills: ['Circuit Design', 'PCB Design', 'Microcontroller Programming', 'Signal Processing', 'Communication Protocols', 'FPGA Programming'],
    competitions: ['IEEE Project Competition', 'Texas Instruments Innovation Challenge', 'Embedded Design Contest', 'IoT Design Challenge', 'Robotics Competitions']
  },
  'mechanical': {
    id: 'mechanical',
    name: 'Mechanical Engineering',
    icon: <Cog className="h-10 w-10 text-green-500" />,
    description: 'Mechanical Engineering involves the design, manufacturing, and maintenance of mechanical systems and machinery.',
    coreCourses: ['Engineering Mechanics', 'Thermodynamics', 'Fluid Mechanics', 'Machine Design', 'Manufacturing Processes', 'Heat Transfer'],
    recommendedElectives: ['Robotics', 'CAD/CAM', 'Finite Element Analysis', 'Automotive Engineering', 'Renewable Energy Systems'],
    certifications: ['Certified SolidWorks Professional', 'Autodesk Certification', 'Six Sigma', 'Project Management Professional', 'HVAC Design'],
    projectIdeas: ['Automated Manufacturing System', 'Energy Efficient Vehicle', 'Smart HVAC System', '3D Printed Machine Parts', 'Renewable Energy Harvester'],
    skills: ['CAD Modeling', 'Mechanical Design', 'Thermal Analysis', 'Manufacturing Processes', 'Material Selection', 'Technical Drawing'],
    competitions: ['SAE Competitions', 'ASME Challenges', 'Formula Student', 'Robotics Competitions', 'Design Innovation Contest']
  }
};

const CollegeGuide = () => {
  const { departmentId } = useParams<{ departmentId: string }>();
  const department = departmentId ? departments[departmentId] : null;
  
  if (!department) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-3xl font-bold mb-4">Department Not Found</h1>
            <p className="text-gray-300 mb-6">The department you're looking for doesn't exist.</p>
            <Link to="/" className="btn-neon">Return to Home</Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        {/* Department Header */}
        <div className="bg-card/50 border-b border-white/10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <Link to="/" className="flex items-center text-gray-400 hover:text-neon-purple mb-6 transition-colors">
              <ArrowLeft className="h-4 w-4 mr-2" /> Back to Home
            </Link>
            
            <div className="flex flex-col md:flex-row md:items-center gap-6">
              <div className="bg-gradient-to-br from-neon-purple/20 to-neon-magenta/20 p-4 rounded-xl">
                {department.icon}
              </div>
              <div>
                <h1 className="text-4xl font-bold mb-2">{department.name}</h1>
                <p className="text-gray-300 text-lg max-w-2xl">{department.description}</p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Department Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Core Courses */}
            <div className="neon-card">
              <div className="flex items-center mb-6">
                <BookOpen className="h-6 w-6 text-neon-purple mr-3" />
                <h2 className="text-2xl font-semibold">Core Courses</h2>
              </div>
              <ul className="space-y-3">
                {department.coreCourses.map((course, index) => (
                  <li key={index} className="flex items-start">
                    <div className="bg-neon-purple/20 rounded-full p-1 mr-3 mt-1">
                      <div className="w-1.5 h-1.5 rounded-full bg-neon-purple"></div>
                    </div>
                    <span>{course}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            {/* Recommended Electives */}
            <div className="neon-card">
              <div className="flex items-center mb-6">
                <BookOpen className="h-6 w-6 text-neon-magenta mr-3" />
                <h2 className="text-2xl font-semibold">Recommended Electives</h2>
              </div>
              <ul className="space-y-3">
                {department.recommendedElectives.map((elective, index) => (
                  <li key={index} className="flex items-start">
                    <div className="bg-neon-magenta/20 rounded-full p-1 mr-3 mt-1">
                      <div className="w-1.5 h-1.5 rounded-full bg-neon-magenta"></div>
                    </div>
                    <span>{elective}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            {/* Certifications */}
            <div className="neon-card">
              <div className="flex items-center mb-6">
                <Award className="h-6 w-6 text-neon-orange mr-3" />
                <h2 className="text-2xl font-semibold">Certifications to Take</h2>
              </div>
              <ul className="space-y-3">
                {department.certifications.map((certification, index) => (
                  <li key={index} className="flex items-start">
                    <div className="bg-neon-orange/20 rounded-full p-1 mr-3 mt-1">
                      <div className="w-1.5 h-1.5 rounded-full bg-neon-orange"></div>
                    </div>
                    <span>{certification}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            {/* Project Ideas */}
            <div className="neon-card">
              <div className="flex items-center mb-6">
                <Cpu className="h-6 w-6 text-neon-blue mr-3" />
                <h2 className="text-2xl font-semibold">Important Project Ideas</h2>
              </div>
              <ul className="space-y-3">
                {department.projectIdeas.map((project, index) => (
                  <li key={index} className="flex items-start">
                    <div className="bg-neon-blue/20 rounded-full p-1 mr-3 mt-1">
                      <div className="w-1.5 h-1.5 rounded-full bg-neon-blue"></div>
                    </div>
                    <span>{project}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            {/* Skills */}
            <div className="neon-card">
              <div className="flex items-center mb-6">
                <Code className="h-6 w-6 text-neon-purple mr-3" />
                <h2 className="text-2xl font-semibold">Skills to Master</h2>
              </div>
              <div className="flex flex-wrap gap-2">
                {department.skills.map((skill, index) => (
                  <span key={index} className="bg-neon-purple/20 text-neon-purple px-3 py-1 rounded-full text-sm">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
            
            {/* Competitions */}
            <div className="neon-card">
              <div className="flex items-center mb-6">
                <Award className="h-6 w-6 text-neon-magenta mr-3" />
                <h2 className="text-2xl font-semibold">Competitions to Participate</h2>
              </div>
              <ul className="space-y-3">
                {department.competitions.map((competition, index) => (
                  <li key={index} className="flex items-start">
                    <div className="bg-neon-magenta/20 rounded-full p-1 mr-3 mt-1">
                      <div className="w-1.5 h-1.5 rounded-full bg-neon-magenta"></div>
                    </div>
                    <span>{competition}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          
          <div className="mt-12 text-center">
            <Link to={`/career-roadmap/${department.id}`} className="btn-neon inline-block">
              View Career Roadmap for {department.name}
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default CollegeGuide;
