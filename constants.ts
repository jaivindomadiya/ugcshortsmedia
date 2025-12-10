import { 
  Video, 
  Box, 
  Camera, 
  Target, 
  Search, 
  TrendingUp, 
  Zap, 
  DollarSign, 
  BarChart, 
  Clock,
  Layers
} from 'lucide-react';
import { Service, Testimonial, DemoVideo, Benefit } from './types';

export const APP_NAME = "UGCShortsMedia";

export const BRAND_LOGOS = [
  "Acme Co", "Nebula", "Vertex", "Oasis", "Pinnacle", "Zenith"
];

export const SERVICES: Service[] = [
  {
    id: 's1',
    title: 'AI UGC Videos',
    description: 'High-converting user-generated content ads created with AI for authenticity at scale.',
    icon: Video,
  },
  {
    id: 's2',
    title: 'AI CGI Product Ads',
    description: 'Hyper-realistic 3D product animations that stop the scroll and drive desire.',
    icon: Box,
  },
  {
    id: 's3',
    title: 'AI Product Photos',
    description: 'Studio-quality product photography generated instantly in any environment.',
    icon: Camera,
  },
  {
    id: 's4',
    title: 'Meta/Facebook Ads',
    description: 'Full-funnel paid social campaigns optimized for ROAS and scale.',
    icon: Target,
  },
  {
    id: 's5',
    title: 'Google Ads',
    description: 'Capture high-intent traffic with precision search and shopping campaigns.',
    icon: Search,
  },
  {
    id: 's6',
    title: 'Creative Strategy',
    description: 'Data-backed creative direction and conversion rate optimization (CRO).',
    icon: TrendingUp,
  },
   {
    id: 's7',
    title: 'Website Developement',
    description: 'SEO Optimized Fullstack Web Application Developement.',
    icon: Box,
  },
    {
    id: 's8',
    title: 'AI Agent Developement',
    description: 'Automate Your Repetative Task and Increase Your Productivity and Save your time using AI Automation',
    icon: TrendingUp,
  },

];

export const BENEFITS: Benefit[] = [
  {
    id: 'b1',
    title: 'Faster Delivery with AI',
    description: 'Get creatives in 24 hours, not weeks. Our AI engine speeds up production by 10x.',
    icon: Zap,
  },
  {
    id: 'b2',
    title: 'Lower Cost per Ad',
    description: 'Reduce production costs significantly while maintaining agency-level quality.',
    icon: DollarSign,
  },
  {
    id: 'b3',
    title: 'Higher ROAS',
    description: 'Creatives designed specifically to convert, backed by millions in ad spend data.',
    icon: BarChart,
  },
  {
    id: 'b4',
    title: 'Scalable Production',
    description: 'Need 50 variations for testing? We scale with your growth needs seamlessly.',
    icon: Layers,
  },
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: 't1',
    name: 'Sarah Jenkins',
    brand: 'Glow Cosmetics',
    rating: 5,
    quote: "The AI CGI videos completely transformed our launch. CPA dropped by 40% in the first week. Incredible work.",
  },
  {
    id: 't2',
    name: 'Marcus Thorne',
    brand: 'FitLife Gear',
    rating: 5,
    quote: "UGCShortsMedia delivers speed and quality I haven't seen elsewhere. The daily delivery model is a game changer for testing.",
  },
  {
    id: 't3',
    name: 'Elena Rodriguez',
    brand: 'Pure Home',
    rating: 5,
    quote: "Their creative strategy is spot on. They didn't just make ads; they understood our customer psychology perfectly.",
  },
];

// Using placeholder videos from reliable generic sources or styled placeholders
export const DEMO_VIDEOS: DemoVideo[] = [
  {
    id: 'v1',
    title: 'Skincare Routine',
    category: 'UGC',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4', 
  },
  {
    id: 'v2',
    title: 'Tech Unboxing',
    category: 'Product Ad',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
  },
  {
    id: 'v3',
    title: 'Sneaker CGI Reveal',
    category: 'CGI',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4',
  },
  {
    id: 'v4',
    title: 'Supplement Testimonial',
    category: 'UGC',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4',
  },
  {
    id: 'v5',
    title: 'Beverage Splash',
    category: 'CGI',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4',
  },
];