import { useContext } from "react";
import { PokemonsContext } from "../../Contex/PokemonsContext";
import { CardPokemon } from "./CardPokemon";

export function ListPokemons() {
  const { pokemons } = useContext(PokemonsContext);

  return (
    <main className="grid grid-cols-3 my-10 mobile:mt-5 px-10 mobile:px-5 gap-2 tablet:grid-cols-1">
      {pokemons.length > 0 ? (
        pokemons.map((pokemon) => {
          return <CardPokemon pokemon={pokemon} />;
        })
      ) : (
        <span className="text-sm font-bold">*Nenhum pokemon encontrado!</span>
      )}
    </main>
  );
}
