import { Icon } from "@iconify/react/dist/iconify.js";
import { IPokemon } from "../../Types/User";
import { Button } from "../Global/Button";
import { TeamContext } from "../../Contex/TeamContext";
import { useContext } from "react";
import { SendConfirm } from "../../Helpers/Notifications";
import { ImagePokemon } from "../Global/ImagePokemon";
import { Link } from "react-router-dom";

interface ListPokemonsTeamProps {
  pokemon: IPokemon;
  team_id: string;
}

export function ListPokemonsTeam({ pokemon, team_id }: ListPokemonsTeamProps) {
  const { RemovePokemon } = useContext(TeamContext);

  function confirmHandleRemovePokemon() {
    SendConfirm({
      message: `Tem certeza que deseja <strong>REMOVER</strong> este pokemon: <strong>${pokemon.name.toUpperCase()}</strong>. <br> Esta ação <strong>NÃO</strong> poderá ser desfeita.`,
      title: "<strong>Cuidado!</strong>",
      okButtonText: "Confirmar",
      cancelButtonText: "Cancelar",
      okButtonCallback: () =>
        RemovePokemon({
          pokemon_id: pokemon.id,
          team_id,
        }),
    });
  }

  return (
    <div className="flex gap-3 items-center justify-between py-2">
      <Link to={`/pokemon/${pokemon.external_id}`}>
        <ImagePokemon
          pokemon={pokemon}
          img_url={pokemon.img_url}
          className="w-28 h-28 hover:scale-95 transition-all"
          title="Clique para ver mais informações"
        />
      </Link>
      <span className="font-bold">Nº{pokemon.external_id}</span>
      <span className="font-bold font-VT323 text-xl">{pokemon.name}</span>
      <Button
        className="flex group gap-2 items-center text-xs p-1.5 border-redPrimary hover:bg-redPrimary transition-all hover:scale-95 shadow hover:shadow-redPrimary"
        onClick={confirmHandleRemovePokemon}
        title="Clique para remover este pokemon do time"
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
