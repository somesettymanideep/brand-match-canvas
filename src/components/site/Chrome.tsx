import { useEffect, useRef, useState } from "react";
import { ArrowUp, Menu, X, Instagram, Linkedin, Facebook } from "lucide-react";
import logo from "@/assets/stuq-logo.png";
import { NAV, SOCIALS } from "./data";

const Pin = (p: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={p.className}>
    <circle cx="12" cy="12" r="9" />
    <path d="M11 8c3-1 5 1 4.5 3.5S12 14 11.5 12M11 9l-2.5 10" strokeLinecap="round" />
  </svg>
);
type IconC = (p: { className?: string }) => React.ReactElement;
export const SOCIAL_ICONS: Record<"Instagram" | "Pinterest" | "LinkedIn" | "Facebook", IconC> = {
  Instagram: (p) => <Instagram className={p.className} />,
  Pinterest: Pin,
  LinkedIn: (p) => <Linkedin className={p.className} />,
  Facebook: (p) => <Facebook className={p.className} />,
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
  return (
    <ul className="fixed left-0 top-1/2 z-40 hidden -translate-y-1/2 flex-col gap-1 md:flex" aria-label="Social media">
      {SOCIALS.map((s) => {
        const Icon = SOCIAL_ICONS[s.name as keyof typeof SOCIAL_ICONS];
        return (
          <li key={s.name}>
            <a href={s.href} aria-label={s.name} className="group flex h-11 items-center bg-teal text-ivory transition-colors hover:bg-teal-deep focus-visible:bg-teal-deep">
              <span className="grid h-11 w-11 place-items-center"><Icon className="h-4 w-4" /></span>
              <span className="max-w-0 overflow-hidden whitespace-nowrap text-[0.65rem] font-bold uppercase tracking-[0.2em] transition-all duration-500 group-hover:max-w-32 group-hover:pr-4 group-focus-visible:max-w-32 group-focus-visible:pr-4">{s.name}</span>
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
            <div className="mt-6 flex gap-2">
              {SOCIALS.map((s) => { const I = SOCIAL_ICONS[s.name as keyof typeof SOCIAL_ICONS]; return (
                <a key={s.name} href={s.href} aria-label={s.name} className="grid h-10 w-10 place-items-center border border-ivory/20 transition-colors hover:border-cyan hover:text-cyan"><I className="h-4 w-4" /></a>
              ); })}
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
