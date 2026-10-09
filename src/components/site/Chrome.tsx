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
        scrolled ? "bg-teal-deep/90 py-3 shadow-lg backdrop-blur-md" : "bg-transparent py-6"
      }`}
    >
      <div className="mx-auto flex max-w-[1400px] items-center justify-between gap-6 px-6 lg:px-10">
        <a href="#home" className="shrink-0 rounded-sm bg-ivory/95 px-3 py-1.5" aria-label="STUQ home">
          <img src={logo} alt="STUQ – Studio for Eclectic Architecture" className={`w-auto transition-all duration-500 ${scrolled ? "h-8" : "h-10"}`} />
        </a>
        <nav className="hidden items-center gap-7 xl:flex" aria-label="Primary">
          {NAV.map((n) => (
            <a key={n.id} href={`#${n.id}`} className="text-[0.72rem] font-semibold uppercase tracking-[0.2em] text-ivory/85 transition-colors hover:text-cyan">
              {n.label}
            </a>
          ))}
        </nav>
        <div className="flex items-center gap-3">
          <a href="#contact" className="btn-primary hidden !py-3 sm:inline-flex">Book a Consultation</a>
          <button onClick={() => setOpen(true)} className="grid h-11 w-11 place-items-center text-ivory xl:hidden" aria-label="Open menu">
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
  useEffect(() => {
    const on = () => setShow(window.scrollY > window.innerHeight * 0.9);
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);
  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      aria-label="Back to top"
      className={`fixed bottom-6 right-6 z-40 grid h-12 w-12 place-items-center bg-teal text-cyan shadow-lg transition-all duration-500 hover:bg-teal-deep ${show ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-6 opacity-0"}`}
    >
      <ArrowUp className="h-5 w-5" />
    </button>
  );
}

function Butterfly({ size = 22 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 40 40" aria-hidden>
      <g className="wing-l"><path d="M20 20 C10 4, 0 10, 6 20 C0 30, 10 34, 20 22Z" className="fill-teal" opacity=".9" /></g>
      <g className="wing-r"><path d="M20 20 C30 4, 40 10, 34 20 C40 30, 30 34, 20 22Z" className="fill-cyan" opacity=".95" /></g>
      <rect x="19" y="13" width="2" height="16" rx="1" className="fill-teal-deep" />
    </svg>
  );
}

export function ButterflyCursor() {
  const ref = useRef<HTMLDivElement>(null);
  const [enabled, setEnabled] = useState(false);
  const [flights, setFlights] = useState<{ id: number; x: number; y: number }[]>([]);
  useEffect(() => {
    const ok = window.matchMedia("(pointer: fine)").matches && !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    setEnabled(ok);
    if (!ok) return;
    let tx = -100, ty = -100, x = tx, y = ty, raf = 0;
    const move = (e: MouseEvent) => { tx = e.clientX + 14; ty = e.clientY + 14; };
    const loop = () => {
      x += (tx - x) * 0.12; y += (ty - y) * 0.12;
      if (ref.current) ref.current.style.transform = `translate(${x}px, ${y}px) rotate(${(tx - x) * 0.4}deg)`;
      raf = requestAnimationFrame(loop);
    };
    let last = 0;
    const scroll = () => {
      const now = Date.now();
      if (now - last < 1600) return;
      last = now;
      const id = now;
      setFlights((f) => [...f.slice(-1), { id, x: window.innerWidth * (0.6 + Math.random() * 0.3), y: window.innerHeight * (0.55 + Math.random() * 0.3) }]);
      setTimeout(() => setFlights((f) => f.filter((b) => b.id !== id)), 2300);
    };
    window.addEventListener("mousemove", move);
    window.addEventListener("scroll", scroll, { passive: true });
    raf = requestAnimationFrame(loop);
    return () => { cancelAnimationFrame(raf); window.removeEventListener("mousemove", move); window.removeEventListener("scroll", scroll); };
  }, []);
  if (!enabled) return null;
  return (
    <>
      <div ref={ref} className="pointer-events-none fixed left-0 top-0 z-[60]"><Butterfly /></div>
      {flights.map((b) => (
        <div key={b.id} className="animate-fly pointer-events-none fixed z-[60]" style={{ left: b.x, top: b.y }}><Butterfly size={28} /></div>
      ))}
    </>
  );
}

export function Footer() {
  return (
    <footer className="bg-teal-deep text-ivory/80">
      <div className="mx-auto max-w-[1400px] px-6 py-20 lg:px-10">
        <div className="mb-16 flex flex-col items-start justify-between gap-6 border-b border-ivory/15 pb-16 md:flex-row md:items-end">
          <h2 className="max-w-2xl text-4xl text-ivory md:text-6xl">Let's shape your next space together.</h2>
          <a href="#contact" className="btn-primary bg-cyan !text-teal-deep hover:!bg-ivory">Book a Consultation</a>
        </div>
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <div className="inline-block rounded-sm bg-ivory px-3 py-2"><img src={logo} alt="STUQ logo" className="h-10 w-auto" loading="lazy" /></div>
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
