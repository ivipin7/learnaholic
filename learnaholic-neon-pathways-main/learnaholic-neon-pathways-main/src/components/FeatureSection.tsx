
import React from 'react';
import { BookOpen, Calendar, Award, ChartBar, BookUser } from 'lucide-react';

const features = [
  {
    icon: <BookOpen className="h-8 w-8 mb-4 text-neon-purple" />,
    title: 'Comprehensive Course Library',
    description: 'Access hundreds of courses across different departments and disciplines, designed by experts in each field.'
  },
  {
    icon: <BookUser className="h-8 w-8 mb-4 text-neon-magenta" />,
    title: 'Personalized Learning',
    description: 'Get tailored recommendations based on your department, interests, skill level, and career goals.'
  },
  {
    icon: <ChartBar className="h-8 w-8 mb-4 text-neon-orange" />,
    title: 'Progress Tracking',
    description: 'Monitor your progress with detailed analytics and visualizations to stay motivated and on track.'
  },
  {
    icon: <Calendar className="h-8 w-8 mb-4 text-neon-blue" />,
    title: 'Structured Roadmaps',
    description: 'Follow step-by-step roadmaps from first year to graduation, with clear milestones and achievements.'
  },
  {
    icon: <Award className="h-8 w-8 mb-4 text-neon-purple" />,
    title: 'Certificates & Achievements',
    description: 'Earn certificates upon completion of courses and showcase your skills to potential employers.'
  }
];

const FeatureSection = () => {
  return (
    <section className="py-16 md:py-24 relative overflow-hidden">
      {/* Abstract background elements */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-neon-purple/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-neon-magenta/5 rounded-full blur-3xl"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="mb-4">
            <span className="neon-text">Features</span> That Make Us Different
          </h2>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto">
            Our platform is designed to make learning engaging, structured, and personalized to your academic and career goals.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className="neon-card bg-card/80 hover:bg-card transition-all duration-300 flex flex-col items-center text-center group"
            >
              <div className="group-hover:scale-110 transition-transform duration-300">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold mb-2 group-hover:text-neon-purple transition-colors duration-300">{feature.title}</h3>
              <p className="text-gray-400">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeatureSection;
