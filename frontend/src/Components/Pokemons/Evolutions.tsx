import { Link } from "react-router-dom";
import { IPokemonsExternal } from "../../Types/PokemonsContext/PokemonsContext";
import { PokemonTypeColor } from "../../Helpers/PokemonTypeColor";

interface IEvolutionsProps {
  pokemon: IPokemonsExternal;
}

export function Evolutions({ pokemon }: IEvolutionsProps) {

  function getColorByType(index: number) {
    return PokemonTypeColor[pokemon.types[index]] ?? PokemonTypeColor[pokemon.types[0]];
  }

  return (
    <div className="flex flex-col gap-2 mt-3">
      <h2 className="font-medium text-xs text-gray-500">Evoluções:</h2>
      <div className="grid gap-5 grid-cols-3 xs-tablet:grid-cols-1">
        {pokemon?.evolutions.map((evolution, index) => (
          <Link
            to={evolution.link_url}
            title={`Clique para ver mais sobre ${evolution.name}`}
            key={index}
          >
            <div className={`rounded-full border p-4 shadow-md hover:shadow-lg transition duration-300 ${getColorByType(index)}`}>
              <div className="max-w-28 mx-auto">
                <img
                  src={evolution.basic_img_url}
                  alt={evolution.name}
                  className="object-contain w-full h-auto"
                />
              </div>
              <span className={`block mt-2 text-center font-Bevan ${getColorByType(index)}`}>
                {evolution.position}º
              </span>
              <span className="block mt-1 text-center font-VT323 text-xl text-gray-900">
                {evolution.name}
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
