import { useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import { PokemonsContext } from "../Contex/PokemonsContext";
import { SpecificationsPokemon } from "../Components/SpecificationsPokemon";
import { DatasPokemon } from "../Components/DatasPokemon";
import { DatasPokemonSkeleton } from "../Components/Global/DatasPokemonSkeleton";
import { SpecificationsPokemonSkeleton } from "../Components/Global/SpecificationsPokemonSkeleton";

export function Pokemon() {
  const { pokemon_id } = useParams();
  const { FindPokemon, specificPokemon, loadingPokemon } =
    useContext(PokemonsContext);

  useEffect(() => {
    if (pokemon_id) {
      FindPokemon(pokemon_id);
    }
  }, [pokemon_id]);

  return (
    <>
      {!loadingPokemon && (
        <section className="flex xs-notebook:flex-col tablet:flex-col mobile:flex-col justify-center items-center gap-10 min-h-[77vh] tablet:gap-0 mobile:gap-0 px-5 pb-10 divide-x xs-notebook:divide-none tablet:divide-none mobile:divide-none">
          {specificPokemon && <DatasPokemon pokemon={specificPokemon} />}
          {specificPokemon && (
            <SpecificationsPokemon pokemon={specificPokemon} />
          )}
        </section>
      )}
      {loadingPokemon && (
        <section className="flex xs-notebook:flex-col tablet:flex-col mobile:flex-col justify-center items-center gap-10 min-h-[77vh] divide-x xs-notebook:divide-none tablet:divide-none mobile:divide-none">
          <DatasPokemonSkeleton />
          <SpecificationsPokemonSkeleton />
        </section>
      )}
    </>
  );
}
