import { createFileRoute } from "@tanstack/react-router";
import { useRevealAll } from "@/hooks/use-reveal";
import { Header, SocialRail, BackToTop, ButterflyCursor, Footer } from "@/components/site/Chrome";
import { Hero, About, Vastu, Projects, Services, Testimonials, Contact } from "@/components/site/Sections";

const TITLE = "STUQ – Studio for Eclectic Architecture";
const DESC = "Architecture, interiors, landscape and Vastu-informed design by STUQ. Spaces shaped by creativity, precision and purpose.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESC },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESC },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "ProfessionalService",
          name: TITLE,
          description: DESC,
          serviceType: ["Architectural Design", "Interior Design", "Landscape Design", "Structural Design", "Project Management", "BIM Services"],
        }),
      },
    ],
  }),
  component: Index,
});

function Index() {
  useRevealAll();
  return (
    <>
      <Header />
      <SocialRail />
      <main>
        <Hero />
        <About />
        <Vastu />
        <Projects />
        <Services />
        <Testimonials />
        <Contact />
      </main>
      <Footer />
      <BackToTop />
      <ButterflyCursor />
    </>
  );
}
