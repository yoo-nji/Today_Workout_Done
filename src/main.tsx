import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./css/index.css";
import { BrowserRouter } from "react-router";

createRoot(document.getElementById("root")!).render(
  // strictMode 제거 추후 필요하면 추가
  <BrowserRouter>
    <App />
  </BrowserRouter>
);
