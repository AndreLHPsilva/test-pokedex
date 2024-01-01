import { useContext } from "react";
import { TeamContext } from "../Contex/TeamContext";
import { IPokemonsExternal } from "../Types/PokemonsContext/PokemonsContext";
import { ImagePokemon } from "./Global/ImagePokemon";
import { PokemonTypeColor } from "../Helpers/PokemonTypeColor";
import { Button } from "./Global/Button";
import { Icon } from "@iconify/react/dist/iconify.js";
import { VerifyIfMyPokemons } from "../Helpers/VerifyIfMyPokemon";
import { AuthContext } from "../Contex/AuthContext";

interface DatasPokemonProps {
  pokemon: IPokemonsExternal;
}

export function DatasPokemon({ pokemon }: DatasPokemonProps) {
  const { AddPokemon } = useContext(TeamContext);
  const { team } = useContext(AuthContext);

  const colorDynamic: string = pokemon
    ? PokemonTypeColor[pokemon.types[0]]
    : "text-black";

  let already_add_this_pokemon = false;

  if (team) {
    already_add_this_pokemon = VerifyIfMyPokemons({
      my_pokemons: team.pokemons,
      pokemon_for_verify: pokemon,
    });
  }

  return (
    <div className="flex flex-col items-center justify-center gap-2 flex-1">
      {pokemon && <ImagePokemon pokemon={pokemon} className="w-28 h-28" />}
      <div className="flex gap-2 items-center">
        <span className="font-Bevan">{pokemon?.name}</span>
        <span className="text-sm font-semibold">Nº {pokemon?.id}</span>
      </div>
      <div className="flex">
        <span className="pl-3 text-sm">
          Altura:{" "}
          <span className="font-VT323 text-xl font-semibold">
            {pokemon?.height}
          </span>
        </span>
        <span className="pl-3 text-sm">
          Peso:{" "}
          <span className="font-VT323 text-xl font-semibold">
            {pokemon?.weight}
          </span>
        </span>
      </div>
      <div className="flex gap-3">
        {pokemon?.types.map((type) => {
          return (
            <span className={`${colorDynamic} px-2 py-1 border rounded shadow`}>
              {type}
            </span>
          );
        })}
      </div>
      <Button
        className="flex items-center justify-center gap-2 text-xs bg-redPrimary text-white font-medium tracking-wider hover:bg-redSecondary hover:scale-95 transition-all shadow mt-5 disabled:opacity-50 disabled:cursor-not-allowed"
        onClick={() => AddPokemon(pokemon!.id)}
        isDisabled={already_add_this_pokemon}
      >
        <Icon icon="typcn:plus" width={16} />
        Adicionar ao time
      </Button>
    </div>
  );
}
