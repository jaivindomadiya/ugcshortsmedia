import { Services as ServicesSection } from "../components/Services";
import React from "react";
import { Banner } from "../components/Banner";
import { ProcessSteps } from "../components/ProcessSteps";
import { FAQ } from "../components/FAQ";
import { Contact } from "../components/Contact";

const Services: React.FC = () => {
  return (
    <>
      <Banner
        title="Our Premium Services"
        subtitle="AI-generated UGC, CGI product videos & performance marketing to scale your D2C brand."
      />
      <ServicesSection showFullDetails />
      <ProcessSteps />
      <FAQ />
      <Contact />
    </>
  );
};

export default Services;
