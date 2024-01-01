import { Link } from "react-router-dom";
import { IPokemonsExternal } from "../../Types/PokemonsContext/PokemonsContext";
import { PokemonTypeColor } from "../../Helpers/PokemonTypeColor";
import { ImagePokemon } from "../Global/ImagePokemon";

interface CardPokemonProps {
  pokemon: IPokemonsExternal;
}

export function CardPokemon({ pokemon }: CardPokemonProps) {
  const colorDynamic: string = PokemonTypeColor[pokemon.types[0]];

  return (
    <section className="flex justify-center items-center">
      <Link
        to={`/pokemon/${pokemon.id}`}
        className="transition-all hover:scale-95  hover:shadow-lg"
      >
        <div className="border flex flex-col justify-center items-center p-10 rounded w-80 gap-3">
          <div className="flex flex-col items-center gap-1">
            <div className="max-w-20 max-h-20">
              <ImagePokemon pokemon={pokemon} />
            </div>
            <span className="text-sm">Nº {pokemon.id}</span>
          </div>
          <span className="font-Bevan">{pokemon.name}</span>
          <div className="flex gap-3">
            {pokemon.types.map((type) => {
              return (
                <span
                  className={`${colorDynamic} px-2 py-1 border rounded shadow`}
                >
                  {type}
                </span>
              );
            })}
          </div>
        </div>
      </Link>
    </section>
  );
}
