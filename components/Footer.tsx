import React from 'react';
import { APP_NAME } from '../constants';
import { Instagram, Youtube, Linkedin, Facebook } from 'lucide-react';

export const Footer: React.FC = () => {
  const socialLinks = [
    { icon: Instagram, href: "https://www.instagram.com/ugc_shorts/" },
    { icon: Youtube, href: "https://www.youtube.com/@ugcshortsmedia" },
    { icon: Linkedin, href: "https://www.linkedin.com/company/ugcshortsmedia/?lipi=urn%3Ali%3Apage%3Ad_flagship3_search_srp_all%3BdZ7wh%2FthRnqEKvtAy2C99w%3D%3D" },
    { icon: Facebook, href: "https://www.facebook.com/profile.php?id=61584881488185" }
  ];

  return (
    <footer className="bg-white border-t border-gray-100 pt-24 pb-12">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-20">
          <div className="col-span-1 md:col-span-2">
            <span className="text-3xl font-black tracking-tighter text-[#111111] block mb-6 font-heading">
              UGCShorts<span className="text-primary">Media</span>.
            </span>
            <p className="text-subtext max-w-sm text-lg font-medium font-body leading-relaxed mb-10">
              AI-driven performance creatives that help D2C brands scale profitably. We blend data with design.
            </p>
            
            <div>
                <h5 className="font-extrabold text-[#111111] mb-4 uppercase tracking-widest text-xs font-heading">Our Locations</h5>
                <div className="flex flex-col sm:flex-row gap-x-12 gap-y-4 text-subtext font-medium font-body text-sm">
                    <div className="max-w-[200px]">
                        <p className="leading-relaxed">Vastrapur, Ahmedabad,<br/>Gujarat 380015, India</p>
                    </div>
                    <div className="max-w-[200px]">
                        <p className="leading-relaxed">Vadal, Junagadh,<br/>Gujarat 362310, India</p>
                    </div>
                </div>
            </div>
          </div>
          
          <div>
            <h4 className="font-extrabold text-[#111111] mb-8 uppercase tracking-widest text-xs font-heading">Services</h4>
            <ul className="space-y-4 text-subtext font-bold font-heading">
              <li><a href="#" className="hover:text-[#111111] hover:text-primary transition-colors">AI UGC Videos</a></li>
              <li><a href="#" className="hover:text-[#111111] hover:text-primary transition-colors">CGI Product Ads</a></li>
              <li><a href="#" className="hover:text-[#111111] hover:text-primary transition-colors">Paid Social</a></li>
              <li><a href="#" className="hover:text-[#111111] hover:text-primary transition-colors">Creative Strategy</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-extrabold text-[#111111] mb-8 uppercase tracking-widest text-xs font-heading">Company</h4>
            <ul className="space-y-4 text-subtext font-bold font-heading">
              <li><a href="#" className="hover:text-[#111111] hover:text-primary transition-colors">About</a></li>
              <li><a href="#" className="hover:text-[#111111] hover:text-primary transition-colors">Careers</a></li>
              <li><a href="#" className="hover:text-[#111111] hover:text-primary transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-[#111111] hover:text-primary transition-colors">Terms of Service</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-100 pt-10 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-gray-400 font-bold font-heading">
            &copy; {new Date().getFullYear()} {APP_NAME}. All rights reserved.
          </p>
          <div className="flex space-x-4 mt-6 md:mt-0">
            {socialLinks.map((social, index) => (
              <a 
                key={index}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-secondary rounded-full flex items-center justify-center hover:bg-primary hover:text-[#111111] transition-all cursor-pointer text-[#111111] hover:-translate-y-1"
              >
                 <social.icon size={20} />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};