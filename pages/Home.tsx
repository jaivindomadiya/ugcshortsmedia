import { Hero } from "../components/Hero";
import { Services } from "../components/Services";
import { Testimonials } from "../components/Testimonials";
import { VideoCarousel } from "../components/VideoCarousel";
import { WhyChooseUs } from "../components/WhyChooseUs";
import { Contact } from "../components/Contact";
import { Stats } from "../components/Stats";
import { ProcessSteps } from "../components/ProcessSteps";
import { FAQ } from "../components/FAQ";
import React from "react";
import { ClientLogos } from "../components/ClientLogos";

const Home: React.FC = () => {
  return (
    <>
      <Hero />
      <Stats />
      <VideoCarousel />
      <ProcessSteps />
      <Services />
      <WhyChooseUs />
      <ClientLogos />
      <Testimonials />
      <FAQ />
      <Contact />
    </>
  );
};

export default Home;
