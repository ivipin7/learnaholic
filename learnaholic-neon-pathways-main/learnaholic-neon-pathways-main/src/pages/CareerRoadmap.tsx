
import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { ArrowLeft, Calendar, BookOpen, Award, Book, Code, Server, Cpu, Cog, Star } from 'lucide-react';

type Semester = {
  title: string;
  courses: string[];
  skills: string[];
  projects: string[];
  milestones: string[];
};

type RoadmapData = {
  id: string;
  name: string;
  icon: JSX.Element;
  description: string;
  years: {
    title: string;
    semesters: Semester[];
  }[];
  additionalLearning: {
    title: string;
    items: string[];
  }[];
};

const roadmaps: Record<string, RoadmapData> = {
  'ai-ds': {
    id: 'ai-ds',
    name: 'AI & Data Science',
    icon: <Cpu className="h-10 w-10 text-neon-purple" />,
    description: 'A comprehensive roadmap for building a successful career in Artificial Intelligence and Data Science.',
    years: [
      {
        title: 'First Year',
        semesters: [
          {
            title: 'Semester 1',
            courses: ['Calculus I', 'Physics', 'Introduction to Programming', 'English Communication'],
            skills: ['Basic Python', 'Problem Solving', 'Analytical Thinking'],
            projects: ['Simple Calculator', 'Basic Data Visualization'],
            milestones: ['Complete Python Basics', 'Join Coding Club']
          },
          {
            title: 'Semester 2',
            courses: ['Linear Algebra', 'Discrete Mathematics', 'Data Structures', 'Object-Oriented Programming'],
            skills: ['Advanced Python', 'Data Structures', 'OOP Concepts'],
            projects: ['Student Management System', 'Data Analysis Tool'],
            milestones: ['First Hackathon', 'Create GitHub Profile']
          }
        ]
      },
      {
        title: 'Second Year',
        semesters: [
          {
            title: 'Semester 3',
            courses: ['Probability & Statistics', 'Database Systems', 'Algorithms', 'Web Development'],
            skills: ['SQL', 'Statistical Analysis', 'Web Technologies'],
            projects: ['Database-driven Web App', 'Statistical Analysis Project'],
            milestones: ['Complete SQL Course', 'Join Data Science Club']
          },
          {
            title: 'Semester 4',
            courses: ['Machine Learning Fundamentals', 'Data Mining', 'Computer Networks', 'Operating Systems'],
            skills: ['Scikit-Learn', 'Data Cleaning', 'Feature Engineering'],
            projects: ['Predictive Model', 'Data Mining Application'],
            milestones: ['Kaggle Competition', 'Summer Internship']
          }
        ]
      },
      {
        title: 'Third Year',
        semesters: [
          {
            title: 'Semester 5',
            courses: ['Deep Learning', 'Big Data Analytics', 'Natural Language Processing', 'Research Methodology'],
            skills: ['TensorFlow/PyTorch', 'Hadoop', 'NLP Techniques'],
            projects: ['CNN Image Classifier', 'Sentiment Analysis System'],
            milestones: ['Research Paper', 'AI Competition']
          },
          {
            title: 'Semester 6',
            courses: ['Computer Vision', 'Cloud Computing', 'Reinforcement Learning', 'IoT Analytics'],
            skills: ['OpenCV', 'AWS/GCP', 'Reinforcement Learning'],
            projects: ['Object Detection System', 'Cloud-based Data Pipeline'],
            milestones: ['Industry Internship', 'AWS Certification']
          }
        ]
      },
      {
        title: 'Final Year',
        semesters: [
          {
            title: 'Semester 7',
            courses: ['AI Ethics', 'Advanced Deep Learning', 'Data Visualization', 'Capstone Project I'],
            skills: ['D3.js/Tableau', 'GANs', 'Ethical AI Development'],
            projects: ['Advanced AI Application', 'Interactive Dashboard'],
            milestones: ['Begin Capstone Project', 'Research Publication']
          },
          {
            title: 'Semester 8',
            courses: ['AI in Industry', 'Quantum Computing', 'Capstone Project II', 'Entrepreneurship'],
            skills: ['MLOps', 'Deployment', 'Business Acumen'],
            projects: ['Complete Capstone Project', 'Portfolio Website'],
            milestones: ['Job Placement', 'Graduate School Applications']
          }
        ]
      }
    ],
    additionalLearning: [
      {
        title: 'Open Source Contributions',
        items: [
          'Contribute to scikit-learn/TensorFlow',
          'Create data visualization libraries',
          'Build ML model templates',
          'Share datasets and notebooks',
          'Document AI/ML libraries'
        ]
      },
      {
        title: 'Networking',
        items: [
          'Join AI/ML communities',
          'Attend data science conferences',
          'Participate in Kaggle discussions',
          'Follow industry leaders on social media',
          'Attend tech meetups'
        ]
      },
      {
        title: 'Interview Preparation',
        items: [
          'Practice ML coding challenges',
          'Review ML/statistics theory',
          'Prepare project portfolio',
          'Mock interviews with peers',
          'Research companies'
        ]
      }
    ]
  },
  'cse': {
    id: 'cse',
    name: 'Computer Science Engineering',
    icon: <Code className="h-10 w-10 text-neon-orange" />,
    description: 'A comprehensive roadmap for building a successful career in Computer Science Engineering.',
    years: [
      {
        title: 'First Year',
        semesters: [
          {
            title: 'Semester 1',
            courses: ['Programming Fundamentals', 'Digital Logic', 'Discrete Mathematics', 'Engineering Physics'],
            skills: ['C/C++ Programming', 'Logic Gates', 'Problem Solving'],
            projects: ['Simple Console Applications', 'Digital Logic Simulator'],
            milestones: ['First Code Commit', 'Join Programming Club']
          },
          {
            title: 'Semester 2',
            courses: ['Data Structures', 'Computer Architecture', 'Object-Oriented Programming', 'Calculus'],
            skills: ['Java/Python', 'Data Structures', 'OOP Concepts'],
            projects: ['Library Management System', 'Simple Game'],
            milestones: ['Coding Competition', 'GitHub Portfolio']
          }
        ]
      },
      {
        title: 'Second Year',
        semesters: [
          {
            title: 'Semester 3',
            courses: ['Algorithms', 'Operating Systems', 'Database Management', 'Computer Networks'],
            skills: ['Algorithm Analysis', 'SQL', 'Shell Scripting'],
            projects: ['Database Application', 'Mini OS Module'],
            milestones: ['Technical Paper', 'Open Source Contribution']
          },
          {
            title: 'Semester 4',
            courses: ['Web Technologies', 'Software Engineering', 'Theory of Computation', 'Probability & Statistics'],
            skills: ['HTML/CSS/JS', 'UML', 'SDLC'],
            projects: ['Full Stack Web App', 'Software Design Document'],
            milestones: ['First Internship', 'Hackathon Participation']
          }
        ]
      },
      {
        title: 'Third Year',
        semesters: [
          {
            title: 'Semester 5',
            courses: ['Artificial Intelligence', 'Computer Graphics', 'Mobile Application Development', 'Cloud Computing'],
            skills: ['React/Angular', 'Android/iOS', 'AWS/Azure'],
            projects: ['Mobile App', 'AI Application'],
            milestones: ['Technical Certification', 'Industry Project']
          },
          {
            title: 'Semester 6',
            courses: ['Information Security', 'Compiler Design', 'Machine Learning', 'Distributed Systems'],
            skills: ['Cryptography', 'TensorFlow', 'Docker/Kubernetes'],
            projects: ['Security Tool', 'Machine Learning Model'],
            milestones: ['Summer Internship', 'Research Publication']
          }
        ]
      },
      {
        title: 'Final Year',
        semesters: [
          {
            title: 'Semester 7',
            courses: ['Big Data Analytics', 'Internet of Things', 'Natural Language Processing', 'Capstone Project I'],
            skills: ['Hadoop', 'IoT Platforms', 'NLP Libraries'],
            projects: ['IoT System', 'Big Data Project'],
            milestones: ['Begin Capstone Project', 'Technical Talk']
          },
          {
            title: 'Semester 8',
            courses: ['Blockchain Technology', 'High Performance Computing', 'Ethics in Computing', 'Capstone Project II'],
            skills: ['Smart Contracts', 'CUDA', 'Project Management'],
            projects: ['Complete Capstone Project', 'Portfolio Website'],
            milestones: ['Job Placement', 'Graduate School Applications']
          }
        ]
      }
    ],
    additionalLearning: [
      {
        title: 'Open Source Contributions',
        items: [
          'Contribute to popular GitHub repositories',
          'Create libraries/frameworks',
          'Fix bugs in open source projects',
          'Improve documentation',
          'Create developer tools'
        ]
      },
      {
        title: 'Competitive Programming',
        items: [
          'LeetCode challenges',
          'CodeForces competitions',
          'HackerRank contests',
          'ACM ICPC',
          'Google Code Jam'
        ]
      },
      {
        title: 'Interview Preparation',
        items: [
          'DS & Algo practice',
          'System design concepts',
          'Mock interviews',
          'Build portfolio projects',
          'Technical blogs'
        ]
      }
    ]
  },
  'it': {
    id: 'it',
    name: 'Information Technology',
    icon: <Server className="h-10 w-10 text-neon-blue" />,
    description: 'A comprehensive roadmap for building a successful career in Information Technology.',
    years: [
      {
        title: 'First Year',
        semesters: [
          {
            title: 'Semester 1',
            courses: ['Introduction to Computers', 'Programming Fundamentals', 'Digital Electronics', 'Mathematics'],
            skills: ['Basic Programming', 'Computer Basics', 'Logical Thinking'],
            projects: ['Simple Programs', 'Hardware Assembly'],
            milestones: ['Code Repository Setup', 'Tech Community Membership']
          },
          {
            title: 'Semester 2',
            courses: ['Data Structures', 'Computer Architecture', 'Web Technologies', 'Communication Skills'],
            skills: ['HTML/CSS', 'Data Structures', 'Technical Writing'],
            projects: ['Personal Website', 'Database Design'],
            milestones: ['Web Development Certificate', 'Technical Writing']
          }
        ]
      },
      {
        title: 'Second Year',
        semesters: [
          {
            title: 'Semester 3',
            courses: ['Database Management', 'Operating Systems', 'Java Programming', 'Networking Fundamentals'],
            skills: ['SQL', 'Java', 'Network Configuration'],
            projects: ['Database Application', 'Network Setup'],
            milestones: ['Database Certification', 'Mini Project']
          },
          {
            title: 'Semester 4',
            courses: ['Software Engineering', 'Computer Networks', 'Object-Oriented Design', 'Unix/Linux'],
            skills: ['UML', 'Shell Scripting', 'Software Design'],
            projects: ['Software Prototype', 'Shell Scripts Collection'],
            milestones: ['First Internship', 'Linux Certification']
          }
        ]
      },
      {
        title: 'Third Year',
        semesters: [
          {
            title: 'Semester 5',
            courses: ['Cloud Computing', 'Information Security', 'Web Application Development', 'Data Mining'],
            skills: ['AWS/Azure', 'Security Tools', 'Full Stack Development'],
            projects: ['Cloud-based Application', 'Security Analysis'],
            milestones: ['Cloud Certification', 'Security Competition']
          },
          {
            title: 'Semester 6',
            courses: ['Mobile Application Development', 'DevOps', 'AI & ML Basics', 'IT Service Management'],
            skills: ['React Native/Flutter', 'CI/CD', 'ITIL Framework'],
            projects: ['Mobile App', 'DevOps Pipeline'],
            milestones: ['Industry Internship', 'ITIL Certification']
          }
        ]
      },
      {
        title: 'Final Year',
        semesters: [
          {
            title: 'Semester 7',
            courses: ['Enterprise Software', 'IoT', 'Business Intelligence', 'Capstone Project I'],
            skills: ['ERP Systems', 'IoT Platforms', 'Data Visualization'],
            projects: ['Enterprise System Module', 'IoT Solution'],
            milestones: ['Begin Capstone Project', 'Industry Visit']
          },
          {
            title: 'Semester 8',
            courses: ['IT Project Management', 'Emerging Technologies', 'IT Ethics & Laws', 'Capstone Project II'],
            skills: ['Project Management', 'Blockchain/Edge Computing', 'Risk Assessment'],
            projects: ['Complete Capstone Project', 'IT Solution Portfolio'],
            milestones: ['Job Placement', 'Project Management Certification']
          }
        ]
      }
    ],
    additionalLearning: [
      {
        title: 'Technical Certifications',
        items: [
          'CCNA/Network+',
          'AWS/Azure Certifications',
          'CompTIA Security+',
          'ITIL Foundation',
          'PMP/CAPM'
        ]
      },
      {
        title: 'Networking',
        items: [
          'IT conferences',
          'LinkedIn connections',
          'Industry webinars',
          'Tech meetups',
          'Professional associations'
        ]
      },
      {
        title: 'Interview Preparation',
        items: [
          'Technical scenarios practice',
          'System troubleshooting',
          'Mock interviews',
          'Portfolio preparation',
          'Soft skills development'
        ]
      }
    ]
  },
  'ece': {
    id: 'ece',
    name: 'Electronics and Communication',
    icon: <Cog className="h-10 w-10 text-neon-magenta" />,
    description: 'A comprehensive roadmap for building a successful career in Electronics and Communication Engineering.',
    years: [
      {
        title: 'First Year',
        semesters: [
          {
            title: 'Semester 1',
            courses: ['Engineering Mathematics', 'Physics', 'Basic Electrical', 'Programming Fundamentals'],
            skills: ['Circuit Basics', 'Problem Solving', 'Basic Programming'],
            projects: ['LED Projects', 'Simple Circuits'],
            milestones: ['First Circuit Design', 'Core Concepts Mastery']
          },
          {
            title: 'Semester 2',
            courses: ['Circuit Theory', 'Digital Electronics', 'Electronic Devices', 'Engineering Drawing'],
            skills: ['Circuit Analysis', 'Logic Gates', 'Electronic Components'],
            projects: ['Digital Clock', 'Logic Circuit Design'],
            milestones: ['Digital Design Project', 'Circuit Simulation']
          }
        ]
      },
      {
        title: 'Second Year',
        semesters: [
          {
            title: 'Semester 3',
            courses: ['Signals & Systems', 'Analog Electronics', 'Data Structures', 'Electromagnetic Theory'],
            skills: ['Signal Processing', 'Amplifier Design', 'MATLAB'],
            projects: ['Amplifier Circuit', 'Signal Processing Application'],
            milestones: ['MATLAB Certification', 'Technical Paper']
          },
          {
            title: 'Semester 4',
            courses: ['Communication Systems', 'Control Systems', 'Microprocessors', 'Digital Signal Processing'],
            skills: ['DSP', 'Assembly Language', 'Control Theory'],
            projects: ['Communication System Design', 'Microcontroller Project'],
            milestones: ['First Internship', 'Technical Competition']
          }
        ]
      },
      {
        title: 'Third Year',
        semesters: [
          {
            title: 'Semester 5',
            courses: ['VLSI Design', 'Microwave Engineering', 'Embedded Systems', 'Digital Communication'],
            skills: ['VLSI Tools', 'PCB Design', 'Embedded C'],
            projects: ['VLSI Design', 'Embedded System'],
            milestones: ['PCB Design Project', 'Technical Workshop']
          },
          {
            title: 'Semester 6',
            courses: ['Wireless Communication', 'Antenna Design', 'IoT', 'Computer Networks'],
            skills: ['Network Protocols', 'Wireless Technologies', 'IoT Platforms'],
            projects: ['Wireless System', 'IoT Device'],
            milestones: ['Industry Internship', 'Wireless Certification']
          }
        ]
      },
      {
        title: 'Final Year',
        semesters: [
          {
            title: 'Semester 7',
            courses: ['Optical Communication', 'Satellite Communication', 'Machine Learning for ECE', 'Capstone Project I'],
            skills: ['ML Applications', 'Optical Systems', 'Project Planning'],
            projects: ['ML for Signal Processing', 'Communication System'],
            milestones: ['Begin Capstone Project', 'Research Publication']
          },
          {
            title: 'Semester 8',
            courses: ['Advanced Communication', '5G Technology', 'Electronics Product Design', 'Capstone Project II'],
            skills: ['5G Technologies', 'Product Development', 'Testing'],
            projects: ['Complete Capstone Project', 'Portfolio Development'],
            milestones: ['Job Placement', 'Graduate School Applications']
          }
        ]
      }
    ],
    additionalLearning: [
      {
        title: 'Hardware Skills',
        items: [
          'PCB design tools',
          'Hardware description languages (VHDL/Verilog)',
          'Electronic testing equipment',
          'Microcontroller programming',
          'Circuit optimization'
        ]
      },
      {
        title: 'Software Skills',
        items: [
          'MATLAB/Simulink',
          'LabVIEW',
          'CAD tools',
          'Python for DSP',
          'Embedded programming'
        ]
      },
      {
        title: 'Interview Preparation',
        items: [
          'Technical concepts review',
          'Circuit analysis exercises',
          'Communication systems theory',
          'Project documentation',
          'Domain-specific challenges'
        ]
      }
    ]
  },
  'mechanical': {
    id: 'mechanical',
    name: 'Mechanical Engineering',
    icon: <Cog className="h-10 w-10 text-green-500" />,
    description: 'A comprehensive roadmap for building a successful career in Mechanical Engineering.',
    years: [
      {
        title: 'First Year',
        semesters: [
          {
            title: 'Semester 1',
            courses: ['Engineering Mathematics', 'Engineering Physics', 'Engineering Drawing', 'Workshop Practice'],
            skills: ['Technical Drawing', 'Basic Workshop Skills', 'Problem Solving'],
            projects: ['Hand Tool Design', '2D Drawing Portfolio'],
            milestones: ['CAD Basics', 'Workshop Certification']
          },
          {
            title: 'Semester 2',
            courses: ['Mechanics', 'Material Science', 'Thermodynamics', 'C Programming'],
            skills: ['Static Analysis', 'Material Selection', 'Basic Programming'],
            projects: ['Material Testing', 'Simple Mechanical Systems'],
            milestones: ['Mechanics Competition', 'CAD Model Portfolio']
          }
        ]
      },
      {
        title: 'Second Year',
        semesters: [
          {
            title: 'Semester 3',
            courses: ['Strength of Materials', 'Manufacturing Processes', 'Fluid Mechanics', 'Machine Drawing'],
            skills: ['Stress Analysis', 'Manufacturing Techniques', '3D Modeling'],
            projects: ['Structural Analysis', 'Manufacturing Process Model'],
            milestones: ['AutoCAD Certification', 'Technical Paper']
          },
          {
            title: 'Semester 4',
            courses: ['Kinematics of Machinery', 'Heat Transfer', 'Machine Design', 'Industrial Engineering'],
            skills: ['Mechanism Design', 'Thermal Analysis', 'Optimization Techniques'],
            projects: ['Mechanism Design', 'Heat Exchanger Design'],
            milestones: ['First Internship', 'Design Competition']
          }
        ]
      },
      {
        title: 'Third Year',
        semesters: [
          {
            title: 'Semester 5',
            courses: ['Dynamics of Machinery', 'Design of Machine Elements', 'Thermal Engineering', 'Metrology'],
            skills: ['Dynamic Analysis', 'Component Design', 'Precision Measurement'],
            projects: ['Machine Component Design', 'Thermal System'],
            milestones: ['SolidWorks Certification', 'Technical Workshop']
          },
          {
            title: 'Semester 6',
            courses: ['CAD/CAM', 'Control Engineering', 'Refrigeration & AC', 'Advanced Manufacturing'],
            skills: ['CAM Operations', 'Control Systems', 'HVAC Basics'],
            projects: ['CNC Programming', 'HVAC System Design'],
            milestones: ['Industry Internship', 'CAM Certification']
          }
        ]
      },
      {
        title: 'Final Year',
        semesters: [
          {
            title: 'Semester 7',
            courses: ['Automobile Engineering', 'Robotics', 'Operations Research', 'Capstone Project I'],
            skills: ['Vehicle Systems', 'Robotics Programming', 'Optimization'],
            projects: ['Vehicle Subsystem', 'Robotic Arm Model'],
            milestones: ['Begin Capstone Project', 'SAE Membership']
          },
          {
            title: 'Semester 8',
            courses: ['Industrial Automation', 'Renewable Energy', 'Quality Engineering', 'Capstone Project II'],
            skills: ['PLC Programming', 'Renewable Systems', 'Six Sigma'],
            projects: ['Complete Capstone Project', 'Portfolio Development'],
            milestones: ['Job Placement', 'Graduate School Applications']
          }
        ]
      }
    ],
    additionalLearning: [
      {
        title: 'Design Skills',
        items: [
          'Advanced CAD (SolidWorks, CATIA)',
          'Finite Element Analysis',
          'Simulation software',
          'GD&T principles',
          'Reverse engineering'
        ]
      },
      {
        title: 'Professional Development',
        items: [
          'ASME membership',
          'SAE competitions',
          'Six Sigma certification',
          'Project management skills',
          'Technical presentations'
        ]
      },
      {
        title: 'Interview Preparation',
        items: [
          'Design problems practice',
          'Manufacturing processes review',
          'Thermodynamics concepts',
          'Project documentation',
          'Industry knowledge'
        ]
      }
    ]
  }
};

const CareerRoadmap = () => {
  const { departmentId } = useParams<{ departmentId: string }>();
  const roadmap = departmentId ? roadmaps[departmentId] : null;
  const [activeYear, setActiveYear] = useState(0);
  
  if (!roadmap) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-3xl font-bold mb-4">Roadmap Not Found</h1>
            <p className="text-gray-300 mb-6">The career roadmap you're looking for doesn't exist.</p>
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
        {/* Roadmap Header */}
        <div className="bg-card/50 border-b border-white/10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <Link to="/" className="flex items-center text-gray-400 hover:text-neon-purple mb-6 transition-colors">
              <ArrowLeft className="h-4 w-4 mr-2" /> Back to Home
            </Link>
            
            <div className="flex flex-col md:flex-row md:items-center gap-6">
              <div className="bg-gradient-to-br from-neon-purple/20 to-neon-magenta/20 p-4 rounded-xl">
                {roadmap.icon}
              </div>
              <div>
                <h1 className="text-4xl font-bold mb-2">{roadmap.name} Career Roadmap</h1>
                <p className="text-gray-300 text-lg max-w-2xl">{roadmap.description}</p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Year Navigation */}
        <div className="bg-card/30 border-b border-white/10 sticky top-16 z-30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex overflow-x-auto py-4 no-scrollbar">
              {roadmap.years.map((year, index) => (
                <button
                  key={index}
                  className={`flex-shrink-0 px-6 py-2 rounded-full mx-1 transition-all ${
                    activeYear === index
                      ? 'bg-neon-purple text-white'
                      : 'bg-white/5 text-gray-300 hover:bg-white/10'
                  }`}
                  onClick={() => setActiveYear(index)}
                >
                  {year.title}
                </button>
              ))}
            </div>
          </div>
        </div>
        
        {/* Active Year Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h2 className="text-3xl font-bold mb-8">{roadmap.years[activeYear].title}</h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {roadmap.years[activeYear].semesters.map((semester, index) => (
              <div key={index} className="neon-card">
                <h3 className="text-2xl font-semibold mb-6">{semester.title}</h3>
                
                <div className="space-y-8">
                  {/* Courses */}
                  <div>
                    <div className="flex items-center mb-3">
                      <Book className="h-5 w-5 text-neon-purple mr-2" />
                      <h4 className="text-lg font-semibold">Courses</h4>
                    </div>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {semester.courses.map((course, i) => (
                        <li key={i} className="flex items-start">
                          <div className="bg-neon-purple/20 rounded-full p-1 mr-2 mt-1">
                            <div className="w-1.5 h-1.5 rounded-full bg-neon-purple"></div>
                          </div>
                          <span className="text-sm">{course}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  {/* Skills */}
                  <div>
                    <div className="flex items-center mb-3">
                      <Code className="h-5 w-5 text-neon-magenta mr-2" />
                      <h4 className="text-lg font-semibold">Skills to Develop</h4>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {semester.skills.map((skill, i) => (
                        <span key={i} className="bg-neon-magenta/20 text-neon-magenta px-3 py-1 rounded-full text-xs">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  {/* Projects */}
                  <div>
                    <div className="flex items-center mb-3">
                      <Cpu className="h-5 w-5 text-neon-blue mr-2" />
                      <h4 className="text-lg font-semibold">Projects</h4>
                    </div>
                    <ul className="space-y-2">
                      {semester.projects.map((project, i) => (
                        <li key={i} className="flex items-start">
                          <div className="bg-neon-blue/20 rounded-full p-1 mr-2 mt-1">
                            <div className="w-1.5 h-1.5 rounded-full bg-neon-blue"></div>
                          </div>
                          <span className="text-sm">{project}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  {/* Milestones */}
                  <div>
                    <div className="flex items-center mb-3">
                      <Star className="h-5 w-5 text-neon-orange mr-2" />
                      <h4 className="text-lg font-semibold">Key Milestones</h4>
                    </div>
                    <ul className="space-y-2">
                      {semester.milestones.map((milestone, i) => (
                        <li key={i} className="flex items-start">
                          <div className="bg-neon-orange/20 rounded-full p-1 mr-2 mt-1">
                            <div className="w-1.5 h-1.5 rounded-full bg-neon-orange"></div>
                          </div>
                          <span className="text-sm">{milestone}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          {/* Additional Learning */}
          <div className="mt-16">
            <h2 className="text-3xl font-bold mb-8">Additional Learning</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {roadmap.additionalLearning.map((section, index) => (
                <div key={index} className="neon-card">
                  <h3 className="text-xl font-semibold mb-4">{section.title}</h3>
                  
                  <ul className="space-y-3">
                    {section.items.map((item, i) => (
                      <li key={i} className="flex items-start">
                        <div className="bg-neon-purple/20 rounded-full p-1 mr-3 mt-1">
                          <div className="w-1.5 h-1.5 rounded-full bg-neon-purple"></div>
                        </div>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
          
          <div className="mt-12 text-center">
            <Link to={`/college-guide/${roadmap.id}`} className="btn-neon inline-block">
              View {roadmap.name} College Guide
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default CareerRoadmap;
