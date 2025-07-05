
import React from 'react';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import FeatureSection from '../components/FeatureSection';
import DepartmentSection from '../components/DepartmentSection';
import RoadmapSection from '../components/RoadmapSection';
import CourseSection from '../components/CourseSection';
import TestimonialSection from '../components/TestimonialSection';
import CTASection from '../components/CTASection';
import Footer from '../components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <Hero />
        <FeatureSection />
        <DepartmentSection />
        <RoadmapSection />
        <CourseSection />
        <TestimonialSection />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
