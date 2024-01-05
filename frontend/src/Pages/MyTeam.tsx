import { useContext } from "react";
import { AuthContext } from "../Contex/AuthContext";
import { ModalCreateTeam } from "../Components/ModalCreateTeam";
import { MyTeamContent } from "../Components/MyTeamContent";

export function MyTeam() {
  const { team, setShowModalCreateTeam } = useContext(AuthContext);

  if (!team) {
    return (
      <>
        <ModalCreateTeam
          onClose={() => setShowModalCreateTeam(false)}
          title="Criar time"
        />
        
        <div className="flex justify-center items-center w-full font-medium mobile:px-5">
          <p className="mobile:text-sm">
            *Você não tem um time.{" "}
            <span
              className="underline text-redPrimary cursor-pointer hover:text-redSecondary hover:font-medium tracking-wider"
              onClick={() => setShowModalCreateTeam(true)}
            >
              Crie um agora mesmo!
            </span>
          </p>
        </div>
      </>
    );
  }

  return <MyTeamContent />;
}
