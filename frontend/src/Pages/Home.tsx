import { useContext, useEffect } from "react";
import { ListPokemons } from "../Components/Pokemons/ListPokemons";
import { Search } from "../Components/Search";
import { PokemonsContext } from "../Contex/PokemonsContext";
import { ButtonsPagination } from "../Components/ButtonsPagination";
import { ButtonToTop } from "../Components/ButtonToTop";

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
      <ButtonsPagination />
      <ListPokemons />
      <ButtonToTop />
    </>
  );
}
