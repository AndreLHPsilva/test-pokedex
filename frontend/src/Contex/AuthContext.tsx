import { createContext, useContext, useEffect, useState } from "react";
import { ITeam, IUser } from "../Types/User";
import { IAuthContext } from "../Types/AuthContext/AuthContext";

const AuthContext = createContext<IAuthContext>({} as IAuthContext);

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<IUser | null>(null);
  const [team, setTeam] = useState<ITeam | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [showLogin, setShowLogin] = useState<boolean>(true);
  const [showModalCreateTeam, setShowModalCreateTeam] =
    useState<boolean>(false);

  function UpdateUserContext(data: IUser) {
    setUser(data);
    localStorage.removeItem("user");
    localStorage.setItem("user", JSON.stringify(data));
  }

  function UpdateTeamContext(data: ITeam) {
    setTeam(data);
    localStorage.removeItem("team");
    localStorage.setItem("team", JSON.stringify(data));
  }

  function Logout() {
    localStorage.removeItem("team");
    localStorage.removeItem("user");
    localStorage.removeItem("token");

    window.location.replace("/");
  }

  useEffect(() => {
    if (localStorage.getItem("user") && !user) {
      setUser(JSON.parse(localStorage.getItem("user")!));
    }
    if (localStorage.getItem("team") && !team) {
      setTeam(JSON.parse(localStorage.getItem("team")!));
    }
    if (localStorage.getItem("token") && !token) {
      setToken(localStorage.getItem("token"));
    }
  }, []);

  const valuesContext: IAuthContext = {
    setTeam,
    setToken,
    setUser,
    team,
    token,
    UpdateTeamContext,
    UpdateUserContext,
    user,
    showLogin,
    setShowLogin,
    Logout,
    showModalCreateTeam,
    setShowModalCreateTeam,
  };

  return (
    <AuthContext.Provider value={valuesContext}>
      <>{children}</>
    </AuthContext.Provider>
  );
};

function useAuthContext() {
  return useContext(AuthContext);
}
export { AuthContext, AuthProvider, useAuthContext };
