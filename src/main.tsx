import { SpeedInsights } from "@vercel/speed-insights/react";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { Loader } from "./components/loader/Loader.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <SpeedInsights />
    <Loader />
    <App />
  </StrictMode>,
);
