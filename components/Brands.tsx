import React, { useEffect, useState } from "react";
import { db } from "../firebaseConfig";
import { collection, getDocs, orderBy, query } from "firebase/firestore";

export const Brands: React.FC = () => {
  const [brands, setBrands] = useState<string[]>([]);

  useEffect(() => {
    const fetchBrands = async () => {
      try {
        const q = query(collection(db, "ugc_brands"), orderBy("id", "asc"));
        const querySnapshot = await getDocs(q);

        if (!querySnapshot.empty) {
          setBrands(querySnapshot.docs.map((doc) => doc.data().name));
        }
      } catch (e) {
        console.warn("Error fetching brands", e);
      }
    };
    fetchBrands();
  }, []);

  if (brands.length === 0) return null;

  let baseList = [...brands];
  while (baseList.length < 15) {
    baseList = [...baseList, ...brands];
  }

  const marqueeLogos = [...baseList, ...baseList];

  return (
    <section className="py-16 bg-white border-t border-gray-100 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 mb-12">
        <div className="text-center">
          <h2 className="text-2xl md:text-3xl font-black tracking-tight text-[#111111] mb-4">
            Brands We Help Grow Faster
          </h2>
          <div className="w-16 h-1 bg-primary mx-auto rounded-full"></div>
        </div>
      </div>

      <div className="relative w-full overflow-hidden group">
        <div className="absolute top-0 left-0 w-24 md:w-48 h-full bg-gradient-to-r from-white to-transparent z-10 pointer-events-none"></div>
        <div className="absolute top-0 right-0 w-24 md:w-48 h-full bg-gradient-to-l from-white to-transparent z-10 pointer-events-none"></div>

        <div className="flex animate-marquee group-hover:[animation-play-state:paused] whitespace-nowrap items-center">
          {marqueeLogos.map((logoUrl, idx) => (
            <div
              key={`${idx}-${logoUrl}`}
              className="inline-block px-8 md:px-12 py-4"
            >
              <img
                src={logoUrl}
                alt="Brand Partner"
                className="h-10 md:h-20 w-auto max-w-[260px] object-contain cursor-pointer select-none"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
