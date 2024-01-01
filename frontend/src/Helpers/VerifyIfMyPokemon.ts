import { IPokemonsExternal } from "../Types/PokemonsContext/PokemonsContext";
import { IPokemon } from "../Types/User";

interface IProps {
  my_pokemons: IPokemon[];
  pokemon_for_verify: IPokemonsExternal;
}

export function VerifyIfMyPokemons({
  my_pokemons,
  pokemon_for_verify,
}: IProps): boolean {
  const has_this_pokemon = my_pokemons.find((pokemon) => {
    return pokemon.external_id == pokemon_for_verify.id;
  });

  if (has_this_pokemon) {
    return true;
  }

  return false;
}
