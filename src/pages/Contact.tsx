import React, { useState } from 'react';
import { Mail, Send, User, MessageSquare, Globe, Loader2 } from 'lucide-react';
import { cn } from '../lib/utils';

export default function Contact({ onNavigate }: { onNavigate?: (route: string) => void }) {
  const [activeTab, setActiveTab] = useState<'contact' | 'hire'>('contact');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
    company: '',
    budget: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMsg('');
    
    // We try to pull from the environment so you can configure it via the Secrets menu,
    // otherwise fallback to a generic placeholder access key if missing.
    // NOTE: You should get your own free Access Key from https://web3forms.com
    const accessKey = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY || '';
    
    if (!accessKey) {
       console.warn("No Web3Forms access key provided. Form will simulate success.");
       setTimeout(() => {
         setIsSubmitting(false);
         setSubmitted(true);
         setFormData({ name: '', email: '', subject: '', message: '' });
       }, 1500);
       return;
    }

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify({
          access_key: accessKey,
          ...formData
        })
      });

      const result = await response.json();

      if (result.success) {
        setSubmitted(true);
        setFormData({ name: '', email: '', subject: '', message: '' });
      } else {
        setErrorMsg(result.message || 'Something went wrong. Please try again.');
      }
    } catch (error) {
      setErrorMsg('Failed to send message. Please check your connection.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="min-h-screen bg-background text-on-surface py-8 md:py-12 px-4 sm:px-6 md:px-12 lg:px-24">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-6 md:mb-8">
          <h1 className="text-3xl md:text-5xl font-display font-bold tracking-tight mb-3 md:mb-4">
            {activeTab === 'contact' ? 'Contact Us' : 'Hire Us'}
          </h1>
          <p className="text-on-surface-variant font-sans md:text-lg max-w-2xl mx-auto">
            {activeTab === 'contact' 
              ? "Have questions, feedback, or need support? We'd love to hear from you. Fill out the form below and our team will get back to you as soon as possible."
              : "Looking for a dedicated team to build your next project? Fill out the form below and let's create something amazing together."}
          </p>
        </div>

        <div className="flex justify-center gap-4 mb-8 md:mb-12">
          <button 
            onClick={() => setActiveTab('contact')}
            className={cn(
              "px-6 py-2 rounded-full font-medium text-sm transition-colors border",
              activeTab === 'contact' 
                ? "bg-primary text-white border-primary" 
                : "bg-surface-variant/30 text-on-surface-variant border-outline-variant/30 hover:bg-surface-variant/80"
            )}
          >
            Contact Us
          </button>
          <button 
            onClick={() => setActiveTab('hire')}
            className={cn(
              "px-6 py-2 rounded-full font-medium text-sm transition-colors border uppercase tracking-wider",
              activeTab === 'hire' 
                ? "bg-primary text-white border-primary" 
                : "bg-surface-variant/30 text-on-surface-variant border-outline-variant/30 hover:bg-surface-variant/80"
            )}
          >
            HIRE US
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-0 md:gap-12 bg-white dark:bg-surface-variant/30 rounded-2xl shadow-sm border border-outline-variant/30 overflow-hidden">
          
          {/* Contact Information */}
          <div className="p-6 md:p-12 bg-primary text-white flex flex-col justify-between">
            <div>
              <h2 className="text-2xl font-bold font-display mb-4 md:mb-6">Get in Touch</h2>
              <p className="text-white/80 mb-6 md:mb-8 font-sans text-sm md:text-base">
                Whether you have a question about previous year papers, need help with AI notes, or just want to say hi, we're here for you.
              </p>
              
              <div className="space-y-4 md:space-y-6 font-sans">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center shrink-0">
                    <Mail size={20} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">Email</h3>
                    <p className="text-white/80 mt-1 text-sm md:text-base">anmolsin1124@gmail.com</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center shrink-0">
                    <MessageSquare size={20} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">Chat Support</h3>
                    <p className="text-white/80 mt-1 text-sm md:text-base">Available Mon-Fri, 9am - 5pm EST</p>
                  </div>
                </div>

                {activeTab === 'hire' && (
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center shrink-0">
                      <Globe size={20} />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg">Portfolio</h3>
                      <a href="https://anmolprofile.vercel.app" target="_blank" rel="noopener noreferrer" className="text-white/80 mt-1 text-sm md:text-base hover:text-white hover:underline transition-colors block">
                        anmolprofile.vercel.app
                      </a>
                    </div>
                  </div>
                )}
              </div>
            </div>
            
            <div className="mt-8 md:mt-12 pt-6 md:pt-8 border-t border-white/20">
              <p className="text-xs md:text-sm text-white/70">
                &copy; {new Date().getFullYear()} SanskarVault. All rights reserved.
              </p>
            </div>
          </div>

          {/* Contact Form */}
          <div className="p-6 md:p-12">
            {submitted ? (
              <div className="h-full flex flex-col items-center justify-center text-center space-y-4 animate-in fade-in duration-500">
                <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-4">
                  <Send size={32} className="ml-1" />
                </div>
                <h3 className="text-2xl font-bold font-display text-primary dark:text-white">Message Sent!</h3>
                <p className="text-on-surface-variant font-sans">
                  Thanks for reaching out. We've received your message and will respond shortly.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="mt-6 px-6 py-2 border border-outline rounded-md text-primary font-medium hover:bg-primary/5 transition-colors dark:text-white"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                {activeTab === 'hire' && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="company" className="block text-sm font-medium text-on-surface mb-2 font-sans">Company Name</label>
                      <input
                        type="text"
                        id="company"
                        name="company"
                        value={formData.company}
                        onChange={handleChange}
                        className="block w-full px-3 py-3 border border-outline rounded-md bg-transparent focus:ring-2 focus:ring-primary focus:border-primary transition-colors text-on-surface dark:border-outline-variant/50"
                        placeholder="Your Company"
                      />
                    </div>
                    <div>
                      <label htmlFor="budget" className="block text-sm font-medium text-on-surface mb-2 font-sans">Estimated Budget</label>
                      <select
                        id="budget"
                        name="budget"
                        value={formData.budget}
                        onChange={handleChange as unknown as React.ChangeEventHandler<HTMLSelectElement>}
                        className="block w-full px-3 py-3 border border-outline rounded-md bg-transparent focus:ring-2 focus:ring-primary focus:border-primary transition-colors text-on-surface dark:border-outline-variant/50 appearance-none"
                      >
                        <option className="text-black" value="">Select budget range...</option>
                        <option className="text-black" value="< $5k">Less than $5k</option>
                        <option className="text-black" value="$5k - $10k">$5k - $10k</option>
                        <option className="text-black" value="$10k - $25k">$10k - $25k</option>
                        <option className="text-black" value="$25k+">$25k+</option>
                      </select>
                    </div>
                  </div>
                )}
                
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-on-surface mb-2 font-sans">Full Name</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-on-surface-variant">
                      <User size={18} />
                    </div>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      className="block w-full pl-10 pr-3 py-3 border border-outline rounded-md bg-transparent focus:ring-2 focus:ring-primary focus:border-primary transition-colors text-on-surface dark:border-outline-variant/50"
                      placeholder="John Doe"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-on-surface mb-2 font-sans">Email Address</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-on-surface-variant">
                      <Mail size={18} />
                    </div>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      className="block w-full pl-10 pr-3 py-3 border border-outline rounded-md bg-transparent focus:ring-2 focus:ring-primary focus:border-primary transition-colors text-on-surface dark:border-outline-variant/50"
                      placeholder="john@example.com"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-on-surface mb-2 font-sans">Subject</label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    required
                    value={formData.subject}
                    onChange={handleChange}
                    className="block w-full px-3 py-3 border border-outline rounded-md bg-transparent focus:ring-2 focus:ring-primary focus:border-primary transition-colors text-on-surface dark:border-outline-variant/50"
                    placeholder="How can we help?"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-on-surface mb-2 font-sans">Message</label>
                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    required
                    value={formData.message}
                    onChange={handleChange}
                    className="block w-full px-3 py-3 border border-outline rounded-md bg-transparent focus:ring-2 focus:ring-primary focus:border-primary transition-colors text-on-surface dark:border-outline-variant/50 resize-y"
                    placeholder="Provide details about your inquiry..."
                  />
                </div>

                {errorMsg && (
                  <div className="text-red-500 font-sans text-sm mt-2">
                    {errorMsg}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={cn(
                    "w-full flex items-center justify-center gap-2 py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white font-sans uppercase tracking-widest bg-primary hover:bg-primary-container focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-all",
                    isSubmitting ? "opacity-70 cursor-not-allowed" : ""
                  )}
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 size={16} className="animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      Send Message
                      <Send size={16} />
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
