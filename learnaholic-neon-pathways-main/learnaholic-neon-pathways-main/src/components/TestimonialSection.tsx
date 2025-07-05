
import React from 'react';
import { Star } from 'lucide-react';

const testimonials = [
  {
    quote: "Learnaholic helped me plan my computer science curriculum perfectly. The roadmap was easy to follow and the course recommendations were spot-on.",
    name: "Alex Johnson",
    title: "CSE Student, Stanford University",
    rating: 5
  },
  {
    quote: "The AI & DS roadmap was exactly what I needed. It showed me what to learn and when, which helped me land an internship at a top tech company.",
    name: "Priya Sharma",
    title: "AI Student, MIT",
    rating: 5
  },
  {
    quote: "As someone switching to IT, the structured learning path made the transition smooth. The interactive content keeps me engaged for hours.",
    name: "Michael Chen",
    title: "IT Professional",
    rating: 4
  }
];

const TestimonialSection = () => {
  return (
    <section className="py-16 md:py-24 bg-black/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="mb-4">What Our <span className="neon-text">Students Say</span></h2>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto">
            Hear from students who've transformed their learning journey with Learnaholic.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div 
              key={index} 
              className="neon-card relative group"
            >
              <div className="absolute -inset-1 bg-gradient-to-r from-neon-purple to-neon-magenta opacity-0 group-hover:opacity-20 rounded-xl blur-sm transition-opacity duration-300"></div>
              <div className="relative">
                <div className="flex mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-yellow-500 fill-yellow-500" />
                  ))}
                  {[...Array(5 - testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-gray-500" />
                  ))}
                </div>
                <p className="text-gray-300 mb-6 italic">&ldquo;{testimonial.quote}&rdquo;</p>
                <div>
                  <p className="font-semibold">{testimonial.name}</p>
                  <p className="text-sm text-gray-400">{testimonial.title}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialSection;
