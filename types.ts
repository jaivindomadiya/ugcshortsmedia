import { LucideIcon } from 'lucide-react';

export interface Service {
  id: string;
  title: string;
  description: string;
  icon: LucideIcon;
}

export interface Testimonial {
  id: string;
  name: string;
  brand: string;
  quote: string;
  rating: number;
}

export interface DemoVideo {
  id: string;
  title: string;
  category: string;
  // thumbnailUrl removed as per database update
  videoUrl: string; // This stores the URL to the video file in Supabase Storage
}

export interface Benefit {
  id: string;
  title: string;
  description: string;
  icon: LucideIcon;
}

export interface ContactFormData {
  name: string;
  email: string;
  brand_name: string;
  ad_spend: string;
  message: string;
}