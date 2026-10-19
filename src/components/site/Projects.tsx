import { useEffect, useRef, useState } from "react";
import { ArrowRight, MapPin } from "lucide-react";
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

      const tween = gsap.to(track, {
        y: () => {
          const cardHeight = firstCard.offsetHeight;
          const computedTrack = window.getComputedStyle(track);
          const gap = parseFloat(computedTrack.rowGap || computedTrack.gap) || 32;
          viewingArea.style.height = `${cardHeight}px`;
          return -((PROJECTS.length - 1) * (cardHeight + gap));
        },
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: () => `+=${(PROJECTS.length - 1) * 750}`,
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
        viewingArea.style.height = "";
        gsap.set(track, { clearProps: "all" });
      };
    });

    return () => {
      mm.revert();
    };
  }, []);

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="relative bg-[#F9FBFC] py-20 lg:py-0 lg:h-screen lg:min-h-[720px] lg:flex lg:items-center overflow-hidden"
    >
      {/* Ambient architectural lighting */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
        <div className="absolute -top-32 -left-32 h-[500px] w-[500px] rounded-full bg-[#067688]/5 blur-3xl" />
        <div className="absolute -bottom-32 -right-32 h-[500px] w-[500px] rounded-full bg-[#007C91]/5 blur-3xl" />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-[1400px] px-6 sm:px-10 lg:px-16 pt-12 lg:pt-16">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-14 xl:gap-20">
          {/* Left Column: Stationary content */}
          <div className="lg:col-span-5 flex flex-col justify-center">
            {/* Small eyebrow label */}
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-[#067688]" />
              <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#067688]">
                Selected Portfolio
              </span>
            </div>

            {/* Large heading */}
            <h2 className="mt-4 font-serif text-4xl sm:text-5xl lg:text-[3.25rem] xl:text-[3.65rem] font-normal leading-[1.12] tracking-tight text-[#0E2638]">
              Crafting Visionary Architecture &amp; Living Spaces.
            </h2>

            {/* Short description */}
            <p className="mt-5 max-w-lg text-sm sm:text-base leading-relaxed text-[#597080] font-normal">
              Explore our diverse portfolio of residential, commercial, and healthcare spaces designed with environmental harmony, structural precision, and timeless elegance.
            </p>

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

          {/* Right Column: Viewing window & vertically sliding cards */}
          <div className="lg:col-span-7 flex justify-center">
            <div
              ref={viewingAreaRef}
              className="relative w-full max-w-[660px] overflow-hidden rounded-2xl sm:rounded-3xl"
            >
              <div
                ref={trackRef}
                className="flex flex-col gap-8 w-full"
              >
                {PROJECTS.map((project, idx) => (
                  <div
                    key={project.title}
                    ref={idx === 0 ? firstCardRef : null}
                    className="group relative w-full shrink-0 overflow-hidden rounded-2xl sm:rounded-3xl border border-slate-200/85 bg-white shadow-[0_12px_40px_rgba(11,59,70,0.07)] transition-shadow duration-300 hover:shadow-[0_16px_50px_rgba(11,59,70,0.11)]"
                  >
                    {/* Landscape image */}
                    <div className="relative aspect-[16/10] max-h-[48vh] w-full overflow-hidden bg-slate-100">
                      <img
                        src={project.img}
                        alt={project.title}
                        loading={idx === 0 ? "eager" : "lazy"}
                        className="h-full w-full object-cover object-center select-none transition-transform duration-700 ease-out group-hover:scale-[1.02]"
                      />
                    </div>

                    {/* White information strip beneath it */}
                    <div className="flex items-center justify-between gap-4 border-t border-slate-100 bg-white px-6 py-4.5 sm:px-7 sm:py-5">
                      <div className="min-w-0 flex items-center gap-3">
                        <span className="rounded-full bg-[#067688]/10 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-[#067688] shrink-0">
                          {project.cat}
                        </span>
                        <h3 className="font-serif text-lg sm:text-xl font-normal text-[#0E2638] tracking-tight truncate">
                          {project.title}
                        </h3>
                      </div>

                      {/* Compact metadata arranged horizontally */}
                      <div className="flex items-center gap-3 shrink-0">
                        <div className="flex items-center gap-1.5 text-xs text-[#597080]">
                          <MapPin className="h-3.5 w-3.5 text-[#067688]" />
                          <span className="hidden sm:inline font-medium">{project.loc}</span>
                        </div>
                        <span className="rounded-md border border-slate-200/70 bg-slate-50 px-2.5 py-1 font-mono text-[11px] font-semibold text-[#067688]">
                          0{idx + 1}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
