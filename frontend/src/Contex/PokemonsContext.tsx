import { createContext, useState } from "react";
import {
  IParamsGetByTypePokemonsDTO,
  findPokemon,
  getByTypePokemons,
  getPokemonNames,
  getPokemons,
  getTypesPokemons,
} from "../Api/Pokemon";
import {
  IOptionsTypePokemon,
  IPaginationDTO,
  IPaginationParamsDTO,
  IPokemonNames,
  IPokemonsContext,
  IPokemonsExternal,
} from "../Types/PokemonsContext/PokemonsContext";
import { ITypesPokemons } from "../Types/TypesPokemons";
import { SendReport } from "../Helpers/Notifications";

const PokemonsContext = createContext<IPokemonsContext>({} as IPokemonsContext);

const PokemonsProvider = ({ children }: { children: React.ReactNode }) => {
  const paginationBase: IPaginationDTO = {
    limit: 21,
    offset: 0,
    total: 0,
  };

  const [pokemons, setPokemons] = useState<IPokemonsExternal[]>([]);
  const [pokemonNames, setPokemonNames] = useState<IPokemonNames[]>([]);
  const [specificPokemon, setSpecificPokemon] =
    useState<IPokemonsExternal | null>(null);
  const [typesPokemons, setTypesPokemons] = useState<ITypesPokemons[]>([]);
  const [typeSelected, setTypeSelected] = useState<IOptionsTypePokemon | null>(
    null
  );
  const [typeSearch, setTypeSearch] = useState<"type" | "others">("others");
  const [search, setSearch] = useState<string>("");
  const [pagination, setPagination] = useState<IPaginationDTO>(paginationBase);
  const [loadingPokemon, setLoadingPokemon] = useState<boolean>(false);
  const [loadingNames, setLoadingNames] = useState<boolean>(false);

  async function GetPokemons(data?: IPaginationParamsDTO) {
    setLoadingPokemon(true);
    setTypeSearch("others");
    const response = await getPokemons(data);
    setPagination(response.pagination);
    setPokemons(response.pokemons);
    setLoadingPokemon(false);
    return;
  }

  async function FindPokemon(search: string | number) {
    setLoadingPokemon(true);

    if (typeof search == "string" && !search.trim()) {
      setSearch("");
      SendReport({
        type: "error",
        title: "<strong>Valor inválido</strong>",
        text: `Nenhum valor para pesquisa informado!`,
        btnCallback: () => {},
      });
      setLoadingPokemon(false);
      return;
    }

    if (!isNaN(Number(search)) && Number(search) <= 0) {
      setSearch("");
      SendReport({
        type: "error",
        title: "<strong>Valor inválido</strong>",
        text: `Informe valor maior que Zero!`,
        btnCallback: () => {},
      });
      setLoadingPokemon(false);
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
    setLoadingPokemon(false);
    return;
  }

  async function GetByTypePokemon(data?: IParamsGetByTypePokemonsDTO) {
    setLoadingPokemon(true);
    setSearch("");
    const response = await getByTypePokemons(data);
    setPagination(response.pagination);
    setPokemons(response.pokemons);
    setLoadingPokemon(false);
    return;
  }

  async function GetTypesPokemons() {
    setTypesPokemons(await getTypesPokemons());
    return;
  }

  async function GetPokemonNames() {
    const names = await getPokemonNames();

    if (names.length > 0) {
      setPokemonNames(names);
    }
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
        loadingPokemon, 
        setLoadingPokemon,
        pokemonNames,
        setPokemonNames,
        loadingNames,
        setLoadingNames,
        GetPokemonNames,
      }}
    >
      <>{children}</>
    </PokemonsContext.Provider>
  );
};

export { PokemonsProvider, PokemonsContext };
