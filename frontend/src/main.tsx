import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { AppRoutes } from "./Routes/index.tsx";
import { AuthProvider } from "./Contex/AuthContext.tsx";
import { TeamProvider } from "./Contex/TeamContext.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <AuthProvider>
      <TeamProvider>
        <AppRoutes />
      </TeamProvider>
    </AuthProvider>
  </React.StrictMode>
);
