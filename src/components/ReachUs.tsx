import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, Check } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from './Icons';

export const ReachUs: React.FC = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSent, setIsSent] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    setIsSubmitting(true);
    const accessKey = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY;

    if (!accessKey || accessKey === 'your_access_key_here') {
      console.warn("Web3Forms access key is not set. Please update VITE_WEB3FORMS_ACCESS_KEY in your .env file.");
      // Fallback simulation for demonstration
      setTimeout(() => {
        setIsSubmitting(false);
        setIsSent(true);
        setFormData({ name: '', email: '', message: '' });
        setTimeout(() => setIsSent(false), 4000);
      }, 1500);
      return;
    }

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          access_key: accessKey,
          name: formData.name,
          email: formData.email,
          message: formData.message,
          subject: `Portfolio Message from ${formData.name}`,
          from_name: "Gia Huy Portfolio"
        }),
      });

      const result = await response.json();

      if (result.success) {
        setIsSent(true);
        setFormData({ name: '', email: '', message: '' });
      } else {
        console.error("Web3Forms Submission Error:", result);
        alert(result.message || "Failed to transmit message.");
      }
    } catch (error) {
      console.error("Network Error:", error);
      alert("An error occurred. Please check your network connection and try again.");
    } finally {
      setIsSubmitting(false);
      setTimeout(() => setIsSent(false), 4000);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <section id="reach-us" className="relative bg-white py-32 px-8 z-10 border-t border-gray-100">
      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="mb-20">
          <span className="text-[#6F6F6F] font-body text-sm tracking-widest uppercase block mb-3">// GET IN TOUCH</span>
          <h2 className="font-display text-5xl md:text-7xl text-black font-normal tracking-tight">
            Initiate the <span className="italic text-[#6F6F6F]">collaboration.</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Left Side: Contact Information cards */}
          <div className="lg:col-span-5 space-y-6">
            <span className="font-body text-xs font-semibold text-black tracking-wider uppercase block mb-4">// CHANNELS</span>
            
            {/* Contact details */}
            <div className="space-y-4">
              <a 
                href="mailto:giahuytruonn@gmail.com" 
                className="flex items-center gap-4 p-5 border border-gray-100 rounded-2xl bg-gray-50/20 hover:border-gray-300 transition-all duration-300 group"
              >
                <div className="p-3 bg-gray-50 rounded-xl group-hover:bg-black group-hover:text-white transition-colors duration-300">
                  <Mail className="w-5 h-5 text-current" />
                </div>
                <div>
                  <span className="text-xs font-body text-[#6F6F6F] block uppercase tracking-wider">Email Address</span>
                  <span className="text-sm font-body font-semibold text-black">giahuytruonn@gmail.com</span>
                </div>
              </a>

              <a 
                href="tel:0862769500" 
                className="flex items-center gap-4 p-5 border border-gray-100 rounded-2xl bg-gray-50/20 hover:border-gray-300 transition-all duration-300 group"
              >
                <div className="p-3 bg-gray-50 rounded-xl group-hover:bg-black group-hover:text-white transition-colors duration-300">
                  <Phone className="w-5 h-5 text-current" />
                </div>
                <div>
                  <span className="text-xs font-body text-[#6F6F6F] block uppercase tracking-wider">Direct Phone</span>
                  <span className="text-sm font-body font-semibold text-black">0862769500</span>
                </div>
              </a>

              <div 
                className="flex items-center gap-4 p-5 border border-gray-100 rounded-2xl bg-gray-50/20"
              >
                <div className="p-3 bg-gray-50 rounded-xl">
                  <MapPin className="w-5 h-5 text-black" />
                </div>
                <div>
                  <span className="text-xs font-body text-[#6F6F6F] block uppercase tracking-wider">Physical Base</span>
                  <span className="text-sm font-body font-semibold text-black">Go Vap District, Ho Chi Minh City</span>
                </div>
              </div>
            </div>

            {/* Social media connections */}
            <div className="pt-4 space-y-3">
              <span className="font-body text-xs font-semibold text-black tracking-wider uppercase block">// DIGITAL NETWORKS</span>
              <div className="flex gap-4">
                <a
                  href="https://www.linkedin.com/in/giahuytruonn"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-center gap-2 border border-gray-200 hover:border-black rounded-full px-5 py-2.5 text-xs font-body text-black uppercase tracking-wider transition-colors duration-300"
                >
                  <LinkedinIcon className="w-4 h-4" /> LinkedIn
                </a>
                <a
                  href="https://github.com/giahuytruonn"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-center gap-2 border border-gray-200 hover:border-black rounded-full px-5 py-2.5 text-xs font-body text-black uppercase tracking-wider transition-colors duration-300"
                >
                  <GithubIcon className="w-4 h-4" /> GitHub
                </a>
              </div>
            </div>
          </div>

          {/* Right Side: Message form */}
          <div className="lg:col-span-7">
            <div className="glass-card rounded-2xl p-8 border border-gray-100">
              <span className="font-body text-xs font-semibold text-black tracking-wider uppercase block mb-6">// SEND MESSAGE</span>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label htmlFor="name" className="text-[11px] font-body text-[#6F6F6F] uppercase tracking-wider font-semibold">Name</label>
                    <input 
                      type="text" 
                      id="name" 
                      name="name" 
                      required 
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="e.g. John Doe"
                      className="w-full bg-gray-50 border border-gray-100 rounded-xl px-4 py-3 text-sm text-black focus:outline-none focus:border-black transition-colors"
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="email" className="text-[11px] font-body text-[#6F6F6F] uppercase tracking-wider font-semibold">Email Address</label>
                    <input 
                      type="email" 
                      id="email" 
                      name="email" 
                      required 
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="e.g. john@example.com"
                      className="w-full bg-gray-50 border border-gray-100 rounded-xl px-4 py-3 text-sm text-black focus:outline-none focus:border-black transition-colors"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label htmlFor="message" className="text-[11px] font-body text-[#6F6F6F] uppercase tracking-wider font-semibold">Message</label>
                  <textarea 
                    id="message" 
                    name="message" 
                    rows={5} 
                    required 
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Describe your project, timeline, or inquiries..."
                    className="w-full bg-gray-50 border border-gray-100 rounded-xl p-4 text-sm text-black focus:outline-none focus:border-black resize-none transition-colors"
                  />
                </div>

                <button 
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full flex justify-center items-center gap-2 rounded-full py-4 text-sm font-body uppercase tracking-wider bg-black text-white hover:bg-gray-800 transition-colors disabled:bg-gray-400"
                >
                  {isSubmitting ? (
                    <span>Sending Transmission...</span>
                  ) : isSent ? (
                    <>
                      <Check className="w-4 h-4" /> Message Transmitted Successfully
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" /> Transmit Message
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>

        </div>

        {/* Footer info */}
        <div className="mt-24 pt-8 border-t border-gray-100 flex flex-col sm:flex-row justify-between items-center text-xs font-body text-[#6F6F6F] gap-4">
          <span>© 2026 Truong Gia Huy. All rights reserved.</span>
          <span>Crafted in Vietnam</span>
        </div>

      </div>
    </section>
  );
};
