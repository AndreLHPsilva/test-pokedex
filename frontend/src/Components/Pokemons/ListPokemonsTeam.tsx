import { Icon } from "@iconify/react/dist/iconify.js";
import { IPokemon } from "../../Types/User";
import { Button } from "../Global/Button";
import { TeamContext } from "../../Contex/TeamContext";
import { useContext } from "react";

interface ListPokemonsTeamProps {
  pokemon: IPokemon;
  team_id: string;
}

export function ListPokemonsTeam({ pokemon, team_id }: ListPokemonsTeamProps) {
  const { RemovePokemon } = useContext(TeamContext);

  return (
    <div className="flex gap-3 items-center justify-between py-2">
      <span className="font-bold">Nº{pokemon.external_id}</span>
      <span className="font-bold font-VT323 text-xl">{pokemon.name}</span>
      <Button
        className="flex group gap-2 items-center text-xs p-1.5 border-redPrimary hover:bg-redPrimary transition-all hover:scale-95 shadow hover:shadow-redPrimary"
        onClick={() =>
          RemovePokemon({
            pokemon_id: pokemon.id,
            team_id,
          })
        }
      >
        <Icon
          icon="pajamas:remove"
          width={14}
          className="text-redPrimary group-hover:text-white"
        />
      </Button>
    </div>
  );
}
