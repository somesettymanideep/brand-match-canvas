import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatedContent } from "@/components/site/AnimatedContent";
import PixelSwap from "@/components/site/PixelSwap";
import { Button } from "@/components/ui/button";
import {
  ArrowRight,
  ArrowLeft,
  ArrowUpRight,
  Download,
  Play,
  Pause,
  Volume2,
  VolumeX,
  X,
  Compass,
  LayoutGrid,
  Sun,
  Quote,
  Plus,
  Minus,
  Star,
  CheckCircle2,
  Mail,
  Phone,
  User,
  MapPin,
  HelpCircle,
  Sparkles,
  ShieldCheck,
  Clock,
  Building2,
  ChevronDown,
} from "lucide-react";
import { PROJECTS, SERVICES, FAQS } from "./data";
import studio from "@/assets/studio.jpg";
import studioVideo from "@/assets/studio-video.mp4";
import aboutBuilding from "@/assets/about-building.png";
import vastu from "@/assets/vastu.jpg";
import vastuBg from "@/assets/vastu-bg.png";
import vastuMandala from "@/assets/vastu-mandala-grid.jpg";
import p1 from "@/assets/p1.jpg";
import p2 from "@/assets/p2.jpg";
import p4 from "@/assets/p4.jpg";
import avatarPriya from "@/assets/avatar-priya.png";
import avatarRamesh from "@/assets/avatar-ramesh.png";
import avatarAnjali from "@/assets/avatar-anjali.png";
import testimonialAlbert from "@/assets/testimonial-albert.jpg";
import testimonialDarrell from "@/assets/testimonial-darrell.jpg";
import testimonialKristin from "@/assets/testimonial-kristin.jpg";
import heroBg from "@/assets/hero-bg.png";
import heroBuilding from "@/assets/hero-building-isolated.png";
import heroArchitecture from "@/assets/hero-architecture.jpg";
import heroInterior from "@/assets/hero-interior.png";
import heroLandscape from "@/assets/hero-landscape.png";
import contactBg from "@/assets/contact-bg.png";
import servicesBg from "@/assets/services-bg.png";
import serviceIconArch from "@/assets/service-icon-arch.png";
import serviceIconInterior from "@/assets/service-icon-interior.png";
import serviceIconLandscape from "@/assets/service-icon-landscape.png";
import serviceIconStructural from "@/assets/service-icon-structural.png";
import serviceIconPm from "@/assets/service-icon-pm.png";
import serviceIconBim from "@/assets/service-icon-bim.png";

const Container = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => (
  <div className={`mx-auto max-w-[1400px] px-6 md:pl-20 lg:px-24 ${className}`}>{children}</div>
);

/* ---------------- HERO ---------------- */
const HERO_DISCIPLINES = [
  {
    id: "architecture",
    num: "01",
    categoryLabel: "ARCHITECTURE",
    titleLine1: "Distinctive Spaces.",
    titleLine2: "Thoughtfully",
    titleLine3: "Designed.",
    text: "We create architecture and interiors that bring people, place, and possibility together.",
    img: heroBuilding,
    alt: "Distinctive Spaces - Parametric architectural building model with illuminated facade and landscaped storefront",
    ctaPrimary: "Explore Projects",
    ctaPrimaryHref: "#projects",
    ctaSecondary: "Book a Consultation",
    ctaSecondaryHref: "#contact",
  },
  {
    id: "interiors",
    num: "02",
    categoryLabel: "INTERIORS",
    titleLine1: "Harmonious Interiors.",
    titleLine2: "Elegantly",
    titleLine3: "Crafted.",
    text: "Functional, biophilic workspaces and residences bringing light, acoustics, and natural textures together.",
    img: heroInterior,
    alt: "Modern isometric office workspace featuring vertical living green walls and ergonomic layouts",
    ctaPrimary: "Discover Services",
    ctaPrimaryHref: "#services",
    ctaSecondary: "Book a Consultation",
    ctaSecondaryHref: "#contact",
  },
  {
    id: "landscape",
    num: "03",
    categoryLabel: "LANDSCAPE",
    titleLine1: "Sculptural Landscapes.",
    titleLine2: "Naturally",
    titleLine3: "Integrated.",
    text: "Curating outdoor spaces with sculptural walkways, botanical installations, and organic shade structures.",
    img: heroLandscape,
    alt: "Landscape park design featuring geometric leaf sculptures, illuminated pergolas, and stone walkways",
    ctaPrimary: "Explore Studio",
    ctaPrimaryHref: "#about",
    ctaSecondary: "Book a Consultation",
    ctaSecondaryHref: "#contact",
  },
];

export function Hero() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [prevIndex, setPrevIndex] = useState<number | null>(null);
  const [isPaused, setIsPaused] = useState(false);

  const selectDiscipline = useCallback((index: number) => {
    setActiveIndex((current) => {
      if (index === current) return current;
      setPrevIndex(current);
      return index;
    });
  }, []);

  const nextDiscipline = useCallback(() => {
    setActiveIndex((current) => {
      const next = (current + 1) % HERO_DISCIPLINES.length;
      setPrevIndex(current);
      return next;
    });
  }, []);

  // Autoplay carousel with continuous loop mode
  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      nextDiscipline();
    }, 4500);
    return () => clearInterval(interval);
  }, [isPaused, nextDiscipline]);

  return (
    <section
      id="home"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      className="relative min-h-[100svh] overflow-hidden text-[#0E2638] flex flex-col justify-between pt-28 pb-8 sm:pt-32 sm:pb-10 lg:pt-32 lg:pb-8 selection:bg-cyan/25"
    >
      {/* Background Architectural Blueprint Image */}
      <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
        <img
          src={heroBg}
          alt=""
          className="h-full w-full object-cover object-center"
          loading="eager"
        />
      </div>

      {/* Main Content Area */}
      <Container className="relative z-10 w-full flex-1 flex flex-col justify-center my-auto">
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-8 xl:gap-14 items-center">
          
          {/* Left Column: Enlarged Centered Architectural Image Showcase */}
          <div className="lg:col-span-7 xl:col-span-7 flex justify-center items-center relative">
            <div className="relative w-full h-[420px] sm:h-[480px] md:h-[540px] lg:h-[600px] xl:h-[680px] 2xl:h-[740px] flex items-center justify-center">
              <PixelSwap
                slides={HERO_DISCIPLINES.map((item, idx) => (
                  <img
                    key={item.id}
                    src={item.img}
                    alt={item.alt}
                    loading={idx === 0 ? "eager" : "lazy"}
                    className="h-full w-full object-contain object-center select-none drop-shadow-[0_25px_45px_rgba(0,124,145,0.24)]"
                  />
                ))}
                activeIndex={activeIndex}
                aspectRatio="auto"
                className="h-full w-full flex items-center justify-center"
              />
            </div>
          </div>

          {/* Right Column: Hero Content */}
          <div className="lg:col-span-5 xl:col-span-5 flex flex-col justify-center text-left text-[#0E2638]">
            {/* Category Navigation Eyebrow */}
            <div className="flex items-center gap-2 text-[0.72rem] sm:text-xs font-semibold uppercase tracking-[0.28em] text-[#007C91]">
              {HERO_DISCIPLINES.map((item, idx) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => selectDiscipline(idx)}
                  className={`transition-all duration-300 ${
                    activeIndex === idx
                      ? "text-[#007C91] font-bold underline underline-offset-4 decoration-2"
                      : "text-[#5B828C] hover:text-[#007C91]"
                  }`}
                >
                  {item.categoryLabel}
                  {idx < HERO_DISCIPLINES.length - 1 && (
                    <span className="mx-2 text-[#7EA0A8] no-underline inline-block">•</span>
                  )}
                </button>
              ))}
            </div>

            {/* Smooth Fade Cross-fade Content Container */}
            <div className="relative mt-4 grid">
              {HERO_DISCIPLINES.map((item, idx) => {
                const isActive = activeIndex === idx;
                return (
                  <div
                    key={item.id}
                    className={`col-start-1 row-start-1 flex flex-col justify-center transition-all duration-700 ease-out ${
                      isActive
                        ? "opacity-100 translate-y-0 pointer-events-auto z-10"
                        : "opacity-0 translate-y-2 pointer-events-none z-0"
                    }`}
                  >
                    {/* Main Headline */}
                    <h1 className="font-serif text-4xl sm:text-5xl lg:text-[3.5rem] xl:text-[4.1rem] font-normal leading-[1.08] tracking-tight text-[#0E2638]">
                      {item.titleLine1}
                      <br />
                      {item.titleLine2}
                      <br />
                      {item.titleLine3}
                    </h1>

                    {/* Narrative text */}
                    <p className="mt-5 max-w-xl text-sm sm:text-base lg:text-[1.05rem] leading-relaxed text-[#4A6973] font-normal">
                      {item.text}
                    </p>

                    {/* Action Buttons */}
                    <div className="mt-8 flex flex-wrap items-center gap-4">
                      <a
                        href={item.ctaPrimaryHref}
                        className="inline-flex items-center gap-2 rounded-lg bg-[#0B3B46] px-6 py-3.5 text-xs sm:text-sm font-semibold tracking-wide text-white transition-all duration-300 hover:bg-[#06242B] hover:shadow-lg hover:shadow-[#0B3B46]/25 group"
                      >
                        <span>{item.ctaPrimary}</span>
                        <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                      </a>
                      <a
                        href={item.ctaSecondaryHref}
                        className="inline-flex items-center gap-2 rounded-lg border border-[#0B3B46]/70 px-6 py-3.5 text-xs sm:text-sm font-semibold tracking-wide text-[#0B3B46] transition-all duration-300 hover:bg-[#0B3B46] hover:text-white"
                      >
                        <span>{item.ctaSecondary}</span>
                      </a>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Studio Accent Divider Line */}
            <div className="mt-9 flex items-center gap-3 pt-2">
              <span className="h-[1px] w-8 bg-[#6A8F99]" />
              <p className="text-[11px] sm:text-xs font-semibold uppercase tracking-[0.25em] text-[#6A8F99]">
                STUDIO FOR ECLECTIC ARCHITECTURE
              </p>
            </div>
          </div>
        </div>
      </Container>

      {/* Bottom Row: Scroll to Explore & Pagination */}
      <Container className="relative z-10 w-full mt-6 pt-4 border-t border-[#007C91]/15">
        <div className="flex items-center justify-between">
          {/* Scroll to explore link */}
          <a
            href="#about"
            className="inline-flex items-center gap-2 text-xs font-medium tracking-wider text-[#5A7C85] hover:text-[#007C91] transition-colors group"
          >
            <span>Scroll to explore</span>
            <span className="inline-block transition-transform duration-300 group-hover:translate-y-1">
              ↓
            </span>
          </a>

          {/* Discipline Pagination Counter */}
          <div className="flex items-center gap-2 font-mono text-xs font-semibold tracking-widest text-[#5A7C85]">
            {HERO_DISCIPLINES.map((item, idx) => (
              <button
                key={item.id}
                type="button"
                onClick={() => selectDiscipline(idx)}
                className={`transition-all duration-300 hover:text-[#007C91] ${
                  activeIndex === idx ? "text-[#0B3B46] font-bold" : "text-[#7EA0A8]"
                }`}
              >
                {item.num}
              </button>
            )).flatMap((el, idx) => (idx === 0 ? [el] : [<span key={`sep-${idx}`}>/</span>, el]))}
            <span className="ml-2 inline-block h-[2px] w-8 bg-[#0B3B46]/60" />
          </div>
        </div>
      </Container>
    </section>
  );
}

function ArchitectureIcon({ className = "h-8 w-11" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 52 38"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.3"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <line x1="2" y1="35" x2="50" y2="35" />
      <polyline points="6,35 6,32 46,32 46,35" />
      <line x1="10" y1="32" x2="10" y2="35" />
      <line x1="14" y1="32" x2="14" y2="35" />
      <polygon points="12,32 12,20 38,20 38,32" />
      <line x1="22" y1="20" x2="22" y2="32" />
      <line x1="28" y1="20" x2="28" y2="32" />
      <polygon points="7,20 7,9 33,9 33,20" />
      <line x1="5" y1="8" x2="36" y2="8" strokeWidth="1.6" />
      <line x1="13" y1="9" x2="13" y2="20" />
      <line x1="19" y1="9" x2="19" y2="20" />
      <line x1="25" y1="9" x2="25" y2="20" />
      <polygon points="33,12 45,15 45,32 38,32" />
      <line x1="33" y1="20" x2="45" y2="23" />
      <line x1="40" y1="17" x2="40" y2="32" />
    </svg>
  );
}

function InteriorDesignIcon({ className = "h-8 w-11" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 52 38"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.3"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <line x1="6" y1="35" x2="48" y2="35" />
      <path d="M38 35h8" />
      <path d="M42 35V20c0-8-5-14-14-14-3 0-5.5 1-7.5 2.5" />
      <path d="M22 8.5l-3.5 4h7l-3.5-4z" />
      <path d="M18.5 12.5c0 1.5 1.5 2.5 3.5 2.5s3.5-1 3.5-2.5" />
      <path d="M10 26v-9c0-2.5 2-4.5 4.5-4.5h8c2.5 0 4.5 2 4.5 4.5V26" />
      <path d="M8 20.5h3.5v7H8c-1 0-1.8-.8-1.8-1.8v-3.4c0-1 .8-1.8 1.8-1.8z" />
      <path d="M25.5 20.5H29c1 0 1.8.8 1.8 1.8v3.4c0 1-.8 1.8-1.8 1.8h-3.5v-7z" />
      <rect x="11.5" y="24" width="14" height="4" rx="1.5" />
      <line x1="9" y1="28" x2="7.5" y2="35" />
      <line x1="28" y1="28" x2="29.5" y2="35" />
      <line x1="13.5" y1="28" x2="13" y2="33" />
      <line x1="23.5" y1="28" x2="24" y2="33" />
    </svg>
  );
}

function LandscapeDesignIcon({ className = "h-8 w-11" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 52 38"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.3"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M3 31c7-2 13-7 23-6 7 .7 13-3 18-5" />
      <path d="M4 35c9 0 15-2.5 22-2 7 1 12-2 20-3" />
      <path d="M24 25c-3 2.5-4.5 4.5-2.5 6.5 1.8 1.8 1 2.5-2.5 2.5" />
      <path d="M27 25c-2 2.5-3 4.5-1 6.5 1.5 1.5 1 2-1.5 2" />
      <line x1="12" y1="32" x2="12" y2="18" strokeWidth="1.5" />
      <path d="M12 24l-3.5-3.5m3.5 0l3.5-3.5" />
      <path d="M12 20l-4.5-4.5m4.5 0l4.5-4.5" />
      <path d="M12 17l-3-3m3 0l3-3" />
      <line x1="12" y1="17" x2="12" y2="11" />
      <circle cx="9" cy="12" r="0.8" fill="currentColor" />
      <circle cx="15" cy="12" r="0.8" fill="currentColor" />
      <circle cx="12" cy="10.5" r="0.8" fill="currentColor" />
      <circle cx="7.5" cy="15.5" r="0.8" fill="currentColor" />
      <circle cx="16.5" cy="15.5" r="0.8" fill="currentColor" />
      <path d="M40 25V13c0-3-.7-5.5-1.2-6.5-.5 1-1.2 3.5-1.2 6.5v12" />
      <line x1="38.8" y1="25" x2="38.8" y2="27" />
      <path d="M44.5 24V16c0-2-.5-3.5-.9-4.5-.4 1-.9 2.5-.9 4.5v8" />
      <line x1="43.6" y1="24" x2="43.6" y2="26" />
    </svg>
  );
}

/* ---------------- ABOUT ---------------- */
export function About() {
  const [videoOpen, setVideoOpen] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isMuted, setIsMuted] = useState(false);
  const [isPlaying, setIsPlaying] = useState(true);

  const toggleSound = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
        setIsPlaying(false);
      } else {
        videoRef.current.play();
        setIsPlaying(true);
      }
    }
  };

  return (
    <section id="about" className="relative overflow-hidden bg-white py-20 lg:py-28">
      <Container>
        {/* Top: Left Info & Awards + Right Architectural Visual with Watch Video */}
        <div className="grid items-center gap-12 lg:grid-cols-[1.1fr_1fr] lg:gap-14">
          <div>
            {/* Title */}
            <h2
              data-reveal
              className="reveal font-serif text-4xl font-normal tracking-tight sm:text-5xl lg:text-[3.5rem]"
              style={{ "--d": "100ms" } as React.CSSProperties}
            >
              <span className="text-[#067688]">ABOUT</span>{" "}
              <span className="text-[#0e2638]">US</span>
            </h2>

            {/* Description */}
            <p
              data-reveal
              className="reveal mt-6 text-sm leading-relaxed text-[#475569] sm:text-[0.95rem]"
              style={{ "--d": "200ms" } as React.CSSProperties}
            >
              Studio for Eclectic Architecture is a dynamic firm offering various design solutions. Our core services
              encompass architecture, interiors, and landscape, ensuring a comprehensive approach to every project we
              undertake. We specialize in creating unique designs for residential homes, commercial spaces, villas,
              apartments, layouts, and resorts, providing tailored solutions that reflect functionality and aesthetic
              appeal.
            </p>

            {/* Disciplines & Brochure Downloads (Architecture | Interior Design | Landscape Design) */}
            <div
              data-reveal
              className="reveal mt-8 rounded-2xl border border-[#d3ecf1] bg-[#f8fcfe] p-3 sm:p-4 shadow-sm"
              style={{ "--d": "300ms" } as React.CSSProperties}
            >
              <div className="grid grid-cols-1 divide-y divide-[#cbd5e1]/70 sm:grid-cols-3 sm:divide-y-0 sm:divide-x sm:divide-[#cbd5e1]/70">
                {/* Architecture */}
                <div className="group flex flex-col items-center justify-between gap-2.5 px-2 py-3 text-center sm:py-1">
                  <div className="flex h-10 items-center justify-center text-teal transition-transform duration-300 group-hover:scale-110">
                    <ArchitectureIcon className="h-8 w-11" />
                  </div>
                  <h4 className="font-serif text-sm sm:text-base font-normal tracking-wide text-[#0e2638] transition-colors group-hover:text-teal">
                    Architecture
                  </h4>
                  <a
                    href="#contact"
                    onClick={(e) => {
                      e.preventDefault();
                      document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" });
                    }}
                    className="inline-flex items-center gap-1.5 text-[0.72rem] sm:text-xs font-semibold text-teal transition-colors hover:text-teal-deep focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-teal"
                    aria-label="Download Architecture Brochure"
                  >
                    <Download className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-y-0.5" />
                    <span>Download Brochure</span>
                  </a>
                </div>

                {/* Interior Design */}
                <div className="group flex flex-col items-center justify-between gap-2.5 px-2 py-3 text-center sm:py-1">
                  <div className="flex h-10 items-center justify-center text-teal transition-transform duration-300 group-hover:scale-110">
                    <InteriorDesignIcon className="h-8 w-11" />
                  </div>
                  <h4 className="font-serif text-sm sm:text-base font-normal tracking-wide text-[#0e2638] transition-colors group-hover:text-teal">
                    Interior Design
                  </h4>
                  <a
                    href="#contact"
                    onClick={(e) => {
                      e.preventDefault();
                      document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" });
                    }}
                    className="inline-flex items-center gap-1.5 text-[0.72rem] sm:text-xs font-semibold text-teal transition-colors hover:text-teal-deep focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-teal"
                    aria-label="Download Interior Design Brochure"
                  >
                    <Download className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-y-0.5" />
                    <span>Download Brochure</span>
                  </a>
                </div>

                {/* Landscape Design */}
                <div className="group flex flex-col items-center justify-between gap-2.5 px-2 py-3 text-center sm:py-1">
                  <div className="flex h-10 items-center justify-center text-teal transition-transform duration-300 group-hover:scale-110">
                    <LandscapeDesignIcon className="h-8 w-11" />
                  </div>
                  <h4 className="font-serif text-sm sm:text-base font-normal tracking-wide text-[#0e2638] transition-colors group-hover:text-teal">
                    Landscape Design
                  </h4>
                  <a
                    href="#contact"
                    onClick={(e) => {
                      e.preventDefault();
                      document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" });
                    }}
                    className="inline-flex items-center gap-1.5 text-[0.72rem] sm:text-xs font-semibold text-teal transition-colors hover:text-teal-deep focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-teal"
                    aria-label="Download Landscape Design Brochure"
                  >
                    <Download className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-y-0.5" />
                    <span>Download Brochure</span>
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Architectural Illustration with Watch Video Pill */}
          <div data-reveal className="reveal relative flex justify-center lg:justify-end" style={{ "--d": "200ms" } as React.CSSProperties}>
            <div className="group relative w-full max-w-lg overflow-hidden rounded-2xl shadow-xl transition-transform duration-500 hover:scale-[1.01]">
              <img
                src={aboutBuilding}
                alt="Architecture illustration with 3D, 4D, 6D design process"
                className="h-full w-full object-cover"
              />

              {/* Watch Video Glassmorphism Pill */}
              <button
                type="button"
                onClick={() => setVideoOpen(true)}
                aria-label="Watch Studio Video"
                className="absolute bottom-6 right-6 flex items-center gap-3 rounded-full border border-white/30 bg-black/40 px-5 py-2.5 text-white shadow-2xl backdrop-blur-md transition-all duration-300 hover:scale-105 hover:bg-black/60 focus-visible:ring-2 focus-visible:ring-cyan"
              >
                <span className="grid h-9 w-9 place-items-center rounded-full bg-white text-black shadow transition-transform group-hover:scale-110">
                  <Play className="ml-0.5 h-4 w-4 fill-current text-black" />
                </span>
                <span className="text-sm font-semibold tracking-wide text-white">Watch Video</span>
              </button>
            </div>
          </div>
        </div>
      </Container>

      {/* Interactive Video Modal */}
      {videoOpen && (
        <div
          className="fixed inset-0 z-[70] grid place-items-center bg-teal-deep/90 p-4 sm:p-8 backdrop-blur-sm animate-fade-in"
          role="dialog"
          aria-modal="true"
          aria-label="Studio film"
          onClick={() => setVideoOpen(false)}
        >
          <div
            className="relative aspect-video w-full max-w-5xl overflow-hidden rounded-2xl bg-black shadow-2xl border border-white/20"
            onClick={(e) => e.stopPropagation()}
          >
            <video
              ref={videoRef}
              src={studioVideo}
              autoPlay
              controls
              loop
              muted={isMuted}
              playsInline
              className="h-full w-full object-cover"
            />
            {/* Modal Close Button */}
            <button
              onClick={() => setVideoOpen(false)}
              aria-label="Close video"
              className="absolute right-4 top-4 grid h-10 w-10 place-items-center rounded-full bg-black/60 text-white backdrop-blur-md transition-all hover:bg-black hover:scale-110"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>
      )}
    </section>
  );
}



/* ---------------- VASTU ---------------- */
export function Vastu() {
  return (
    <section id="vastu" className="relative overflow-hidden py-20 lg:py-28">
      {/* Full Vastu Background Image */}
      <img
        src={vastuBg}
        alt=""
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 h-full w-full object-cover object-center"
      />
      {/* Subtle overlay ensuring crisp text readability */}
      <div className="pointer-events-none absolute inset-0 bg-white/35 backdrop-blur-[0.5px]" />

      <Container className="relative">
        <div className="grid items-center gap-12 lg:grid-cols-[1.1fr_1fr] lg:gap-16">
          {/* Left Column: Text, 3 Pillars, Read More */}
          <div>
            {/* Title */}
            <h2
              data-reveal
              className="reveal font-serif text-4xl font-normal tracking-tight sm:text-5xl lg:text-[3.5rem]"
              style={{ "--d": "100ms" } as React.CSSProperties}
            >
              <span className="text-[#067688]">VASTU</span>{" "}
              <span className="text-[#0e2638]">SHASTRA</span>
            </h2>

            {/* Paragraphs */}
            <p
              data-reveal
              className="reveal mt-6 text-sm leading-relaxed text-[#55504A] sm:text-[0.95rem]"
              style={{ "--d": "200ms" } as React.CSSProperties}
            >
              Vastu Shastra, an ancient Indian architectural science, is more than just a set of guidelines for
              constructing buildings. It is a holistic approach to designing spaces that aligns the physical,
              spiritual, and emotional well-being of its inhabitants with the natural energies around them.
            </p>

            <p
              data-reveal
              className="reveal mt-4 text-sm leading-relaxed text-[#55504A] sm:text-[0.95rem]"
              style={{ "--d": "300ms" } as React.CSSProperties}
            >
              Rooted in traditional Indian principles, Vastu offers a profound connection between architecture and the
              cosmic forces that govern our lives, making it a vital concept in modern design.
            </p>



            {/* Read More Button */}
            <div data-reveal className="reveal mt-9" style={{ "--d": "500ms" } as React.CSSProperties}>
              <a
                href="#contact"
                className="inline-flex items-center gap-3 rounded-sm bg-[#067688] px-8 py-3.5 text-sm font-semibold text-white shadow-md transition-all duration-300 hover:bg-[#055d6b] hover:shadow-lg focus-visible:ring-2 focus-visible:ring-[#067688]"
              >
                <span>Read More</span>
                <span className="text-base font-bold leading-none">→</span>
              </a>
            </div>
          </div>

          {/* Right Column: Vastu Purusha Mandala Grid & Compass (N, E, S, W) */}
          <div
            data-reveal
            className="reveal relative flex items-center justify-center"
            style={{ "--d": "300ms" } as React.CSSProperties}
          >
            <div className="relative w-full max-w-[530px] overflow-hidden rounded-xl bg-white p-2 transition-transform duration-500 hover:scale-[1.01]">
              <img
                src={vastuMandala}
                alt="Vastu Purusha Mandala layout and directional energies chart"
                className="h-auto w-full object-contain"
              />
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

export { Projects } from "./Projects";

/* ---------------- SERVICES DATA ---------------- */
const SERVICES_LIST = [
  {
    num: "01",
    title: "ARCHITECTURAL\nDESIGN",
    icon: serviceIconArch,
    desc: "Our experts prepare preliminary design sketches and concepts based on your requirements and budget, helping you explore and visualize the best options for your dream space.",
    delay: "100ms",
  },
  {
    num: "02",
    title: "INTERIOR\nDESIGN",
    icon: serviceIconInterior,
    desc: "Our designers plan, research, coordinate and enhance interiors to create healthier, more functional and aesthetically pleasing environments using the space efficiently.",
    delay: "200ms",
  },
  {
    num: "03",
    title: "LANDSCAPE\nDESIGN",
    icon: serviceIconLandscape,
    desc: "Our team uses their creativity and understanding of outdoor environments to create well-designed outdoor spaces that are functional and visually appealing, with suitable plants, types of grass, furniture and other design elements.",
    delay: "300ms",
  },
  {
    num: "04",
    title: "STRUCTURAL\nDESIGN",
    icon: serviceIconStructural,
    desc: "Comprehensive structural engineering analysis, foundational design, framing systems, and seismic-resilient planning coordinated to guarantee structural integrity, compliance, and safety.",
    delay: "400ms",
  },
  {
    num: "05",
    title: "PROJECT\nMANAGEMENT",
    icon: serviceIconPm,
    desc: "End-to-end execution oversight, schedule monitoring, quality assurance, cost engineering, and vendor coordination ensuring smooth construction on time and within budget.",
    delay: "500ms",
  },
  {
    num: "06",
    title: "BIM\nSERVICES",
    icon: serviceIconBim,
    desc: "Building Information Modeling (BIM) creating coordinated 3D digital models, parametric documentation, clash detection, and multidisciplinary workflows for seamless execution.",
    delay: "600ms",
  },
];

/* ---------------- SERVICES ---------------- */
export function Services() {
  return (
    <section id="services" className="relative overflow-hidden bg-[#f0fbfe] py-24 lg:py-32">
      {/* Top-Left Corner Element: Modern Cantilevered Residence Blueprint (prominent on large & extra large devices) */}
      <div className="pointer-events-none absolute left-0 top-0 z-0 h-[340px] w-[320px] sm:h-[420px] sm:w-[400px] md:h-[480px] md:w-[460px] lg:h-[580px] lg:w-[540px] xl:h-[680px] xl:w-[640px] 2xl:h-[780px] 2xl:w-[740px] overflow-hidden select-none">
        <img
          src={servicesBg}
          alt=""
          aria-hidden="true"
          className="h-full w-full object-cover object-left-top contrast-[1.08] saturate-[1.1]"
        />
        {/* Soft edge feathering so it blends seamlessly into the section canvas */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-[#f0fbfe]/90" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#f0fbfe]/90" />
      </div>

      {/* Bottom-Right Corner Element: Isometric Structural Framework Blueprint (prominent on large & extra large devices) */}
      <div className="pointer-events-none absolute right-0 bottom-0 z-0 h-[340px] w-[320px] sm:h-[420px] sm:w-[400px] md:h-[480px] md:w-[460px] lg:h-[580px] lg:w-[540px] xl:h-[680px] xl:w-[640px] 2xl:h-[780px] 2xl:w-[740px] overflow-hidden select-none">
        <img
          src={servicesBg}
          alt=""
          aria-hidden="true"
          className="h-full w-full object-cover object-right-bottom contrast-[1.08] saturate-[1.1]"
        />
        {/* Soft edge feathering so it blends seamlessly into the section canvas */}
        <div className="absolute inset-0 bg-gradient-to-l from-transparent via-transparent to-[#f0fbfe]/90" />
        <div className="absolute inset-0 bg-gradient-to-t from-transparent via-transparent to-[#f0fbfe]/90" />
      </div>

      {/* Soft atmospheric gradient overlay for optimal depth and edge blending */}
      <div className="pointer-events-none absolute inset-0 z-0 bg-gradient-to-b from-[#f0fbfe]/30 via-transparent to-[#f0fbfe]/40" />

      <Container className="relative z-10">
        {/* Centered Main Title */}
        <h2
          data-reveal
          className="reveal text-center font-serif text-4xl font-normal tracking-tight sm:text-5xl lg:text-[3.5rem] leading-[1.12]"
          style={{ "--d": "100ms" } as React.CSSProperties}
        >
          <span className="text-[#067688]">OUR</span>{" "}
          <span className="text-[#0e2638]">SERVICES</span>
        </h2>

        {/* Subtitle */}
        <p
          data-reveal
          className="reveal mx-auto mt-4 max-w-2xl text-center text-sm sm:text-[0.95rem] leading-relaxed text-[#597080]"
          style={{ "--d": "200ms" } as React.CSSProperties}
        >
          From architectural planning to interiors, landscape, structural design, project management and BIM services, we offer comprehensive end-to-end solutions tailored to your vision.
        </p>

        {/* 6 Service Cards Grid (3 columns on desktop, 2 on tablet, 1 on mobile) */}
        <div className="mt-16 grid gap-7 md:grid-cols-2 lg:grid-cols-3 lg:gap-8">
          {SERVICES_LIST.map((srv, i) => (
            <AnimatedContent
              key={srv.num}
              distance={80}
              duration={0.9}
              ease="power3.out"
              initialOpacity={0}
              scale={0.92}
              threshold={0.15}
              delay={(i % 3) * 0.12}
              className="h-full"
            >
              <div
                className="group relative flex h-full flex-col justify-between overflow-hidden rounded-3xl border border-slate-200/80 bg-white p-7 sm:p-8 shadow-sm transition-all duration-500 ease-out hover:-translate-y-2 hover:border-[#067688]/40 hover:bg-gradient-to-br hover:from-white hover:via-[#f9fdfe] hover:to-[#eef8fa] hover:shadow-2xl hover:shadow-[#067688]/15"
              >
                {/* Subtle ambient light aura in top-right corner on hover */}
                <div className="pointer-events-none absolute -right-10 -top-10 h-36 w-36 rounded-full bg-[#067688]/0 blur-2xl transition-all duration-500 group-hover:scale-125 group-hover:bg-[#067688]/15" />

                <div className="relative">
                  {/* Top Row: Icon Badge + Watermark Number */}
                  <div className="flex items-center justify-between">
                    <div className="grid h-16 w-16 place-items-center rounded-2xl border border-[#067688]/20 bg-[#067688]/10 shadow-sm transition-all duration-500 group-hover:scale-110 group-hover:rotate-[-3deg] group-hover:border-[#067688] group-hover:bg-[#067688] group-hover:shadow-lg group-hover:shadow-[#067688]/30">
                      <img
                        src={srv.icon}
                        alt=""
                        className="h-10 w-10 object-contain transition-all duration-300 group-hover:brightness-0 group-hover:invert"
                      />
                    </div>
                    <span className="font-display text-4xl sm:text-5xl font-extrabold tracking-wider text-[#067688]/15 transition-all duration-500 group-hover:text-[#067688]/35 select-none">
                      {srv.num}
                    </span>
                  </div>

                  {/* Architectural Accent Bar */}
                  <div className="mt-6 h-0.5 w-10 rounded-full bg-[#067688]/30 transition-all duration-500 group-hover:w-20 group-hover:bg-[#067688]" />

                  {/* Content: Title & Description */}
                  <div className="mt-5">
                    <h3 className="font-display text-xl font-bold tracking-tight text-[#0e2638] transition-colors duration-300 group-hover:text-[#067688] whitespace-pre-line leading-tight">
                      {srv.title}
                    </h3>
                    <p className="mt-3.5 text-xs sm:text-[0.85rem] leading-relaxed text-[#597080] transition-colors duration-300 group-hover:text-[#334e60]">
                      {srv.desc}
                    </p>
                  </div>
                </div>

                {/* Card Footer: Interactive Learn More CTA */}
                <div className="relative mt-8 pt-4 border-t border-slate-100 transition-colors duration-300 group-hover:border-[#067688]/15">
                  <a
                    href="#contact"
                    className="inline-flex items-center gap-2.5 rounded-full border border-[#0e2638]/20 bg-slate-50/70 px-5 py-2.5 text-xs font-semibold text-[#0e2638] transition-all duration-300 group-hover:border-[#067688] group-hover:bg-[#067688] group-hover:text-white group-hover:shadow-md group-hover:shadow-[#067688]/25"
                  >
                    <span>Learn More</span>
                    <span className="text-sm transition-transform duration-300 group-hover:translate-x-1">→</span>
                  </a>
                </div>
              </div>
            </AnimatedContent>
          ))}
        </div>
      </Container>
    </section>
  );
}

/* ---------------- TESTIMONIALS ---------------- */
const TESTIMONIALS_DATA = [
  {
    name: "Albert Flores",
    role: "Commercial Project Manager",
    quote: "The team’s ability to turn our vision into a reality exceeded all expectations. Their attention to detail and innovative designs made our project truly unique.",
    avatar: testimonialAlbert,
    rating: 5,
  },
  {
    name: "Darrell Steward",
    role: "Real Estate Director",
    quote: "Their innovative approach to sustainable design was impressive. We are proud to have a space that not only looks great but also respects the environment.",
    avatar: testimonialDarrell,
    rating: 5,
  },
  {
    name: "Kristin Watson",
    role: "Project Manager",
    quote: "Working with SEA Studio was a fantastic experience. Their expertise, professionalism, and commitment to quality were evident every step of the way.",
    avatar: testimonialKristin,
    rating: 5,
  },
  {
    name: "Priya Sharma",
    role: "Homeowner, Vijayawada",
    quote: "SEA transformed our dream home into a beautiful reality. Their attention to detail and professionalism is truly commendable.",
    avatar: avatarPriya,
    rating: 5,
  },
];

export function Testimonials() {
  const [activePage, setActivePage] = useState(0);
  const cardsPerPage = 2;
  const totalPages = Math.ceil(TESTIMONIALS_DATA.length / cardsPerPage);

  const prevPage = () => {
    setActivePage((prev) => (prev === 0 ? totalPages - 1 : prev - 1));
  };

  const nextPage = () => {
    setActivePage((prev) => (prev === totalPages - 1 ? 0 : prev + 1));
  };

  const visibleTestimonials = TESTIMONIALS_DATA.slice(
    activePage * cardsPerPage,
    activePage * cardsPerPage + cardsPerPage
  );

  return (
    <section id="testimonials" className="relative overflow-hidden bg-[#03343d] py-24 lg:py-32 text-white">
      {/* Background architectural grid & glow */}
      <div className="pointer-events-none absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff15_1px,transparent_1px),linear-gradient(to_bottom,#ffffff15_1px,transparent_1px)] bg-[size:4rem_4rem]" />
        <div className="absolute -top-40 -left-40 h-96 w-96 rounded-full bg-cyan/20 blur-3xl" />
        <div className="absolute -bottom-40 -right-40 h-96 w-96 rounded-full bg-teal/30 blur-3xl" />
      </div>

      <Container className="relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto">
          <p className="text-xs font-bold uppercase tracking-[0.35em] text-[#38d9c0]">
            — TESTIMONIALS —
          </p>
          <h2 className="mt-4 font-serif text-3xl sm:text-4xl md:text-5xl font-normal tracking-tight text-white">
            What Our Clients Say
          </h2>
          <p className="mt-3 text-sm sm:text-base text-[#a3cbcf]">
            Real stories from people who trusted us with their vision.
          </p>
        </div>

        {/* Carousel / Cards Container */}
        <div className="relative mt-14 sm:mt-16">
          {/* Navigation Arrow Left */}
          <button
            onClick={prevPage}
            aria-label="Previous testimonials"
            className="absolute -left-4 sm:-left-6 top-1/2 -translate-y-1/2 z-20 hidden md:flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur-md border border-white/20 shadow-lg transition-all duration-300 hover:bg-white hover:text-[#03343d] hover:scale-105"
          >
            <ArrowLeft className="h-5 w-5" />
          </button>

          {/* Navigation Arrow Right */}
          <button
            onClick={nextPage}
            aria-label="Next testimonials"
            className="absolute -right-4 sm:-right-6 top-1/2 -translate-y-1/2 z-20 hidden md:flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur-md border border-white/20 shadow-lg transition-all duration-300 hover:bg-white hover:text-[#03343d] hover:scale-105"
          >
            <ArrowRight className="h-5 w-5" />
          </button>

          {/* 2-Column Horizontal Cards Grid perfectly matching reference layout */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
            {visibleTestimonials.map((t) => (
              <div
                key={t.name}
                className="group relative flex flex-col sm:flex-row items-center gap-5 sm:gap-6 rounded-[22px] border border-slate-200/90 bg-white p-4 sm:p-5 lg:p-6 shadow-[0_10px_30px_-8px_rgba(0,0,0,0.12)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_40px_-10px_rgba(0,0,0,0.2)]"
              >
                {/* Left side: Rectangular Portrait (aspect 3:4 matching 157x206 reference image) */}
                <div className="relative aspect-[3/4] w-full sm:w-36 md:w-40 lg:w-44 xl:w-48 shrink-0 overflow-hidden rounded-[14px] bg-slate-100 shadow-sm">
                  <img
                    src={t.avatar}
                    alt={t.name}
                    className="h-full w-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
                  />
                </div>

                {/* Right side: Vertically Centered Content with exact spacing */}
                <div className="flex flex-1 flex-col justify-center py-1 text-left">
                  {/* 5 Teal Rating Stars */}
                  <div className="flex items-center gap-1">
                    {Array.from({ length: t.rating }).map((_, i) => (
                      <Star key={i} className="h-3.5 w-3.5 fill-[#067688] text-[#067688]" />
                    ))}
                  </div>

                  {/* Testimonial Quote */}
                  <p className="mt-3 text-xs sm:text-[0.875rem] leading-[1.65] text-[#334155] font-normal">
                    “{t.quote}”
                  </p>

                  {/* Author Name and Role */}
                  <div className="mt-4 sm:mt-5">
                    <h3 className="font-sans text-sm sm:text-base font-bold text-[#0e2638] tracking-tight">
                      {t.name}
                    </h3>
                    <p className="mt-0.5 text-xs font-semibold text-[#067688]">
                      {t.role}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination Indicators */}
          <div className="mt-10 flex items-center justify-center gap-2.5">
            {Array.from({ length: totalPages }).map((_, idx) => (
              <button
                key={idx}
                onClick={() => setActivePage(idx)}
                aria-label={`Go to testimonials page ${idx + 1}`}
                className={`h-2.5 rounded-full transition-all duration-300 ${
                  idx === activePage ? "w-8 bg-[#38d9c0]" : "w-2.5 bg-white/30 hover:bg-white/50"
                }`}
              />
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}

/* ---------------- PREMIUM CONSULTATION FORM + FAQ ---------------- */
const PROJECT_TYPES = [
  "Residential",
  "Commercial",
  "Interior Design",
  "Landscape Design",
  "Renovation",
  "Other",
];

const BUDGET_RANGES = [
  "Under ₹25 Lakhs",
  "₹25 - ₹50 Lakhs",
  "₹50 Lakhs - ₹1 Crore",
  "₹1 Crore - ₹2.5 Crores",
  "₹2.5 Crores+",
  "Flexible / Discuss on Call",
];

const FAQ_ITEMS = [
  {
    q: "How do I get started with an architectural project?",
    a: "Start by scheduling a consultation. Our team will discuss your requirements, design preferences, project scope, and expectations to craft a tailored roadmap.",
  },
  {
    q: "What types of architectural projects do you undertake?",
    a: "We work across residential homes, luxury villas, commercial spaces, interior design, landscape architecture, and large-scale renovation projects.",
  },
  {
    q: "Can I customize the design according to my preferences?",
    a: "Yes. Our design approach focuses on understanding your lifestyle, functional requirements, and aesthetic preferences, harmonizing your vision with spatial efficiency.",
  },
  {
    q: "How long does an architectural project take?",
    a: "Project timelines depend on the scope, complexity, municipal approvals, and custom design requirements. We establish realistic milestone schedules during planning.",
  },
  {
    q: "Do you provide both architecture and interior design services?",
    a: "Our team can discuss integrated architectural, structural, and interior design requirements during the initial consultation for seamless end-to-end execution.",
  },
  {
    q: "How can I schedule a consultation?",
    a: "Complete the consultation form, and our senior architectural team will contact you within 24 hours to schedule an in-depth introductory session.",
  },
];

export function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    type: "",
    location: "",
    budget: "",
    message: "",
    consent: false,
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<"idle" | "loading" | "success">("idle");
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;
    const val = type === "checkbox" ? (e.target as HTMLInputElement).checked : value;
    setFormData((prev) => ({ ...prev, [name]: val }));
    if (errors[name]) {
      setErrors((prev) => {
        const copy = { ...prev };
        delete copy[name];
        return copy;
      });
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim() || formData.name.trim().length < 2) {
      newErrors["name"] = "Please enter your full name.";
    }
    if (!/^\S+@\S+\.\S+$/.test(formData.email.trim())) {
      newErrors["email"] = "Please enter a valid email address.";
    }
    if (!/^[+\d\s()-]{7,}$/.test(formData.phone.trim())) {
      newErrors["phone"] = "Please enter a valid phone number.";
    }
    if (!formData.type) {
      newErrors["type"] = "Please select a project type.";
    }
    if (!formData.consent) {
      newErrors["consent"] = "Please agree to be contacted.";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setStatus("loading");
    // Simulate premium response
    setTimeout(() => {
      setStatus("success");
    }, 900);
  };

  return (
    <section id="contact" className="relative overflow-hidden bg-[#F5FAFB] py-24 lg:py-32">
      {/* Zoomed-Out Architectural Blueprint Artwork Background */}
      <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden flex items-center justify-center">
        <div
          className="relative h-full w-full max-w-[1700px] flex items-center justify-center"
          style={{
            maskImage:
              "radial-gradient(ellipse 80% 70% at 50% 50%, black 25%, transparent 85%)",
            WebkitMaskImage:
              "radial-gradient(ellipse 80% 70% at 50% 50%, black 25%, transparent 85%)",
          }}
        >
          <img
            src={contactBg}
            alt="Architectural 3D Blueprint Background"
            className="h-full w-full object-contain scale-[0.7] sm:scale-[0.62] lg:scale-[0.55] xl:scale-[0.5] object-center opacity-30 mix-blend-multiply transition-transform duration-1000 select-none transform-gpu"
          />
        </div>
        {/* Soft Ambient Depth Gradient Overlays for crystal clear readability & smooth section blend */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#F5FAFB]/85 via-transparent to-[#F5FAFB]/85" />
      </div>

      {/* Subtle Blueprint Grid Background & Ambient Lighting */}
      <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
        <div className="absolute inset-0 opacity-[0.03] bg-[linear-gradient(to_right,#007C91_1px,transparent_1px),linear-gradient(to_bottom,#007C91_1px,transparent_1px)] bg-[size:3.5rem_3.5rem]" />
        <div className="absolute -top-32 -left-32 h-[480px] w-[480px] rounded-full bg-[#35A9C1]/15 blur-3xl" />
        <div className="absolute -bottom-32 -right-32 h-[480px] w-[480px] rounded-full bg-[#007C91]/15 blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[650px] w-[650px] rounded-full bg-[#007C91]/5 blur-[120px]" />
      </div>

      <Container className="relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_1fr] gap-12 lg:gap-16 items-start">
          {/* ================= LEFT COLUMN: Premium Consultation Form (55%) ================= */}
          <div className="min-w-0">
            {/* Eyebrow */}
            <div data-reveal className="reveal flex items-center gap-2.5">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-[#007C91]/20 bg-[#007C91]/10 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.2em] text-[#007C91]">
                <Sparkles className="h-3 w-3 text-[#007C91]" />
                Let's Create Something Exceptional
              </span>
            </div>

            {/* Heading */}
            <h2
              data-reveal
              className="reveal mt-4 font-serif text-3xl sm:text-4xl lg:text-[2.75rem] font-normal tracking-tight text-[#172B35] leading-[1.15]"
              style={{ "--d": "100ms" } as React.CSSProperties}
            >
              Let's Design Your Dream Space.
            </h2>

            {/* Description */}
            <p
              data-reveal
              className="reveal mt-3 text-sm sm:text-base leading-relaxed text-[#597080]"
              style={{ "--d": "200ms" } as React.CSSProperties}
            >
              Every extraordinary space begins with a conversation. Share your vision with us, and let's bring it to life.
            </p>

            {/* Form Card Container */}
            <div
              data-reveal
              className="reveal mt-8 rounded-[24px] border border-[#007C91]/15 bg-white/90 backdrop-blur-md p-6 sm:p-9 lg:p-10 shadow-[0_20px_60px_-15px_rgba(0,124,145,0.08)] ring-1 ring-white/80 transition-all hover:shadow-[0_25px_70px_-15px_rgba(0,124,145,0.12)]"
              style={{ "--d": "300ms" } as React.CSSProperties}
            >
              {status === "success" ? (
                <div className="flex flex-col items-center justify-center py-10 text-center animate-fade-in">
                  <div className="grid h-16 w-16 place-items-center rounded-full bg-teal/10 text-teal ring-8 ring-teal/5">
                    <CheckCircle2 className="h-9 w-9 text-[#007C91]" />
                  </div>
                  <h3 className="mt-5 font-serif text-2xl font-bold text-[#172B35]">
                    Consultation Request Received
                  </h3>
                  <p className="mt-3 max-w-md text-sm leading-relaxed text-[#597080]">
                    Thank you for sharing your project details with SEA. Our senior architectural team is reviewing your vision and will get in touch with you shortly.
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      setStatus("idle");
                      setFormData({
                        name: "",
                        email: "",
                        phone: "",
                        type: "",
                        location: "",
                        budget: "",
                        message: "",
                        consent: false,
                      });
                    }}
                    className="mt-6 inline-flex items-center gap-2 rounded-full border border-[#007C91]/30 px-6 py-2.5 text-xs font-semibold text-[#007C91] transition-all hover:bg-[#007C91] hover:text-white"
                  >
                    <span>Submit Another Enquiry</span>
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} noValidate className="grid gap-5 sm:grid-cols-2">
                  {/* Full Name */}
                  <div className="sm:col-span-1">
                    <label className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#172B35]/80 mb-2">
                      <User className="h-3.5 w-3.5 text-[#007C91]" />
                      Full Name <span className="text-[#007C91]">*</span>
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="e.g. Rahul Sharma"
                        className={`w-full rounded-[14px] bg-slate-50/70 border px-4 py-3.5 text-sm text-[#172B35] placeholder:text-slate-400 outline-none transition-all duration-300 focus:bg-white focus:border-[#007C91] focus:ring-4 focus:ring-[#007C91]/10 ${
                          errors["name"] ? "border-red-400 bg-red-50/20" : "border-slate-200"
                        }`}
                      />
                    </div>
                    {errors["name"] && <p className="mt-1.5 text-xs text-red-500">{errors["name"]}</p>}
                  </div>

                  {/* Email Address */}
                  <div className="sm:col-span-1">
                    <label className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#172B35]/80 mb-2">
                      <Mail className="h-3.5 w-3.5 text-[#007C91]" />
                      Email Address <span className="text-[#007C91]">*</span>
                    </label>
                    <div className="relative">
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="e.g. rahul@example.com"
                        className={`w-full rounded-[14px] bg-slate-50/70 border px-4 py-3.5 text-sm text-[#172B35] placeholder:text-slate-400 outline-none transition-all duration-300 focus:bg-white focus:border-[#007C91] focus:ring-4 focus:ring-[#007C91]/10 ${
                          errors["email"] ? "border-red-400 bg-red-50/20" : "border-slate-200"
                        }`}
                      />
                    </div>
                    {errors["email"] && <p className="mt-1.5 text-xs text-red-500">{errors["email"]}</p>}
                  </div>

                  {/* Phone Number */}
                  <div className="sm:col-span-1">
                    <label className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#172B35]/80 mb-2">
                      <Phone className="h-3.5 w-3.5 text-[#007C91]" />
                      Phone Number <span className="text-[#007C91]">*</span>
                    </label>
                    <div className="relative">
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="+91 98765 43210"
                        className={`w-full rounded-[14px] bg-slate-50/70 border px-4 py-3.5 text-sm text-[#172B35] placeholder:text-slate-400 outline-none transition-all duration-300 focus:bg-white focus:border-[#007C91] focus:ring-4 focus:ring-[#007C91]/10 ${
                          errors["phone"] ? "border-red-400 bg-red-50/20" : "border-slate-200"
                        }`}
                      />
                    </div>
                    {errors["phone"] && <p className="mt-1.5 text-xs text-red-500">{errors["phone"]}</p>}
                  </div>

                  {/* Project Type */}
                  <div className="sm:col-span-1">
                    <label className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#172B35]/80 mb-2">
                      <Building2 className="h-3.5 w-3.5 text-[#007C91]" />
                      Project Type <span className="text-[#007C91]">*</span>
                    </label>
                    <div className="relative">
                      <select
                        name="type"
                        value={formData.type}
                        onChange={handleChange}
                        className={`w-full appearance-none rounded-[14px] bg-slate-50/70 border px-4 py-3.5 pr-10 text-sm text-[#172B35] outline-none transition-all duration-300 focus:bg-white focus:border-[#007C91] focus:ring-4 focus:ring-[#007C91]/10 ${
                          errors["type"] ? "border-red-400 bg-red-50/20" : "border-slate-200"
                        } ${!formData.type ? "text-slate-400" : "text-[#172B35]"}`}
                      >
                        <option value="" disabled>Select project type</option>
                        {PROJECT_TYPES.map((t) => (
                          <option key={t} value={t} className="text-[#172B35]">
                            {t}
                          </option>
                        ))}
                      </select>
                      <ChevronDown className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                    </div>
                    {errors["type"] && <p className="mt-1.5 text-xs text-red-500">{errors["type"]}</p>}
                  </div>

                  {/* Project Location */}
                  <div className="sm:col-span-1">
                    <label className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#172B35]/80 mb-2">
                      <MapPin className="h-3.5 w-3.5 text-[#007C91]" />
                      Project Location
                    </label>
                    <input
                      type="text"
                      name="location"
                      value={formData.location}
                      onChange={handleChange}
                      placeholder="e.g. Hyderabad / Vijayawada"
                      className="w-full rounded-[14px] border border-slate-200 bg-slate-50/70 px-4 py-3.5 text-sm text-[#172B35] placeholder:text-slate-400 outline-none transition-all duration-300 focus:border-[#007C91] focus:bg-white focus:ring-4 focus:ring-[#007C91]/10"
                    />
                  </div>

                  {/* Estimated Budget */}
                  <div className="sm:col-span-1">
                    <label className="block text-xs font-bold uppercase tracking-wider text-[#172B35]/80 mb-2">
                      Estimated Budget <span className="text-slate-400 font-normal lowercase">(optional)</span>
                    </label>
                    <div className="relative">
                      <select
                        name="budget"
                        value={formData.budget}
                        onChange={handleChange}
                        className={`w-full appearance-none rounded-[14px] border border-slate-200 bg-slate-50/70 px-4 py-3.5 pr-10 text-sm outline-none transition-all duration-300 focus:border-[#007C91] focus:bg-white focus:ring-4 focus:ring-[#007C91]/10 ${
                          !formData.budget ? "text-slate-400" : "text-[#172B35]"
                        }`}
                      >
                        <option value="">Select budget range</option>
                        {BUDGET_RANGES.map((b) => (
                          <option key={b} value={b} className="text-[#172B35]">
                            {b}
                          </option>
                        ))}
                      </select>
                      <ChevronDown className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                    </div>
                  </div>

                  {/* Tell Us About Your Project */}
                  <div className="sm:col-span-2">
                    <label className="block text-xs font-bold uppercase tracking-wider text-[#172B35]/80 mb-2">
                      Tell Us About Your Project
                    </label>
                    <textarea
                      name="message"
                      rows={4}
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Share your ideas, plot size, timeline, special requirements, or design aspirations..."
                      className="w-full resize-none rounded-[14px] border border-slate-200 bg-slate-50/70 px-4 py-3.5 text-sm text-[#172B35] placeholder:text-slate-400 outline-none transition-all duration-300 focus:border-[#007C91] focus:bg-white focus:ring-4 focus:ring-[#007C91]/10"
                    />
                  </div>

                  {/* Consent Checkbox */}
                  <div className="sm:col-span-2">
                    <label className="flex items-start gap-3 text-xs sm:text-[0.82rem] leading-relaxed text-[#597080] cursor-pointer">
                      <input
                        type="checkbox"
                        name="consent"
                        checked={formData.consent}
                        onChange={handleChange}
                        className="mt-0.5 h-4 w-4 shrink-0 rounded accent-[#007C91]"
                      />
                      <span>
                        I agree to be contacted by Studio for Eclectic Architecture (SEA) regarding my inquiry.
                      </span>
                    </label>
                    {errors["consent"] && (
                      <p className="mt-1 text-xs text-red-500">{errors["consent"]}</p>
                    )}
                  </div>

                  {/* Submit Button */}
                  <div className="sm:col-span-2 mt-2">
                    <button
                      type="submit"
                      disabled={status === "loading"}
                      className="group relative flex h-14 w-full items-center justify-center gap-3 rounded-[12px] bg-gradient-to-r from-[#007C91] to-[#006375] px-8 text-base font-semibold text-white shadow-lg shadow-[#007C91]/25 transition-all duration-300 hover:from-[#006B7D] hover:to-[#005261] hover:shadow-xl hover:shadow-[#007C91]/35 active:scale-[0.99] disabled:opacity-75"
                    >
                      {status === "loading" ? (
                        <span className="inline-flex items-center gap-2.5">
                          <svg className="h-5 w-5 animate-spin text-white" viewBox="0 0 24 24" fill="none">
                            <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" className="opacity-25" />
                            <path fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" className="opacity-75" />
                          </svg>
                          <span>Processing Your Request...</span>
                        </span>
                      ) : (
                        <>
                          <span>Book a Consultation</span>
                          <ArrowUpRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
                        </>
                      )}
                    </button>
                  </div>

                  {/* Trust Indicators */}
                  <div className="sm:col-span-2 mt-2 pt-4 border-t border-slate-100 grid grid-cols-3 gap-2 text-center">
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-1 text-[11px] font-medium text-[#597080]">
                      <Clock className="h-3.5 w-3.5 text-[#007C91] shrink-0" />
                      <span>24h Turnaround</span>
                    </div>
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-1 text-[11px] font-medium text-[#597080]">
                      <ShieldCheck className="h-3.5 w-3.5 text-[#007C91] shrink-0" />
                      <span>100% Confidential</span>
                    </div>
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-1 text-[11px] font-medium text-[#597080]">
                      <Sparkles className="h-3.5 w-3.5 text-[#007C91] shrink-0" />
                      <span>Direct Principal Review</span>
                    </div>
                  </div>
                </form>
              )}
            </div>
          </div>

          {/* ================= RIGHT COLUMN: Premium FAQ Accordion (45%) ================= */}
          <div className="min-w-0 lg:pl-2">
            {/* Eyebrow */}
            <div data-reveal className="reveal flex items-center gap-2.5">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-[#007C91]/20 bg-[#007C91]/10 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.2em] text-[#007C91]">
                <HelpCircle className="h-3 w-3 text-[#007C91]" />
                Frequently Asked Questions
              </span>
            </div>

            {/* Heading */}
            <h2
              data-reveal
              className="reveal mt-4 font-serif text-3xl sm:text-4xl lg:text-[2.75rem] font-normal tracking-tight text-[#172B35] leading-[1.15]"
              style={{ "--d": "100ms" } as React.CSSProperties}
            >
              Your Questions, Answered.
            </h2>

            {/* Description */}
            <p
              data-reveal
              className="reveal mt-3 text-sm sm:text-base leading-relaxed text-[#597080]"
              style={{ "--d": "200ms" } as React.CSSProperties}
            >
              Everything you need to know before starting your architectural journey with us.
            </p>

            {/* Accordion List */}
            <div
              data-reveal
              className="reveal mt-8 flex flex-col gap-3.5"
              style={{ "--d": "300ms" } as React.CSSProperties}
            >
              {FAQ_ITEMS.map((f, idx) => {
                const isOpen = openFaq === idx;
                return (
                  <div
                    key={f.q}
                    className={`rounded-2xl border bg-white/90 backdrop-blur-sm transition-all duration-300 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.03)] ${
                      isOpen
                        ? "border-[#007C91]/50 shadow-md shadow-[#007C91]/5 ring-1 ring-[#007C91]/20 bg-white"
                        : "border-slate-200/80 hover:border-[#007C91]/30 hover:bg-white hover:shadow-md"
                    }`}
                  >
                    <button
                      type="button"
                      onClick={() => setOpenFaq(isOpen ? null : idx)}
                      aria-expanded={isOpen}
                      className="flex w-full items-center justify-between gap-4 p-5 text-left"
                    >
                      <span className="font-serif text-base sm:text-[1.05rem] font-medium text-[#172B35] leading-snug">
                        {f.q}
                      </span>
                      <span
                        className={`grid h-8 w-8 shrink-0 place-items-center rounded-full transition-all duration-300 ${
                          isOpen
                            ? "bg-[#007C91] text-white rotate-45 shadow-sm shadow-[#007C91]/30"
                            : "bg-[#F5FAFB] text-[#007C91] group-hover:bg-[#007C91]/10"
                        }`}
                      >
                        <Plus className="h-4 w-4" />
                      </span>
                    </button>

                    <div
                      className={`grid transition-all duration-300 ease-in-out ${
                        isOpen ? "grid-rows-[1fr] opacity-100 px-5 pb-5" : "grid-rows-[0fr] opacity-0 px-5 pb-0"
                      }`}
                    >
                      <p className="overflow-hidden text-xs sm:text-sm leading-relaxed text-[#597080] border-t border-slate-100 pt-3">
                        {f.a}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Additional Direct Assistance Card */}
            <div
              data-reveal
              className="reveal mt-8 rounded-[20px] border border-[#007C91]/20 bg-gradient-to-br from-[#F0F8FA] to-white p-5 sm:p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-sm"
              style={{ "--d": "400ms" } as React.CSSProperties}
            >
              <div className="flex items-center gap-4">
                <div className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-[#007C91] text-white shadow-md shadow-[#007C91]/20">
                  <HelpCircle className="h-6 w-6" />
                </div>
                <div className="min-w-0">
                  <p className="text-xs font-bold uppercase tracking-wider text-[#007C91]">
                    Have a bespoke requirement?
                  </p>
                  <p className="text-xs text-[#597080] mt-0.5">
                    Speak directly with our architectural advisory team.
                  </p>
                </div>
              </div>
              <a
                href="#contact"
                onClick={(e) => {
                  e.preventDefault();
                  document.querySelector('input[name="name"]')?.scrollIntoView({ behavior: "smooth", block: "center" });
                  (document.querySelector('input[name="name"]') as HTMLInputElement)?.focus();
                }}
                className="inline-flex items-center gap-1.5 shrink-0 rounded-full bg-[#007C91] px-4 py-2 text-xs font-semibold text-white shadow-sm transition-all hover:bg-[#006375]"
              >
                <span>Inquire Now</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </a>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
