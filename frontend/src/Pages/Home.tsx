import { useContext, useEffect } from "react";
import { Pagination } from "../Components/Pagination";
import { ListPokemons } from "../Components/Pokemons/ListPokemons";
import { Search } from "../Components/Search";
import { PokemonsContext } from "../Contex/PokemonsContext";

export function Home() {
  const { GetTypesPokemons, GetPokemons, setSearch, setTypeSelected } =
    useContext(PokemonsContext);

  useEffect(() => {
    GetPokemons();
    GetTypesPokemons();
    setSearch("");
    setTypeSelected(null);
  }, []);

  return (
    <>
      <Search />
      <Pagination />
      <ListPokemons />
    </>
  );
}
