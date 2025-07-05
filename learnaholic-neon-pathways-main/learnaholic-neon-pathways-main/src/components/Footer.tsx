
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { GraduationCap, Mail, Github, Linkedin, Twitter } from 'lucide-react';
import { subscribeToNewsletter } from '@/services/contactService';
import { useToast } from '@/components/ui/use-toast';

const Footer = () => {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email.trim()) {
      toast({
        title: "Error",
        description: "Please enter a valid email address",
        variant: "destructive",
      });
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      await subscribeToNewsletter(email);
      
      toast({
        title: "Success!",
        description: "You've been subscribed to our newsletter",
      });
      
      setEmail('');
    } catch (error) {
      console.error('Newsletter subscription error:', error);
      
      toast({
        title: "Subscription Failed",
        description: "There was an error subscribing you to the newsletter",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <footer className="bg-card/70 border-t border-white/10 pt-12 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8">
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <GraduationCap className="h-8 w-8 text-neon-purple" />
              <span className="font-display text-2xl font-bold neon-text">Learnaholic</span>
            </div>
            <p className="text-gray-300 text-sm">
              Your personalized learning partner for academic success and career growth.
            </p>
            <div className="flex space-x-4 pt-2">
              <a href="#" className="text-gray-400 hover:text-neon-purple transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-neon-purple transition-colors">
                <Github className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-neon-purple transition-colors">
                <Linkedin className="h-5 w-5" />
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-300 hover:text-neon-magenta transition-colors">Home</Link>
              </li>
              <li>
                <Link to="/courses" className="text-gray-300 hover:text-neon-magenta transition-colors">Course Library</Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-300 hover:text-neon-magenta transition-colors">About Us</Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-300 hover:text-neon-magenta transition-colors">Contact</Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Resources</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/college-guide/ai-ds" className="text-gray-300 hover:text-neon-magenta transition-colors">AI & DS Guide</Link>
              </li>
              <li>
                <Link to="/college-guide/cse" className="text-gray-300 hover:text-neon-magenta transition-colors">CSE Guide</Link>
              </li>
              <li>
                <Link to="/career-roadmap/ai-ds" className="text-gray-300 hover:text-neon-magenta transition-colors">AI & DS Roadmap</Link>
              </li>
              <li>
                <Link to="/career-roadmap/cse" className="text-gray-300 hover:text-neon-magenta transition-colors">CSE Roadmap</Link>
              </li>
            </ul>
          </div>

          <div className="md:col-span-3 lg:col-span-1">
            <h3 className="text-lg font-semibold mb-4">Newsletter</h3>
            <p className="text-gray-300 text-sm mb-4">
              Subscribe to get the latest updates and resources.
            </p>
            <form className="flex" onSubmit={handleNewsletterSubmit}>
              <input
                type="email"
                placeholder="Your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-grow px-4 py-2 bg-white/10 rounded-l-lg border-y border-l border-white/10 text-white focus:outline-none focus:ring-1 focus:ring-neon-purple"
                disabled={isSubmitting}
              />
              <button
                type="submit"
                className="bg-neon-purple text-white px-4 py-2 rounded-r-lg hover:bg-neon-magenta transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Subscribing...' : 'Subscribe'}
              </button>
            </form>
            <div className="mt-4 flex items-center text-sm text-gray-400">
              <Mail className="h-4 w-4 mr-2" />
              <span>contact@learnaholic.com</span>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 mt-8 pt-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm">
            © {new Date().getFullYear()} Learnaholic. All rights reserved.
          </p>
          <div className="mt-4 md:mt-0 flex space-x-6">
            <Link to="/privacy" className="text-gray-400 text-sm hover:text-neon-purple">
              Privacy Policy
            </Link>
            <Link to="/terms" className="text-gray-400 text-sm hover:text-neon-purple">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
