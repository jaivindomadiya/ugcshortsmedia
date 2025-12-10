import React, { useEffect } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { Services } from './components/Services';
import { VideoCarousel } from './components/VideoCarousel';
import { WhyChooseUs } from './components/WhyChooseUs';
import { Brands } from './components/Brands';
import { Testimonials } from './components/Testimonials';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';

const App: React.FC = () => {
  // SEO
  useEffect(() => {
    document.title = "AI UGC & CGI Ads Studio | UGCShortsMedia";
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute("content", "AI-generated UGC ads, CGI product videos and performance marketing for D2C brands. Boost ROAS with AI creatives.");
    }
  }, []);

  return (
    <div className="min-h-screen bg-background selection:bg-primary/30 selection:text-[#111111]">
      <Header />
      <main>
        <Hero />
        <VideoCarousel />
        <Services />
        <WhyChooseUs />
        <Brands />
        <Testimonials />
        <Contact />
      </main>
      <Footer />
    </div>
  );
};

export default App;