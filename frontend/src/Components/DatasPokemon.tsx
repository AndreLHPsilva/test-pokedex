import { useContext } from "react";
import { TeamContext } from "../Contex/TeamContext";
import { IPokemonsExternal } from "../Types/PokemonsContext/PokemonsContext";
import { ImagePokemon } from "./Global/ImagePokemon";
import { PokemonTypeColor } from "../Helpers/PokemonTypeColor";
import { Button } from "./Global/Button";
import { Icon } from "@iconify/react/dist/iconify.js";
import { VerifyIfMyPokemons } from "../Helpers/VerifyIfMyPokemon";
import { AuthContext } from "../Contex/AuthContext";
import { SendConfirm } from "../Helpers/Notifications";
import { VerifyIfHasTeam } from "../Helpers/VerifyIfHasTeam";
import { Link } from "react-router-dom";
import { VerifyTeamFull } from "../Helpers/VerifyTeamFull";

interface DatasPokemonProps {
  pokemon: IPokemonsExternal;
}

export function DatasPokemon({ pokemon }: DatasPokemonProps) {
  const { AddPokemon } = useContext(TeamContext);
  const { team } = useContext(AuthContext);

  let already_add_this_pokemon = false;

  if (team) {
    already_add_this_pokemon = VerifyIfMyPokemons({
      my_pokemons: team.pokemons,
      pokemon_for_verify: pokemon,
    });
  }

  function confirmAddPokemon() {
    SendConfirm({
      message: `Tem certeza que deseja <strong>ADICIONAR</strong> este pokemon: <strong>${pokemon.name.toUpperCase()}</strong> ao seu time?`,
      title: "<strong>Confirme</strong>",
      okButtonText: "Confirmar",
      cancelButtonText: "Cancelar",
      okButtonCallback: () => AddPokemon(pokemon!.id),
    });
  }

  function getMessageForTitle() {
    if (already_add_this_pokemon) return "Este pokemon já pertence ao seu time";

    if (!VerifyIfHasTeam(team))
      return "Crie um time antes de adicionar o pokemon";

    if (VerifyTeamFull(team))
      return "Time atingiu capacidade máxima de 5 pokemons";

    return "Clique para adiconar este pokemon ao seu time.";
  }

  return (
    <div className="flex flex-col items-center justify-center gap-2 flex-1 tablet:pb-5 mobile:pb-5">
      {pokemon && (
        <ImagePokemon
          pokemon={pokemon}
          className="w-28 h-28"
          img_url={pokemon.img_url ?? pokemon.basic_img_url ?? null}
        />
      )}
      <div className="flex gap-2 items-center">
        <span className="font-Bevan">{pokemon?.name}</span>
        <span className="text-sm font-semibold">Nº {pokemon?.id}</span>
      </div>
      <div className="flex">
        <span className="pl-3 text-sm">
          Altura:{" "}
          <span className="font-VT323 text-xl font-semibold">
            {pokemon?.height}
          </span>
        </span>
        <span className="pl-3 text-sm">
          Peso:{" "}
          <span className="font-VT323 text-xl font-semibold">
            {pokemon?.weight}
          </span>
        </span>
      </div>
      <div className="flex gap-3">
        {pokemon?.types.map((type) => {
          return (
            <span
              className={`${PokemonTypeColor[type]} px-2 py-1 border rounded shadow`}
            >
              {type}
            </span>
          );
        })}
      </div>
      <Button
        className="flex items-center justify-center gap-2 text-xs bg-redPrimary text-white font-medium tracking-wider hover:bg-redSecondary hover:scale-95 transition-all shadow mt-5 disabled:opacity-50 disabled:cursor-not-allowed"
        onClick={confirmAddPokemon}
        isDisabled={
          already_add_this_pokemon ||
          !VerifyIfHasTeam(team) ||
          VerifyTeamFull(team)
        }
        title={getMessageForTitle()}
      >
        <Icon icon="typcn:plus" width={16} />
        Adicionar ao time
      </Button>
      {!VerifyIfHasTeam(team) && (
        <Link
          to={"/meu-time"}
          className="text-xs font-bold text-redSecondary underline hover:scale-95 hover:text-redPrimary transition-all"
        >
          Criar time
        </Link>
      )}
    </div>
  );
}
