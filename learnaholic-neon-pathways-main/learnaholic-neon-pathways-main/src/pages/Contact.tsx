import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Mail, Phone, MapPin, Send, MessageCircle, CheckCircle } from 'lucide-react';
import { submitContactForm } from '@/services/contactService';
import { useToast } from '@/components/ui/use-toast';

const Contact = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      // Submit form data to MongoDB
      await submitContactForm({ name, email, subject, message });
      
      setSubmitted(true);
      
      // Reset form after submission
      setName('');
      setEmail('');
      setSubject('');
      setMessage('');
      
      toast({
        title: "Message Sent!",
        description: "Thanks for reaching out. We'll get back to you soon!",
        variant: "default",
      });
      
      // Reset the submitted state after 5 seconds
      setTimeout(() => {
        setSubmitted(false);
      }, 5000);
    } catch (error) {
      console.error('Error submitting form:', error);
      
      toast({
        title: "Submission Failed",
        description: "There was an error sending your message. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        {/* Header */}
        <div className="bg-card/50 border-b border-white/10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <h1 className="text-4xl font-bold mb-4">Contact <span className="neon-text">Us</span></h1>
            <p className="text-gray-300 text-lg max-w-3xl">
              Have questions about our courses, roadmaps, or anything else? We're here to help! Reach out using the form below or through our other contact channels.
            </p>
          </div>
        </div>
        
        {/* Contact Section */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Info */}
            <div>
              <h2 className="text-2xl font-bold mb-8">Get in Touch</h2>
              
              <div className="space-y-8">
                <div className="flex items-start">
                  <div className="bg-neon-purple/20 rounded-full p-3 mr-4">
                    <Mail className="h-6 w-6 text-neon-purple" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-1">Email Us</h3>
                    <p className="text-gray-400 mb-1">For general inquiries:</p>
                    <a href="mailto:info@learnaholic.com" className="text-neon-purple hover:underline">info@learnaholic.com</a>
                    <p className="text-gray-400 mt-2 mb-1">For support:</p>
                    <a href="mailto:support@learnaholic.com" className="text-neon-purple hover:underline">support@learnaholic.com</a>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-neon-magenta/20 rounded-full p-3 mr-4">
                    <Phone className="h-6 w-6 text-neon-magenta" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-1">Call Us</h3>
                    <p className="text-gray-400 mb-1">Main Office:</p>
                    <a href="tel:+1234567890" className="text-neon-magenta hover:underline">+1 (234) 567-890</a>
                    <p className="text-gray-400 mt-2 mb-1">Support Hotline:</p>
                    <a href="tel:+1987654321" className="text-neon-magenta hover:underline">+1 (987) 654-321</a>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-neon-orange/20 rounded-full p-3 mr-4">
                    <MapPin className="h-6 w-6 text-neon-orange" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-1">Visit Us</h3>
                    <p className="text-gray-400 mb-1">Headquarters:</p>
                    <address className="not-italic text-white">
                      123 Learning Avenue<br />
                      Innovation District<br />
                      San Francisco, CA 94105
                    </address>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-neon-blue/20 rounded-full p-3 mr-4">
                    <MessageCircle className="h-6 w-6 text-neon-blue" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-1">Live Chat</h3>
                    <p className="text-gray-400 mb-3">Our support team is available for live chat during business hours.</p>
                    <button className="bg-neon-blue/20 text-neon-blue hover:bg-neon-blue/30 px-4 py-2 rounded-lg transition-colors flex items-center">
                      <MessageCircle className="h-4 w-4 mr-2" />
                      Start Chat
                    </button>
                  </div>
                </div>
              </div>
              
              <div className="mt-12">
                <h3 className="font-semibold text-lg mb-4">Our Hours</h3>
                <div className="bg-card/50 rounded-xl p-6 border border-white/10">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-gray-400 mb-1">Monday - Friday:</p>
                      <p className="font-medium">9:00 AM - 6:00 PM ET</p>
                    </div>
                    <div>
                      <p className="text-gray-400 mb-1">Saturday:</p>
                      <p className="font-medium">10:00 AM - 4:00 PM ET</p>
                    </div>
                    <div className="col-span-2">
                      <p className="text-gray-400 mb-1">Sunday:</p>
                      <p className="font-medium">Closed</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Contact Form */}
            <div className="bg-card/50 rounded-xl p-8 border border-white/10">
              <h2 className="text-2xl font-bold mb-6">Send Us a Message</h2>
              
              {submitted ? (
                <div className="flex flex-col items-center justify-center py-12">
                  <div className="bg-green-500/20 rounded-full p-4 mb-4">
                    <CheckCircle className="h-12 w-12 text-green-500" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Message Sent!</h3>
                  <p className="text-gray-300 text-center mb-6">
                    Thank you for reaching out. We'll get back to you as soon as possible.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-400 mb-2">
                        Your Name
                      </label>
                      <input
                        type="text"
                        id="name"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full bg-black/30 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-neon-purple focus:border-transparent"
                        disabled={isLoading}
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-400 mb-2">
                        Your Email
                      </label>
                      <input
                        type="email"
                        id="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full bg-black/30 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-neon-purple focus:border-transparent"
                        disabled={isLoading}
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium text-gray-400 mb-2">
                      Subject
                    </label>
                    <input
                      type="text"
                      id="subject"
                      required
                      value={subject}
                      onChange={(e) => setSubject(e.target.value)}
                      className="w-full bg-black/30 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-neon-purple focus:border-transparent"
                      disabled={isLoading}
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-400 mb-2">
                      Message
                    </label>
                    <textarea
                      id="message"
                      rows={6}
                      required
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      className="w-full bg-black/30 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-neon-purple focus:border-transparent resize-none"
                      disabled={isLoading}
                    ></textarea>
                  </div>
                  
                  <button
                    type="submit"
                    className="btn-neon w-full flex items-center justify-center"
                    disabled={isLoading}
                  >
                    <Send className="h-4 w-4 mr-2" />
                    {isLoading ? "Sending..." : "Send Message"}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
        
        {/* FAQ Section */}
        <div className="bg-black/20 py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="mb-4">Frequently Asked <span className="neon-text">Questions</span></h2>
              <p className="text-gray-300 text-lg max-w-3xl mx-auto">
                Find answers to the most common questions about Learnaholic.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
              <div className="neon-card">
                <h3 className="text-lg font-semibold mb-2">How do I access my courses?</h3>
                <p className="text-gray-400">
                  Once you've enrolled in a course, you can access it from your dashboard. We're currently developing user accounts, so stay tuned!
                </p>
              </div>
              
              <div className="neon-card">
                <h3 className="text-lg font-semibold mb-2">Are the career roadmaps updated regularly?</h3>
                <p className="text-gray-400">
                  Yes! We update our roadmaps quarterly to ensure they reflect current industry trends, technologies, and academic requirements.
                </p>
              </div>
              
              <div className="neon-card">
                <h3 className="text-lg font-semibold mb-2">Can I suggest a new course or roadmap?</h3>
                <p className="text-gray-400">
                  Absolutely! We welcome suggestions from our community. Use the contact form above to send us your ideas.
                </p>
              </div>
              
              <div className="neon-card">
                <h3 className="text-lg font-semibold mb-2">Do you offer certifications?</h3>
                <p className="text-gray-400">
                  We're working on implementing certificates for course completion. This feature will be available soon.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Contact;
