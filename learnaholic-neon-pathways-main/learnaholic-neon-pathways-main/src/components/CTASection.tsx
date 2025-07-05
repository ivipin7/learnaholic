
import React from 'react';
import { Link } from 'react-router-dom';

const CTASection = () => {
  return (
    <section className="py-16 md:py-24">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-3xl">
          {/* Background gradient */}
          <div className="absolute inset-0 bg-gradient-to-r from-neon-purple/30 to-neon-magenta/30 backdrop-blur-sm"></div>
          
          {/* Decorative elements */}
          <div className="absolute -top-20 -right-20 w-64 h-64 bg-neon-purple/30 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-neon-magenta/30 rounded-full blur-3xl"></div>
          
          <div className="relative py-12 px-6 md:p-12 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Ready to Transform Your <span className="neon-text">Learning Journey</span>?
            </h2>
            
            <p className="text-lg text-gray-200 mb-8 max-w-2xl mx-auto">
              Join thousands of students who are unlocking their potential through structured learning paths and personalized roadmaps.
            </p>
            
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link to="/courses" className="btn-neon">
                Explore Courses
              </Link>
              <Link to="/college-guide/ai-ds" className="bg-white/10 hover:bg-white/20 text-white px-6 py-3 rounded-lg font-medium transition-all duration-300">
                View College Guides
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
