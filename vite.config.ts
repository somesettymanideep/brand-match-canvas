// @lovable.dev/vite-tanstack-config already includes the following — do NOT add them manually
// or the app will break with duplicate plugins:
//   - TanStack devtools (dev-only, first), tanstackStart, viteReact, tailwindcss, tsConfigPaths,
//     nitro (build-only using cloudflare as a default target), VITE_* env injection, @ path alias,
//     React/TanStack dedupe, error logger plugins, and sandbox detection (port/host/strictPort).
// You can pass additional config via defineConfig({ vite: { ... }, etc... }) if needed.
import { defineConfig } from "@lovable.dev/vite-tanstack-config";

// GITHUB_PAGES=1 switches the build to a static GitHub Pages target:
// nitro "static" preset + prerendered "/" + subpath base for project pages.
// Lovable's own build (no GITHUB_PAGES env) keeps the Cloudflare target unchanged.
const githubPages = process.env.GITHUB_PAGES === "1";

export default defineConfig({
  tanstackStart: {
    // Redirect TanStack Start's bundled server entry to src/server.ts (our SSR error wrapper).
    // nitro/vite builds from this
    server: { entry: "server" },
    ...(githubPages
      ? {
          pages: [{ path: "/" }],
          prerender: { enabled: true, autoStaticPathsDiscovery: false },
        }
      : {}),
  },
  ...(githubPages
    ? {
        vite: { base: "/brand-match-canvas/" },
      }
    : {}),
});
