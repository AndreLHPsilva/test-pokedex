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
import { SendReport } from "../Helpers/Notifications";

const TeamContext = createContext<ITeamContext>({} as ITeamContext);

const TeamProvider = ({ children }: { children: React.ReactNode }) => {
  const { setTeam, team } = useContext(AuthContext);

  async function CreateTeam({ name }: ICreateTeamDTO) {
    const teamCreated = await handleCreateTeam(name);

    if (teamCreated) {
      setTeam(teamCreated);
      localStorage.removeItem("team");
      localStorage.setItem("team", JSON.stringify(teamCreated));

      const nameTeam = teamCreated.name.toUpperCase();

      SendReport({
        type: "success",
        title: "Sucesso!",
        text: `Time <strong>${nameTeam}</strong> criado com sucesso.`,
        btnCallback: () => {},
      });
    }
  }

  async function AddPokemon(external_id: number) {
    const teamResponse = await handleAddPokemon(external_id);

    if (teamResponse) {
      const pokemonCreated = teamResponse.pokemons.find((pokemon) => {
        return pokemon.external_id === external_id;
      });

      const pokemonName = pokemonCreated?.name?.toUpperCase();
      const firstNameTeam = teamResponse.name.split(" ")[0].toUpperCase();

      setTeam(teamResponse);
      localStorage.removeItem("team");
      localStorage.setItem("team", JSON.stringify(teamResponse));
      SendReport({
        type: "success",
        title: "Sucesso!",
        text: `O Pokemon <strong>${pokemonName}</strong> foi <strong>ADICIONADO</strong> com sucesso ao seu time: <strong>${firstNameTeam}</strong>`,
        btnCallback: () => window.location.replace("/home"),
      });
    }
  }

  async function RemovePokemon(data: IRemovePokemonDTO) {
    const oldTeam = team;
    const teamResponse = await handleRemovePokemon(data);

    if (teamResponse) {
      const pokemonRemoved = oldTeam?.pokemons.find((pokemon) => {
        return pokemon.id === data.pokemon_id;
      });

      const firstNameTeam = teamResponse.name.split(" ")[0].toUpperCase();
      const pokemonName = pokemonRemoved!.name.split(" ")[0].toUpperCase();

      setTeam(teamResponse);
      localStorage.removeItem("team");
      localStorage.setItem("team", JSON.stringify(teamResponse));
      SendReport({
        type: "success",
        title: "Sucesso!",
        text: `O Pokemon <strong>${pokemonName}</strong> foi <strong>REMOVIDO</strong> com sucesso do seu time: <strong>${firstNameTeam}</strong>`,
        btnCallback: () => {},
      });
    }
  }

  async function UpdateTeam(data: IUpdateTeamDTO) {
    const teamUpdated = await handleUpdateTeam(data);

    if (teamUpdated) {
      setTeam(teamUpdated);
      localStorage.removeItem("team");
      localStorage.setItem("team", JSON.stringify(teamUpdated));
      SendReport({
        type: "success",
        title: "Sucesso!",
        text: `Time atualizado com sucesso para: <strong>${teamUpdated.name}</strong>`,
        btnCallback: () => window.location.reload(),
        option: {
          plainText: false,
          messageMaxLength: 450,
        },
      });
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
