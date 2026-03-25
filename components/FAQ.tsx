import React, { useState } from "react";
import { Plus, Minus } from "lucide-react";

const FAQS = [
  {
    question: "How quickly can you deliver ad creatives?",
    answer:
      "We deliver your first batch of AI-generated creatives within 24 hours of receiving your brief. Revisions and additional variations are turned around same-day.",
  },
  {
    question: "What types of brands do you work with?",
    answer:
      "We specialize in D2C (direct-to-consumer) brands across categories like beauty, skincare, supplements, fashion, tech accessories, and home goods. If you're running paid ads, we can help.",
  },
  {
    question: "Do I need to provide product footage or photos?",
    answer:
      "Not necessarily. Our AI can generate CGI product visuals from scratch. However, providing your product images or existing footage helps us match your brand identity more precisely.",
  },
  {
    question: "Which ad platforms do you create content for?",
    answer:
      "We create creatives optimized for Meta (Facebook & Instagram), Google, TikTok, YouTube Shorts, and any other digital advertising platform you run.",
  },
  {
    question: "How is AI UGC different from real UGC?",
    answer:
      "AI UGC replicates the authentic, relatable feel of real user-generated content — but at a fraction of the cost and time. It performs comparably or better in most A/B tests because it's optimized for conversion from the start.",
  },
  {
    question: "What does the onboarding process look like?",
    answer:
      "It starts with a free 30-minute strategy call. We learn about your brand, goals, and current ad performance. Then we build a custom creative brief and begin production within 24 hours.",
  },
];

export const FAQ: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="pt-16 md:pt-20 pb-24 md:pb-32 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-start">
          {/* Left sticky heading */}
          <div className="lg:col-span-4 lg:sticky top-32">
            <div className="inline-block relative mb-6">
              <h2 className="text-4xl md:text-5xl font-black tracking-tight text-[#111111] leading-[1.1]">
                Frequently <br />
                <span className="relative z-10">
                  Asked
                  <div className="absolute bottom-2 left-0 w-full h-5 bg-primary -z-10 -rotate-1 opacity-60 rounded-sm" />
                </span>
              </h2>
            </div>
            <p className="text-xl text-subtext font-medium leading-relaxed">
              Everything you need to know before getting started with us.
            </p>
            <div className="w-16 h-2 bg-[#111111] rounded-full mt-8" />
          </div>

          {/* Right accordion */}
          <div className="lg:col-span-8 space-y-4">
            {FAQS.map((faq, i) => (
              <div
                key={i}
                className={`rounded-[1.5rem] border-2 transition-all duration-300 overflow-hidden ${
                  openIndex === i
                    ? "border-[#111111] bg-secondary"
                    : "border-gray-100 bg-white hover:border-gray-200"
                }`}
              >
                <button
                  className="w-full flex items-center justify-between px-8 py-6 text-left gap-4"
                  onClick={() => setOpenIndex(openIndex === i ? null : i)}
                >
                  <span className="text-lg font-bold text-[#111111]">
                    {faq.question}
                  </span>
                  <span className="flex-shrink-0 w-8 h-8 rounded-full bg-white border-2 border-gray-100 flex items-center justify-center text-[#111111]">
                    {openIndex === i ? <Minus size={16} /> : <Plus size={16} />}
                  </span>
                </button>
                {openIndex === i && (
                  <div className="px-8 pb-6">
                    <p className="text-subtext text-lg font-medium leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
