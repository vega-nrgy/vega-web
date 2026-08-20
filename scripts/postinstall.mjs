// Linux build environments (Vercel, most CI) use @sparticuz/chromium in
// prerender.mjs — it ships its own statically-linked binary via the npm
// package itself, no separate download needed. Everywhere else (local
// Windows/Mac dev), fetch Playwright's own Chromium build so `npm run build`
// works out of the box.
import { execSync } from "node:child_process";

if (process.platform !== "linux") {
  execSync("playwright install chromium", { stdio: "inherit" });
}
