import { useContext, useEffect } from "react";
import { ListPokemons } from "../Components/Pokemons/ListPokemons";
import { Search } from "../Components/Search";
import { PokemonsContext } from "../Contex/PokemonsContext";
import { ButtonsPagination } from "../Components/ButtonsPagination";
import { ButtonToTop } from "../Components/ButtonToTop";
import { CardPokemonSkeleton } from "../Components/Global/CardPokemonSkeleton";

export function Home() {
  const {
    GetTypesPokemons,
    GetPokemons,
    setSearch,
    setTypeSelected,
    GetPokemonNames,
    loadingPokemon,
  } = useContext(PokemonsContext);

  useEffect(() => {
    GetPokemons();
    GetTypesPokemons();
    GetPokemonNames();
    setSearch("");
    setTypeSelected(null);
  }, []);

  return (
    <>
      <Search />
      <ButtonsPagination />
      {!loadingPokemon && <ListPokemons />}
      {loadingPokemon && <CardPokemonSkeleton />}
      <ButtonToTop />
    </>
  );
}
