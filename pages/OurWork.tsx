import React from "react";
import { Banner } from "../components/Banner";
import { VideoCarousel } from "../components/VideoCarousel";
import { Contact } from "../components/Contact";

const OurWork: React.FC = () => {
  return (
    <>
      <Banner
        title="Our Creative Portfolio"
        subtitle="Take a look at our past campaigns and see how we've helped brands grow with AI-powered UGC and CGI content."
      />
      <VideoCarousel />
      <Contact />
    </>
  );
};

export default OurWork;
