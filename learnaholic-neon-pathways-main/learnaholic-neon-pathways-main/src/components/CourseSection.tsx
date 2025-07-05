
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const courses = [
  {
    title: "Introduction to Python Programming",
    category: "Programming",
    level: "Beginner",
    image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?ixlib=rb-4.0.2&q=80&w=800&h=600&fit=crop",
    progress: 70
  },
  {
    title: "Data Structures & Algorithms",
    category: "Computer Science",
    level: "Intermediate",
    image: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?ixlib=rb-4.0.2&q=80&w=800&h=600&fit=crop",
    progress: 45
  },
  {
    title: "Machine Learning Fundamentals",
    category: "AI & Data Science",
    level: "Intermediate",
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?ixlib=rb-4.0.2&q=80&w=800&h=600&fit=crop",
    progress: 20
  }
];

const CourseSection = () => {
  return (
    <section className="py-16 md:py-24 relative overflow-hidden">
      <div className="absolute -bottom-80 right-0 w-96 h-96 bg-neon-orange/10 rounded-full blur-3xl"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12">
          <div>
            <h2 className="mb-2">Featured <span className="neon-text">Courses</span></h2>
            <p className="text-gray-300 text-lg max-w-2xl">
              Start learning with these popular courses designed by experts.
            </p>
          </div>
          <Link to="/courses" className="mt-4 md:mt-0 flex items-center text-neon-purple hover:underline font-medium">
            View All Courses <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {courses.map((course, index) => (
            <Link key={index} to="/courses" className="group">
              <div className="neon-card overflow-hidden flex flex-col h-full">
                <div className="relative h-48 overflow-hidden rounded-t-lg">
                  <img 
                    src={course.image} 
                    alt={course.title} 
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent"></div>
                  <div className="absolute bottom-3 left-3">
                    <span className="bg-neon-purple/80 text-white text-xs px-2 py-1 rounded-md">
                      {course.category}
                    </span>
                    <span className="bg-black/50 text-white text-xs px-2 py-1 rounded-md ml-2">
                      {course.level}
                    </span>
                  </div>
                </div>
                
                <div className="flex-grow flex flex-col p-4">
                  <h3 className="text-xl font-semibold mb-4 group-hover:text-neon-purple transition-colors duration-300">
                    {course.title}
                  </h3>
                  
                  <div className="mt-auto">
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-gray-400">Progress</span>
                      <span className="text-neon-purple">{course.progress}%</span>
                    </div>
                    <div className="w-full bg-white/10 rounded-full h-2">
                      <div 
                        className="bg-gradient-to-r from-neon-purple to-neon-magenta h-2 rounded-full" 
                        style={{width: `${course.progress}%`}}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CourseSection;
