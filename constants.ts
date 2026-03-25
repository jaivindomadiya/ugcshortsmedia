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
  Layers,
  Megaphone,
  Lightbulb,
  Bot,
} from "lucide-react";
import { Service, Testimonial, DemoVideo, Benefit } from "./types";

export const APP_NAME = "UGCShortsMedia";

export const BRAND_LOGOS = [
  "Acme Co",
  "Nebula",
  "Vertex",
  "Oasis",
  "Pinnacle",
  "Zenith",
];

export const SERVICES: Service[] = [
  {
    id: "s1",
    title: "AI Content Creation for Digital Advertising",
    subtitle: "Scalable AI-Driven Marketing Content for High-Performing Ads",
    description: [
      "Create high-performing marketing content using advanced AI technology",
      "Produce ad creatives optimized for Facebook, Google, and digital advertising platforms",
      "Generate scalable content for ads, social media, and marketing campaigns",
      "Maintain consistent brand visuals across all marketing channels",
      "Reduce production costs while increasing creative output",
    ],
    icon: Video,
  },
  {
    id: "s2",
    title: "AI UGC Video Ads",
    subtitle: "Authentic AI-Generated UGC Ads Designed to Increase Conversions",
    description: [
      "AI-generated user-generated style video ads for social media",
      "Authentic product reviews, testimonials, and lifestyle content",
      "Optimized for Facebook, Instagram, YouTube, and short-form platforms",
      "Build trust and engagement through relatable video storytelling",
      "Increase click-through rates and conversion performance",
    ],
    icon: Video,
  },
  {
    id: "s3",
    title: "AI CGI Product Ads",
    subtitle: "Scroll-Stopping 3D Product Advertisements for Modern Brands",
    description: [
      "Hyper-realistic 3D CGI product animations and visual effects",
      "Cinematic product showcases designed to capture attention instantly",
      "Ideal for social media advertising and product launches",
      "Highlight product features with visually engaging storytelling",
      "Create unique advertising visuals that stand out in crowded feeds",
    ],
    icon: Box,
  },
  {
    id: "s4",
    title: "AI Product Photography",
    subtitle: "Studio-Quality AI Product Images for Ads, Websites & E-commerce",
    description: [
      "Generate professional product images using AI technology",
      "Create studio-quality visuals without expensive photoshoots",
      "Place products in multiple environments and lifestyle scenes",
      "Perfect for advertising campaigns, websites, and marketplaces",
      "Produce unlimited product visuals quickly and cost-effectively",
    ],
    icon: Camera,
  },
  {
    id: "s5",
    title: "Meta (Facebook & Instagram) Ads Management",
    subtitle: "Performance-Driven Social Media Advertising for Scalable Growth",
    description: [
      "Full-funnel Facebook and Instagram advertising strategy",
      "Advanced audience targeting and campaign optimization",
      "Creative testing to identify winning ad creatives",
      "Retargeting campaigns to convert interested visitors",
      "Maximize return on ad spend (ROAS) and campaign performance",
    ],
    icon: Megaphone,
  },
  {
    id: "s6",
    title: "Google Ads Management",
    subtitle: "Capture High-Intent Customers with Strategic Google Advertising",
    description: [
      "Google Search campaigns targeting high-intent keywords",
      "Google Shopping campaigns for e-commerce businesses",
      "Performance Max campaigns for multi-channel advertising",
      "Keyword research and campaign structure optimization",
      "Continuous monitoring and performance improvement",
    ],
    icon: Search,
  },
  {
    id: "s7",
    title: "Creative Strategy & Conversion Optimization",
    subtitle: "Data-Driven Creative Direction to Improve Marketing Results",
    description: [
      "Develop high-converting advertising concepts and messaging",
      "Identify effective hooks, headlines, and ad structures",
      "Optimize landing pages to increase conversion rates",
      "Conduct A/B testing to improve campaign performance",
      "Analyze marketing data to refine advertising strategies",
    ],
    icon: Lightbulb,
  },
  {
    id: "s8",
    title: "AI Agent Development & Marketing Automation",
    subtitle: "Intelligent AI Systems to Automate Business Operations",
    description: [
      "Build custom AI agents to automate repetitive business tasks",
      "Automate lead qualification and customer interactions",
      "Improve productivity through workflow automation",
      "Integrate AI systems with marketing and operational processes",
      "Reduce manual work while increasing business efficiency",
    ],
    icon: Bot,
  },
];

export const BENEFITS: Benefit[] = [
  {
    id: "b1",
    title: "Faster Delivery with AI",
    description:
      "Get creatives in 24 hours, not weeks. Our AI engine speeds up production by 10x.",
    icon: Zap,
  },
  {
    id: "b2",
    title: "Lower Cost per Ad",
    description:
      "Reduce production costs significantly while maintaining agency-level quality.",
    icon: DollarSign,
  },
  {
    id: "b3",
    title: "Higher ROAS",
    description:
      "Creatives designed specifically to convert, backed by millions in ad spend data.",
    icon: BarChart,
  },
  {
    id: "b4",
    title: "Scalable Production",
    description:
      "Need 50 variations for testing? We scale with your growth needs seamlessly.",
    icon: Layers,
  },
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: "t1",
    name: "Sarah Jenkins",
    brand: "Glow Cosmetics",
    rating: 5,
    quote:
      "The AI CGI videos completely transformed our launch. CPA dropped by 40% in the first week. Incredible work.",
  },
  {
    id: "t2",
    name: "Marcus Thorne",
    brand: "FitLife Gear",
    rating: 5,
    quote:
      "UGCShortsMedia delivers speed and quality I haven't seen elsewhere. The daily delivery model is a game changer for testing.",
  },
  {
    id: "t3",
    name: "Elena Rodriguez",
    brand: "Pure Home",
    rating: 5,
    quote:
      "Their creative strategy is spot on. They didn't just make ads; they understood our customer psychology perfectly.",
  },
];

// Using placeholder videos from reliable generic sources or styled placeholders
export const DEMO_VIDEOS: DemoVideo[] = [
  {
    id: "v1",
    title: "Skincare Routine",
    category: "UGC",
    videoUrl:
      "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
  },
  {
    id: "v2",
    title: "Tech Unboxing",
    category: "Product Ad",
    videoUrl:
      "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4",
  },
  {
    id: "v3",
    title: "Sneaker CGI Reveal",
    category: "CGI",
    videoUrl:
      "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4",
  },
  {
    id: "v4",
    title: "Supplement Testimonial",
    category: "UGC",
    videoUrl:
      "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4",
  },
  {
    id: "v5",
    title: "Beverage Splash",
    category: "CGI",
    videoUrl:
      "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4",
  },
];
