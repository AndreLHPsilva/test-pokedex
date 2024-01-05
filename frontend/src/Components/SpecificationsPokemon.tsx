import { IPokemonsExternal } from "../Types/PokemonsContext/PokemonsContext";
import { PokemonTypeColor } from "../Helpers/PokemonTypeColor";
import { Evolutions } from "./Pokemons/Evolutions";

interface SpecificationsPokemonProps {
  pokemon: IPokemonsExternal;
}

export function SpecificationsPokemon({ pokemon }: SpecificationsPokemonProps) {
  const colorDynamic: string = pokemon
    ? PokemonTypeColor[pokemon.types[0]]
    : "text-black";

  return (
    <div className="flex flex-col px-10 gap-3 flex-1 w-full justify-center items-center tablet:px-5 mobile:px-5 tablet:pt-5 mobile:pt-5">
      <div className="flex items-start tablet:justify-center gap-10">
        <div>
          <h2 className="font-medium text-xs text-gray-500">Habilidades:</h2>
          <div className="flex flex-col">
            {pokemon?.abilities.map((ability) => {
              return <span className="pl-3 font-VT323 text-xl">{ability}</span>;
            })}
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-3">
        <h2 className="font-medium text-xs text-gray-500">Status:</h2>
        <div className="grid grid-cols-3 gap-5 self-start xs-tablet:grid-cols-2 lg-tablet:grid-cols-2 xs-tablet:gap-1">
          {pokemon?.stats.map((stat) => {
            return (
              <span
                className={`px-2 py-1 border rounded shadow flex items-center w-full gap-2`}
              >
                <span className="font-medium text-xs whitespace-nowrap">
                  {stat.name}:
                </span>
                <span
                  className={`font-VT323 text-xl text-end w-full ${colorDynamic} font-extrabold`}
                >
                  {stat.qnt}
                </span>
              </span>
            );
          })}
        </div>
      </div>
      <Evolutions pokemon={pokemon} />
    </div>
  );
}
