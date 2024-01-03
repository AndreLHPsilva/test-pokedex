import { useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import { PokemonsContext } from "../Contex/PokemonsContext";
import { SpecificationsPokemon } from "../Components/SpecificationsPokemon";
import { DatasPokemon } from "../Components/DatasPokemon";

export function Pokemon() {
  const { pokemon_id } = useParams();
  const { FindPokemon, specificPokemon } = useContext(PokemonsContext);

  useEffect(() => {
    if (pokemon_id) {
      FindPokemon(pokemon_id);
    }
  }, []);

  return (
    <section className="flex tablet:flex-col divide-x-2 tablet:divide-x-0 mobile:divide-x-0 justify-center items-center gap-10 min-h-[77vh] tablet:gap-0 mobile:gap-0 tablet:divide-y-2 mobile:divide-y-2 px-5 pb-10">
      {specificPokemon && <DatasPokemon pokemon={specificPokemon} />}
      {specificPokemon && <SpecificationsPokemon pokemon={specificPokemon} />}
    </section>
  );
}
