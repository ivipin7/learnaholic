
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const RoadmapSection = () => {
  return (
    <section className="py-16 md:py-24 relative overflow-hidden">
      <div className="absolute top-0 left-1/2 w-96 h-96 bg-neon-magenta/10 rounded-full blur-3xl"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="mb-4">Career <span className="neon-text">Roadmaps</span></h2>
            <p className="text-gray-300 text-lg mb-6">
              Navigate your educational journey with our step-by-step career roadmaps. From first year to final year, we've mapped out what you need to learn, practice, and master each semester.
            </p>
            
            <div className="timeline-container pl-4 space-y-8">
              <div className="timeline-item">
                <h3 className="text-neon-purple font-semibold text-lg">First Year</h3>
                <p className="text-gray-300 mt-1">Build your foundation with core subjects and basic skills</p>
              </div>
              
              <div className="timeline-item">
                <h3 className="text-neon-purple font-semibold text-lg">Second Year</h3>
                <p className="text-gray-300 mt-1">Specialize in your chosen field and start working on real projects</p>
              </div>
              
              <div className="timeline-item">
                <h3 className="text-neon-purple font-semibold text-lg">Third Year</h3>
                <p className="text-gray-300 mt-1">Gain practical experience through internships and advanced courses</p>
              </div>
              
              <div className="timeline-item">
                <h3 className="text-neon-magenta font-semibold text-lg">Final Year</h3>
                <p className="text-gray-300 mt-1">Complete your portfolio, prepare for placements, and plan your career</p>
              </div>
            </div>
            
            <Link to="/career-roadmap/ai-ds" className="inline-flex items-center mt-8 text-neon-magenta font-medium hover:underline">
              View AI & DS Roadmap <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </div>
          
          <div className="relative">
            <div className="bg-gradient-to-br from-neon-purple/20 to-neon-magenta/20 rounded-3xl p-1">
              <div className="bg-card rounded-3xl p-8">
                <h3 className="text-xl font-semibold mb-4 text-neon-magenta">AI & DS Roadmap Highlights</h3>
                
                <div className="space-y-4">
                  <div className="flex items-start">
                    <div className="bg-neon-purple/20 rounded-full p-2 mr-3 mt-1">
                      <div className="w-2 h-2 rounded-full bg-neon-purple"></div>
                    </div>
                    <div>
                      <h4 className="font-medium">Mathematics & Programming Fundamentals</h4>
                      <p className="text-sm text-gray-400">Calculus, Linear Algebra, Python, Data Structures</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="bg-neon-purple/20 rounded-full p-2 mr-3 mt-1">
                      <div className="w-2 h-2 rounded-full bg-neon-purple"></div>
                    </div>
                    <div>
                      <h4 className="font-medium">Data Science & Statistics</h4>
                      <p className="text-sm text-gray-400">SQL, Data Analysis, Probability, Visualization</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="bg-neon-magenta/20 rounded-full p-2 mr-3 mt-1">
                      <div className="w-2 h-2 rounded-full bg-neon-magenta"></div>
                    </div>
                    <div>
                      <h4 className="font-medium">Machine Learning & Deep Learning</h4>
                      <p className="text-sm text-gray-400">Scikit-Learn, TensorFlow, Computer Vision, NLP</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="bg-neon-magenta/20 rounded-full p-2 mr-3 mt-1">
                      <div className="w-2 h-2 rounded-full bg-neon-magenta"></div>
                    </div>
                    <div>
                      <h4 className="font-medium">Advanced AI & Research</h4>
                      <p className="text-sm text-gray-400">Reinforcement Learning, GANs, Research Papers</p>
                    </div>
                  </div>
                </div>
                
                <div className="mt-6 pt-4 border-t border-white/10">
                  <Link to="/career-roadmap/ai-ds" className="btn-neon w-full flex justify-center">
                    Explore Full Roadmap
                  </Link>
                </div>
              </div>
            </div>
            
            <div className="absolute -top-4 -right-4 w-24 h-24 bg-neon-purple/20 rounded-full blur-xl"></div>
            <div className="absolute -bottom-4 -left-4 w-24 h-24 bg-neon-magenta/20 rounded-full blur-xl"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RoadmapSection;
