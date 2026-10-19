import { useEffect, useRef, useState } from "react";
import { ArrowUp, Menu, X } from "lucide-react";
import logo from "@/assets/stuq-logo.png";
import { NAV, SOCIALS } from "./data";

const InstagramIcon = (p: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={p.className}>
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
  </svg>
);

const PinterestIcon = (p: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={p.className}>
    <path d="M12 0C5.373 0 0 5.372 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738.098.119.112.224.083.345-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.401.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.354-.629-2.758-1.379l-.749 2.848c-.269 1.045-1.004 2.352-1.498 3.146 1.123.345 2.306.535 3.535.535 6.627 0 12-5.373 12-12 0-6.628-5.373-12-12-12z" />
  </svg>
);

const LinkedinIcon = (p: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={p.className}>
    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
  </svg>
);

const FacebookIcon = (p: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={p.className}>
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
  </svg>
);

type IconC = (p: { className?: string }) => React.ReactElement;
export const SOCIAL_ICONS: Record<"Instagram" | "Pinterest" | "LinkedIn" | "Facebook", IconC> = {
  Instagram: InstagramIcon,
  Pinterest: PinterestIcon,
  LinkedIn: LinkedinIcon,
  Facebook: FacebookIcon,
};

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 60);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);
  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-white/90 py-3.5 shadow-sm shadow-[#067688]/5 border-b border-[#067688]/15 backdrop-blur-md"
          : "bg-transparent py-5"
      }`}
    >
      <div className="mx-auto flex max-w-[1400px] items-center justify-between gap-6 px-6 lg:px-10">
        <a
          id="header-logo"
          href="#home"
          className="shrink-0 bg-transparent transition-all duration-300 hover:scale-105"
          aria-label="STUQ home"
        >
          <img
            id="header-logo-img"
            src={logo}
            alt="STUQ – Studio for Eclectic Architecture"
            className={`w-auto transition-all duration-500 ${scrolled ? "h-8" : "h-9"}`}
          />
        </a>
        <nav className="hidden items-center gap-8 xl:flex" aria-label="Primary">
          {NAV.map((n) => (
            <a
              key={n.id}
              href={`#${n.id}`}
              className="text-[0.75rem] font-semibold uppercase tracking-[0.2em] text-[#0E2638]/85 transition-colors hover:text-[#067688]"
            >
              {n.label}
            </a>
          ))}
        </nav>
        <div className="flex items-center gap-3">
          <a
            href="#contact"
            className={`hidden sm:inline-flex rounded-lg px-5 py-2.5 text-xs font-bold uppercase tracking-wider transition-all duration-300 ${
              scrolled
                ? "bg-[#067688] text-white hover:bg-[#055c6a] shadow-sm shadow-[#067688]/20"
                : "border border-[#0E2638]/40 text-[#0E2638] hover:bg-[#067688] hover:border-[#067688] hover:text-white"
            }`}
          >
            Let's Talk
          </a>
          <button
            onClick={() => setOpen(true)}
            className="grid h-11 w-11 place-items-center text-[#0E2638] xl:hidden"
            aria-label="Open menu"
          >
            <Menu />
          </button>
        </div>
      </div>
      <div className={`fixed inset-0 z-50 flex flex-col bg-teal-deep transition-transform duration-700 xl:hidden ${open ? "translate-x-0" : "translate-x-full"}`} aria-hidden={!open}>
        <div className="flex justify-end p-6">
          <button onClick={() => setOpen(false)} className="grid h-11 w-11 place-items-center text-ivory" aria-label="Close menu"><X /></button>
        </div>
        <nav className="flex flex-1 flex-col justify-center gap-5 px-10">
          {NAV.map((n, i) => (
            <a key={n.id} href={`#${n.id}`} onClick={() => setOpen(false)} className="font-display text-3xl text-ivory hover:text-cyan sm:text-5xl">
              <span className="mr-4 text-sm text-cyan">0{i + 1}</span>{n.label}
            </a>
          ))}
          <a href="#contact" onClick={() => setOpen(false)} className="btn-primary mt-6 w-fit">Book a Consultation</a>
        </nav>
      </div>
    </header>
  );
}

export function SocialRail() {
  const [hovered, setHovered] = useState<string | null>(null);

  return (
    <ul className="fixed left-0 top-1/2 z-40 hidden -translate-y-1/2 flex-col gap-1.5 md:flex" aria-label="Social media">
      {SOCIALS.map((s) => {
        const Icon = SOCIAL_ICONS[s.name];
        const isHovered = hovered === s.name;
        return (
          <li key={s.name}>
            <a
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={s.name}
              onMouseEnter={() => setHovered(s.name)}
              onMouseLeave={() => setHovered(null)}
              onFocus={() => setHovered(s.name)}
              onBlur={() => setHovered(null)}
              className={`flex h-11 items-center rounded-r-md ${s.bgClass} text-white shadow-lg transition-all duration-300 ${s.hoverBgClass}`}
            >
              <span className="grid h-11 w-11 place-items-center shrink-0">
                <Icon className="h-4 w-4" />
              </span>
              <span
                className={`overflow-hidden whitespace-nowrap text-[0.68rem] font-bold uppercase tracking-[0.2em] text-white transition-all duration-300 ${
                  isHovered ? "max-w-32 pr-4 opacity-100" : "max-w-0 pr-0 opacity-0"
                }`}
              >
                {s.name}
              </span>
            </a>
          </li>
        );
      })}
    </ul>
  );
}

export function BackToTop() {
  const [show, setShow] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      setScrollProgress(progress);
      setShow(scrollTop > 240);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const radius = 22;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (scrollProgress / 100) * circumference;

  return (
    <div
      className={`fixed bottom-7 right-7 z-40 transition-all duration-500 ease-out ${
        show ? "translate-y-0 opacity-100 scale-100" : "pointer-events-none translate-y-8 opacity-0 scale-90"
      }`}
    >
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        aria-label="Scroll back to top - Elevation Level 00"
        className="group relative flex h-14 w-14 items-center justify-center rounded-full bg-[#032a31]/90 p-0 text-white shadow-2xl backdrop-blur-md transition-all duration-300 hover:scale-110 hover:bg-[#043c46] hover:shadow-cyan/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan"
      >
        {/* Architectural Crosshair / Registration L-Corner Marks on Hover */}
        <span className="pointer-events-none absolute -inset-1.5 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          <span className="absolute top-0 left-0 h-2 w-2 border-t border-l border-cyan/60" />
          <span className="absolute top-0 right-0 h-2 w-2 border-t border-r border-cyan/60" />
          <span className="absolute bottom-0 left-0 h-2 w-2 border-b border-l border-cyan/60" />
          <span className="absolute bottom-0 right-0 h-2 w-2 border-b border-r border-cyan/60" />
        </span>

        {/* Technical Circular Dial & Scroll Progress SVG */}
        <svg className="absolute inset-0 h-full w-full -rotate-90" viewBox="0 0 56 56">
          {/* Background Blueprint Track */}
          <circle
            cx="28"
            cy="28"
            r={radius}
            fill="none"
            stroke="#164e58"
            strokeWidth="1.5"
            strokeDasharray="2 3"
          />

          {/* Active Architectural Progress Ring */}
          <circle
            cx="28"
            cy="28"
            r={radius}
            fill="none"
            stroke="#2dd4bf"
            strokeWidth="2"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            className="transition-all duration-150 ease-out"
          />

          {/* Compass 4-Axis Cardinal Marks */}
          <line x1="28" y1="2" x2="28" y2="5" stroke="#38bdf8" strokeWidth="1.2" strokeLinecap="round" />
          <line x1="28" y1="51" x2="28" y2="54" stroke="#38bdf8" strokeWidth="1.2" strokeLinecap="round" />
          <line x1="2" y1="28" x2="5" y2="28" stroke="#38bdf8" strokeWidth="1.2" strokeLinecap="round" />
          <line x1="51" y1="28" x2="54" y2="28" stroke="#38bdf8" strokeWidth="1.2" strokeLinecap="round" />
        </svg>

        {/* Center Architectural Elevation Arrow + Level Indicator */}
        <div className="relative z-10 flex flex-col items-center justify-center transition-transform duration-300 group-hover:-translate-y-0.5">
          {/* Custom Architectural Drafting Elevation Arrow */}
          <svg
            viewBox="0 0 24 24"
            fill="none"
            className="h-4 w-4 stroke-cyan transition-colors duration-300 group-hover:stroke-white"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            {/* Elevation Arrow Apex & Center Plumb Line */}
            <path d="M12 3L4 11h5v9h6v-9h5L12 3z" fill="currentColor" fillOpacity="0.15" />
            <line x1="12" y1="3" x2="12" y2="20" strokeDasharray="1.5 1.5" strokeWidth="1" opacity="0.6" />
          </svg>

          {/* Monospace Drafting Coordinate Text */}
          <span className="mt-0.5 font-mono text-[8px] font-bold tracking-widest text-[#a3cbcf] group-hover:text-cyan">
            TOP
          </span>
        </div>

        {/* Floating Tooltip Pill */}
        <span className="pointer-events-none absolute bottom-full mb-2.5 hidden rounded border border-cyan/30 bg-[#032a31]/95 px-2.5 py-1 text-[9px] font-mono font-semibold tracking-wider text-cyan shadow-lg backdrop-blur-md transition-all group-hover:block whitespace-nowrap">
          ▲ LVL 00.00
        </span>
      </button>
    </div>
  );
}

interface TrailPoint {
  x: number;
  y: number;
  time: number;
  isStart?: boolean;
}

export function ArchitectureCursor() {
  const ref = useRef<HTMLDivElement>(null);
  const arrowRef = useRef<SVGSVGElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const pointsRef = useRef<TrailPoint[]>([]);
  const animRef = useRef<number | null>(null);
  const [enabled, setEnabled] = useState(false);
  const lastPos = useRef({ x: 0, y: 0 });
  const idleTimer = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)");
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");

    const updateCanvasSize = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const w = window.innerWidth;
      const h = window.innerHeight;
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      const ctx = canvas.getContext("2d");
      if (ctx) {
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      }
    };

    const clearTrail = () => {
      pointsRef.current = [];
      if (animRef.current) {
        cancelAnimationFrame(animRef.current);
        animRef.current = null;
      }
      const canvas = canvasRef.current;
      if (canvas) {
        const ctx = canvas.getContext("2d");
        if (ctx) {
          ctx.save();
          ctx.setTransform(1, 0, 0, 1, 0, 0);
          ctx.clearRect(0, 0, canvas.width, canvas.height);
          ctx.restore();
        }
      }
    };

    const TRAIL_DURATION = 800; // ms: older trail fades to transparent within 0.8s (0.6–1.0s)

    const renderTrail = (time: number) => {
      const canvas = canvasRef.current;
      if (!canvas) {
        animRef.current = null;
        return;
      }
      const ctx = canvas.getContext("2d");
      if (!ctx) {
        animRef.current = null;
        return;
      }

      const points = pointsRef.current;

      // Prune points that have fully faded out
      while (points.length > 0 && time - points[0].time >= TRAIL_DURATION) {
        points.shift();
      }

      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      if (points.length === 0) {
        // When cursor stops, trail fades out completely and animation halts
        animRef.current = null;
        return;
      }

      // Group active points into continuous stroke segments
      const strokes: TrailPoint[][] = [];
      let currentStroke: TrailPoint[] = [];
      for (let i = 0; i < points.length; i++) {
        const pt = points[i];
        if (pt.isStart && currentStroke.length > 0) {
          strokes.push(currentStroke);
          currentStroke = [];
        }
        currentStroke.push(pt);
      }
      if (currentStroke.length > 0) strokes.push(currentStroke);

      ctx.lineCap = "round";
      ctx.lineJoin = "round";

      for (const stroke of strokes) {
        const len = stroke.length;
        if (len === 1) {
          const age = time - stroke[0].time;
          const progress = Math.max(0, 1 - age / TRAIL_DURATION);
          const alpha = progress * 0.75;
          if (alpha > 0.01) {
            ctx.fillStyle = `rgba(6, 118, 136, ${alpha})`;
            ctx.beginPath();
            ctx.arc(stroke[0].x, stroke[0].y, 1.2, 0, Math.PI * 2);
            ctx.fill();
          }
          continue;
        }

        if (len === 2) {
          const age = time - stroke[1].time;
          const progress = Math.max(0, 1 - age / TRAIL_DURATION);
          const alpha = progress * 0.85;
          if (alpha > 0.01) {
            ctx.strokeStyle = `rgba(6, 118, 136, ${alpha})`;
            ctx.lineWidth = 1.0 + progress * 0.8;
            ctx.beginPath();
            ctx.moveTo(stroke[0].x, stroke[0].y);
            ctx.lineTo(stroke[1].x, stroke[1].y);
            ctx.stroke();
          }
          continue;
        }

        // Draw smooth quadratic curves through midpoints
        const mid0X = (stroke[0].x + stroke[1].x) / 2;
        const mid0Y = (stroke[0].y + stroke[1].y) / 2;
        const age0 = time - stroke[0].time;
        const prog0 = Math.max(0, 1 - age0 / TRAIL_DURATION);
        const alpha0 = prog0 * 0.8;

        if (alpha0 > 0.01) {
          ctx.strokeStyle = `rgba(6, 118, 136, ${alpha0})`;
          ctx.lineWidth = 0.9 + prog0 * 0.8;
          ctx.beginPath();
          ctx.moveTo(stroke[0].x, stroke[0].y);
          ctx.lineTo(mid0X, mid0Y);
          ctx.stroke();
        }

        let prevMidX = mid0X;
        let prevMidY = mid0Y;

        for (let i = 1; i < len - 1; i++) {
          const nextMidX = (stroke[i].x + stroke[i + 1].x) / 2;
          const nextMidY = (stroke[i].y + stroke[i + 1].y) / 2;
          const age = time - stroke[i].time;
          const progress = Math.max(0, 1 - age / TRAIL_DURATION);
          const alpha = progress * 0.85;

          if (alpha > 0.01) {
            ctx.strokeStyle = `rgba(6, 118, 136, ${alpha})`;
            ctx.lineWidth = 0.9 + progress * 0.9;
            ctx.beginPath();
            ctx.moveTo(prevMidX, prevMidY);
            ctx.quadraticCurveTo(stroke[i].x, stroke[i].y, nextMidX, nextMidY);
            ctx.stroke();
          }

          prevMidX = nextMidX;
          prevMidY = nextMidY;
        }

        const lastAge = time - stroke[len - 1].time;
        const lastProg = Math.max(0, 1 - lastAge / TRAIL_DURATION);
        const lastAlpha = lastProg * 0.9;
        if (lastAlpha > 0.01) {
          ctx.strokeStyle = `rgba(6, 118, 136, ${lastAlpha})`;
          ctx.lineWidth = 1.0 + lastProg * 0.9;
          ctx.beginPath();
          ctx.moveTo(prevMidX, prevMidY);
          ctx.lineTo(stroke[len - 1].x, stroke[len - 1].y);
          ctx.stroke();
        }
      }

      animRef.current = requestAnimationFrame(renderTrail);
    };

    const sync = () => {
      const active = fine.matches && !reduced.matches;
      setEnabled(active);
      document.documentElement.classList.remove("drafting-cursor-active");
      if (ref.current) ref.current.dataset['visible'] = "false";
      if (!active) clearTrail();
    };

    const hide = () => {
      if (ref.current) ref.current.dataset['visible'] = "false";
      document.documentElement.classList.remove("drafting-cursor-active");
      clearTrail();
    };

    const move = (event: PointerEvent) => {
      const cursor = ref.current;
      if (!cursor || !fine.matches || reduced.matches || event.pointerType !== "mouse") return;
      const target = event.target instanceof Element ? event.target : null;
      if (target?.closest('input, textarea, select, [contenteditable="true"]')) {
        hide();
        return;
      }
      cursor.style.transform = `translate3d(${event.clientX}px, ${event.clientY}px, 0)`;
      cursor.dataset['visible'] = "true";
      cursor.dataset['interactive'] = String(Boolean(target?.closest('a, button, [role="button"]')));
      document.documentElement.classList.add("drafting-cursor-active");

      // Motion Trail tracing
      if (canvasRef.current && canvasRef.current.width === 0) {
        updateCanvasSize();
      }
      const now = performance.now();
      const points = pointsRef.current;
      const last = points[points.length - 1];
      const dist = last ? Math.hypot(event.clientX - last.x, event.clientY - last.y) : 999;

      if (dist >= 2.5) {
        const isStart = !last || (now - last.time > 90);
        points.push({ x: event.clientX, y: event.clientY, time: now, isStart });

        if (!animRef.current) {
          animRef.current = requestAnimationFrame(renderTrail);
        }
      }

      // Smooth dynamic tilt of arrow along cursor movement
      if (arrowRef.current && !reduced.matches) {
        const dx = event.clientX - lastPos.current.x;
        const dy = event.clientY - lastPos.current.y;
        lastPos.current = { x: event.clientX, y: event.clientY };
        const speed = Math.hypot(dx, dy);

        if (speed > 1.5) {
          const tilt = Math.max(-20, Math.min(20, (dx / (Math.abs(dy) + 1.5)) * 14));
          arrowRef.current.style.transform = `rotate(${tilt}deg)`;

          if (idleTimer.current) clearTimeout(idleTimer.current);
          idleTimer.current = setTimeout(() => {
            if (arrowRef.current) {
              arrowRef.current.style.transform = "rotate(0deg)";
            }
          }, 90);
        }
      }
    };

    const press = () => { if (ref.current) ref.current.dataset['pressed'] = "true"; };
    const release = () => { if (ref.current) ref.current.dataset['pressed'] = "false"; };

    sync();

    fine.addEventListener("change", sync);
    reduced.addEventListener("change", sync);
    window.addEventListener("pointermove", move, { passive: true });
    window.addEventListener("pointerdown", press);
    window.addEventListener("pointerup", release);
    window.addEventListener("blur", hide);
    window.addEventListener("resize", updateCanvasSize);
    document.documentElement.addEventListener("pointerleave", hide);

    return () => {
      hide();
      fine.removeEventListener("change", sync);
      reduced.removeEventListener("change", sync);
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerdown", press);
      window.removeEventListener("pointerup", release);
      window.removeEventListener("blur", hide);
      window.removeEventListener("resize", updateCanvasSize);
      document.documentElement.removeEventListener("pointerleave", hide);
      if (idleTimer.current) clearTimeout(idleTimer.current);
      if (animRef.current) cancelAnimationFrame(animRef.current);
    };
  }, []);

  useEffect(() => {
    if (enabled && canvasRef.current) {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const w = window.innerWidth;
      const h = window.innerHeight;
      canvasRef.current.width = Math.round(w * dpr);
      canvasRef.current.height = Math.round(h * dpr);
      const ctx = canvasRef.current.getContext("2d");
      if (ctx) ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }
  }, [enabled]);

  if (!enabled) return null;
  return (
    <>
      {/* Dynamic Smooth Motion Trail tracing cursor movement */}
      <canvas
        ref={canvasRef}
        className="architecture-cursor-trail"
        aria-hidden="true"
      />

      <div ref={ref} className="architecture-cursor" aria-hidden="true" data-visible="false">
        {/* Precision Drafting Arrow Pointer that moves along with cursor */}
        <svg
          ref={arrowRef}
          viewBox="0 0 24 24"
          fill="none"
          className="architecture-cursor-arrow"
        >
          <path
            d="M2 2L19 8.5L11.5 11.5L8.5 19L2 2Z"
            fill="currentColor"
            stroke="#ffffff"
            strokeWidth="1.5"
            strokeLinejoin="round"
            strokeLinecap="round"
          />
          <circle cx="2" cy="2" r="1.5" fill="#ffffff" />
        </svg>

        {/* Architectural Crosshair Reticle (with spacing from arrow) */}
        <svg viewBox="0 0 48 48" fill="none" className="architecture-cursor-mark">
          <path className="drafting-axis" d="M24 2v15m0 14v15M2 24h15m14 0h15" />
          <path className="drafting-ticks" d="M20 8h8M20 40h8M8 20v8M40 20v8" />
          <path className="drafting-frame" d="M14 19v-5h5m10 0h5v5m0 10v5h-5m-10 0h-5v-5" />
          <path className="drafting-center" d="M21 24h6m-3-3v6" />
        </svg>
      </div>
    </>
  );
}

export function Footer() {
  return (
    <footer className="relative overflow-hidden bg-teal-deep text-ivory/80">
      <div className="mx-auto max-w-[1400px] px-6 py-20 lg:px-10">
        <div className="mb-16 flex flex-col items-start justify-between gap-6 border-b border-ivory/15 pb-16 md:flex-row md:items-end">
          <h2 className="max-w-2xl text-4xl text-ivory md:text-6xl">Let's shape your next space together.</h2>
          <a href="#contact" className="btn-primary bg-cyan !text-teal-deep hover:!bg-ivory">Book a Consultation</a>
        </div>
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <div className="inline-block overflow-hidden rounded-[5px] bg-ivory px-3.5 py-2 shadow-sm">
              <img src={logo} alt="STUQ logo" className="h-10 w-auto rounded-[5px]" loading="lazy" />
            </div>
            <p className="mt-5 text-sm font-semibold uppercase tracking-[0.2em] text-cyan">Studio for Eclectic Architecture</p>
            <p className="mt-3 text-sm leading-relaxed">Architecture, interiors, landscapes and technical expertise brought together to create thoughtfully designed spaces.</p>
            <div className="mt-6 flex gap-2.5">
              {SOCIALS.map((s) => {
                const I = SOCIAL_ICONS[s.name];
                return (
                  <a
                    key={s.name}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={s.name}
                    className={`grid h-10 w-10 place-items-center rounded-sm ${s.bgClass} text-white shadow-sm transition-all duration-300 ${s.hoverBgClass} hover:scale-105`}
                  >
                    <I className="h-4 w-4" />
                  </a>
                );
              })}
            </div>
          </div>
          <FooterCol title="Explore" items={NAV.map((n) => ({ label: n.label, href: `#${n.id}` }))} />
          <FooterCol title="Services" items={["Architectural Design", "Interior Design", "Landscape Design", "Structural Design", "Project Management", "BIM Services"].map((l) => ({ label: l, href: "#services" }))} />
          <div>
            <h3 className="mb-5 text-xs font-bold uppercase tracking-[0.3em] text-cyan">Contact</h3>
            <p className="text-sm leading-relaxed">Studio address, email, phone and business hours will be published here once confirmed by the studio.</p>
            <a href="#contact" className="link-line mt-5 text-ivory">Send an enquiry</a>
          </div>
        </div>
        <div className="mt-16 flex flex-col justify-between gap-4 border-t border-ivory/15 pt-8 text-xs sm:flex-row">
          <p>© {new Date().getFullYear()} STUQ – Studio for Eclectic Architecture. All rights reserved.</p>
          <div className="flex gap-6"><a href="#" className="hover:text-cyan">Privacy Policy</a><a href="#" className="hover:text-cyan">Terms</a></div>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({ title, items }: { title: string; items: { label: string; href: string }[] }) {
  return (
    <div>
      <h3 className="mb-5 text-xs font-bold uppercase tracking-[0.3em] text-cyan">{title}</h3>
      <ul className="space-y-2.5 text-sm">
        {items.map((i) => <li key={i.label}><a href={i.href} className="transition-colors hover:text-cyan">{i.label}</a></li>)}
      </ul>
    </div>
  );
}
