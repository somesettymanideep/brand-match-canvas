import { useCallback, useEffect, useRef, useState } from "react";
import { ArrowRight, ArrowLeft, Download, Play, Pause, Volume2, VolumeX, X, Compass, LayoutGrid, Sun, Quote, Plus } from "lucide-react";
import { SLIDES, PROJECTS, SERVICES, FAQS } from "./data";
import studio from "@/assets/studio.jpg";
import studioVideo from "@/assets/studio-video.mp4";
import vastu from "@/assets/vastu.jpg";
import p1 from "@/assets/p1.jpg";
import p2 from "@/assets/p2.jpg";
import p4 from "@/assets/p4.jpg";

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
          <h1 className="animate-fade-up text-5xl leading-[0.95] text-ivory drop-shadow-lg sm:text-7xl lg:text-8xl" style={{ "--d": "700ms" } as React.CSSProperties}>{s.title}</h1>
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
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isMuted, setIsMuted] = useState(true);
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

  const portfolios = [
    {
      t: "Architecture Portfolio",
      d: "Residential, commercial, and contemporary architectural projects.",
      img: p1,
    },
    {
      t: "Interior Design Portfolio",
      d: "Refined interiors, material palettes, and spatial experiences.",
      img: p2,
    },
    {
      t: "Landscape Portfolio",
      d: "Outdoor environments, gardens, and integrated landscape concepts.",
      img: p4,
    },
  ];

  return (
    <section id="about" className="py-28 lg:py-40">
      <Container>
        {/* Top: Description (Left) + Autoplay Video (Right) */}
        <div className="grid items-center gap-16 lg:grid-cols-[5fr_6fr] lg:gap-20">
          <div>
            <p data-reveal className="reveal eyebrow">About STUQ</p>
            <h2 data-reveal className="reveal mt-6 text-4xl leading-tight md:text-6xl" style={{ "--d": "100ms" } as React.CSSProperties}>
              Designing Spaces. Defining Experiences.
            </h2>
            <p data-reveal className="reveal mt-8 text-lg leading-relaxed text-muted-foreground" style={{ "--d": "200ms" } as React.CSSProperties}>
              STUQ – Studio for Eclectic Architecture brings architecture, interiors, landscapes, and technical expertise together to create thoughtfully designed spaces. Our approach combines creative exploration, functional planning, material sensitivity, and attention to detail to shape environments that are meaningful to live and work in.
            </p>
            <div data-reveal className="reveal mt-10" style={{ "--d": "300ms" } as React.CSSProperties}>
              <a href="#contact" className="btn-primary">
                Book a Studio Consultation <ArrowRight className="h-4 w-4" />
              </a>
            </div>
          </div>

          <div>
            <div data-reveal className="reveal-mask relative aspect-[16/10] overflow-hidden rounded-sm border border-border bg-teal-deep shadow-2xl">
              <video
                ref={videoRef}
                src={studioVideo}
                autoPlay
                loop
                muted={isMuted}
                playsInline
                className="h-full w-full object-cover"
              />

              {/* Sound Control Button */}
              <div className="absolute right-4 top-4 z-10">
                <button
                  type="button"
                  onClick={toggleSound}
                  aria-label={isMuted ? "Turn sound on" : "Mute sound"}
                  className="flex items-center gap-2 rounded-full bg-teal-deep/85 px-3.5 py-2 text-xs font-semibold text-ivory shadow-lg backdrop-blur-md transition-all hover:scale-105 hover:bg-teal focus-visible:ring-2 focus-visible:ring-cyan"
                >
                  {isMuted ? (
                    <>
                      <VolumeX className="h-4 w-4 text-cyan" />
                      <span>Unmute</span>
                    </>
                  ) : (
                    <>
                      <Volume2 className="h-4 w-4 text-cyan" />
                      <span>Sound On</span>
                    </>
                  )}
                </button>
              </div>

              {/* Bottom Video Bar */}
              <div className="absolute inset-x-0 bottom-0 flex items-center justify-between bg-gradient-to-t from-teal-deep/95 via-teal-deep/50 to-transparent p-4 text-ivory">
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={togglePlay}
                    aria-label={isPlaying ? "Pause video" : "Play video"}
                    className="grid h-8 w-8 place-items-center rounded-full bg-teal text-ivory transition-transform hover:scale-110 hover:bg-cyan hover:text-teal-deep"
                  >
                    {isPlaying ? <Pause className="h-3.5 w-3.5 fill-current" /> : <Play className="ml-0.5 h-3.5 w-3.5 fill-current" />}
                  </button>
                  <span className="text-xs font-semibold uppercase tracking-wider text-ivory/95">
                    Studio for Eclectic Architecture
                  </span>
                </div>
                <span className="text-[0.68rem] font-bold uppercase tracking-widest text-cyan">1080P HD</span>
              </div>
            </div>
            <div className="mt-4 flex justify-between text-xs font-semibold uppercase tracking-[0.25em] text-muted-foreground">
              <span>Studio Film</span>
              <span>Process · Craft · Space</span>
            </div>
          </div>
        </div>

        {/* Portfolios in a Single Row */}
        <div className="mt-20 border-t border-border pt-16 lg:mt-28">
          <div className="mb-10 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <p data-reveal className="reveal eyebrow">Disciplines</p>
              <h3 data-reveal className="reveal mt-3 text-3xl font-bold tracking-tight md:text-4xl" style={{ "--d": "100ms" } as React.CSSProperties}>
                Our Portfolios
              </h3>
            </div>
            <p data-reveal className="reveal max-w-md text-sm text-muted-foreground" style={{ "--d": "200ms" } as React.CSSProperties}>
              Comprehensive design portfolios covering full-scale architectural structures, refined interiors, and harmonious landscapes.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            {portfolios.map((p, n) => (
              <div
                key={p.t}
                data-reveal
                className="reveal group flex flex-col justify-between border border-border bg-card p-4 transition-all duration-300 hover:border-teal hover:shadow-xl"
                style={{ "--d": `${200 + n * 120}ms` } as React.CSSProperties}
              >
                <div>
                  <div className="aspect-[16/10] w-full overflow-hidden bg-muted">
                    <img
                      src={p.img}
                      alt={p.t}
                      loading="lazy"
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  </div>
                  <h4 className="mt-5 font-display text-xl font-semibold">{p.t}</h4>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{p.d}</p>
                </div>
                <div className="mt-6 border-t border-border/70 pt-4">
                  <span
                    className="inline-flex items-center gap-2 text-[0.7rem] font-bold uppercase tracking-[0.2em] text-teal transition-colors group-hover:text-teal-deep"
                    title="PDF will be available once supplied by the studio"
                  >
                    <Download className="h-3.5 w-3.5" /> Download Portfolio — coming soon
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}

/* ---------------- VASTU ---------------- */
export function Vastu() {
  const items = [
    { I: Compass, t: "Thoughtful Orientation", d: "Consider building orientation and site context." },
    { I: LayoutGrid, t: "Balanced Spatial Planning", d: "Explore layouts informed by Vastu principles and practical requirements." },
    { I: Sun, t: "Light and Ventilation", d: "Prioritize daylight, airflow, and comfortable living environments." },
  ];
  return (
    <section id="vastu" className="relative overflow-hidden bg-secondary py-28 lg:py-40">
      <div className="plan-lines pointer-events-none absolute inset-0 opacity-30" />
      <Container className="relative grid items-center gap-16 lg:grid-cols-2 lg:gap-24">
        <div>
          <p data-reveal className="reveal eyebrow">Design with Harmony</p>
          <h2 data-reveal className="reveal mt-6 text-4xl leading-tight md:text-6xl">Vastu Shastra Meets Contemporary Architecture.</h2>
          <p data-reveal className="reveal mt-8 text-lg leading-relaxed text-muted-foreground">
            Explore a considered approach to spatial planning that brings together Vastu Shastra principles, natural light, ventilation, orientation, and modern architectural design. We aim to create spaces that feel balanced, functional, and connected to their environment while respecting each client's requirements.
          </p>
          <ul className="mt-12 divide-y divide-border border-y border-border">
            {items.map(({ I, t, d }, n) => (
              <li key={t} data-reveal className="reveal flex gap-6 py-6" style={{ "--d": `${n * 120}ms` } as React.CSSProperties}>
                <I className="mt-1 h-6 w-6 shrink-0 text-teal" strokeWidth={1.4} />
                <div><h3 className="text-lg font-semibold">{t}</h3><p className="mt-1 text-muted-foreground">{d}</p></div>
              </li>
            ))}
          </ul>
          <a href="#contact" className="btn-primary mt-12">Discuss Your Vastu Requirements <ArrowRight className="h-4 w-4" /></a>
        </div>
        <div className="relative">
          <div data-reveal className="reveal-mask aspect-[4/5] overflow-hidden">
            <img src={vastu} alt="Sunlit courtyard home planned around a central open-to-sky space" loading="lazy" className="h-full w-full object-cover" />
          </div>
          <svg className="pointer-events-none absolute -inset-6 h-[calc(100%+3rem)] w-[calc(100%+3rem)] text-teal" viewBox="0 0 100 125" preserveAspectRatio="none" fill="none" stroke="currentColor" strokeWidth="0.15" aria-hidden>
            <rect x="3" y="3" width="94" height="119" />
            <line x1="50" y1="0" x2="50" y2="125" strokeDasharray="1 1" />
            <line x1="0" y1="62.5" x2="100" y2="62.5" strokeDasharray="1 1" />
            <circle cx="50" cy="62.5" r="18" />
            <line x1="3" y1="3" x2="97" y2="122" opacity=".5" /><line x1="97" y1="3" x2="3" y2="122" opacity=".5" />
          </svg>
          <span className="absolute -top-10 left-1/2 -translate-x-1/2 text-xs font-bold tracking-[0.3em] text-teal">N</span>
        </div>
      </Container>
    </section>
  );
}

/* ---------------- PROJECTS ---------------- */
export function Projects() {
  return (
    <section id="projects" className="py-28 lg:py-40">
      <Container>
        <div className="grid gap-8 border-b border-border pb-16 lg:grid-cols-2 lg:items-end">
          <div>
            <p data-reveal className="reveal eyebrow">Selected Works</p>
            <h2 data-reveal className="reveal mt-6 text-5xl leading-none md:text-7xl">Architecture in Every Detail.</h2>
          </div>
          <p data-reveal className="reveal max-w-md text-lg text-muted-foreground lg:justify-self-end">A selection of spaces shaped by context, creativity, material, and purpose.</p>
        </div>
        <div className="mt-24 space-y-32 lg:space-y-48">
          {PROJECTS.map((p, n) => {
            const flip = n % 2 === 1;
            return (
              <article key={p.title} className={`grid items-center gap-10 lg:grid-cols-12 lg:gap-16`}>
                <div data-reveal className={`reveal-mask aspect-[3/2] overflow-hidden lg:col-span-8 ${flip ? "lg:order-2 lg:col-start-5" : ""}`}>
                  <img src={p.img} alt={`${p.title} — ${p.cat}`} loading="lazy" className="h-full w-full object-cover" />
                </div>
                <div className={`lg:col-span-4 ${flip ? "lg:order-1 lg:row-start-1" : ""}`}>
                  <p data-reveal className="reveal font-display text-7xl text-cyan lg:text-8xl">0{n + 1}</p>
                  <p data-reveal className="reveal mt-4 text-xs font-bold uppercase tracking-[0.3em] text-teal" style={{ "--d": "100ms" } as React.CSSProperties}>{p.cat}</p>
                  <h3 data-reveal className="reveal mt-3 text-3xl md:text-4xl" style={{ "--d": "200ms" } as React.CSSProperties}>{p.title}</h3>
                  <p data-reveal className="reveal mt-5 leading-relaxed text-muted-foreground" style={{ "--d": "300ms" } as React.CSSProperties}>{p.concept}</p>
                  <dl data-reveal className="reveal mt-6 grid grid-cols-3 gap-4 border-t border-border pt-5 text-xs" style={{ "--d": "400ms" } as React.CSSProperties}>
                    {["Location", "Year", "Area"].map((k) => <div key={k}><dt className="uppercase tracking-[0.2em] text-muted-foreground">{k}</dt><dd className="mt-1 font-semibold">TBA</dd></div>)}
                  </dl>
                  <a href="#contact" data-reveal className="reveal link-line mt-8 text-teal" style={{ "--d": "500ms" } as React.CSSProperties}>View Project <ArrowRight className="h-4 w-4" /></a>
                </div>
              </article>
            );
          })}
        </div>
        <div className="mt-32 text-center"><a href="#contact" className="btn-primary">Explore All Projects <ArrowRight className="h-4 w-4" /></a></div>
      </Container>
    </section>
  );
}

/* ---------------- SERVICES ---------------- */
export function Services() {
  return (
    <section id="services" className="bg-teal-deep py-28 text-ivory lg:py-40">
      <Container>
        <p data-reveal className="reveal eyebrow !text-cyan">Our Expertise</p>
        <h2 data-reveal className="reveal mt-6 max-w-3xl text-4xl leading-tight md:text-6xl">Integrated Design. Considered Execution.</h2>
        <div className="mt-20 grid gap-px bg-ivory/10 sm:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map((s, n) => (
            <a key={s.n} href="#contact" data-reveal className="reveal group relative block aspect-[4/5] overflow-hidden bg-teal-deep" style={{ "--d": `${(n % 3) * 120}ms` } as React.CSSProperties}>
              <img src={s.img} alt="" loading="lazy" className="absolute inset-0 h-full w-full object-cover opacity-35 transition-all duration-1000 group-hover:scale-110 group-hover:opacity-25" />
              <div className="absolute inset-0 bg-gradient-to-t from-teal-deep via-teal-deep/50 to-transparent" />
              <div className="absolute inset-4 border border-ivory/0 transition-colors duration-700 group-hover:border-cyan/50" />
              <div className="relative flex h-full flex-col justify-between p-10">
                <span className="font-display text-sm text-cyan">{s.n}</span>
                <div>
                  <h3 className="text-2xl md:text-3xl">{s.title}</h3>
                  <div className="grid grid-rows-[0fr] transition-all duration-700 group-hover:grid-rows-[1fr] group-focus-visible:grid-rows-[1fr]">
                    <div className="overflow-hidden">
                      <p className="mt-4 text-sm leading-relaxed text-ivory/80">{s.text}</p>
                      <span className="link-line mt-6 text-cyan">Discover Service <ArrowRight className="h-4 w-4" /></span>
                    </div>
                  </div>
                </div>
              </div>
            </a>
          ))}
        </div>
      </Container>
    </section>
  );
}

/* ---------------- TESTIMONIALS ---------------- */
export function Testimonials() {
  const slides = [1, 2, 3];
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);
  const touch = useRef(0);
  useEffect(() => {
    if (paused) return;
    const t = setTimeout(() => setI((v) => (v + 1) % 3), 6000);
    return () => clearTimeout(t);
  }, [i, paused]);
  return (
    <section id="testimonials" className="py-28 lg:py-40">
      <Container>
        <div className="text-center">
          <p data-reveal className="reveal eyebrow">Client Experiences</p>
          <h2 data-reveal className="reveal mx-auto mt-6 max-w-3xl text-4xl leading-tight md:text-6xl">Trust Built Through Thoughtful Design.</h2>
        </div>
        <div
          className="relative mx-auto mt-20 max-w-4xl overflow-hidden"
          onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}
          onFocus={() => setPaused(true)} onBlur={() => setPaused(false)}
          onTouchStart={(e) => (touch.current = e.touches[0]!.clientX)}
          onTouchEnd={(e) => { const dx = e.changedTouches[0]!.clientX - touch.current; if (Math.abs(dx) > 40) setI((v) => (v + (dx < 0 ? 1 : 2)) % 3); }}
          aria-roledescription="carousel"
        >
          <div className="flex transition-transform duration-1000 ease-[cubic-bezier(.77,0,.18,1)]" style={{ transform: `translateX(-${i * 100}%)` }}>
            {slides.map((n) => (
              <figure key={n} className="w-full shrink-0 px-2 text-center" aria-hidden={i !== n - 1}>
                <Quote className="mx-auto h-10 w-10 text-cyan" strokeWidth={1.2} />
                <blockquote className="mt-8 font-display text-2xl leading-snug text-foreground/70 md:text-3xl">
                  Verified client testimonial {n} will appear here once shared by STUQ with the client's permission.
                </blockquote>
                <figcaption className="mt-8 text-xs font-bold uppercase tracking-[0.3em] text-teal">Client name · Project type</figcaption>
              </figure>
            ))}
          </div>
          <div className="mt-12 flex items-center justify-center gap-6">
            <button onClick={() => setI((v) => (v + 2) % 3)} aria-label="Previous testimonial" className="grid h-11 w-11 place-items-center border border-border transition-colors hover:border-teal hover:text-teal"><ArrowLeft className="h-4 w-4" /></button>
            <div className="flex gap-3">
              {slides.map((_, n) => <button key={n} onClick={() => setI(n)} aria-label={`Testimonial ${n + 1}`} className="py-2.5"><span className={`block h-px transition-all duration-700 ${n === i ? "w-12 bg-teal" : "w-5 bg-teal/30"}`} /></button>)}
            </div>
            <button onClick={() => setI((v) => (v + 1) % 3)} aria-label="Next testimonial" className="grid h-11 w-11 place-items-center border border-border transition-colors hover:border-teal hover:text-teal"><ArrowRight className="h-4 w-4" /></button>
          </div>
        </div>
      </Container>
    </section>
  );
}

/* ---------------- CONTACT + FAQ ---------------- */
const TYPES = ["Architecture", "Interior Design", "Landscape", "Structural Design", "Project Management", "BIM Services", "Vastu Consultation"];

export function Contact() {
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<null | "pending">(null);
  const [open, setOpen] = useState<number | null>(0);
  const submit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    if (f.get("website")) return; // honeypot
    const err: Record<string, string> = {};
    if (String(f.get("name") || "").trim().length < 2) err["name"] = "Please enter your full name.";
    if (!/^\S+@\S+\.\S+$/.test(String(f.get("email") || ""))) err["email"] = "Please enter a valid email address.";
    if (!/^[+\d\s()-]{7,}$/.test(String(f.get("phone") || ""))) err["phone"] = "Please enter a valid phone number.";
    if (!f.get("type")) err["type"] = "Please choose a project type.";
    if (String(f.get("location") || "").trim().length < 2) err["location"] = "Please enter the project location.";
    if (String(f.get("message") || "").trim().length < 10) err["message"] = "Please tell us a little about your project.";
    if (!f.get("consent")) err["consent"] = "Please agree to be contacted.";
    setErrors(err);
    if (Object.keys(err).length === 0) setStatus("pending");
  };
  const field = "w-full border-0 border-b border-input bg-transparent px-0 py-3 text-base outline-none transition-colors placeholder:text-muted-foreground/70 focus:border-teal";
  const Err = ({ k }: { k: string }) => errors[k] ? <p className="mt-1.5 text-xs text-destructive">{errors[k]}</p> : null;
  return (
    <section id="contact" className="bg-secondary py-28 lg:py-40">
      <Container className="grid gap-20 lg:grid-cols-2">
        <div>
          <p data-reveal className="reveal eyebrow">Let's Create Something Meaningful</p>
          <h2 data-reveal className="reveal mt-6 text-4xl leading-tight md:text-6xl">Have a Project in Mind?</h2>
          <p data-reveal className="reveal mt-6 text-lg text-muted-foreground">Whether you're planning a new home, reimagining an existing space, or exploring a commercial project, connect with STUQ to discuss your vision and requirements.</p>
          <form onSubmit={submit} noValidate className="mt-12 grid gap-7 sm:grid-cols-2">
            <input type="text" name="website" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden />
            <div><label className="sr-only" htmlFor="name">Full name</label><input id="name" name="name" placeholder="Full name *" className={field} /><Err k="name" /></div>
            <div><label className="sr-only" htmlFor="email">Email</label><input id="email" name="email" type="email" placeholder="Email address *" className={field} /><Err k="email" /></div>
            <div><label className="sr-only" htmlFor="phone">Phone</label><input id="phone" name="phone" type="tel" placeholder="Phone number *" className={field} /><Err k="phone" /></div>
            <div>
              <label className="sr-only" htmlFor="type">Project type</label>
              <select id="type" name="type" defaultValue="" className={field}>
                <option value="" disabled>Project type *</option>
                {TYPES.map((t) => <option key={t}>{t}</option>)}
              </select><Err k="type" />
            </div>
            <div><label className="sr-only" htmlFor="location">Location</label><input id="location" name="location" placeholder="Project location *" className={field} /><Err k="location" /></div>
            <div><label className="sr-only" htmlFor="budget">Budget</label><input id="budget" name="budget" placeholder="Estimated budget (optional)" className={field} /></div>
            <div className="sm:col-span-2"><label className="sr-only" htmlFor="message">Message</label><textarea id="message" name="message" rows={4} placeholder="Tell us about your project *" className={`${field} resize-none`} /><Err k="message" /></div>
            <div className="sm:col-span-2">
              <label className="flex items-start gap-3 text-sm text-muted-foreground">
                <input type="checkbox" name="consent" className="mt-1 h-4 w-4 accent-[var(--teal)]" />
                I agree to be contacted by STUQ regarding my enquiry. My details will only be used to respond to this request.
              </label><Err k="consent" />
            </div>
            <div className="sm:col-span-2">
              <button type="submit" className="btn-primary">Request a Consultation <ArrowRight className="h-4 w-4" /></button>
              {status === "pending" && (
                <p role="status" className="mt-5 border-l-2 border-teal bg-card px-4 py-3 text-sm">
                  Thank you — your details look good. Online submissions will be switched on once the studio connects its inbox, so your request has not been sent yet.
                </p>
              )}
            </div>
          </form>
        </div>
        <div className="lg:pt-6">
          <h3 className="text-xs font-bold uppercase tracking-[0.3em] text-teal">Frequently Asked</h3>
          <ul className="mt-6 border-t border-border">
            {FAQS.map((f, n) => {
              const isOpen = open === n;
              return (
                <li key={f.q} className="border-b border-border">
                  <button onClick={() => setOpen(isOpen ? null : n)} aria-expanded={isOpen} className="flex w-full items-center justify-between gap-6 py-6 text-left">
                    <span className="font-display text-lg md:text-xl">{f.q}</span>
                    <Plus className={`h-5 w-5 shrink-0 text-teal transition-transform duration-500 ${isOpen ? "rotate-45" : ""}`} />
                  </button>
                  <div className={`grid transition-all duration-500 ${isOpen ? "grid-rows-[1fr] pb-6" : "grid-rows-[0fr]"}`}>
                    <p className="overflow-hidden text-muted-foreground">{f.a}</p>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </Container>
    </section>
  );
}
