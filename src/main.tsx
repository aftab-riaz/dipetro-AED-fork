import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { StatesProvider } from "./context/StatesContext.jsx"; 

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <StatesProvider>
      <App />
    </StatesProvider>
  </StrictMode>
);
