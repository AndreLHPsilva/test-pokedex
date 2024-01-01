import { useContext, useState } from "react";
import { AuthContext } from "../Contex/AuthContext";
import { ListPokemonsTeam } from "./Pokemons/ListPokemonsTeam";
import { Link } from "react-router-dom";
import { Icon } from "@iconify/react/dist/iconify.js";
import { EditTeam } from "./EditTeam";

export function MyTeamContent() {
  const { team, user } = useContext(AuthContext);
  const firstName = user?.name.split(" ")[0];

  const [showEditTeam, setShowEditTeam] = useState(false);

  function renderTeamName() {
    if (!showEditTeam && team) {
      return (
        <span className="inline-flex items-center gap-2">
          <span className="uppercase font-bold">{team?.name}</span>
          <Icon
            icon="fluent:edit-48-regular"
            onClick={() => setShowEditTeam(true)}
            className="cursor-pointer hover:scale-95"
            width={18}
          />
        </span>
      );
    }

    if (showEditTeam && team) {
      return <EditTeam onClickIcon={setShowEditTeam} team={team} />;
    }
  }

  return (
    <section className="w-full flex flex-col justify-center items-center gap-5 px-5">
      <div className="flex flex-col gap-2">
        <h1 className="font-medium text-center mobile:text-sm">
          Bem vindo,{" "}
          <span className="uppercase font-bold text-xl mobile:text-base">
            {firstName}
          </span>
          <span> ao seu time </span>
          {renderTeamName()}
        </h1>
        <p className="text-sm">
          Aqui você pode verificar quais pokemons estão presentes no seu time e
          caso queira, removê-los.
        </p>
      </div>
      <div className="flex flex-col">
        <h2 className="font-bold text-sm self-start font-Bevan uppercase tracking-widest">
          Seus pokemons:
        </h2>
        <div className="flex flex-col pl-3 gap-2 divide-y">
          {team && team?.pokemons?.length > 0 ? (
            team?.pokemons.map((pokemon) => {
              return <ListPokemonsTeam pokemon={pokemon} team_id={team.id} />;
            })
          ) : (
            <div className="divide-none flex flex-col items-center gap-5">
              <span className="text-xs font-bold mt-3">
                *Nenhum pokemon adicionado ao time!
              </span>
              <Link
                to={"/home"}
                className="text-redPrimary animate-bounce font-bold text-sm"
              >
                Adicione agora mesmo!
              </Link>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
