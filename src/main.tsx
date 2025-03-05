import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { GlobalRefsProvider } from "./providers/refs-provider/GlobalRefsProvider.tsx";
import App from "./App.tsx";

import "./assets/styles/globals.css";
import { ExperienceWrapper } from "./components/Experience/Experience.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <GlobalRefsProvider>
      <App />
      <ExperienceWrapper />
    </GlobalRefsProvider>
  </StrictMode>
);
