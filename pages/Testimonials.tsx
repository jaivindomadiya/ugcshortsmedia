import React from "react";
import { Banner } from "../components/Banner";
import { Stats } from "../components/Stats";
import { Testimonials as TestimonialsSection } from "../components/Testimonials";
import { ClientLogos } from "../components/ClientLogos";
import { Contact } from "../components/Contact";

const Testimonials: React.FC = () => {
  return (
    <>
      <Banner
        title="What Our Clients Say"
        subtitle="Hear from the brands we've helped scale with AI-driven UGC, CGI product videos, and high-ROI marketing campaigns."
      />
      <Stats />
      <ClientLogos />
      <TestimonialsSection />
      <Contact />
    </>
  );
};

export default Testimonials;
