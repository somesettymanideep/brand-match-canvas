import { ArrowRight } from "lucide-react";
import ScrollStack, { ScrollStackItem } from "./ScrollStack";
import { PROJECTS } from "./data";

const Container = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => (
  <div className={`mx-auto max-w-[1400px] px-6 md:pl-20 lg:px-24 ${className}`}>{children}</div>
);

export function Projects() {
  return (
    <section id="projects" className="relative bg-[#F8FBFB] py-20 sm:py-28">
      {/* Ambient architectural lighting */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-32 -left-32 h-[450px] w-[450px] rounded-full bg-[#35A9C1]/10 blur-3xl" />
        <div className="absolute -bottom-32 -right-32 h-[450px] w-[450px] rounded-full bg-[#007C91]/10 blur-3xl" />
      </div>

      <Container className="relative z-10">
        {/* Section header */}
        <div className="mx-auto w-full max-w-3xl text-center">
          <h2 className="font-serif text-4xl font-normal tracking-tight sm:text-5xl lg:text-[3.5rem]">
            <span className="text-[#067688]">OUR</span>{" "}
            <span className="text-[#0e2638]">PROJECTS</span>
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-xs leading-relaxed text-[#597080] sm:text-sm">
            Explore our diverse portfolio of architectural, interior, and landscape landmarks crafted with
            creativity, precision, and purpose.
          </p>
        </div>

        {/* Scrolling card stack — cards pin, scale and dim as the page scrolls */}
        <div className="mt-12 sm:mt-16">
          <ScrollStack
            useWindowScroll
            className="scroll-stack--container-spaced"
            itemDistance={140}
            itemStackDistance={28}
            stackPosition="12%"
            itemScale={0.05}
            baseScale={0.85}
            dimAmount={0.28}
            holdDistance={260}
          >
            {PROJECTS.map((p, idx) => (
              <ScrollStackItem key={p.title} itemClassName="project-card">
                <img
                  src={p.img}
                  alt={p.title}
                  loading={idx === 0 ? "eager" : "lazy"}
                  className="project-card__img"
                />
                <div className="project-card__overlay" />

                <div className="project-card__badge">
                  <span>0{idx + 1}</span>
                  <span className="text-white/40">/</span>
                  <span className="text-white/70">0{PROJECTS.length}</span>
                </div>

                <div className="absolute inset-x-0 bottom-0 flex flex-col justify-end p-6 sm:p-8">
                  <div className="flex items-center gap-2.5">
                    <span className="rounded-md bg-[#007C91] px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-white shadow-sm">
                      {p.cat}
                    </span>
                    <span className="text-xs font-medium text-white/80">{p.loc}</span>
                  </div>
                  <h3 className="mt-2.5 font-serif text-2xl font-normal text-white sm:text-3xl lg:text-4xl">
                    {p.title}
                  </h3>
                  {p.concept && (
                    <p className="mt-2 max-w-xl text-xs leading-relaxed text-white/85 line-clamp-2 sm:text-sm">
                      {p.concept}
                    </p>
                  )}
                </div>
              </ScrollStackItem>
            ))}
          </ScrollStack>
        </div>

        {/* View All Projects */}
        <div className="mt-14 flex justify-center">
          <a
            href="#contact"
            className="inline-flex items-center gap-2 rounded-full bg-[#007C91] px-7 py-2.5 text-xs font-semibold text-white shadow-lg shadow-[#007C91]/20 transition-all duration-300 hover:scale-105 hover:bg-[#006375] hover:shadow-xl sm:text-sm"
          >
            <span>View All Projects</span>
            <ArrowRight className="h-4 w-4" />
          </a>
        </div>
      </Container>
    </section>
  );
}
