import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { NavBar } from "./NavBar";

type LayoutProps = {
  children: React.ReactNode;
};

export function Layout({ children }: LayoutProps) {
  const [whitchLinkIsActive, setWhitchLinkIsActive] = useState<
    "home" | "my-team" | null
  >("home");
  const location = useLocation();

  useEffect(() => {
    switch (location.pathname) {
      case "/home":
        setWhitchLinkIsActive("home");
        break;
      case "/meu-time":
        setWhitchLinkIsActive("my-team");
        break;
      default:
        setWhitchLinkIsActive(null);
        break;
    }
  }, [location]);

  return (
    <>
      <NavBar whitchLinkIsActive={whitchLinkIsActive} />
      {children}
    </>
  );
}
