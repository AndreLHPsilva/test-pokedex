import { ITeam, IUser } from "../User";

export interface IAuthContext {
  user: IUser | null;
  token: string | null;
  team: ITeam | null;
  setUser: React.Dispatch<React.SetStateAction<IUser | null>>;
  setToken: React.Dispatch<React.SetStateAction<string | null>>;
  setTeam: React.Dispatch<React.SetStateAction<ITeam | null>>;
  showLogin: boolean;
  setShowLogin: React.Dispatch<React.SetStateAction<boolean>>;
  showModalCreateTeam: boolean;
  setShowModalCreateTeam: React.Dispatch<React.SetStateAction<boolean>>;
  UpdateUserContext: (data: IUser) => void;
  UpdateTeamContext: (data: ITeam) => void;
  Logout(): void;
}
