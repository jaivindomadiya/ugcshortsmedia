import React, { useState } from "react";
import { Button } from "./Button";
import { ContactFormData } from "../types";
import { Send, CheckCircle } from "lucide-react";
import { db } from "../firebaseConfig";
import { collection, doc, setDoc } from "firebase/firestore";

export const Contact: React.FC = () => {
  const [formData, setFormData] = useState<ContactFormData>({
    name: "",
    email: "",
    brand_name: "",
    ad_spend: "",
    message: "",
  });

  const [status, setStatus] = useState<
    "idle" | "submitting" | "success" | "error"
  >("idle");

  const [errors, setErrors] = useState<
    Partial<Record<keyof ContactFormData, string>>
  >({});

  const validate = () => {
    const newErrors: Partial<Record<keyof ContactFormData, string>> = {};
    if (!formData.name.trim() || formData.name.trim().length < 2)
      newErrors.name = "Full name must be at least 2 characters.";
    if (
      !formData.email.trim() ||
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)
    )
      newErrors.email = "Please enter a valid email address.";
    if (
      !formData.ad_spend.trim() ||
      !/^[\+]?[0-9\s\-]{7,15}$/.test(formData.ad_spend.trim())
    )
      newErrors.ad_spend = "Please enter a valid phone number.";
    if (!formData.brand_name.trim() || formData.brand_name.trim().length < 2)
      newErrors.brand_name = "Brand name must be at least 2 characters.";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validate()) return;
    setStatus("submitting");

    try {
      let userIp = "";
      try {
        const ipResponse = await fetch("https://api.ipify.org?format=json");
        const ipData = await ipResponse.json();
        userIp = ipData?.ip ?? "";
      } catch (_) {}

      // Generate custom document ID with current date and timestamp
      const now = new Date();
      const year = now.getFullYear();
      const month = String(now.getMonth() + 1).padStart(2, "0");
      const day = String(now.getDate()).padStart(2, "0");
      const hours = String(now.getHours()).padStart(2, "0");
      const minutes = String(now.getMinutes()).padStart(2, "0");
      const seconds = String(now.getSeconds()).padStart(2, "0");
      const milliseconds = String(now.getMilliseconds()).padStart(3, "0");

      // Format: YYYYMMDD_HHmmss_milliseconds (e.g., 20260214_163045_123)
      const customDocId = `${year}${month}${day}_${hours}${minutes}${seconds}_${milliseconds}`;

      await setDoc(doc(db, "ugc_contacts", customDocId), {
        name: formData.name,
        email: formData.email,
        brand_name: formData.brand_name,
        ad_spend: formData.ad_spend,
        message: formData.message,
        created_at: now.toISOString(),
        ip: userIp,
      });

      setStatus("success");
      setFormData({
        name: "",
        email: "",
        brand_name: "",
        ad_spend: "",
        message: "",
      });
    } catch (error) {
      console.error("Firebase Submission Error:", error);
      setStatus("error");
    }
  };

  return (
    <section id="contact" className="py-16 sm:py-20 md:py-24 lg:py-32 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#111111] rounded-[2rem] sm:rounded-[3rem] p-6 sm:p-8 md:p-12 lg:p-20">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 lg:gap-24">
            <div className="text-white">
              <div className="inline-block px-4 py-2 border-2 border-white/10 rounded-full text-xs font-bold uppercase mb-8 text-primary bg-white/5 backdrop-blur-sm">
                Start Scaling Today
              </div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-extrabold tracking-tight mb-6 md:mb-8 leading-tight">
                Let's Scale <br />
                <span className="text-primary relative inline-block">
                  Your Brand
                  <svg
                    className="absolute -bottom-2 left-0 w-full h-4 text-white z-[0] opacity-20"
                    viewBox="0 0 200 9"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M2.00025 2.5C45.394 6.27375 107.5 9.00001 198 2.5"
                      stroke="currentColor"
                      stroke-width="5"
                      stroke-linecap="round"
                    ></path>
                  </svg>
                </span>
              </h2>
              {/* <p className=" sm:text-xl text-gray-300 mb-12 leading-relaxed max-w-md "> */}
              <p className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-300 mb-8 md:mb-12 leading-relaxed max-w-md">
                Ready to stop guessing? Fill out the form and our strategists
                will build a custom creative roadmap to 2x your ROAS.
              </p>
              <div className="space-y-6 sm:space-y-8">
                <div className="flex items-start space-x-4 sm:space-x-6 group">
                  <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-xl sm:rounded-2xl bg-white/10 flex items-center justify-center text-primary shadow-inner group-hover:bg-primary group-hover:text-[#111111] transition-colors">
                    <Send size={20} className="sm:w-7 sm:h-7" />
                  </div>

                  <div className="min-w-0">
                    <h4 className="text-base sm:text-lg font-bold mb-1">
                      Email Us
                    </h4>

                    <span className="text-gray-300 font-medium text-sm sm:text-base md:text-lg break-all">
                      contact.ugcshortsmedia@gmail.com
                    </span>
                  </div>
                </div>

                <div className="flex items-start space-x-4 sm:space-x-6 group">
                  <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-xl sm:rounded-2xl bg-white/10 flex items-center justify-center text-primary shadow-inner group-hover:bg-primary group-hover:text-[#111111] transition-colors">
                    <CheckCircle size={20} className="sm:w-7 sm:h-7" />
                  </div>

                  <div className="min-w-0">
                    <h4 className="text-base sm:text-lg font-bold mb-1">
                      Fast Turnaround
                    </h4>

                    <span className="text-gray-300 font-medium text-sm sm:text-base md:text-lg">
                      Response within 24 hours
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Form */}
            <form
              onSubmit={handleSubmit}
              className="bg-white p-8 md:p-12 rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.3)]"
            >
              {status === "success" ? (
                <div className="h-full flex flex-col items-center justify-center text-center py-12 animate-fade-in">
                  <div className="w-24 h-24 bg-green-50 text-green-600 rounded-full flex items-center justify-center mb-8 border-4 border-green-100">
                    <CheckCircle size={48} />
                  </div>
                  <h3 className="text-4xl font-black text-[#111111] mb-4">
                    Thanks!
                  </h3>
                  <p className="text-subtext text-xl max-w-sm mx-auto">
                    Your details are submitted successfully. We will contact you
                    within 24 hours.
                  </p>
                  <Button
                    type="button"
                    variant="secondary"
                    className="mt-10"
                    onClick={() => setStatus("idle")}
                  >
                    Send Another
                  </Button>
                </div>
              ) : (
                <div className="space-y-6">
                  {status === "error" && (
                    <div className="p-3 bg-red-50 text-red-600 text-sm font-bold rounded-lg text-center">
                      Something went wrong. Please try again.
                    </div>
                  )}
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-xs font-extrabold text-[#111111] mb-2 uppercase tracking-widest pl-2"
                    >
                      Full Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className={`w-full px-6 py-4 rounded-2xl bg-secondary border-2 focus:bg-white outline-none transition-all text-[#111111] font-bold placeholder-gray-400 text-lg ${
                        errors.name
                          ? "border-red-400 bg-red-50"
                          : "border-transparent focus:border-[#111111]"
                      }`}
                      placeholder="John Doe"
                    />
                    {errors.name && (
                      <p className="text-red-500 text-xs font-bold mt-1 pl-2">
                        {errors.name}
                      </p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="email"
                      className="block text-xs font-extrabold text-[#111111] mb-2 uppercase tracking-widest pl-2"
                    >
                      Work Email <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className={`w-full px-6 py-4 rounded-2xl bg-secondary border-2 focus:bg-white outline-none transition-all text-[#111111] font-bold placeholder-gray-400 text-lg ${
                        errors.email
                          ? "border-red-400 bg-red-50"
                          : "border-transparent focus:border-[#111111]"
                      }`}
                      placeholder="john@company.com"
                    />
                    {errors.email && (
                      <p className="text-red-500 text-xs font-bold mt-1 pl-2">
                        {errors.email}
                      </p>
                    )}
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label
                        htmlFor="ad_spend"
                        className="block text-xs font-extrabold text-[#111111] mb-2 uppercase tracking-widest pl-2"
                      >
                        Mobile No. <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        id="ad_spend"
                        name="ad_spend"
                        value={formData.ad_spend}
                        onChange={handleChange}
                        className={`w-full px-6 py-4 rounded-2xl bg-secondary border-2 focus:bg-white outline-none transition-all text-[#111111] font-bold placeholder-gray-400 text-lg ${
                          errors.ad_spend
                            ? "border-red-400 bg-red-50"
                            : "border-transparent focus:border-[#111111]"
                        }`}
                        placeholder="+91 7383252829"
                      />
                      {errors.ad_spend && (
                        <p className="text-red-500 text-xs font-bold mt-1 pl-2">
                          {errors.ad_spend}
                        </p>
                      )}
                    </div>
                    <div>
                      <label
                        htmlFor="brand_name"
                        className="block text-xs font-extrabold text-[#111111] mb-2 uppercase tracking-widest pl-2"
                      >
                        Brand Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        id="brand_name"
                        name="brand_name"
                        value={formData.brand_name}
                        onChange={handleChange}
                        className={`w-full px-6 py-4 rounded-2xl bg-secondary border-2 focus:bg-white outline-none transition-all text-[#111111] font-bold placeholder-gray-400 text-lg ${
                          errors.brand_name
                            ? "border-red-400 bg-red-50"
                            : "border-transparent focus:border-[#111111]"
                        }`}
                        placeholder="My Brand"
                      />
                      {errors.brand_name && (
                        <p className="text-red-500 text-xs font-bold mt-1 pl-2">
                          {errors.brand_name}
                        </p>
                      )}
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="message"
                      className="block text-xs font-extrabold text-[#111111] mb-2 uppercase tracking-widest pl-2"
                    >
                      Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={4}
                      value={formData.message}
                      onChange={handleChange}
                      className="w-full px-6 py-4 rounded-2xl bg-secondary border-2 border-transparent focus:border-[#111111] focus:bg-white outline-none transition-all resize-none text-[#111111] font-medium placeholder-gray-400 text-lg"
                      placeholder="Tell us about your goals..."
                    />
                  </div>

                  <Button
                    type="submit"
                    fullWidth
                    size="lg"
                    disabled={status === "submitting"}
                    className="mt-6 text-xl"
                  >
                    {status === "submitting"
                      ? "Sending..."
                      : "Start Working With Us"}
                  </Button>

                  <p className="text-center text-xs text-gray-400 mt-6 font-bold tracking-wide">
                    100% Free Consultation. No strings attached.
                  </p>
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};
