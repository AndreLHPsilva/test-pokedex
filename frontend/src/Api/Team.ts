import { axiosInstance } from "../Config/Axios";
import { SendReport } from "../Helpers/Notifications";
import { ITeam } from "../Types/User";

interface ApiResponse {
  data: any;
  message: string;
  developMessage: string | null;
  statusHTTP: number;
}

export interface IRemovePokemonDTO {
  pokemon_id: string;
  team_id: string;
}

export interface IUpdateTeamDTO {
  name: string;
  team_id: string;
}

export async function handleCreateTeam(name: string): Promise<ITeam | null> {
  try {
    const response = await axiosInstance.post<ApiResponse>("/teams", { name });
    return response.data.data;
  } catch (error: any) {
    SendReport({
      type: "error",
      title: "Erro ao criar time",
      text: error.response
        ? error.response.data.message
        : "Erro inesperado do sistema. Tente novamente.",
      btnCallback: () => {},
    });

    return null;
  }
}

export async function handleAddPokemon(
  external_id: number
): Promise<ITeam | null> {
  try {
    const response = await axiosInstance.post<ApiResponse>(
      "/teams/add-pokemon",
      {
        external_id,
      }
    );
    return response.data.data;
  } catch (error: any) {
    SendReport({
      type: "error",
      title: "Erro ao adicionar pokemon",
      text: error.response
        ? error.response.data.message
        : "Erro inesperado do sistema. Tente novamente.",
      btnCallback: () => {},
    });

    return null;
  }
}

export async function handleRemovePokemon({
  pokemon_id,
  team_id,
}: IRemovePokemonDTO): Promise<ITeam | null> {
  try {
    const response = await axiosInstance.delete<ApiResponse>(
      `/teams/${team_id}/remove-pokemon/${pokemon_id}`
    );
    return response.data.data;
  } catch (error: any) {
    SendReport({
      type: "error",
      title: "Erro ao remover pokemon",
      text: error.response
        ? error.response.data.message
        : "Erro inesperado do sistema. Tente novamente.",
      btnCallback: () => {},
    });
    return null;
  }
}

export async function handleUpdateTeam({
  name,
  team_id,
}: IUpdateTeamDTO): Promise<ITeam | null> {
  try {
    const response = await axiosInstance.put<ApiResponse>(`/teams/${team_id}`, {
      name,
    });

    return response.data.data;
  } catch (error: any) {
    SendReport({
      type: "error",
      title: "Erro ao atualizar time",
      text: error.response
        ? error.response.data.message
        : "Erro inesperado do sistema. Tente novamente.",
      btnCallback: () => {},
    });
    
    return null;
  }
}
