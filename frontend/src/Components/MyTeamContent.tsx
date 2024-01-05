import { useContext, useState } from "react";
import { AuthContext } from "../Contex/AuthContext";
import { ListPokemonsTeam } from "./Pokemons/ListPokemonsTeam";
import { Link } from "react-router-dom";
import { Icon } from "@iconify/react/dist/iconify.js";
import { EditTeam } from "./EditTeam";
import { VerifyTeamFull } from "../Helpers/VerifyTeamFull";

export function MyTeamContent() {
  const { team, user } = useContext(AuthContext);
  const firstName = user?.name.split(" ")[0];
  const qnt_pokemons_by_team = team?.pokemons.length;

  const [showEditTeam, setShowEditTeam] = useState(false);

  function renderTeamName() {
    if (!showEditTeam && team) {
      return (
        <span className="inline-flex items-center gap-2">
          <span className="uppercase font-bold">{team?.name}</span>
          <div
            className="cursor-pointer hover:scale-95"
            title="Clique para editar o time"
          >
            <Icon
              icon="fluent:edit-48-regular"
              onClick={() => setShowEditTeam(true)}
              width={18}
            />
          </div>
        </span>
      );
    }

    if (showEditTeam && team) {
      return <EditTeam onClickIcon={setShowEditTeam} team={team} />;
    }
  }

  function renderInformationLengthTeam() {
    return (
      <p className="text-sm mt-3">
        Você só pode ter no máximo{" "}
        <strong className="text-lg mobile:text-base">5</strong> pokemons no
        time.{" "}
        <span>
          Atualmente{" "}
          {VerifyTeamFull(team) && (
            <span>
              seu time está com
              <strong className="uppercase text-lg mobile:text-base">
                {" "}
                capacidade máxima.
              </strong>
            </span>
          )}
          {!VerifyTeamFull(team) && (
            <>
              seu time tem{" "}
              <span className="font-bold text-lg mobile:text-base">
                {qnt_pokemons_by_team}
              </span>{" "}
              de <strong className="text-lg mobile:text-base">5</strong>{" "}
              pokemons.
            </>
          )}
        </span>
      </p>
    );
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
        {renderInformationLengthTeam()}
      </div>
      <div className="flex flex-col mt-10 notebook:mt-0 tablet:mt-0 mobile:mt-0">
        <h2 className="font-bold text-sm self-start font-Bevan uppercase tracking-widest">
          Seus pokemons:
        </h2>
        <div className="flex pl-3 gap-5 divide-x notebook:flex-col notebook:divide-y tablet:flex-col tablet:divide-y mobile:flex-col mobile:divide-y notebook:divide-x-0 tablet:divide-x-0 mobile:divide-x-0">
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
                title="Voltar para lista de pokemons"
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
