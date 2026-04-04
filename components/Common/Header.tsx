// import React, { useState, useEffect } from "react";
// import { Button } from "../Button";
// import { Menu, X } from "lucide-react";


// export const Header: React.FC = () => {
//   const [isScrolled, setIsScrolled] = useState(false);
//   const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

//   useEffect(() => {
//     const handleScroll = () => {
//       setIsScrolled(window.scrollY > 20);
//     };
//     window.addEventListener("scroll", handleScroll);
//     return () => window.removeEventListener("scroll", handleScroll);
//   }, []);

//   const scrollToSection = (id: string) => {
//     const element = document.getElementById(id);
//     if (element) {
//       element.scrollIntoView({ behavior: "smooth" });
//       setMobileMenuOpen(false);
//     }
//   };

//   // const navLinks = [
//   //   { name: "Services", id: "services" },
//   //   { name: "Our Work", id: "our-work" },
//   //   { name: "Testimonials", id: "testimonials" },
//   //   { name: "Contact", id: "contact" },
//   // ];
//   // Nav Links with route paths
//   const navLinks = [
//     // { name: "Home", path: "/" },
//     { name: "About", path: "/about" },
//     { name: "Services", path: "/services" },
//     { name: "Our Work", path: "/our-work" },
//     { name: "Testimonials", path: "/testimonials" },
//     { name: "Contact", path: "/contact" },
//   ];

//   return (
//     <nav
//       className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
//         isScrolled || mobileMenuOpen
//           ? "bg-white/95 backdrop-blur-md border-b border-gray-100 py-3 shadow-sm"
//           : "bg-transparent py-5"
//       }`}
//     >
//       <div className="max-w-7xl mx-auto px-6 lg:px-8">
//         <div className="flex items-center justify-between">
//           {/* Logo */}
//           <div className="flex-shrink-0 cursor-pointer group">
//             <a href="/">
//               <span
//                 className={`text-2xl font-black tracking-tighter text-[#111111] transition-colors duration-300`}
//               >
//                 UGCShorts
//                 <span className="text-primary inline-block">Media</span>
//                 {/* <span className="text-primary"></span> */}
//               </span>
//             </a>
//           </div>

//           {/* Desktop Nav */}
//           <div className="hidden md:flex items-center space-x-10">
//             {navLinks.map((link) => (
//               <a
//                 key={link.name}
//                 href={link.path}
//                 className={`text-sm font-bold uppercase tracking-wide transition-colors ${
//                   location.pathname === link.path
//                     ? "text-primary"
//                     : "text-[#111111]/80 hover:text-primary"
//                 }`}
//               >
//                 {link.name}
//               </a>
//             ))}
//             <Button size="sm">Book Strategy Call</Button>
//           </div>

//           {/* Mobile Menu Button */}
//           <div className="md:hidden">
//             <button
//               onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
//               className="text-[#111111] hover:text-primary focus:outline-none transition-colors"
//             >
//               {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
//             </button>
//           </div>
//         </div>
//       </div>

//       {/* Mobile Menu */}
//       {mobileMenuOpen && (
//         <div className="md:hidden bg-white fixed inset-0 z-50 pt-24 animate-fade-in">
//           <button
//             onClick={() => setMobileMenuOpen(false)}
//             className="absolute top-6 right-6 text-[#111111]"
//           >
//             <X size={28} />
//           </button>

//           <div className="bg-white pb-2">
//             <div className="flex flex-col space-y-8 text-center px-4">
//               {navLinks.map((link) => (
//                 <a
//                   key={link.name}
//                   href={link.path}
//                   className={`text-3xl font-black text-[#111111] hover:text-primary ${
//                     location.pathname === link.path
//                       ? "text-primary"
//                       : "text-[#111111]/80 hover:text-primary"
//                   }`}
//                 >
//                   {link.name}
//                 </a>
//               ))}

//               <div>
//                 <Button size="lg" fullWidth>
//                   Book Strategy Call
//                 </Button>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}
//     </nav>
//   );
// };
import React, { useState, useEffect } from "react";
import { Button } from "../Button";
import { Menu, X } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

export const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "About", path: "/about" },
    { name: "Services", path: "/services" },
    { name: "Our Work", path: "/our-work" },
    { name: "Testimonials", path: "/testimonials" },
    { name: "Contact", path: "/contact" },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled || mobileMenuOpen
          ? "bg-white/95 backdrop-blur-md border-b border-gray-100 py-3 shadow-sm"
          : "bg-transparent py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between">

          {/* Logo */}
          <div className="flex-shrink-0 cursor-pointer group">
            <Link to="/">
              <span className="text-2xl font-black tracking-tighter text-[#111111]">
                UGCShorts
                <span className="text-primary inline-block">Media</span>
              </span>
            </Link>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-10">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={`text-sm font-bold uppercase tracking-wide transition-colors ${
                  location.pathname === link.path
                    ? "text-primary"
                    : "text-[#111111]/80 hover:text-primary"
                }`}
              >
                {link.name}
              </Link>
            ))}
            <Button size="sm">Book Strategy Call</Button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-[#111111] hover:text-primary transition-colors"
            >
              {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white fixed inset-0 z-50 pt-24">
          <button
            onClick={() => setMobileMenuOpen(false)}
            className="absolute top-6 right-6 text-[#111111]"
          >
            <X size={28} />
          </button>

          <div className="flex flex-col space-y-8 text-center px-4">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                onClick={() => setMobileMenuOpen(false)}
                className={`text-3xl font-black ${
                  location.pathname === link.path
                    ? "text-primary"
                    : "text-[#111111]/80 hover:text-primary"
                }`}
              >
                {link.name}
              </Link>
            ))}

            <Button size="lg" fullWidth>
              Book Strategy Call
            </Button>
          </div>
        </div>
      )}
    </nav>
  );
};