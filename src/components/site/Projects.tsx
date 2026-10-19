import { useEffect, useRef, useState } from "react";
import { ArrowRight, MapPin, Building2, Layers, Trees } from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { PROJECTS } from "./data";

gsap.registerPlugin(ScrollTrigger);

export function Projects() {
  const sectionRef = useRef<HTMLElement>(null);
  const viewingAreaRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const firstCardRef = useRef<HTMLDivElement>(null);
  const [activeIdx, setActiveIdx] = useState(0);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const mm = gsap.matchMedia();

    mm.add("(min-width: 1024px) and (prefers-reduced-motion: no-preference)", () => {
      const section = sectionRef.current;
      const viewingArea = viewingAreaRef.current;
      const track = trackRef.current;
      const firstCard = firstCardRef.current;

      if (!section || !viewingArea || !track || !firstCard) return;

      const getMetrics = () => {
        const vh = window.innerHeight;
        const cardH = firstCard.offsetHeight || 480;
        const computedTrack = window.getComputedStyle(track);
        const gap = parseFloat(computedTrack.rowGap || computedTrack.gap) || 80;
        const startY = (vh - cardH) / 2;
        const totalTravel = (PROJECTS.length - 1) * (cardH + gap);
        return { vh, cardH, gap, startY, totalTravel };
      };

      // Position Card 0 vertically centered in the viewport initially
      const initialMetrics = getMetrics();
      gsap.set(track, { y: initialMetrics.startY });

      const tween = gsap.to(track, {
        y: () => {
          const m = getMetrics();
          return m.startY - m.totalTravel;
        },
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: () => `+=${(PROJECTS.length - 1) * 900}`,
          pin: true,
          scrub: 1,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            const current = Math.min(
              PROJECTS.length - 1,
              Math.floor(self.progress * (PROJECTS.length - 0.05))
            );
            setActiveIdx(current);
          },
        },
      });

      const ro = new ResizeObserver(() => {
        ScrollTrigger.refresh();
      });
      ro.observe(firstCard);

      return () => {
        ro.disconnect();
        if (tween?.scrollTrigger) tween.scrollTrigger.kill();
        tween?.kill();
        gsap.set(track, { clearProps: "all" });
      };
    });

    return () => {
      mm.revert();
    };
  }, []);

  const getDisciplineIcon = (cat: string) => {
    const lower = cat.toLowerCase();
    if (lower.includes("interior")) return Layers;
    if (lower.includes("landscape")) return Trees;
    return Building2;
  };

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="relative bg-[#F9FBFC] py-20 lg:py-0 lg:h-screen lg:overflow-hidden"
    >
      {/* Ambient architectural lighting */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
        <div className="absolute -top-32 -left-32 h-[500px] w-[500px] rounded-full bg-[#067688]/5 blur-3xl" />
        <div className="absolute -bottom-32 -right-32 h-[500px] w-[500px] rounded-full bg-[#007C91]/5 blur-3xl" />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-[1440px] px-6 sm:px-10 lg:px-16 h-full">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-14 xl:gap-20 h-full">
          {/* Left Column: Stationary content */}
          <div className="lg:col-span-5 flex flex-col justify-center py-6">
            {/* Heading */}
            <h2 className="font-serif text-4xl sm:text-5xl lg:text-[3.25rem] xl:text-[3.65rem] font-normal leading-[1.12] tracking-tight">
              <span className="text-[#067688]">OUR RECENT</span>{" "}
              <span className="text-[#0e2638]">PROJECTS</span>
            </h2>

            {/* Compact rounded button */}
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <a
                href="#contact"
                className="inline-flex items-center gap-2.5 rounded-full bg-[#067688] px-7 py-3 text-xs sm:text-sm font-semibold tracking-wide text-white shadow-md shadow-[#067688]/20 transition-all duration-300 hover:bg-[#055D6B] hover:scale-105 hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#067688]"
              >
                <span>View All Projects</span>
                <ArrowRight className="h-4 w-4" />
              </a>
            </div>

            {/* Project Indicator (Stationary position in left col) */}
            <div className="mt-10 hidden lg:flex items-center gap-4 text-xs font-semibold text-[#597080]">
              <div className="flex items-center gap-1.5">
                {PROJECTS.map((_, idx) => (
                  <span
                    key={idx}
                    className={`h-1.5 rounded-full transition-all duration-300 ${
                      activeIdx === idx ? "w-8 bg-[#067688]" : "w-2 bg-slate-300/80"
                    }`}
                  />
                ))}
              </div>
              <span className="font-mono text-xs font-semibold text-[#067688]">
                0{activeIdx + 1} / 0{PROJECTS.length}
              </span>
            </div>
          </div>

          {/* Right Column: Full-height viewport for sliding cards */}
          <div
            ref={viewingAreaRef}
            className="lg:col-span-7 h-full lg:h-screen w-full relative overflow-hidden flex justify-center items-center"
          >
            <div
              ref={trackRef}
              className="lg:absolute inset-x-0 top-0 flex flex-col items-center gap-16 xl:gap-20 w-full will-change-transform"
            >
              {PROJECTS.map((project, idx) => {
                const Icon = getDisciplineIcon(project.cat);
                return (
                  <div
                    key={project.title}
                    ref={idx === 0 ? firstCardRef : null}
                    className="w-full max-w-[640px] xl:max-w-[680px] shrink-0 overflow-hidden rounded-[7px] border border-slate-200/90 bg-white shadow-none transition-transform duration-500"
                  >
                    {/* Landscape Image */}
                    <div className="relative aspect-[16/9.8] max-h-[46vh] w-full overflow-hidden bg-slate-100 rounded-t-[7px]">
                      <img
                        src={project.img}
                        alt={project.title}
                        loading={idx === 0 ? "eager" : "lazy"}
                        className="h-full w-full object-cover object-center select-none transition-transform duration-700 ease-out hover:scale-[1.02]"
                      />
                    </div>

                    {/* Clean White Information Strip (No shadow, no rating, no area) */}
                    <div className="flex flex-col gap-4 bg-white p-5 sm:p-6 sm:px-8 sm:flex-row sm:items-center sm:justify-between border-t border-slate-100 rounded-b-[7px]">
                      {/* Left: Location & Title */}
                      <div className="min-w-0">
                        <div className="flex items-center gap-1.5 text-xs font-semibold text-[#067688]">
                          <MapPin className="h-3.5 w-3.5 text-[#067688] shrink-0" />
                          <span className="text-[#64748B]">{project.loc}</span>
                        </div>
                        <h3 className="mt-1 font-serif text-xl sm:text-2xl font-normal tracking-tight text-[#0E2638] truncate">
                          {project.title}
                        </h3>
                      </div>

                      {/* Right: Grey capsule pill with icon and discipline */}
                      <div className="flex items-center gap-3 rounded-[7px] bg-[#F1F5F8] px-4.5 py-2.5 sm:px-5 sm:py-3 shrink-0">
                        <div className="grid h-10 w-10 place-items-center rounded-[5px] bg-white text-[#067688] shadow-none shrink-0">
                          <Icon className="h-4.5 w-4.5" />
                        </div>
                        <div className="flex flex-col">
                          <span className="text-[11px] font-medium text-[#7A909E] leading-none mb-1">
                            {project.disciplineLabel}
                          </span>
                          <span className="text-xs sm:text-[0.88rem] font-bold text-[#0E2638] leading-tight">
                            {project.discipline}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
