
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, BookOpen, Code, Server, Cpu, Cog } from 'lucide-react';

const departments = [
  {
    name: 'AI & DS',
    icon: <Cpu className="h-10 w-10 text-neon-purple" />,
    description: 'Artificial Intelligence and Data Science curriculum and career paths',
    path: '/college-guide/ai-ds',
    color: 'from-purple-600/20 to-indigo-600/20'
  },
  {
    name: 'CSE',
    icon: <Code className="h-10 w-10 text-neon-orange" />,
    description: 'Computer Science Engineering curriculum and career paths',
    path: '/college-guide/cse',
    color: 'from-orange-600/20 to-red-600/20'
  },
  {
    name: 'IT',
    icon: <Server className="h-10 w-10 text-neon-blue" />,
    description: 'Information Technology curriculum and career paths',
    path: '/college-guide/it',
    color: 'from-blue-600/20 to-cyan-600/20'
  },
  {
    name: 'ECE',
    icon: <Cog className="h-10 w-10 text-neon-magenta" />,
    description: 'Electronics and Communication Engineering curriculum and career paths',
    path: '/college-guide/ece',
    color: 'from-pink-600/20 to-rose-600/20'
  },
  {
    name: 'Mechanical',
    icon: <Cog className="h-10 w-10 text-green-500" />,
    description: 'Mechanical Engineering curriculum and career paths',
    path: '/college-guide/mechanical',
    color: 'from-green-600/20 to-emerald-600/20'
  }
];

const DepartmentSection = () => {
  return (
    <section className="py-16 md:py-24 bg-black/20 relative overflow-hidden">
      {/* Abstract background elements */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-neon-purple/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-0 w-64 h-64 bg-neon-magenta/5 rounded-full blur-3xl"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-16 max-w-3xl">
          <h2 className="mb-4">College <span className="neon-text">Guides</span> by Department</h2>
          <p className="text-gray-300 text-lg">
            Expert-curated guides for each department to help you navigate through your college journey. 
            Learn what courses to take, skills to build, and projects to work on.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {departments.map((dept, index) => (
            <Link
              key={index}
              to={dept.path}
              className="department-card group"
            >
              <div className={`absolute inset-0 rounded-xl bg-gradient-to-br ${dept.color} opacity-20 group-hover:opacity-30 transition-opacity duration-300`}></div>
              <div className="relative">
                <div className="mb-4">
                  {dept.icon}
                </div>
                <h3 className="text-xl font-semibold mb-2 group-hover:text-neon-purple transition-colors duration-300">{dept.name}</h3>
                <p className="text-gray-400 mb-6">{dept.description}</p>
                <div className="flex items-center text-sm font-medium text-neon-purple group-hover:translate-x-1 transition-transform duration-300">
                  View Guide <ArrowRight className="ml-2 h-4 w-4" />
                </div>
              </div>
            </Link>
          ))}
          
          <div className="department-card flex flex-col justify-center items-center text-center">
            <BookOpen className="h-10 w-10 text-gray-500 mb-4" />
            <h3 className="text-xl font-semibold mb-2">More Departments</h3>
            <p className="text-gray-400 mb-4">Coming Soon</p>
            <span className="text-sm text-gray-500">Stay tuned for additional guides</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DepartmentSection;
