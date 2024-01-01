import { createContext, useContext } from "react";
import {
  IRemovePokemonDTO,
  IUpdateTeamDTO,
  handleAddPokemon,
  handleCreateTeam,
  handleRemovePokemon,
  handleUpdateTeam,
} from "../Api/Team";
import { ICreateTeamDTO, ITeamContext } from "../Types/TeamContext/TeamContext";
import { AuthContext } from "./AuthContext";
import { WaitToDisappear } from "../Helpers/Notifications";

const TeamContext = createContext<ITeamContext>({} as ITeamContext);

const TeamProvider = ({ children }: { children: React.ReactNode }) => {
  const { setTeam } = useContext(AuthContext);

  async function CreateTeam({ name }: ICreateTeamDTO) {
    const team = await handleCreateTeam(name);

    if (team) {
      setTeam(team);
      localStorage.removeItem("team");
      localStorage.setItem("team", JSON.stringify(team));
    }
  }

  async function AddPokemon(external_id: number) {
    const team = await handleAddPokemon(external_id);

    if (team) {
      setTeam(team);
      localStorage.removeItem("team");
      localStorage.setItem("team", JSON.stringify(team));
      await WaitToDisappear(1500);
      window.location.replace("/home");
    }
  }

  async function RemovePokemon(data: IRemovePokemonDTO) {
    const team = await handleRemovePokemon(data);

    if (team) {
      setTeam(team);
      localStorage.removeItem("team");
      localStorage.setItem("team", JSON.stringify(team));
    }
  }

  async function UpdateTeam(data: IUpdateTeamDTO) {
    const team = await handleUpdateTeam(data);

    if (team) {
      setTeam(team);
      localStorage.removeItem("team");
      localStorage.setItem("team", JSON.stringify(team));
      await WaitToDisappear(1550);
      window.location.reload();
    }
  }

  const valuesContext: ITeamContext = {
    CreateTeam,
    AddPokemon,
    RemovePokemon,
    UpdateTeam,
  };

  return (
    <TeamContext.Provider value={valuesContext}>
      <>{children}</>
    </TeamContext.Provider>
  );
};

function useTeamContext() {
  return useContext(TeamContext);
}
export { TeamContext, TeamProvider, useTeamContext };
