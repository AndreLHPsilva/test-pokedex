import {
  IEvolutionsResponse,
  IEvolvesToResponse,
} from "@database/repositories/externalApi/interfaces/IPokemonResponse";
import { IEvolutions } from "@models/Evoluetions";

export function getEvolutionsFormated(evolutions: IEvolutionsResponse) {
  const evolutionsReturn: IEvolutions[] = [
    {
      name: evolutions.chain.species.name,
      position: 1,
      link_url: ""
    },
  ];


  if (evolutions.chain.evolves_to.length > 0) {
    function getEvolutions(
      evolvesTo: IEvolvesToResponse[],
      position: number
    ): void {
      evolvesTo.forEach((evolve) => {
        evolutionsReturn.push({
          name: evolve.species.name,
          position: position + 1,
          link_url: ""
        });

        if (evolve.evolves_to.length > 0) {
          getEvolutions(evolve.evolves_to, position + 1);
        }
      });
    }

    getEvolutions(evolutions.chain.evolves_to, 1);
  }

  return evolutionsReturn;
}
