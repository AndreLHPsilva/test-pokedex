import { createContext, useState } from "react";
import {
  IParamsGetByTypePokemonsDTO,
  findPokemon,
  getByTypePokemons,
  getPokemons,
  getTypesPokemons,
} from "../Api/Pokemon";
import {
  IOptionsTypePokemon,
  IPaginationDTO,
  IPaginationParamsDTO,
  IPokemonsContext,
  IPokemonsExternal,
} from "../Types/PokemonsContext/PokemonsContext";
import { ITypesPokemons } from "../Types/TypesPokemons";
import { Notifications } from "../Helpers/Notifications";

const PokemonsContext = createContext<IPokemonsContext>({} as IPokemonsContext);

const PokemonsProvider = ({ children }: { children: React.ReactNode }) => {
  const paginationBase: IPaginationDTO = {
    limit: 21,
    offset: 0,
    total: 0,
  };

  const [pokemons, setPokemons] = useState<IPokemonsExternal[]>([]);
  const [specificPokemon, setSpecificPokemon] =
    useState<IPokemonsExternal | null>(null);
  const [typesPokemons, setTypesPokemons] = useState<ITypesPokemons[]>([]);
  const [typeSelected, setTypeSelected] = useState<IOptionsTypePokemon | null>(
    null
  );
  const [typeSearch, setTypeSearch] = useState<"type" | "others">("others");
  const [search, setSearch] = useState<string>("");
  const [pagination, setPagination] = useState<IPaginationDTO>(paginationBase);
  const [loading, setLoading] = useState<boolean>(false);

  async function GetPokemons(data?: IPaginationParamsDTO) {
    setLoading(true);
    setTypeSearch("others");
    const response = await getPokemons(data);
    setPagination(response.pagination);
    setPokemons(response.pokemons);
    setLoading(false);
    return;
  }

  async function FindPokemon(search: string | number) {
    setLoading(true);

    if (typeof search == "string" && !search.trim()) {
      setSearch("");
      Notifications({
        type: "error",
        message: "Nenhum valor para pesquisa informado!",
      });
      setLoading(false);
      return;
    }

    if (!isNaN(Number(search)) && Number(search) <= 0) {
      setSearch("");
      Notifications({
        type: "error",
        message: "Informe valor maior que Zero!",
      });
      setLoading(false);
      return;
    }

    setTypeSelected(null);
    const pokemon = await findPokemon(search);
    setPagination({
      limit: 21,
      offset: 0,
      total: pokemon ? 1 : 0,
    });
    setPokemons(pokemon ? [pokemon] : []);
    setSpecificPokemon(pokemon);
    setLoading(false);
    return;
  }

  async function GetByTypePokemon(data?: IParamsGetByTypePokemonsDTO) {
    setLoading(true);
    setSearch("");
    const response = await getByTypePokemons(data);
    setPagination(response.pagination);
    setPokemons(response.pokemons);
    setLoading(false);
    return;
  }

  async function GetTypesPokemons() {
    setTypesPokemons(await getTypesPokemons());
    return;
  }

  function ClearSearchs() {
    setTypeSearch("others");
    setSearch("");
    setSpecificPokemon(null);
    setTypeSelected(null);
    setPagination(paginationBase);
    GetPokemons();
  }

  function WhitchRequestSend(paginationParams: IPaginationParamsDTO) {
    switch (typeSearch) {
      case "type":
        setSearch("");
        GetByTypePokemon({
          type: typeSelected!.value!,
          limit: paginationParams.limit,
          offset: paginationParams.offset,
        });
        break;

      default:
        setTypeSearch("others");
        GetPokemons(paginationParams);
        break;
    }
  }

  return (
    <PokemonsContext.Provider
      value={{
        GetPokemons,
        FindPokemon,
        GetTypesPokemons,
        pokemons,
        pagination,
        typesPokemons,
        typeSelected,
        setTypeSelected,
        typeSearch,
        setTypeSearch,
        ClearSearchs,
        GetByTypePokemon,
        WhitchRequestSend,
        search,
        setSearch,
        specificPokemon,
        setSpecificPokemon,
        loading,
        setLoading,
      }}
    >
      <>{children}</>
    </PokemonsContext.Provider>
  );
};

export { PokemonsProvider, PokemonsContext };
