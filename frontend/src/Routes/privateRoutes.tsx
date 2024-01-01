import { ReactNode } from "react";
import { Navigate } from "react-router-dom";

interface AppPrivateRoutesProps {
  children: ReactNode;
}

export function AppPrivateRoutes({ children }: AppPrivateRoutesProps) {
  const token = localStorage.getItem("token");
  const user = localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user") as string)
    : null;

  if (!user && !token) return <Navigate to={"/"} />;

  return children;
}
