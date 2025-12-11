import React, { useState, useEffect } from 'react';
import { Button } from './Button';
import { Menu, X } from 'lucide-react';

export const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setMobileMenuOpen(false);
    }
  };

  const navLinks = [
    { name: 'Services', id: 'services' },
    { name: 'Our Work', id: 'our-work' },
    { name: 'Testimonials', id: 'testimonials' },
    { name: 'Contact', id: 'contact' },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled || mobileMenuOpen
          ? 'bg-white/95 backdrop-blur-md border-b border-gray-100 py-3 shadow-sm'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex-shrink-0 cursor-pointer group" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            <span className={`text-2xl font-black tracking-tighter text-[#111111] transition-colors duration-300`}>
              UGCShorts<span className="text-primary inline-block group-hover:-translate-y-1 transition-transform duration-200">Media</span>
              <span className="text-primary"></span>
            </span>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-10">
            {navLinks.map((link) => (
              <button
                key={link.name}
                onClick={() => scrollToSection(link.id)}
                className="text-sm font-bold transition-colors uppercase tracking-wide text-[#111111]/80 hover:text-primary"
              >
                {link.name}
              </button>
            ))}
            <Button size="sm" onClick={() => scrollToSection('contact')}>
              Book Strategy Call
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-[#111111] hover:text-primary focus:outline-none transition-colors"
            >
              {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white fixed inset-0 z-50 pt-24 px-6 animate-fade-in">
          <button 
             onClick={() => setMobileMenuOpen(false)}
             className="absolute top-6 right-6 text-[#111111]"
          >
            <X size={28} />
          </button>
          
          <div className="flex flex-col space-y-8 text-center">
            {navLinks.map((link) => (
              <button
                key={link.name}
                onClick={() => scrollToSection(link.id)}
                className="text-3xl font-black text-[#111111] hover:text-primary"
              >
                {link.name}
              </button>
            ))}
            <div className="pt-8">
              <Button size="lg" fullWidth onClick={() => scrollToSection('contact')}>
                Book Strategy Call
              </Button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};