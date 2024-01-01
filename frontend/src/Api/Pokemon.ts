import { axiosInstance } from "../Config/Axios";
import { Notifications } from "../Helpers/Notifications";
import {
  IPaginationParamsDTO,
  IPokemonsExternal,
  IResponseGetPokemonsDTO,
} from "../Types/PokemonsContext/PokemonsContext";
import { ITypesPokemons } from "../Types/TypesPokemons";

export interface IParamsGetByTypePokemonsDTO {
  limit?: number;
  offset?: number;
  type: string;
}

export const ParamsBase: IPaginationParamsDTO = {
  limit: 21,
  offset: 0,
};

export const ParamsGetByTypeBase: IParamsGetByTypePokemonsDTO = {
  limit: 21,
  offset: 0,
  type: "",
};

export async function getPokemons(
  params: IPaginationParamsDTO = ParamsBase
): Promise<IResponseGetPokemonsDTO> {
  try {
    const pokemons = await axiosInstance.get(`/pokemons`, { params });
    // Notifications({ message: pokemons.data.message });
    return pokemons.data.data;
  } catch (error: any) {
    Notifications({
      type: "error",
      message: error.response
        ? error.response.data.message
        : "Erro inesperado do sistema!",
    });
    return {
      pokemons: [],
      pagination: {
        limit: ParamsBase.limit!,
        offset: ParamsBase.offset!,
        total: 0,
      },
    };
  }
}

export async function findPokemon(
  search: string | number
): Promise<IPokemonsExternal | null> {
  try {
    const pokemons = await axiosInstance.get(`/pokemons/find/${search}`);
    // Notifications({ message: pokemons.data.message });
    return pokemons.data.data;
  } catch (error: any) {
    Notifications({
      type: "error",
      message: error.response
        ? error.response.data.message
        : "Erro inesperado do sistema!",
    });

    return null;
  }
}

export async function getTypesPokemons(): Promise<ITypesPokemons[]> {
  try {
    const types = await axiosInstance.get(`/pokemons/types`);
    // Notifications({ message: types.data.message });
    return types.data.data;
  } catch (error: any) {
    Notifications({
      type: "error",
      message: error.response
        ? error.response.data.message
        : "Erro inesperado do sistema!",
    });

    return [];
  }
}

export async function getByTypePokemons({
  type,
  ...params
}: IParamsGetByTypePokemonsDTO = ParamsGetByTypeBase): Promise<IResponseGetPokemonsDTO> {
  const mergedParams =
    Object.keys(params).length > 0
      ? params
      : {
          limit: ParamsGetByTypeBase.limit,
          offset: ParamsGetByTypeBase.offset,
        };

  try {
    const pokemons = await axiosInstance.get(`/pokemons/type/${type}`, {
      params: mergedParams,
    });
    // Notifications({ message: pokemons.data.message });
    return pokemons.data.data;
  } catch (error: any) {
    Notifications({
      type: "error",
      message: error.response
        ? error.response.data.message
        : "Erro inesperado do sistema!",
    });

    return {
      pokemons: [],
      pagination: {
        limit: ParamsBase.limit!,
        offset: ParamsBase.offset!,
        total: 0,
      },
    };
  }
}
