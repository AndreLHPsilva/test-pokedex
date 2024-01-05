import { IAbilitiesResponse } from "@database/repositories/externalApi/interfaces/IPokemonResponse";

export function getAbilitiesFormated(abilities: IAbilitiesResponse[]): string[] {
  return abilities.map(
    (abilitiy: IAbilitiesResponse) => {
      return abilitiy.ability.name;
    }
  );
}
