
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const Hero = () => {
  return (
    <div className="relative min-h-[85vh] flex items-center overflow-hidden">
      {/* Abstract background elements */}
      <div className="absolute -top-40 -right-40 w-96 h-96 bg-neon-purple/20 rounded-full blur-3xl"></div>
      <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-neon-magenta/20 rounded-full blur-3xl"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-24 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div className="space-y-5">
              <h1 className="font-display font-bold">
                <span className="neon-text">Unlock Your Learning Potential</span>
                <span className="block mt-3 text-white">With Learnaholic</span>
              </h1>
              <p className="text-gray-300 text-lg md:text-xl max-w-xl">
                Your personalized learning partner that helps you master skills, plan your education, and advance your career through interactive and engaging experiences.
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/courses" className="btn-neon">
                Explore Courses
              </Link>
              <Link to="/college-guide/ai-ds" className="border border-neon-purple/50 hover:border-neon-purple px-6 py-3 rounded-lg text-white font-medium transition-all duration-300 flex items-center justify-center">
                View College Guides <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </div>
            
            <div className="flex items-center space-x-6 pt-4">
              <div className="flex -space-x-2">
                <div className="w-8 h-8 rounded-full bg-gradient-to-r from-purple-500 to-pink-500"></div>
                <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500"></div>
                <div className="w-8 h-8 rounded-full bg-gradient-to-r from-green-500 to-emerald-500"></div>
                <div className="w-8 h-8 rounded-full bg-gradient-to-r from-yellow-500 to-orange-500"></div>
              </div>
              <span className="text-gray-300">
                <span className="font-semibold text-white">10,000+</span> students already learning
              </span>
            </div>
          </div>
          
          <div className="relative animate-float hidden lg:block">
            <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-neon-purple/20 to-neon-magenta/20 blur-lg transform rotate-6"></div>
            <div className="relative neon-card bg-card/80 rounded-3xl p-6 transform -rotate-3">
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold">Your Learning Path</h3>
                  <span className="bg-neon-purple/20 text-neon-purple px-2 py-1 rounded text-xs">AI Personalized</span>
                </div>
                
                <div className="space-y-4">
                  <div className="flex items-center">
                    <div className="w-8 h-8 rounded-full bg-neon-purple/30 flex items-center justify-center">
                      <span className="font-semibold">1</span>
                    </div>
                    <div className="ml-3">
                      <p className="font-medium">Choose your department</p>
                      <p className="text-sm text-gray-400">AI & DS, CSE, IT...</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center">
                    <div className="w-8 h-8 rounded-full bg-neon-magenta/30 flex items-center justify-center">
                      <span className="font-semibold">2</span>
                    </div>
                    <div className="ml-3">
                      <p className="font-medium">Follow roadmap courses</p>
                      <p className="text-sm text-gray-400">Structured learning path</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center">
                    <div className="w-8 h-8 rounded-full bg-neon-orange/30 flex items-center justify-center">
                      <span className="font-semibold">3</span>
                    </div>
                    <div className="ml-3">
                      <p className="font-medium">Track your progress</p>
                      <p className="text-sm text-gray-400">Step by step achievements</p>
                    </div>
                  </div>
                </div>
                
                <div className="bg-white/10 h-2 rounded-full overflow-hidden">
                  <div className="bg-gradient-to-r from-neon-purple to-neon-magenta h-full w-2/3"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
