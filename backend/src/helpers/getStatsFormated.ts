import { IStat, IStatResponse } from "@database/repositories/externalApi/interfaces/IPokemonResponse";

export function getStatsFormated(stats: IStatResponse[]): IStat[] {
  return stats.map((stat: IStatResponse) => {
    return {
      name: stat.stat.name,
      qnt: stat.base_stat,
    };
  });
}
