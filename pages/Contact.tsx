import React from "react";
import { Banner } from "../components/Banner";
import { Contact as ContactSection } from "../components/Contact";

const Contact: React.FC = () => {
  return (
    <>
      <Banner
        title="Get in Touch With Us"
        subtitle="Reach out today to discuss your brand's growth. Our strategists will craft a personalized creative roadmap to maximize your ROI."
      />
      <ContactSection />
    </>
  );
};

export default Contact;
