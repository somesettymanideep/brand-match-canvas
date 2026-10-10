import heroSlider1 from "@/assets/hero-slider-1.jpg";
import heroSlider2 from "@/assets/hero-slider-2.jpg";
import heroSlider3 from "@/assets/hero-slider-3.jpg";
import p1 from "@/assets/p1.jpg";
import p2 from "@/assets/p2.jpg";
import p3 from "@/assets/p3.jpg";
import p4 from "@/assets/p4.jpg";
import p5 from "@/assets/p5.jpg";
import p6 from "@/assets/p6.jpg";

export const NAV = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "vastu", label: "Vastu Shastra" },
  { id: "projects", label: "Projects" },
  { id: "services", label: "Services" },
  { id: "testimonials", label: "Testimonials" },
  { id: "contact", label: "Contact" },
];

export const SLIDES = [
  {
    img: heroSlider1,
    title: "Spaces Designed to Inspire.",
    text: "Architecture shaped by creativity, precision, and purposeful structural innovation.",
    cta: "Explore Our Projects",
    href: "#projects",
    alt: "Sculptural multi-story architectural landmark with dynamic curved balconies at dusk",
  },
  {
    img: heroSlider2,
    title: "Grand Entrances. Lasting Impressions.",
    text: "Master-planned residential communities, monumental portals, and integrated landscape environments.",
    cta: "Discover Our Approach",
    href: "#about",
    alt: "Vedanta by Gayatri Developers grand entrance archway and landscaped boulevard at sunset",
  },
  {
    img: heroSlider3,
    title: "Architecture in Harmony with Nature.",
    text: "Creating meaningful connections between people, buildings, and their surroundings.",
    cta: "Start Your Project",
    href: "#contact",
    alt: "Contemporary parametric tower reflecting natural light and urban vitality",
  },
];

export const PROJECTS = [
  {
    img: p1,
    title: "Modern Residence",
    cat: "Architecture",
    loc: "Vijayawada",
    concept: "Pure white volumes softened by timber screens that filter light and frame privacy.",
  },
  {
    img: p2,
    title: "Luxury Sky Penthouse",
    cat: "Interior Design",
    loc: "Hyderabad",
    concept: "A layered composition of veined stone, brass and soft curves above the city.",
  },
  {
    img: p3,
    title: "Modern Horizon Villa",
    cat: "Architecture",
    loc: "Bengaluru",
    concept: "A low horizontal pavilion that dissolves into the horizon through an infinity edge.",
  },
  {
    img: p4,
    title: "Landscape & Outdoor Living",
    cat: "Landscape",
    loc: "Amaravati",
    concept: "Native planting, stepping stones and a timber pergola for unhurried outdoor life.",
  },
  {
    img: p5,
    title: "Commercial Landmark",
    cat: "Commercial",
    loc: "Visakhapatnam",
    concept: "A rhythmic façade of vertical fins balancing daylight, shade and identity.",
  },
  {
    img: p6,
    title: "Bespoke Residence Interiors",
    cat: "Interior Design",
    loc: "Guntur",
    concept: "Custom joinery and warm, concealed lighting crafting a quiet retreat.",
  },
];

export const SERVICES = [
  { n: "01", title: "Architectural Design", text: "Concept development, site planning, space planning, building design, and architectural documentation.", img: p1 },
  { n: "02", title: "Interior Design", text: "Interior concepts, layouts, material selection, lighting concepts, furniture planning, and finish coordination.", img: p6 },
  { n: "03", title: "Landscape Design", text: "Landscape planning, garden design, outdoor living areas, planting concepts, and indoor-outdoor integration.", img: p4 },
  { n: "04", title: "Structural Design", text: "Structural planning, engineering coordination, and technical design documentation with qualified professionals.", img: p5 },
  { n: "05", title: "Project Management", text: "Project coordination, schedule monitoring, design coordination, and progress tracking.", img: p3 },
  { n: "06", title: "BIM Services", text: "Building Information Modeling, coordinated digital models, documentation, and multidisciplinary coordination.", img: p2 },
];

export const FAQS = [
  { q: "What services does STUQ provide?", a: "Architecture, interior design, landscape design, structural design coordination, project management, BIM services and Vastu-informed planning." },
  { q: "Do you undertake residential and commercial projects?", a: "Yes. We work on private residences, villas and interiors as well as commercial and workplace projects." },
  { q: "Can I request an architecture or interior design consultation?", a: "Absolutely. Use the consultation form on this page and our team will get in touch to schedule a conversation." },
  { q: "Do you provide Vastu Shastra-based planning consultations?", a: "Yes. We can integrate Vastu principles with contemporary planning, orientation, daylight and ventilation, according to your requirements." },
  { q: "How does the architectural design process work?", a: "We move from briefing and site study to concept design, design development, technical documentation and coordination during execution." },
  { q: "Do you provide project management and BIM services?", a: "Yes. We coordinate schedules, consultants and progress, and prepare coordinated BIM models and documentation." },
  { q: "What information should I prepare before our first meeting?", a: "Site details or drawings, your requirements and wishlist, reference images, an indicative budget and a preferred timeline." },
  { q: "How can I request a project estimate?", a: "Share your project details through the consultation form. After understanding the scope, we prepare a tailored proposal." },
];

export interface SocialItem {
  name: "Instagram" | "Pinterest" | "LinkedIn" | "Facebook";
  href: string;
  brandColor: string;
  bgClass: string;
  hoverBgClass: string;
}

export const SOCIALS: SocialItem[] = [
  {
    name: "Instagram",
    href: "https://instagram.com",
    brandColor: "#E1306C",
    bgClass: "bg-gradient-to-tr from-[#f09433] via-[#dc2743] to-[#bc1888]",
    hoverBgClass: "hover:brightness-110",
  },
  {
    name: "Pinterest",
    href: "https://pinterest.com",
    brandColor: "#E60023",
    bgClass: "bg-[#E60023]",
    hoverBgClass: "hover:bg-[#cc001f]",
  },
  {
    name: "LinkedIn",
    href: "https://linkedin.com",
    brandColor: "#0A66C2",
    bgClass: "bg-[#0A66C2]",
    hoverBgClass: "hover:bg-[#084e96]",
  },
  {
    name: "Facebook",
    href: "https://facebook.com",
    brandColor: "#1877F2",
    bgClass: "bg-[#1877F2]",
    hoverBgClass: "hover:bg-[#1465d2]",
  },
];
