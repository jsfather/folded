import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { CostsContextProvider } from "./contexts/CostContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <CostsContextProvider>
      <App />
    </CostsContextProvider>
  </React.StrictMode>
);
