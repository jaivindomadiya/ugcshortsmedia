// import React, { useEffect } from "react";
// import { Header } from "./components/Common/Header";
// import { Hero } from "./components/Hero";
// // import { Services } from "./pages/Services";
// import { VideoCarousel } from "./components/VideoCarousel";
// import { WhyChooseUs } from "./components/WhyChooseUs";
// import { Brands } from "./components/Brands";
// // import { Testimonials } from "./components/Testimonials";
// // import { Contact } from "./components/Contact";
// import { Footer } from "./components/Common/Footer";
// // import { DataImporter } from './components/DataImporter';
// import { Routes, Route, BrowserRouter } from "react-router-dom";
// // import Home from "./pages/home/Home";
// import Testimonials from "./pages/Testimonials";
// import Home from "./pages/Home";
// import Services from "./pages/Services";
// import About from "./pages/About";
// import Contact from "./pages/Contact";
// import OurWork from "./pages/OurWork";

// const App: React.FC = () => {
//   // SEO
//   useEffect(() => {
//     document.title = "AI UGC & CGI Ads Studio | UGCShortsMedia";
//     const metaDesc = document.querySelector('meta[name="description"]');
//     if (metaDesc) {
//       metaDesc.setAttribute(
//         "content",
//         "AI-generated UGC ads, CGI product videos and performance marketing for D2C brands. Boost ROAS with AI creatives.",
//       );
//     }
//   }, []);

//   return (
//     <div className="min-h-screen bg-background selection:bg-primary/30 selection:text-[#111111]">
//       <Header />
//       <main>
//         <BrowserRouter>
//           <Routes>
//             <Route path="/" element={<Home />} />
//             <Route path="/services" element={<Services />} />
//             <Route path="/testimonials" element={<Testimonials />} />
//             <Route path="/contact" element={<Contact />} />
//             <Route path="/about" element={<About />} />
//             <Route path="/our-work" element={<OurWork />} />
//           </Routes>
//         </BrowserRouter>
//       </main>
//       <Footer />
//     </div>
//   );
// };

// export default App;
import React, { useEffect } from "react";
import { Header } from "./components/Common/Header";
import { Footer } from "./components/Common/Footer";
import { Routes, Route, BrowserRouter } from "react-router-dom";

import Testimonials from "./pages/Testimonials";
import Home from "./pages/Home";
import Services from "./pages/Services";
import About from "./pages/About";
import Contact from "./pages/Contact";
import OurWork from "./pages/OurWork";

const App: React.FC = () => {
  useEffect(() => {
    document.title = "AI UGC & CGI Ads Studio | UGCShortsMedia";
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute(
        "content",
        "AI-generated UGC ads, CGI product videos and performance marketing for D2C brands. Boost ROAS with AI creatives."
      );
    }
  }, []);

  return (
    <BrowserRouter>
      <div className="min-h-screen bg-background selection:bg-primary/30 selection:text-[#111111]">
        <Header />

        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/services" element={<Services />} />
            <Route path="/testimonials" element={<Testimonials />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/about" element={<About />} />
            <Route path="/our-work" element={<OurWork />} />
          </Routes>
        </main>

        <Footer />
      </div>
    </BrowserRouter>
  );
};

export default App;