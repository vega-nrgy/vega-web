// Post-build step: crawls the built SPA with headless Chromium and writes each
// route's fully-rendered HTML (real <title>/meta/OG/JSON-LD from usePageMeta)
// into dist/<route>/index.html. The app still ships as a normal client-rendered
// bundle — this only changes what a non-JS crawler or link-unfurler sees on the
// first response. Keep ROUTES in sync with src/App.tsx and public/sitemap.xml.
import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { chromium } from "playwright-core";
import { preview } from "vite";

const ROUTES = [
  "/",
  "/about",
  "/network",
  "/solutions",
  "/contact",
  "/partner",
  "/blog",
  "/blog/hyderabad-nh65-ev-charging-investment",
];
const DIST_DIR = path.resolve(import.meta.dirname, "..", "dist");

// Vercel's build container (and most Linux CI) is missing shared libs
// (libnspr4.so, libnss3.so, ...) that Chromium needs, and @sparticuz/chromium
// only unpacks its bundled copies of them when it detects a Lambda-like
// runtime at import time — hence setting AWS_LAMBDA_JS_RUNTIME *before* the
// dynamic import. Verified directly (ldd) that without this var, those libs
// resolve to "not found"; with it, they resolve to the package's own
// unpacked al2023/lib/. Everywhere else (local Windows/Mac dev), launch the
// Chromium Playwright's own CLI installed via postinstall.
async function launchBrowser() {
  if (process.platform === "linux") {
    process.env.AWS_LAMBDA_JS_RUNTIME ??= "nodejs22.x";
    const { default: sparticuzChromium } = await import("@sparticuz/chromium");
    return chromium.launch({
      args: sparticuzChromium.args,
      executablePath: await sparticuzChromium.executablePath(),
      headless: true,
    });
  }
  return chromium.launch();
}

async function main() {
  // Bind explicitly to the IPv4 loopback — some Linux containers (verified in
  // a Debian-slim Docker test) resolve bare "localhost" to ::1 while the
  // preview server only listens on 127.0.0.1, causing ECONNREFUSED.
  const server = await preview({ preview: { host: "127.0.0.1", port: 4173, strictPort: false } });
  const baseUrl = server.resolvedUrls.local[0];

  const browser = await launchBrowser();
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
