// Local dev-only server for the Vercel functions in api/. Vite's own dev
// server doesn't execute anything under api/, so `npm run dev` alone can't
// exercise the real /send-otp, /verify-and-submit, or /contact endpoints —
// this fills that gap by running the same handlers directly over plain
// Node http, with vite.config.ts proxying /api/* here. Not used in
// production (Vercel serves api/ natively there).
import { createServer } from "node:http";
import { readFileSync, existsSync } from "node:fs";
import path from "node:path";

const envPath = path.resolve(import.meta.dirname, "..", ".env");
if (existsSync(envPath)) {
  for (const line of readFileSync(envPath, "utf8").split(/\r?\n/)) {
    const m = line.match(/^([A-Z_]+)=(.*)$/);
    if (m) process.env[m[1]] ??= m[2].trim();
  }
}

const contact = (await import("../api/contact.ts")).default;
const sendOtp = (await import("../api/send-otp.ts")).default;
const verifyAndSubmit = (await import("../api/verify-and-submit.ts")).default;

const ROUTES = {
  "/api/contact": contact,
  "/api/send-otp": sendOtp,
  "/api/verify-and-submit": verifyAndSubmit,
};

const PORT = 3101;

const server = createServer(async (req, res) => {
  const handler = ROUTES[req.url];
  if (!handler) {
    res.statusCode = 404;
    res.end("not found");
    return;
  }

  let body = {};
  if (req.method === "POST") {
    const chunks = [];
    for await (const chunk of req) chunks.push(chunk);
    const raw = Buffer.concat(chunks).toString("utf8");
    try {
      body = raw ? JSON.parse(raw) : {};
    } catch {
      res.statusCode = 400;
      res.end("invalid json");
      return;
    }
  }

  const vercelReq = Object.assign(req, { body });
  const vercelRes = {
    _status: 200,
    status(code) {
      this._status = code;
      return this;
    },
    json(payload) {
      res.statusCode = this._status;
      res.setHeader("Content-Type", "application/json");
      res.end(JSON.stringify(payload));
    },
  };

  try {
    await handler(vercelReq, vercelRes);
  } catch (err) {
    console.error(`[dev-api-server] ${req.url}`, err);
    res.statusCode = 500;
    res.end(JSON.stringify({ error: "internal error" }));
  }
});

server.listen(PORT, () => {
  console.log(`[dev-api-server] listening on http://localhost:${PORT}`);
});
