import { ITypeResponse } from "@database/repositories/externalApi/interfaces/IPokemonResponse";


export function getTypesFormated(types: ITypeResponse[]): string[] {
  return types.map(
    (type: ITypeResponse) => {
      return type.type.name;
    }
  );
}
