import React from "react";
import { Banner } from "../components/Banner";
import { Stats } from "../components/Stats";
import { WhyChooseUs } from "../components/WhyChooseUs";
import { ProcessSteps } from "../components/ProcessSteps";
import { FAQ } from "../components/FAQ";
import { Contact } from "../components/Contact";

const About: React.FC = () => {
  return (
    <>
      <Banner
        title="About UGCShorts Media"
        subtitle="We are a creative studio specializing in AI-generated UGC and CGI product videos. Our mission is to help brands scale faster with high-performing content."
      />
      <Stats />
      <WhyChooseUs />
      <ProcessSteps />
      <FAQ />
      <Contact />
    </>
  );
};

export default About;
