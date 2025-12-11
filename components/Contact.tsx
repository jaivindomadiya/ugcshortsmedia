import React, { useState } from 'react';
import { Button } from './Button';
import { ContactFormData } from '../types';
import { Send, CheckCircle } from 'lucide-react';
import { supabase } from '../supabaseClient';

export const Contact: React.FC = () => {
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    brand_name: '',
    ad_spend: '',
    message: '',
  });

  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('submitting');

    try {

       // 1) Fetch user's public IP address
        const ipResponse = await fetch("https://api.ipify.org?format=json");
        const ipData = await ipResponse.json();
        const userIp = ipData?.ip ?? null;

      // Submit to Supabase 'contacts' table
      const { error } = await supabase
        .from('contacts')
        .insert([
          {
            name: formData.name,
            email: formData.email,
            brand_name: formData.brand_name,
            ad_spend: formData.ad_spend,
            message: formData.message,
            created_at: new Date().toISOString(),
            ip: userIp,    
          }
        ]);

      if (error) {
        throw error;
      }

      setStatus('success');
      setFormData({
        name: '',
        email: '',
        brand_name: '',
        ad_spend: '',
        message: '',
      });

    } catch (error) {
      console.error("Supabase Submission Error:", error);
      setStatus('error');
    }
  };

  return (
    <section id="contact" className="py-32 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="bg-[#111111] rounded-[3rem] p-8 md:p-20 overflow-hidden relative shadow-2xl">
            {/* Background Accent */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary rounded-full blur-[150px] opacity-10 pointer-events-none translate-x-1/3 -translate-y-1/3" />
            <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-blue-500 rounded-full blur-[120px] opacity-10 pointer-events-none -translate-x-1/2 translate-y-1/2" />

          <div className="grid md:grid-cols-2 gap-16 lg:gap-24 relative z-10 items-center">
            {/* Left Content */}
            <div className="text-white">
              <div className="inline-block px-4 py-2 border-2 border-white/10 rounded-full text-xs font-bold uppercase tracking-widest mb-8 font-heading text-primary bg-white/5 backdrop-blur-sm">
                Start Scaling Today
              </div>
              <h2 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-8 leading-[1.05] font-heading">
                Let's Scale <br/>
                <span className="text-primary relative inline-block">
                    Your Brand
                    <svg className="absolute -bottom-2 left-0 w-full h-4 text-white z-[-1] opacity-20" viewBox="0 0 200 9" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M2.00025 2.5C45.394 6.27375 107.5 9.00001 198 2.5" stroke="currentColor" strokeWidth="5" strokeLinecap="round"/>
                    </svg>
                </span>.
              </h2>
              <p className="text-xl text-gray-300 mb-12 leading-relaxed max-w-md font-body">
                Ready to stop guessing? Fill out the form and our strategists will build a custom creative roadmap to 2x your ROAS.
              </p>
              
              <div className="space-y-8">
                <div className="flex items-start space-x-6 group">
                  <div className="w-16 h-16 rounded-2xl bg-white/10 flex items-center justify-center text-primary shadow-inner group-hover:bg-primary group-hover:text-[#111111] transition-colors">
                    <Send size={28} />
                  </div>
                  <div>
                    <h4 className="text-lg font-bold mb-1 font-heading">Email Us</h4>
                    <span className="text-gray-300 font-medium text-lg font-body">ugcshortsmedia@gmail.com</span>
                  </div>
                </div>
                
                <div className="flex items-start space-x-6 group">
                   <div className="w-16 h-16 rounded-2xl bg-white/10 flex items-center justify-center text-primary shadow-inner group-hover:bg-primary group-hover:text-[#111111] transition-colors">
                    <CheckCircle size={28} />
                  </div>
                   <div>
                    <h4 className="text-lg font-bold mb-1 font-heading">Fast Turnaround</h4>
                    <span className="text-gray-300 font-medium text-lg font-body">Response within 24 hours</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="bg-white p-8 md:p-12 rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.3)]">
              
              {status === 'success' ? (
                <div className="h-full flex flex-col items-center justify-center text-center py-12 animate-fade-in">
                  <div className="w-24 h-24 bg-green-50 text-green-600 rounded-full flex items-center justify-center mb-8 border-4 border-green-100">
                    <CheckCircle size={48} />
                  </div>
                  <h3 className="text-4xl font-black text-[#111111] mb-4 font-heading">Thanks!</h3>
                  <p className="text-subtext text-xl font-body max-w-sm mx-auto">
                    Your details are submitted successfully. We will contact you within 24 hours.
                  </p>
                  <Button type="button" variant="secondary" className="mt-10" onClick={() => setStatus('idle')}>
                    Send Another
                  </Button>
                </div>
              ) : (
                <div className="space-y-6">
                  {status === 'error' && (
                     <div className="p-3 bg-red-50 text-red-600 text-sm font-bold rounded-lg text-center">
                        Something went wrong. Please try again.
                     </div>
                  )}
                  <div>
                    <label htmlFor="name" className="block text-xs font-extrabold text-[#111111] mb-2 uppercase tracking-widest font-heading pl-2">Full Name</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full px-6 py-4 rounded-2xl bg-secondary border-2 border-transparent focus:border-[#111111] focus:bg-white outline-none transition-all text-[#111111] font-bold font-heading placeholder-gray-400 text-lg"
                      placeholder="John Doe"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="email" className="block text-xs font-extrabold text-[#111111] mb-2 uppercase tracking-widest font-heading pl-2">Work Email</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-6 py-4 rounded-2xl bg-secondary border-2 border-transparent focus:border-[#111111] focus:bg-white outline-none transition-all text-[#111111] font-bold font-heading placeholder-gray-400 text-lg"
                      placeholder="john@company.com"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                     <div>
                        <label htmlFor="brand_name" className="block text-xs font-extrabold text-[#111111] mb-2 uppercase tracking-widest font-heading pl-2">Brand Name</label>
                        <input
                          type="text"
                          id="brand_name"
                          name="brand_name"
                          required
                          value={formData.brand_name}
                          onChange={handleChange}
                          className="w-full px-6 py-4 rounded-2xl bg-secondary border-2 border-transparent focus:border-[#111111] focus:bg-white outline-none transition-all text-[#111111] font-bold font-heading placeholder-gray-400 text-lg"
                          placeholder="My Brand"
                        />
                     </div>
                     <div>
                        <label htmlFor="ad_spend" className="block text-xs font-extrabold text-[#111111] mb-2 uppercase tracking-widest font-heading pl-2">Ad Spend</label>
                        <input
                          type="text"
                          id="ad_spend"
                          name="ad_spend"
                          required
                          value={formData.ad_spend}
                          onChange={handleChange}
                          className="w-full px-6 py-4 rounded-2xl bg-secondary border-2 border-transparent focus:border-[#111111] focus:bg-white outline-none transition-all text-[#111111] font-bold font-heading placeholder-gray-400 text-lg"
                          placeholder="$10k/month"
                        />
                     </div>
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-xs font-extrabold text-[#111111] mb-2 uppercase tracking-widest font-heading pl-2">Message</label>
                    <textarea
                      id="message"
                      name="message"
                      rows={4}
                      value={formData.message}
                      onChange={handleChange}
                      className="w-full px-6 py-4 rounded-2xl bg-secondary border-2 border-transparent focus:border-[#111111] focus:bg-white outline-none transition-all resize-none text-[#111111] font-medium font-body placeholder-gray-400 text-lg"
                      placeholder="Tell us about your goals..."
                    />
                  </div>

                  <Button 
                    type="submit" 
                    fullWidth 
                    size="lg"
                    disabled={status === 'submitting'}
                    className="mt-6 text-xl"
                  >
                    {status === 'submitting' ? 'Sending...' : 'Start Working With Us'}
                  </Button>
                  
                  <p className="text-center text-xs text-gray-400 mt-6 font-bold font-heading tracking-wide">
                    100% Free Consultation. No strings attached.
                  </p>
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};