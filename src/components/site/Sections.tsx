import { useCallback, useEffect, useRef, useState } from "react";
import {
  ArrowRight,
  ArrowLeft,
  ArrowUpRight,
  Download,
  Play,
  Pause,
  Volume2,
  VolumeX,
  Trophy,
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
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Observer } from "gsap/Observer";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, Observer);
}
import { SLIDES, PROJECTS, SERVICES, FAQS } from "./data";
import studio from "@/assets/studio.jpg";
import studioVideo from "@/assets/studio-video.mp4";
import aboutBuilding from "@/assets/about-building.png";
import vastu from "@/assets/vastu.jpg";
import vastuBg from "@/assets/vastu-bg.png";
import vastuMandala from "@/assets/vastu-mandala.png";
import p1 from "@/assets/p1.jpg";
import p2 from "@/assets/p2.jpg";
import p3 from "@/assets/p3.jpg";
import p4 from "@/assets/p4.jpg";
import p5 from "@/assets/p5.jpg";
import p6 from "@/assets/p6.jpg";
import serviceArch from "@/assets/service-arch.jpg";
import serviceInterior from "@/assets/service-interior.jpg";
import serviceLandscape from "@/assets/service-landscape.jpg";
import avatarPriya from "@/assets/avatar-priya.png";
import avatarRamesh from "@/assets/avatar-ramesh.png";
import avatarAnjali from "@/assets/avatar-anjali.png";
import contactBg from "@/assets/contact-bg.png";

const Container = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => (
  <div className={`mx-auto max-w-[1400px] px-6 md:pl-20 lg:px-24 ${className}`}>{children}</div>
);

/* ---------------- HERO ---------------- */
export function Hero() {
  const [i, setI] = useState(0);
  const [prev, setPrev] = useState<number | null>(null);
  const [paused, setPaused] = useState(false);
  const go = useCallback((n: number) => {
    setI((cur) => { setPrev(cur); return (n + SLIDES.length) % SLIDES.length; });
  }, []);
  useEffect(() => {
    if (paused) return;
    const t = setTimeout(() => go(i + 1), 7000);
    return () => clearTimeout(t);
  }, [i, paused, go]);
  const s = SLIDES[i]!;
  return (
    <section id="home" className="relative h-[100svh] min-h-[600px] overflow-hidden bg-teal-deep" onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)} aria-roledescription="carousel">
      {prev !== null && (
        <img src={SLIDES[prev]!.img} alt="" aria-hidden className="absolute inset-0 h-full w-full object-cover" />
      )}
      <div key={i} className={`absolute inset-0 ${prev !== null ? "animate-doors" : ""}`}>
        <img src={s.img} alt={s.alt} fetchPriority={i === 0 ? "high" : "auto"} className="animate-kenburns absolute inset-0 h-full w-full object-cover" />
      </div>
      <Container className="relative flex h-full flex-col justify-end pb-28 md:pb-32">
        <div key={`t${i}`} className="max-w-3xl drop-shadow-md">
          <p className="animate-fade-up mb-6 text-xs font-bold uppercase tracking-[0.4em] text-cyan drop-shadow" style={{ "--d": "500ms" } as React.CSSProperties}>0{i + 1} / 03 — STUQ</p>
          <h1 className="animate-fade-up font-serif text-5xl leading-[0.95] text-ivory drop-shadow-lg sm:text-7xl lg:text-8xl" style={{ "--d": "700ms" } as React.CSSProperties}>{s.title}</h1>
          <p className="animate-fade-up mt-6 max-w-xl text-lg text-ivory drop-shadow" style={{ "--d": "900ms" } as React.CSSProperties}>{s.text}</p>
          <div className="animate-fade-up mt-10" style={{ "--d": "1100ms" } as React.CSSProperties}>
            <a href={s.href} className="btn-ghost-light">{s.cta} <ArrowRight className="h-4 w-4" /></a>
          </div>
        </div>
      </Container>
      <div className="absolute bottom-8 right-6 flex items-center gap-6 lg:right-24">
        <div className="flex gap-3">
          {SLIDES.map((_, n) => (
            <button key={n} onClick={() => go(n)} aria-label={`Go to slide ${n + 1}`} className="h-6 py-2.5">
              <span className={`block h-px transition-all duration-700 ${n === i ? "w-14 bg-ivory" : "w-6 bg-ivory/40"}`} />
            </button>
          ))}
        </div>
        <div className="flex gap-2">
          <button onClick={() => go(i - 1)} aria-label="Previous slide" className="grid h-11 w-11 place-items-center border border-ivory/40 text-ivory transition-colors hover:bg-ivory hover:text-teal-deep"><ArrowLeft className="h-4 w-4" /></button>
          <button onClick={() => go(i + 1)} aria-label="Next slide" className="grid h-11 w-11 place-items-center border border-ivory/40 text-ivory transition-colors hover:bg-ivory hover:text-teal-deep"><ArrowRight className="h-4 w-4" /></button>
        </div>
      </div>
    </section>
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
            {/* Eyebrow with teal line */}
            <div data-reveal className="reveal flex flex-col items-start gap-1">
              <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#334155]">ABOUT US</span>
              <span className="h-[2.5px] w-8 rounded-full bg-teal" />
            </div>

            {/* Title */}
            <h2
              data-reveal
              className="reveal mt-6 font-serif text-4xl font-normal leading-[1.15] tracking-tight text-[#0f172a] sm:text-5xl lg:text-[3.25rem]"
              style={{ "--d": "100ms" } as React.CSSProperties}
            >
              Architecture, Interiors <br />
              <span className="text-teal">& Landscape.</span>
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

            {/* Awards Box */}
            <div
              data-reveal
              className="reveal mt-8 flex items-center gap-4 rounded-2xl border border-[#d3ecf1] bg-[#f0f8fa] p-4 sm:gap-5 sm:p-5 shadow-sm"
              style={{ "--d": "300ms" } as React.CSSProperties}
            >
              <div className="grid h-14 w-14 shrink-0 place-items-center rounded-full bg-[#a3d9e3]/60 text-teal">
                <Trophy className="h-7 w-7 text-teal" strokeWidth={1.8} />
              </div>
              <div className="h-12 w-px bg-[#cbd5e1]/70" />
              <div className="min-w-0 flex-1">
                <p className="text-xs font-extrabold uppercase tracking-wider text-teal">AWARDS</p>
                <p className="mt-0.5 text-[0.68rem] font-semibold uppercase tracking-wider text-[#64748b]">
                  THE INDIA DESIGN AWARDS 2024.
                </p>
                <p className="mt-1 text-xs font-medium leading-snug text-[#1e293b] sm:text-sm">
                  Our firm has been awarded the prestigious title of{" "}
                  <span className="font-semibold">"Outstanding Firm for Innovative Designs"</span>
                </p>
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

        {/* Bottom: Download Portfolio Row Box */}
        <div
          data-reveal
          className="reveal mt-12 rounded-2xl border border-[#d6ecf0] bg-[#f2f8fa] p-5 sm:p-7 lg:mt-16"
          style={{ "--d": "400ms" } as React.CSSProperties}
        >
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            {/* Left Title & Subtitle */}
            <div className="shrink-0 lg:max-w-[260px]">
              <h3 className="font-display text-xl font-bold text-[#0f172a] sm:text-2xl">Download Portfolio</h3>
              <div className="mt-1.5 h-[2.5px] w-8 rounded-full bg-teal" />
              <p className="mt-3 text-xs leading-relaxed text-[#64748b] sm:text-sm">
                Explore our work across architecture, interiors and landscape projects.
              </p>
            </div>

            {/* Divider */}
            <div className="hidden h-16 w-px bg-[#cbd5e1]/60 lg:block" />

            {/* 3 Portfolio Items */}
            <div className="grid flex-1 grid-cols-1 gap-4 sm:grid-cols-3">
              {/* Architecture Card */}
              <div className="group flex items-center justify-between gap-3 rounded-xl border border-slate-200/80 bg-white p-3 shadow-sm transition-all duration-300 hover:border-teal hover:shadow-md">
                <div className="flex min-w-0 items-center gap-3">
                  <img src={p1} alt="Architecture Project" className="h-13 w-15 shrink-0 rounded-lg object-cover" />
                  <div className="min-w-0">
                    <h4 className="truncate font-bold text-sm text-[#0f172a] transition-colors group-hover:text-teal">
                      Architecture
                    </h4>
                    <p className="text-[0.72rem] text-[#64748b]">Project Portfolio</p>
                  </div>
                </div>
                <button
                  type="button"
                  aria-label="Download Architecture Portfolio"
                  title="Download Architecture Portfolio"
                  className="grid h-9 w-9 shrink-0 place-items-center rounded-full border border-teal/70 text-teal transition-all duration-300 group-hover:bg-teal group-hover:text-white"
                >
                  <Download className="h-4 w-4" />
                </button>
              </div>

              {/* Interior Card */}
              <div className="group flex items-center justify-between gap-3 rounded-xl border border-slate-200/80 bg-white p-3 shadow-sm transition-all duration-300 hover:border-teal hover:shadow-md">
                <div className="flex min-w-0 items-center gap-3">
                  <img src={p2} alt="Interior Project" className="h-13 w-15 shrink-0 rounded-lg object-cover" />
                  <div className="min-w-0">
                    <h4 className="truncate font-bold text-sm text-[#0f172a] transition-colors group-hover:text-teal">
                      Interior
                    </h4>
                    <p className="text-[0.72rem] text-[#64748b]">Project Portfolio</p>
                  </div>
                </div>
                <button
                  type="button"
                  aria-label="Download Interior Portfolio"
                  title="Download Interior Portfolio"
                  className="grid h-9 w-9 shrink-0 place-items-center rounded-full border border-teal/70 text-teal transition-all duration-300 group-hover:bg-teal group-hover:text-white"
                >
                  <Download className="h-4 w-4" />
                </button>
              </div>

              {/* Landscape Card */}
              <div className="group flex items-center justify-between gap-3 rounded-xl border border-slate-200/80 bg-white p-3 shadow-sm transition-all duration-300 hover:border-teal hover:shadow-md">
                <div className="flex min-w-0 items-center gap-3">
                  <img src={p4} alt="Landscape Project" className="h-13 w-15 shrink-0 rounded-lg object-cover" />
                  <div className="min-w-0">
                    <h4 className="truncate font-bold text-sm text-[#0f172a] transition-colors group-hover:text-teal">
                      Landscape
                    </h4>
                    <p className="text-[0.72rem] text-[#64748b]">Project Portfolio</p>
                  </div>
                </div>
                <button
                  type="button"
                  aria-label="Download Landscape Portfolio"
                  title="Download Landscape Portfolio"
                  className="grid h-9 w-9 shrink-0 place-items-center rounded-full border border-teal/70 text-teal transition-all duration-300 group-hover:bg-teal group-hover:text-white"
                >
                  <Download className="h-4 w-4" />
                </button>
              </div>
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

/* ---------------- VASTU SHASTRA ICONS ---------------- */
const LotusIcon = ({ className = "h-7 w-7" }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M12 21c-4-4-8-7-8-11a8 8 0 0 1 16 0c0 4-4 7-8 11z" opacity="0.25" fill="currentColor" />
    <path d="M12 4c-2 3-3.5 6.5-3.5 10 0 2.5 1.5 4.5 3.5 7 2-2.5 3.5-4.5 3.5-7 0-3.5-1.5-7-3.5-10z" strokeWidth="1.8" />
    <path d="M12 14c-3-2-6-2.5-8-1 0 3.5 3 6.5 8 8" />
    <path d="M12 14c3-2 6-2.5 8-1 0 3.5-3 6.5-8 8" />
    <path d="M8 17c-3 0-5-1-5-3 0-3 3-4 5-3" opacity="0.6" />
    <path d="M16 17c3 0 5-1 5-3 0-3-3-4-5-3" opacity="0.6" />
  </svg>
);

const MeditateIcon = ({ className = "h-7 w-7" }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <circle cx="12" cy="5" r="2.2" strokeWidth="1.8" />
    <path d="M12 8v5.5" strokeWidth="1.8" />
    <path d="M8.5 11.5l3.5 2 3.5-2" />
    <path d="M7 17.5c1.5-1.2 3-2 5-2s3.5.8 5 2" />
    <path d="M5.5 19.5c2-1.5 4-2 6.5-2s4.5.5 6.5 2" strokeWidth="1.8" />
    <path d="M8 13.5l-3.5 4" />
    <path d="M16 13.5l3.5 4" />
  </svg>
);

const ProsperityIcon = ({ className = "h-7 w-7" }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M12 21V10" strokeWidth="1.8" />
    <path d="M12 10c0-4.5 3.5-7 8-7 0 4.5-2.5 8-8 8z" fill="currentColor" fillOpacity="0.15" />
    <path d="M12 13.5c0-3.5-2.5-6-6-6 0 3.5 2 6 6 6z" fill="currentColor" fillOpacity="0.15" />
    <path d="M12 17c0-2.5 2-4 4.5-4 0 2.5-1.5 4-4.5 4z" opacity="0.7" />
  </svg>
);

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
            {/* Eyebrow */}
            <div data-reveal className="reveal flex items-center gap-3">
              <span className="h-[2px] w-8 rounded-full bg-[#8C531B]" />
              <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#8C827A]">
                VASTU KNOWLEDGE
              </span>
            </div>

            {/* Title */}
            <h2
              data-reveal
              className="reveal mt-5 font-serif text-4xl font-normal tracking-tight sm:text-5xl lg:text-[3.5rem]"
              style={{ "--d": "100ms" } as React.CSSProperties}
            >
              <span className="text-[#8C531B]">VASTU</span>{" "}
              <span className="text-[#1a1a1a]">SHASTRA</span>
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

            {/* 3 Pillars in a single row */}
            <div
              data-reveal
              className="reveal mt-8 grid grid-cols-3 gap-3 sm:gap-6"
              style={{ "--d": "400ms" } as React.CSSProperties}
            >
              {/* 1. BALANCE */}
              <div className="flex flex-col items-center text-center">
                <div className="grid h-16 w-16 place-items-center rounded-full border border-[#e7d8c5] bg-gradient-to-b from-[#f8f2e9] to-[#eee0ce] text-[#8C531B] shadow-sm transition-transform duration-300 hover:scale-105 sm:h-18 sm:w-18">
                  <LotusIcon className="h-7 w-7 text-[#8C531B]" />
                </div>
                <h3 className="mt-3 text-xs font-extrabold uppercase tracking-wider text-[#1a1a1a]">
                  BALANCE
                </h3>
                <p className="mt-1 text-[0.72rem] leading-snug text-[#736B63]">
                  Harmonizes energy in your space
                </p>
              </div>

              {/* 2. WELL-BEING */}
              <div className="flex flex-col items-center text-center">
                <div className="grid h-16 w-16 place-items-center rounded-full border border-[#e7d8c5] bg-gradient-to-b from-[#f8f2e9] to-[#eee0ce] text-[#8C531B] shadow-sm transition-transform duration-300 hover:scale-105 sm:h-18 sm:w-18">
                  <MeditateIcon className="h-7 w-7 text-[#8C531B]" />
                </div>
                <h3 className="mt-3 text-xs font-extrabold uppercase tracking-wider text-[#1a1a1a]">
                  WELL-BEING
                </h3>
                <p className="mt-1 text-[0.72rem] leading-snug text-[#736B63]">
                  Supports physical, mental & emotional health
                </p>
              </div>

              {/* 3. PROSPERITY */}
              <div className="flex flex-col items-center text-center">
                <div className="grid h-16 w-16 place-items-center rounded-full border border-[#e7d8c5] bg-gradient-to-b from-[#f8f2e9] to-[#eee0ce] text-[#8C531B] shadow-sm transition-transform duration-300 hover:scale-105 sm:h-18 sm:w-18">
                  <ProsperityIcon className="h-7 w-7 text-[#8C531B]" />
                </div>
                <h3 className="mt-3 text-xs font-extrabold uppercase tracking-wider text-[#1a1a1a]">
                  PROSPERITY
                </h3>
                <p className="mt-1 text-[0.72rem] leading-snug text-[#736B63]">
                  Creates positive vibrations for growth
                </p>
              </div>
            </div>

            {/* Read More Button */}
            <div data-reveal className="reveal mt-9" style={{ "--d": "500ms" } as React.CSSProperties}>
              <a
                href="#contact"
                className="inline-flex items-center gap-3 rounded-sm bg-[#8C531B] px-8 py-3.5 text-sm font-semibold text-white shadow-md transition-all duration-300 hover:bg-[#734012] hover:shadow-lg focus-visible:ring-2 focus-visible:ring-[#8C531B]"
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
            <div className="relative w-full max-w-[530px] overflow-hidden rounded-xl bg-white p-2 shadow-2xl transition-transform duration-500 hover:scale-[1.01]">
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

/* ---------------- PROJECTS (Vertical Slide-Down Animation with Immediate Scroll Reveal) ---------------- */
export function Projects() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const pinnedRef = useRef<HTMLDivElement>(null);

  const [activeIdx, setActiveIdx] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  // Synchronous refs for smooth scroll handling without delays
  const activeIdxRef = useRef(0);
  const isLockedRef = useRef(false);
  const animTimerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    activeIdxRef.current = activeIdx;
  }, [activeIdx]);

  // Navigate to slide with responsive 600ms slide-down animation (no delay lock)
  const goToSlide = useCallback((targetIdx: number) => {
    if (targetIdx === activeIdxRef.current || isLockedRef.current) return;
    if (targetIdx < 0 || targetIdx >= PROJECTS.length) return;

    if (animTimerRef.current) clearTimeout(animTimerRef.current);

    isLockedRef.current = true;
    setIsAnimating(true);
    setActiveIdx(targetIdx);
    activeIdxRef.current = targetIdx;

    // Fast, responsive 500ms debounce while the slide moves
    animTimerRef.current = setTimeout(() => {
      setIsAnimating(false);
      isLockedRef.current = false;
    }, 500);
  }, []);

  // GSAP ScrollTrigger pinning and responsive scroll listeners
  useEffect(() => {
    if (typeof window === "undefined") return;

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: sectionRef.current,
        pin: pinnedRef.current,
        start: "top top",
        end: `+=${PROJECTS.length * 600}`,
        scrub: false,
      });
    }, sectionRef);

    let wheelDelta = 0;
    let wheelResetTimer: NodeJS.Timeout | null = null;

    const handleWheel = (e: WheelEvent) => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      const isVisible = rect.top <= 10 && rect.bottom >= window.innerHeight - 10;
      if (!isVisible) return;

      const currentIdx = activeIdxRef.current;
      const isLocked = isLockedRef.current;

      // Downward scroll
      if (e.deltaY > 0) {
        if (currentIdx < PROJECTS.length - 1) {
          e.preventDefault();
          if (!isLocked) {
            wheelDelta += e.deltaY;
            if (Math.abs(wheelDelta) > 20) {
              wheelDelta = 0;
              goToSlide(currentIdx + 1);
            }
          }
        }
        // When on the final project, natural scroll immediately continues down to next section
      }
      // Upward scroll
      else if (e.deltaY < 0) {
        if (currentIdx > 0) {
          e.preventDefault();
          if (!isLocked) {
            wheelDelta += e.deltaY;
            if (Math.abs(wheelDelta) > 20) {
              wheelDelta = 0;
              goToSlide(currentIdx - 1);
            }
          }
        }
        // When on the first project, natural scroll immediately continues up to previous section
      }

      if (wheelResetTimer) clearTimeout(wheelResetTimer);
      wheelResetTimer = setTimeout(() => {
        wheelDelta = 0;
      }, 150);
    };

    // Touch gesture handling
    let touchStartY = 0;
    let touchStartX = 0;

    const handleTouchStart = (e: TouchEvent) => {
      touchStartY = e.touches[0].clientY;
      touchStartX = e.touches[0].clientX;
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      const isVisible = rect.top <= 10 && rect.bottom >= window.innerHeight - 10;
      if (!isVisible) return;

      const touchEndY = e.touches[0].clientY;
      const touchEndX = e.touches[0].clientX;
      const deltaY = touchStartY - touchEndY;
      const deltaX = touchStartX - touchEndX;

      if (Math.abs(deltaY) > Math.abs(deltaX) && Math.abs(deltaY) > 30) {
        const currentIdx = activeIdxRef.current;
        const isLocked = isLockedRef.current;

        if (deltaY > 0) {
          // Swipe up (navigate down)
          if (currentIdx < PROJECTS.length - 1) {
            e.preventDefault();
            if (!isLocked) {
              touchStartY = touchEndY;
              goToSlide(currentIdx + 1);
            }
          }
        } else if (deltaY < 0) {
          // Swipe down (navigate up)
          if (currentIdx > 0) {
            e.preventDefault();
            if (!isLocked) {
              touchStartY = touchEndY;
              goToSlide(currentIdx - 1);
            }
          }
        }
      }
    };

    // Keyboard navigation
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      const isVisible = rect.top <= 10 && rect.bottom >= window.innerHeight - 10;
      if (!isVisible) return;

      const currentIdx = activeIdxRef.current;
      const isLocked = isLockedRef.current;

      if (e.key === "ArrowDown" || e.key === "PageDown" || (e.key === " " && !e.shiftKey)) {
        if (currentIdx < PROJECTS.length - 1) {
          e.preventDefault();
          if (!isLocked) goToSlide(currentIdx + 1);
        }
      } else if (e.key === "ArrowUp" || e.key === "PageUp" || (e.key === " " && e.shiftKey)) {
        if (currentIdx > 0) {
          e.preventDefault();
          if (!isLocked) goToSlide(currentIdx - 1);
        }
      }
    };

    window.addEventListener("wheel", handleWheel, { passive: false });
    window.addEventListener("touchstart", handleTouchStart, { passive: true });
    window.addEventListener("touchmove", handleTouchMove, { passive: false });
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      ctx.revert();
      window.removeEventListener("wheel", handleWheel);
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("keydown", handleKeyDown);
      if (animTimerRef.current) clearTimeout(animTimerRef.current);
      if (wheelResetTimer) clearTimeout(wheelResetTimer);
    };
  }, [goToSlide]);

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="relative bg-[#F8FBFB]"
      style={{ minHeight: `${PROJECTS.length * 90 + 30}vh` }}
    >
      {/* Sticky Viewport Container */}
      <div
        ref={pinnedRef}
        className="sticky top-0 flex h-screen w-full flex-col justify-center overflow-hidden py-6 sm:py-10"
      >
        {/* Ambient Architectural Lighting Mesh */}
        <div className="pointer-events-none absolute -top-32 -left-32 h-[450px] w-[450px] rounded-full bg-[#35A9C1]/10 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-32 -right-32 h-[450px] w-[450px] rounded-full bg-[#007C91]/10 blur-3xl" />

        {/* Floating butterfly graphic at top right */}
        <div className="pointer-events-none absolute right-12 top-8 z-20 hidden md:block">
          <svg width="36" height="36" viewBox="0 0 40 40" aria-hidden="true">
            <g className="wing-l">
              <path d="M20 20 C10 4, 0 10, 6 20 C0 30, 10 34, 20 22Z" fill="#007C91" opacity=".85" />
            </g>
            <g className="wing-r">
              <path d="M20 20 C30 4, 40 10, 34 20 C40 30, 30 34, 20 22Z" fill="#35A9C1" opacity=".9" />
            </g>
            <rect x="19" y="13" width="2" height="16" rx="1" fill="#172B35" />
          </svg>
        </div>

        <div className="mx-auto w-full max-w-[1400px] px-6 lg:px-12 flex flex-col justify-center h-full gap-4 sm:gap-6 relative z-10">
          {/* ================= 1. TOP HEADER ================= */}
          <div className="text-center max-w-3xl mx-auto shrink-0">
            {/* Centered Eyebrow */}
            <div className="flex items-center justify-center gap-2">
              <span className="h-[1.5px] w-6 bg-[#007C91]" />
              <p className="text-xs font-bold uppercase tracking-[0.3em] text-[#007C91]">
                OUR PROJECTS
              </p>
              <span className="h-[1.5px] w-6 bg-[#007C91]" />
            </div>

            {/* Main Heading */}
            <h2 className="mt-2 font-serif text-3xl sm:text-4xl md:text-[2.65rem] font-normal tracking-tight text-[#172B35] leading-tight">
              A Journey Through Our Projects
            </h2>

            {/* Subtitle Paragraph */}
            <p className="mt-2 text-xs sm:text-sm text-[#597080] max-w-2xl mx-auto leading-relaxed">
              Explore our diverse portfolio of architectural, interior, and landscape landmarks crafted with creativity, precision, and purpose.
            </p>
          </div>

          {/* ================= 2. SLIDING SHOWCASE DECK WITH VERTICAL PROGRESS ================= */}
          <div className="relative w-full max-w-[1300px] mx-auto shrink-0 flex items-center gap-5 sm:gap-7">
            {/* Vertical Progress Pillar (Brand Colors: #007C91, #35A9C1, #E9F3F4) */}
            <div className="hidden md:flex flex-col items-center gap-2 shrink-0 py-2">
              <span className="font-mono text-[11px] font-bold text-[#007C91]">
                0{activeIdx + 1}
              </span>
              <div className="relative h-44 w-1.5 rounded-full bg-[#E9F3F4] overflow-hidden">
                <div
                  className="absolute top-0 left-0 w-full rounded-full bg-gradient-to-b from-[#35A9C1] to-[#007C91] transition-all duration-500 ease-out"
                  style={{
                    height: `${((activeIdx + 1) / PROJECTS.length) * 100}%`,
                  }}
                />
              </div>
              <span className="font-mono text-[11px] font-medium text-slate-400">
                0{PROJECTS.length}
              </span>
            </div>

            {/* Main Outer Deck Viewport */}
            <div className="group relative aspect-[16/10] sm:aspect-[2/1] lg:aspect-[2.35/1] max-h-[500px] w-full overflow-hidden rounded-[26px] bg-[#0c181f] shadow-2xl ring-1 ring-black/15 flex-1">
              {/* Vertical Stack with 600ms Slide-Down and Scale Transform */}
              {PROJECTS.map((p, idx) => {
                const isActive = idx === activeIdx;

                // Slide-down positioning:
                // - Active slide is at translateY(0)
                // - Preceding slides have slid down out to translateY(100%)
                // - Succeeding slides wait above at translateY(-100%) to slide down
                let translateY = "0%";
                if (idx < activeIdx) {
                  translateY = "100%";
                } else if (idx > activeIdx) {
                  translateY = "-100%";
                }

                return (
                  <div
                    key={p.title}
                    className="absolute inset-0 h-full w-full overflow-hidden will-change-transform transform-gpu"
                    style={{
                      transform: `translateY(${translateY})`,
                      transition: "transform 600ms cubic-bezier(0.22, 1, 0.36, 1)",
                      zIndex: isActive ? 10 : 5,
                      pointerEvents: isActive ? "auto" : "none",
                    }}
                  >
                    {/* Slide Image with 1.05 -> 1.0 Scale & Opacity */}
                    <img
                      src={p.img}
                      alt={p.title}
                      loading={idx === 0 ? "eager" : "lazy"}
                      className="h-full w-full object-cover will-change-transform select-none transform-gpu"
                      style={{
                        transform: isActive ? "scale(1.0)" : "scale(1.05)",
                        opacity: isActive ? 1 : 0.65,
                        transition:
                          "transform 600ms cubic-bezier(0.22, 1, 0.36, 1), opacity 250ms ease-out",
                      }}
                    />

                    {/* Premium Architectural Vignette Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/35 to-black/15" />

                    {/* Top Watermark Badge */}
                    <div className="absolute top-6 left-6 z-10">
                      <span className="inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-black/45 px-3.5 py-1 text-xs font-mono font-bold tracking-widest text-[#35A9C1] backdrop-blur-md">
                        <span>0{idx + 1}</span>
                        <span className="text-white/40">/</span>
                        <span className="text-white/70">0{PROJECTS.length}</span>
                      </span>
                    </div>

                    {/* Bottom Overlay Content with Smooth Text Reveal */}
                    <div
                      className="absolute inset-x-0 bottom-0 z-10 flex flex-col justify-end p-6 sm:p-8"
                      style={{
                        opacity: isActive ? 1 : 0,
                        transform: isActive ? "translateY(0)" : "translateY(18px)",
                        transition:
                          "opacity 400ms cubic-bezier(0.22, 1, 0.36, 1) 150ms, transform 400ms cubic-bezier(0.22, 1, 0.36, 1) 150ms",
                      }}
                    >
                      <div className="flex items-center gap-2">
                        <span className="rounded-md bg-[#007C91] px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-white shadow-sm">
                          {p.cat}
                        </span>
                        <span className="text-xs text-white/80 font-medium">
                          {p.loc}
                        </span>
                      </div>

                      <h3 className="mt-2 font-serif text-2xl sm:text-3xl lg:text-4xl font-normal text-white">
                        {p.title}
                      </h3>

                      {p.concept && (
                        <p className="mt-1.5 max-w-xl text-xs sm:text-sm leading-relaxed text-white/85 line-clamp-2">
                          {p.concept}
                        </p>
                      )}
                    </div>
                  </div>
                );
              })}

              {/* Status Pill: Project Counter & Guide */}
              <div className="absolute top-6 right-6 z-20 flex items-center gap-2">
                <div className="inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-black/45 px-3.5 py-1 text-xs font-medium text-white/90 backdrop-blur-md">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#35A9C1]" />
                  <span>Project 0{activeIdx + 1} of 0{PROJECTS.length}</span>
                </div>
              </div>

              {/* Floating Navigation Arrow Controls */}
              <div className="absolute bottom-6 right-6 z-20 flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => goToSlide(activeIdx - 1)}
                  disabled={activeIdx === 0 || isAnimating}
                  aria-label="Previous project"
                  className={`grid h-10 w-10 place-items-center rounded-full border border-white/20 bg-black/45 text-white backdrop-blur-md transition-all ${
                    activeIdx === 0 || isAnimating
                      ? "opacity-30 cursor-not-allowed"
                      : "hover:scale-110 hover:bg-white hover:text-[#172B35]"
                  }`}
                >
                  <ArrowLeft className="h-4 w-4" />
                </button>
                <button
                  type="button"
                  onClick={() => goToSlide(activeIdx + 1)}
                  disabled={activeIdx === PROJECTS.length - 1 || isAnimating}
                  aria-label="Next project"
                  className={`grid h-10 w-10 place-items-center rounded-full border border-white/20 bg-black/45 text-white backdrop-blur-md transition-all ${
                    activeIdx === PROJECTS.length - 1 || isAnimating
                      ? "opacity-30 cursor-not-allowed"
                      : "hover:scale-110 hover:bg-white hover:text-[#172B35]"
                  }`}
                >
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>

          {/* ================= 3. UNDER IMAGES: Segmented Progress & View All Button ================= */}
          <div className="mt-2 flex flex-col sm:flex-row items-center justify-between gap-4 w-full max-w-[1300px] mx-auto shrink-0">
            {/* Progress Segmented Track */}
            <div className="flex items-center gap-3 w-full sm:w-auto">
              <span className="font-mono text-xs font-bold text-[#007C91]">0{activeIdx + 1}</span>
              <div className="flex gap-2">
                {PROJECTS.map((p, idx) => {
                  const isCurrent = idx === activeIdx;
                  return (
                    <button
                      key={p.title}
                      onClick={() => goToSlide(idx)}
                      disabled={isAnimating}
                      aria-label={`Slide to project ${idx + 1}: ${p.title}`}
                      className="group py-2 disabled:cursor-not-allowed"
                    >
                      <span
                        className={`block h-1.5 rounded-full transition-all duration-400 ${
                          isCurrent
                            ? "w-10 bg-[#007C91]"
                            : "w-3 bg-slate-200 group-hover:bg-[#35A9C1]/50"
                        }`}
                      />
                    </button>
                  );
                })}
              </div>
              <span className="font-mono text-xs text-slate-400">0{PROJECTS.length}</span>
            </div>

            {/* View All Projects Button */}
            <a
              href="#contact"
              className="inline-flex items-center gap-2 rounded-full bg-[#007C91] px-7 py-2.5 text-xs sm:text-sm font-semibold text-white shadow-lg shadow-[#007C91]/20 transition-all duration-300 hover:bg-[#006375] hover:shadow-xl hover:scale-105"
            >
              <span>View All Projects</span>
              <ArrowRight className="h-4 w-4" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------------- SERVICE ICONS ---------------- */
const ServiceArchIcon = ({ className = "h-5 w-5" }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M3 21h18" />
    <path d="M5 21V9l7-6 7 6v12" />
    <path d="M9 21v-7a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v7" />
    <path d="M9 9h6" />
    <path d="M9 13h6" />
  </svg>
);

const ServiceInteriorIcon = ({ className = "h-5 w-5" }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M4 11V7a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v4" />
    <path d="M2 13a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v4a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2v-4z" />
    <path d="M6 19v2" />
    <path d="M18 19v2" />
    <path d="M8 11V8" />
    <path d="M16 11V8" />
  </svg>
);

const ServiceLandscapeIcon = ({ className = "h-5 w-5" }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M12 22V10" />
    <path d="M12 10C8 10 5 6 5 2c4 0 7 3 7 8z" fill="currentColor" fillOpacity="0.15" />
    <path d="M12 13c4 0 7-3 7-7-4 0-7 3-7 7z" fill="currentColor" fillOpacity="0.15" />
    <path d="M12 17c-3 0-5-2-5-5 3 0 5 2 5 5z" />
  </svg>
);

const ServiceStructuralIcon = ({ className = "h-5 w-5" }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <rect x="3" y="3" width="18" height="18" rx="2" />
    <path d="M3 3l18 18" />
    <path d="M21 3L3 21" />
    <path d="M12 3v18" />
    <path d="M3 12h18" />
  </svg>
);

const ServicePmIcon = ({ className = "h-5 w-5" }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
    <rect x="8" y="2" width="8" height="4" rx="1" />
    <path d="M9 12l2 2 4-4" />
    <path d="M9 17h6" />
  </svg>
);

const ServiceBimIcon = ({ className = "h-5 w-5" }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M12 2L2 7l10 5 10-5-10-5z" />
    <path d="M2 17l10 5 10-5" />
    <path d="M2 12l10 5 10-5" />
    <line x1="12" y1="22" x2="12" y2="12" />
  </svg>
);

const SERVICES_LIST = [
  {
    num: "01",
    title: "ARCHITECTURAL\nDESIGN",
    img: serviceArch,
    icon: ServiceArchIcon,
    desc: "Our experts prepare preliminary design sketches and concepts based on your requirements and budget, helping you explore and visualize the best options for your dream space.",
    delay: "100ms",
  },
  {
    num: "02",
    title: "INTERIOR\nDESIGN",
    img: serviceInterior,
    icon: ServiceInteriorIcon,
    desc: "Our designers plan, research, coordinate and enhance interiors to create healthier, more functional and aesthetically pleasing environments using the space efficiently.",
    delay: "200ms",
  },
  {
    num: "03",
    title: "LANDSCAPE\nDESIGN",
    img: serviceLandscape,
    icon: ServiceLandscapeIcon,
    desc: "Our team uses their creativity and understanding of outdoor environments to create well-designed outdoor spaces that are functional and visually appealing, with suitable plants, types of grass, furniture and other design elements.",
    delay: "300ms",
  },
  {
    num: "04",
    title: "STRUCTURAL\nDESIGN",
    img: p4,
    icon: ServiceStructuralIcon,
    desc: "Comprehensive structural engineering analysis, foundational design, framing systems, and seismic-resilient planning coordinated to guarantee structural integrity, compliance, and safety.",
    delay: "400ms",
  },
  {
    num: "05",
    title: "PROJECT\nMANAGEMENT",
    img: p5,
    icon: ServicePmIcon,
    desc: "End-to-end execution oversight, schedule monitoring, quality assurance, cost engineering, and vendor coordination ensuring smooth construction on time and within budget.",
    delay: "500ms",
  },
  {
    num: "06",
    title: "BIM\nSERVICES",
    img: p6,
    icon: ServiceBimIcon,
    desc: "Building Information Modeling (BIM) creating coordinated 3D digital models, parametric documentation, clash detection, and multidisciplinary workflows for seamless execution.",
    delay: "600ms",
  },
];

/* ---------------- SERVICES ---------------- */
export function Services() {
  return (
    <section id="services" className="relative overflow-hidden bg-gradient-to-b from-[#f2f9fb] via-[#edf6f9] to-[#f6fbfc] py-24 lg:py-32">
      {/* Decorative leaf flourish in bottom-right corner */}
      <div className="pointer-events-none absolute -bottom-16 -right-16 opacity-20">
        <svg viewBox="0 0 300 300" className="h-72 w-72 text-teal" fill="currentColor">
          <path d="M150 0C67.157 0 0 67.157 0 150c0 82.843 67.157 150 150 150 82.843 0 150-67.157 150-150C300 67.157 232.843 0 150 0zm0 40c60.751 0 110 49.249 110 110 0 60.751-49.249 110-110 110-60.751 0-110-49.249-110-110 0-60.751 49.249-110 110-110z" />
          <path d="M150 70c-44.183 0-80 35.817-80 80s35.817 80 80 80 80-35.817 80-80-35.817-80-80-80z" />
        </svg>
      </div>

      <Container className="relative">
        {/* Centered Eyebrow */}
        <div data-reveal className="reveal flex items-center justify-center gap-3">
          <span className="h-[1.5px] w-8 rounded-full bg-teal/60" />
          <span className="text-xs font-bold uppercase tracking-[0.3em] text-teal">OUR SERVICES</span>
          <span className="h-[1.5px] w-8 rounded-full bg-teal/60" />
        </div>

        {/* Centered Main Title */}
        <h2
          data-reveal
          className="reveal mt-4 text-center font-serif text-4xl font-normal tracking-tight text-[#0e2638] sm:text-5xl lg:text-[3.25rem] leading-[1.12]"
          style={{ "--d": "100ms" } as React.CSSProperties}
        >
          Concept to Creation <br />
          <span className="font-semibold text-teal">Spaces for Every Story</span>
        </h2>

        {/* Subtitle */}
        <p
          data-reveal
          className="reveal mx-auto mt-5 max-w-2xl text-center text-sm sm:text-[0.95rem] leading-relaxed text-[#597080]"
          style={{ "--d": "200ms" } as React.CSSProperties}
        >
          From architectural planning to interiors, structures, BIM and project management, we offer comprehensive end-to-end solutions tailored to your vision.
        </p>

        {/* 6 Service Cards Grid (3 columns on desktop, 2 on tablet, 1 on mobile) */}
        <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-3 lg:gap-8">
          {SERVICES_LIST.map((srv) => {
            const Icon = srv.icon;
            return (
              <div
                key={srv.num}
                data-reveal
                className="reveal group relative flex flex-col justify-between rounded-3xl border border-slate-100 bg-white p-5 shadow-lg shadow-teal/5 transition-all duration-500 hover:-translate-y-1.5 hover:shadow-2xl sm:p-6"
                style={{ "--d": srv.delay } as React.CSSProperties}
              >
                <div>
                  {/* Top Watermark Number + Image Container */}
                  <div className="relative">
                    <span className="pointer-events-none absolute right-2 -top-1 font-display text-5xl font-bold text-teal/20">
                      {srv.num}
                    </span>
                    <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl bg-slate-100">
                      <img
                        src={srv.img}
                        alt={srv.title.replace("\n", " ")}
                        loading="lazy"
                        className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                    </div>
                    {/* Overlapping circular icon badge */}
                    <div className="absolute -bottom-5 left-4 grid h-12 w-12 place-items-center rounded-full border border-teal/40 bg-white text-teal shadow-md transition-transform duration-300 group-hover:scale-110">
                      <Icon className="h-5 w-5 text-teal" />
                    </div>
                  </div>

                  {/* Content */}
                  <div className="mt-9">
                    <h3 className="font-display text-lg font-bold tracking-tight text-[#0f2434] whitespace-pre-line">
                      {srv.title}
                    </h3>
                    <p className="mt-3 text-xs sm:text-[0.82rem] leading-relaxed text-[#597080]">
                      {srv.desc}
                    </p>
                  </div>
                </div>

                <div className="mt-8 pt-2">
                  <a
                    href="#contact"
                    className="inline-flex items-center gap-2 rounded-full border border-[#0f2434]/40 px-5 py-2 text-xs font-semibold text-[#0f2434] transition-all duration-300 hover:border-teal hover:bg-teal hover:text-white"
                  >
                    <span>Learn More</span>
                    <span className="text-sm">→</span>
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}

/* ---------------- TESTIMONIALS ---------------- */
const TESTIMONIALS_DATA = [
  {
    name: "Priya Sharma",
    role: "Homeowner, Vijayawada",
    quote: "SEA transformed our dream home into a beautiful reality. Their attention to detail and professionalism is truly commendable.",
    avatar: avatarPriya,
    rating: 5,
  },
  {
    name: "Ramesh Kumar",
    role: "Business Owner, Hyderabad",
    quote: "Excellent design, great team and on-time delivery. We are extremely happy with the outcome.",
    avatar: avatarRamesh,
    rating: 5,
  },
  {
    name: "Anjali Rao",
    role: "Villa Owner, Guntur",
    quote: "The landscape design they created has completely changed the look and feel of our property. Highly recommended!",
    avatar: avatarAnjali,
    rating: 5,
  },
];

export function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? TESTIMONIALS_DATA.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev === TESTIMONIALS_DATA.length - 1 ? 0 : prev + 1));
  };

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
            onClick={prevSlide}
            aria-label="Previous testimonial"
            className="absolute -left-4 sm:-left-6 top-1/2 -translate-y-1/2 z-20 hidden md:flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur-md border border-white/20 shadow-lg transition-all duration-300 hover:bg-white hover:text-[#03343d] hover:scale-105"
          >
            <ArrowLeft className="h-5 w-5" />
          </button>

          {/* Navigation Arrow Right */}
          <button
            onClick={nextSlide}
            aria-label="Next testimonial"
            className="absolute -right-4 sm:-right-6 top-1/2 -translate-y-1/2 z-20 hidden md:flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur-md border border-white/20 shadow-lg transition-all duration-300 hover:bg-white hover:text-[#03343d] hover:scale-105"
          >
            <ArrowRight className="h-5 w-5" />
          </button>

          {/* Testimonial Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            {TESTIMONIALS_DATA.map((t, idx) => (
              <div
                key={t.name}
                className={`group relative flex flex-col justify-between rounded-2xl bg-white p-7 sm:p-8 text-slate-800 shadow-2xl transition-all duration-300 hover:-translate-y-1.5 hover:shadow-cyan/10 ${
                  idx === currentIndex ? "ring-2 ring-[#38d9c0]/50" : ""
                }`}
              >
                <div>
                  {/* Avatar + Rating */}
                  <div className="flex flex-col items-center text-center">
                    <div className="relative h-16 w-16 overflow-hidden rounded-full ring-4 ring-[#03343d]/10 shadow-md">
                      <img
                        src={t.avatar}
                        alt={t.name}
                        className="h-full w-full object-cover"
                      />
                    </div>

                    <div className="mt-4 flex items-center justify-center gap-1">
                      {Array.from({ length: t.rating }).map((_, i) => (
                        <Star key={i} className="h-4 w-4 fill-amber-400 text-amber-400" />
                      ))}
                    </div>
                  </div>

                  {/* Quote Text */}
                  <p className="mt-5 text-center text-sm sm:text-[0.925rem] leading-relaxed text-slate-600 font-normal italic">
                    "{t.quote}"
                  </p>
                </div>

                {/* Author Info */}
                <div className="mt-6 border-t border-slate-100 pt-4 text-center">
                  <h3 className="font-serif text-base font-bold text-[#03343d]">
                    {t.name}
                  </h3>
                  <p className="text-xs text-slate-400 mt-0.5">
                    {t.role}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination Indicators */}
          <div className="mt-10 flex items-center justify-center gap-2.5">
            {TESTIMONIALS_DATA.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentIndex(idx)}
                aria-label={`Go to testimonial ${idx + 1}`}
                className={`h-2.5 rounded-full transition-all duration-300 ${
                  idx === currentIndex ? "w-8 bg-[#38d9c0]" : "w-2.5 bg-white/30 hover:bg-white/50"
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
      newErrors.name = "Please enter your full name.";
    }
    if (!/^\S+@\S+\.\S+$/.test(formData.email.trim())) {
      newErrors.email = "Please enter a valid email address.";
    }
    if (!/^[+\d\s()-]{7,}$/.test(formData.phone.trim())) {
      newErrors.phone = "Please enter a valid phone number.";
    }
    if (!formData.type) {
      newErrors.type = "Please select a project type.";
    }
    if (!formData.consent) {
      newErrors.consent = "Please agree to be contacted.";
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
      <div className="pointer-events-none absolute inset-0 z-0 opacity-[0.03] bg-[linear-gradient(to_right,#007C91_1px,transparent_1px),linear-gradient(to_bottom,#007C91_1px,transparent_1px)] bg-[size:3.5rem_3.5rem]" />
      <div className="pointer-events-none absolute -top-32 -left-32 h-[480px] w-[480px] rounded-full bg-[#35A9C1]/15 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-32 -right-32 h-[480px] w-[480px] rounded-full bg-[#007C91]/15 blur-3xl" />
      <div className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[650px] w-[650px] rounded-full bg-[#007C91]/5 blur-[120px]" />

      <Container className="relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_1fr] gap-12 lg:gap-16 items-start">
          {/* ================= LEFT COLUMN: Premium Consultation Form (55%) ================= */}
          <div>
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
                          errors.name ? "border-red-400 bg-red-50/20" : "border-slate-200"
                        }`}
                      />
                    </div>
                    {errors.name && <p className="mt-1.5 text-xs text-red-500">{errors.name}</p>}
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
                          errors.email ? "border-red-400 bg-red-50/20" : "border-slate-200"
                        }`}
                      />
                    </div>
                    {errors.email && <p className="mt-1.5 text-xs text-red-500">{errors.email}</p>}
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
                          errors.phone ? "border-red-400 bg-red-50/20" : "border-slate-200"
                        }`}
                      />
                    </div>
                    {errors.phone && <p className="mt-1.5 text-xs text-red-500">{errors.phone}</p>}
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
                          errors.type ? "border-red-400 bg-red-50/20" : "border-slate-200"
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
                    {errors.type && <p className="mt-1.5 text-xs text-red-500">{errors.type}</p>}
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
                    {errors.consent && (
                      <p className="mt-1 text-xs text-red-500">{errors.consent}</p>
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
          <div className="lg:pl-2">
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
