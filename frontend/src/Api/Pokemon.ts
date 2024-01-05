import { axiosInstance } from "../Config/Axios";
import { SendReport } from "../Helpers/Notifications";
import {
  IPaginationParamsDTO,
  IPokemonNames,
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
    return pokemons.data.data;
  } catch (error: any) {
    SendReport({
      type: "error",
      title: "Erro ao listar pokemons",
      text: error.response
        ? error.response.data.message
        : "Erro inesperado do sistema. Tente novamente.",
      btnCallback: () => {},
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
    return pokemons.data.data;
  } catch (error: any) {
    SendReport({
      type: "error",
      title: "Erro ao buscar pokemon",
      text: error.response
        ? error.response.data.message
        : "Erro inesperado do sistema. Tente novamente.",
      btnCallback: () => {},
    });

    return null;
  }
}

export async function getTypesPokemons(): Promise<ITypesPokemons[]> {
  try {
    const types = await axiosInstance.get(`/pokemons/types`);
    return types.data.data;
  } catch (error: any) {
    SendReport({
      type: "error",
      title: "Erro ao listar tipos",
      text: error.response
        ? error.response.data.message
        : "Erro inesperado do sistema. Tente novamente.",
      btnCallback: () => {},
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
    return pokemons.data.data;
  } catch (error: any) {
    SendReport({
      type: "error",
      title: "Erro ao filtrar por tipo",
      text: error.response
        ? error.response.data.message
        : "Erro inesperado do sistema. Tente novamente.",
      btnCallback: () => {},
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
export async function getPokemonNames(): Promise<IPokemonNames[]> {
  try {
    const pokemonsNames = await axiosInstance.get(`/pokemons/names`);
    return pokemonsNames.data.data;
  } catch (error: any) {
    SendReport({
      type: "error",
      title: "Erro ao buscar nomes",
      text: error.response
        ? error.response.data.message
        : "Erro inesperado do sistema. Tente novamente.",
      btnCallback: () => {},
    });

    return [];
  }
}
