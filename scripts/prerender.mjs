// Post-build step: crawls the built SPA with headless Chromium and writes each
// route's fully-rendered HTML (real <title>/meta/OG/JSON-LD from usePageMeta)
// into dist/<route>/index.html. The app still ships as a normal client-rendered
// bundle — this only changes what a non-JS crawler or link-unfurler sees on the
// first response. Keep ROUTES in sync with src/App.tsx and public/sitemap.xml.
import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { chromium } from "playwright";
import { preview } from "vite";

const ROUTES = ["/", "/about", "/network", "/solutions", "/contact", "/partner"];
const DIST_DIR = path.resolve(import.meta.dirname, "..", "dist");

async function main() {
  const server = await preview({ preview: { port: 4173, strictPort: false } });
  const baseUrl = server.resolvedUrls.local[0];

  const browser = await chromium.launch();
  const page = await browser.newPage();

  try {
    for (const route of ROUTES) {
      await page.goto(new URL(route, baseUrl).href, { waitUntil: "networkidle" });

      // usePageMeta sets the canonical tag in a useEffect — wait for it to point
      // at this route before snapshotting, so we don't capture a stale/default head.
      await page
        .waitForFunction(
          (r) => {
            const href = document.querySelector('link[rel="canonical"]')?.getAttribute("href") ?? "";
            return r === "/" ? href.endsWith("/") : href.endsWith(r);
          },
          route,
          { timeout: 5000 },
        )
        .catch(() => {
          console.warn(`[prerender] canonical tag never matched ${route} — snapshotting anyway`);
        });

      const html = await page.content();
      const outDir = route === "/" ? DIST_DIR : path.join(DIST_DIR, route);
      await mkdir(outDir, { recursive: true });
      await writeFile(path.join(outDir, "index.html"), html);
      console.log(`[prerender] wrote ${route === "/" ? "/" : route + "/"}index.html`);
    }
  } finally {
    await browser.close();
    await server.close();
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
