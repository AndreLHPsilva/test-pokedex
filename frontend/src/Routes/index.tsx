import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import App from "../App";
import { Home } from "../Pages/Home";
import { AppPrivateRoutes } from "./privateRoutes";
import { Layout } from "../Components/Global/Layout";
import { MyTeam } from "../Pages/MyTeam";
import { PokemonsProvider } from "../Contex/PokemonsContext";
import { Pokemon } from "../Pages/Pokemon";

export function AppRoutes() {
  const token = localStorage.getItem("token");
  const user = localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user") as string)
    : null;

  const isAutenticated: boolean = user && token;

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={isAutenticated ? <Navigate to="/home" /> : <App />}
        />
        <Route
          path="/home"
          element={
            <AppPrivateRoutes>
              <PokemonsProvider>
                <Layout>
                  <Home />
                </Layout>
              </PokemonsProvider>
            </AppPrivateRoutes>
          }
        />
        <Route
          path="/pokemon/:pokemon_id"
          element={
            <AppPrivateRoutes>
              <PokemonsProvider>
                <Layout>
                  <Pokemon />
                </Layout>
              </PokemonsProvider>
            </AppPrivateRoutes>
          }
        />
        <Route
          path="/meu-time"
          element={
            <AppPrivateRoutes>
              <PokemonsProvider>
                <Layout>
                  <MyTeam />
                </Layout>
              </PokemonsProvider>
            </AppPrivateRoutes>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}
