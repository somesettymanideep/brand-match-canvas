import { useEffect, useState } from "react";
import logo from "@/assets/stuq-logo.png";

const LOGO_ASPECT = 500 / 211;
const STORAGE_KEY = "sea_intro_played";

export function IntroPreloader() {
  const [phase, setPhase] = useState<"init" | "fade-in" | "hold" | "moving" | "done">("init");
  const [reduced, setReduced] = useState(false);

  // Measured in the mount effect so the server and client render the same first frame.
  const [startRect, setStartRect] = useState<{ left: number; top: number; width: number; height: number } | null>(null);

  const [targetRect, setTargetRect] = useState<{ left: number; top: number; width: number; height: number } | null>(null);

  useEffect(() => {
    // Detect if this page load is an intentional user reload/refresh
    const isReload = (() => {
      try {
        const navEntries = performance.getEntriesByType("navigation");
        if (navEntries.length > 0) {
          return (navEntries[0] as PerformanceNavigationTiming).type === "reload";
        }
        return (performance as any).navigation?.type === 1;
      } catch {
        return false;
      }
    })();

    // On user reload, reset session flag so the intro plays on demand
    if (isReload) {
      try {
        sessionStorage.removeItem(STORAGE_KEY);
      } catch {}
    }

    const force = typeof window !== "undefined" && window.location.search.includes("intro=1");
    let alreadyPlayed = false;
    try {
      alreadyPlayed = sessionStorage.getItem(STORAGE_KEY) === "true";
    } catch {
      alreadyPlayed = false;
    }

    const prefersReduced = typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // Skip intro if already played in this session (unless forced or reloaded)
    if (!force && alreadyPlayed) {
      document.documentElement.classList.remove("intro-active", "intro-revealing");
      setPhase("done");
      return;
    }

    // Handle reduced motion preference: quick 250ms fade directly to header
    if (prefersReduced) {
      setReduced(true);
      setPhase("fade-in");
      const t = setTimeout(() => {
        document.documentElement.classList.remove("intro-active", "intro-revealing");
        try {
          sessionStorage.setItem(STORAGE_KEY, "true");
        } catch {}
        setPhase("done");
      }, 250);
      return () => clearTimeout(t);
    }

    // Lock scrolling during intro sequence
    window.scrollTo(0, 0);
    document.documentElement.classList.add("intro-active");
    document.documentElement.style.overflow = "hidden";
    document.body.style.overflow = "hidden";

    // Recalculate fresh start dimensions on mount
    const startW = Math.min(260, Math.round(window.innerWidth * 0.55));
    const startH = Math.round(startW / LOGO_ASPECT);
    const startX = (window.innerWidth - startW) / 2;
    const startY = (window.innerHeight - startH) / 2;
    setStartRect({ left: startX, top: startY, width: startW, height: startH });

    // Measure exact header logo target coordinates
    const measureTarget = () => {
      const headerImg = document.getElementById("header-logo-img");
      if (headerImg) {
        const r = headerImg.getBoundingClientRect();
        if (r.width > 0 && r.height > 0) {
          return { left: r.left, top: r.top, width: r.width, height: r.height };
        }
      }
      const headerBadge = document.getElementById("header-logo");
      if (headerBadge) {
        const r = headerBadge.getBoundingClientRect();
        if (r.width > 0 && r.height > 0) {
          const h = 36;
          const w = h * LOGO_ASPECT;
          const left = r.left;
          const top = r.top + (r.height - h) / 2;
          return { left, top, width: w, height: h };
        }
      }
      const isMobile = window.innerWidth < 1024;
      const left = isMobile ? 24 : 40;
      const top = 26;
      const h = 36;
      const w = h * LOGO_ASPECT;
      return { left, top, width: w, height: h };
    };

    setTargetRect(measureTarget());

    // 1. Logo fade-in starts immediately (300ms)
    const raf = requestAnimationFrame(() => {
      setPhase("fade-in");
    });

    // 2. Logo hold in screen center (400ms hold from 300ms to 700ms)
    const tHold = setTimeout(() => {
      setPhase("hold");
    }, 300);

    // 3. Movement and overlay reveal starts at 700ms (1,000ms duration)
    const tMove = setTimeout(() => {
      setTargetRect(measureTarget());
      document.documentElement.classList.add("intro-revealing");
      setPhase("moving");
    }, 700);

    // 4. Settle into header at 1700ms (700ms + 1000ms)
    const tDone = setTimeout(() => {
      document.documentElement.classList.remove("intro-active", "intro-revealing");
      document.documentElement.style.overflow = "";
      document.body.style.overflow = "";
      try {
        sessionStorage.setItem(STORAGE_KEY, "true");
      } catch {}
      setPhase("done");
    }, 1700);

    // Safety fallback: ensure page is never permanently locked
    const tSafety = setTimeout(() => {
      document.documentElement.classList.remove("intro-active", "intro-revealing");
      document.documentElement.style.overflow = "";
      document.body.style.overflow = "";
    }, 2800);

    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(tHold);
      clearTimeout(tMove);
      clearTimeout(tDone);
      clearTimeout(tSafety);
      document.documentElement.classList.remove("intro-active", "intro-revealing");
      document.documentElement.style.overflow = "";
      document.body.style.overflow = "";
    };
  }, []);

  if (phase === "done") return null;

  if (reduced) {
    return (
      <div
        className="fixed inset-0 z-[100] bg-teal-deep pointer-events-none transition-opacity duration-300"
        style={{
          opacity: phase === "fade-in" ? 0 : 1,
        }}
      />
    );
  }

  const isMoving = phase === "moving";
  const isVisible = phase === "fade-in" || phase === "hold" || phase === "moving";

  let transform = "translate3d(0, 0, 0) scale(1)";
  if (isMoving && startRect && targetRect) {
    const scale = targetRect.height / startRect.height;
    const dx = targetRect.left - startRect.left;
    const dy = targetRect.top - startRect.top;
    transform = `translate3d(${dx}px, ${dy}px, 0) scale(${scale})`;
  }

  // CSS filters: luminous pale aqua on deep teal canvas, smoothly shifting to natural brand colors during move
  const aquaFilter = "brightness(0) invert(85%) sepia(25%) saturate(1100%) hue-rotate(130deg) drop-shadow(0 0 16px rgba(128, 222, 234, 0.5))";
  const naturalFilter = "brightness(1) invert(0) sepia(0%) saturate(100%) hue-rotate(0deg) drop-shadow(0 0 0px transparent)";

  return (
    <>
      {/* Full-screen deep teal preloader curtain overlay */}
      <div
        className="fixed inset-0 z-[100] bg-teal-deep pointer-events-none"
        style={{
          transform: isMoving ? "translateY(-100%)" : "translateY(0%)",
          transition: isMoving ? "transform 1000ms cubic-bezier(0.22, 1, 0.36, 1)" : "none",
          willChange: "transform",
        }}
      />

      {/* Moving SEA Logo Layer */}
      {startRect && (
        <div
          className="fixed z-[101] pointer-events-none"
          style={{
            left: `${startRect.left}px`,
            top: `${startRect.top}px`,
            width: `${startRect.width}px`,
            height: `${startRect.height}px`,
            transformOrigin: "top left",
            transform,
            transition: isMoving ? "transform 1000ms cubic-bezier(0.22, 1, 0.36, 1)" : "none",
            opacity: isVisible ? 1 : 0,
            willChange: "transform",
          }}
        >
          <img
            src={logo}
            alt="STUQ – Studio for Eclectic Architecture"
            style={{
              width: "100%",
              height: "100%",
              objectFit: "contain",
              filter: isMoving ? naturalFilter : aquaFilter,
              opacity: isVisible ? 1 : 0,
              transition: isMoving
                ? "filter 1000ms cubic-bezier(0.22, 1, 0.36, 1)"
                : "opacity 300ms ease-out",
            }}
          />
        </div>
      )}
    </>
  );
}
