
import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Brain, Rocket, Users, ArrowRight, GraduationCap } from 'lucide-react';
import { Link } from 'react-router-dom';

const teamMembers = [
  {
    name: 'Dr. Alex Johnson',
    role: 'Founder & CEO',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.2&q=80&w=200&h=200&fit=crop',
    bio: 'Former professor with 15+ years of experience in education technology and AI.'
  },
  {
    name: 'Sarah Chen',
    role: 'Head of Curriculum',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.2&q=80&w=200&h=200&fit=crop',
    bio: 'Education specialist with a passion for creating engaging learning experiences.'
  },
  {
    name: 'Michael Rodriguez',
    role: 'CTO',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.2&q=80&w=200&h=200&fit=crop',
    bio: 'Tech leader with expertise in AI, machine learning, and educational platforms.'
  },
  {
    name: 'Priya Sharma',
    role: 'Lead Data Scientist',
    image: 'https://images.unsplash.com/photo-1573497019418-b400bb3ab074?ixlib=rb-4.0.2&q=80&w=200&h=200&fit=crop',
    bio: 'AI researcher focused on personalized learning algorithms and education analytics.'
  }
];

const values = [
  {
    icon: <Brain className="h-10 w-10 text-neon-purple" />,
    title: 'Personalized Learning',
    description: 'We believe education should be tailored to individual needs, learning styles, and career goals.'
  },
  {
    icon: <Rocket className="h-10 w-10 text-neon-magenta" />,
    title: 'Innovation',
    description: 'We constantly explore new teaching methodologies, technologies, and approaches to improve learning outcomes.'
  },
  {
    icon: <Users className="h-10 w-10 text-neon-orange" />,
    title: 'Community',
    description: 'We foster an inclusive environment where learners support each other and grow together.'
  },
  {
    icon: <GraduationCap className="h-10 w-10 text-neon-blue" />,
    title: 'Academic Excellence',
    description: 'We maintain high standards in our curriculum, ensuring content is accurate, up-to-date, and comprehensive.'
  }
];

const AboutUs = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        {/* Hero Section */}
        <div className="bg-card/50 border-b border-white/10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h1 className="text-4xl md:text-5xl font-bold mb-6">
                  About <span className="neon-text">Learnaholic</span>
                </h1>
                <p className="text-gray-300 text-lg mb-8">
                  We're on a mission to transform education by creating personalized learning experiences that help students succeed in their academic and professional journeys.
                </p>
                <div className="flex space-x-4">
                  <Link to="/courses" className="btn-neon">
                    Explore Courses
                  </Link>
                  <Link to="/contact" className="border border-neon-purple/50 hover:border-neon-purple px-6 py-3 rounded-lg text-white font-medium transition-all duration-300">
                    Contact Us
                  </Link>
                </div>
              </div>
              <div className="relative hidden lg:block">
                <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-neon-purple/30 to-neon-magenta/30 blur-xl transform rotate-6"></div>
                <div className="relative bg-card/80 rounded-3xl p-8 border border-white/10">
                  <div className="flex items-center space-x-6 mb-8">
                    <div className="w-20 h-20 bg-neon-purple/20 rounded-full flex items-center justify-center">
                      <GraduationCap className="h-10 w-10 text-neon-purple" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold">Established 2022</h3>
                      <p className="text-gray-400">Educational Technology Company</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-black/20 p-4 rounded-xl">
                      <div className="text-3xl font-bold mb-1 text-neon-purple">10K+</div>
                      <div className="text-sm text-gray-400">Active Students</div>
                    </div>
                    <div className="bg-black/20 p-4 rounded-xl">
                      <div className="text-3xl font-bold mb-1 text-neon-magenta">200+</div>
                      <div className="text-sm text-gray-400">Expert Instructors</div>
                    </div>
                    <div className="bg-black/20 p-4 rounded-xl">
                      <div className="text-3xl font-bold mb-1 text-neon-orange">50+</div>
                      <div className="text-sm text-gray-400">University Partners</div>
                    </div>
                    <div className="bg-black/20 p-4 rounded-xl">
                      <div className="text-3xl font-bold mb-1 text-neon-blue">95%</div>
                      <div className="text-sm text-gray-400">Success Rate</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Our Story */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
          <div className="text-center mb-12">
            <h2 className="mb-4">Our <span className="neon-text">Story</span></h2>
            <p className="text-gray-300 text-lg max-w-3xl mx-auto">
              Learnaholic was born from a simple yet powerful idea: education should be accessible, engaging, and tailored to each student's unique journey.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="bg-card/50 rounded-xl p-8 border border-white/10 timeline-container">
              <div className="timeline-item">
                <h3 className="text-xl font-semibold text-neon-purple">The Beginning</h3>
                <p className="text-gray-300 mt-2">
                  Founded in 2022 by a team of educators, technologists, and learning scientists who saw a need for better educational resources for college students.
                </p>
              </div>
              
              <div className="timeline-item mt-8">
                <h3 className="text-xl font-semibold text-neon-purple">Initial Growth</h3>
                <p className="text-gray-300 mt-2">
                  Partnered with universities to develop AI-powered roadmaps for various engineering and science disciplines. Grew to 1,000 active students in the first six months.
                </p>
              </div>
              
              <div className="timeline-item mt-8">
                <h3 className="text-xl font-semibold text-neon-magenta">Where We Are Today</h3>
                <p className="text-gray-300 mt-2">
                  Now supporting over 10,000 students across 50+ universities with comprehensive learning paths, interactive courses, and personalized career guidance.
                </p>
              </div>
              
              <div className="timeline-item mt-8">
                <h3 className="text-xl font-semibold text-neon-magenta">The Future</h3>
                <p className="text-gray-300 mt-2">
                  We're expanding into new disciplines, developing advanced AI learning tools, and building a global community of lifelong learners.
                </p>
              </div>
            </div>
            
            <div>
              <h3 className="text-2xl font-bold mb-4">Our Mission</h3>
              <p className="text-gray-300 mb-6">
                To empower students with the knowledge, skills, and confidence they need to excel in their education and careers through personalized learning experiences and clear roadmaps.
              </p>
              
              <h3 className="text-2xl font-bold mb-4 mt-8">Our Vision</h3>
              <p className="text-gray-300 mb-6">
                A world where every student has access to high-quality, personalized education that unlocks their full potential and prepares them for the future.
              </p>
              
              <div className="mt-8">
                <Link to="/courses" className="inline-flex items-center text-neon-purple font-medium hover:underline">
                  Start your learning journey <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
        
        {/* Our Values */}
        <div className="bg-black/20 py-16 md:py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="mb-4">Our <span className="neon-text">Values</span></h2>
              <p className="text-gray-300 text-lg max-w-3xl mx-auto">
                These core principles guide everything we do at Learnaholic, from curriculum design to student support.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {values.map((value, index) => (
                <div key={index} className="neon-card flex flex-col items-center text-center">
                  <div className="mb-4">
                    {value.icon}
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{value.title}</h3>
                  <p className="text-gray-400">{value.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        {/* Our Team */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
          <div className="text-center mb-12">
            <h2 className="mb-4">Meet Our <span className="neon-text">Team</span></h2>
            <p className="text-gray-300 text-lg max-w-3xl mx-auto">
              The passionate educators, technologists, and learning designers behind Learnaholic.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((member, index) => (
              <div key={index} className="neon-card group">
                <div className="mb-6 relative">
                  <div className="absolute inset-0 rounded-full bg-gradient-to-r from-neon-purple to-neon-magenta opacity-0 group-hover:opacity-30 transition-opacity duration-300"></div>
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-32 h-32 object-cover rounded-full mx-auto border-4 border-card"
                  />
                </div>
                <div className="text-center">
                  <h3 className="text-xl font-semibold mb-1">{member.name}</h3>
                  <p className="text-neon-purple text-sm mb-3">{member.role}</p>
                  <p className="text-gray-400 text-sm">{member.bio}</p>
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-12 text-center">
            <Link to="/contact" className="btn-neon inline-block">
              Join Our Team
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default AboutUs;
