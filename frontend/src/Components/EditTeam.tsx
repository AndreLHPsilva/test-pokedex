import { Icon } from "@iconify/react/dist/iconify.js";
import { ITeam } from "../Types/User";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  TypeEditTeamDataProps,
  editTeamSchema,
} from "../Types/Zod/EditTeamTypes";
import { useForm } from "react-hook-form";
import { Button } from "./Global/Button";
import { SendConfirm, SendReport } from "../Helpers/Notifications";
import { useContext } from "react";
import { TeamContext } from "../Contex/TeamContext";

interface IEditTeamProps {
  team: ITeam;
  onClickIcon: React.Dispatch<React.SetStateAction<boolean>>;
}

export function EditTeam({ team, onClickIcon }: IEditTeamProps) {
  const { UpdateTeam } = useContext(TeamContext);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TypeEditTeamDataProps>({
    resolver: zodResolver(editTeamSchema),
    defaultValues: {
      name: team?.name,
    },
  });

  function handleEditTeam(data: TypeEditTeamDataProps) {
    if (data.name == team.name) {
      return SendReport({
        type: "error",
        title: "Erro ao atualizar time",
        text: `Nenhuma alteração identificada. Nome ainda persiste: <strong>${team.name}</strong>`,
        btnCallback: () => {},
      });
    }

    SendConfirm({
      message: `Tem certeza que deseja <strong>ATUALIZAR</strong> seu time <br> De: <strong>${team.name.toUpperCase()}</strong><br> Para: <strong>${data.name.toUpperCase()}</strong>?`,
      title: "<strong>Confirme</strong>",
      okButtonText: "Confirmar",
      cancelButtonText: "Cancelar",
      okButtonCallback: () => UpdateTeam({ name: data.name, team_id: team.id }),
      options: {
        plainText: false,
        messageMaxLength: 450
      },
    });
  }

  return (
    <span className="inline-flex items-center gap-2">
      <form
        onSubmit={handleSubmit(handleEditTeam)}
        className="flex items-center"
      >
        <div className="relative xss-tablet:mb-5">
          <input
            {...register("name")}
            id="name"
            type="text"
            className="w-full border border-zinc-200 rounded py-1.5 pl-2 pr-11 outline-none focus:shadow focus:shadow-zinc-200 focus:border-zinc-300 transition-all"
          />
          <Button
            className="border bg-redPrimary shadow hover:bg-redSecondary hover:scale-95 transition-all absolute right-0 py-2.5"
            type="submit"
          >
            <Icon icon="lucide:send" color="white" />
          </Button>
          {errors.name && (
            <span className="text-red-500 text-xs absolute -top-5 whitespace-nowrap left-0 xss-tablet:top-10 xss-tablet:-left-4">
              {errors.name.message}
            </span>
          )}
        </div>
      </form>
      <div
        title="Clique para fechar a edição do time"
        className="cursor-pointer hover:scale-95 mobile:self-start mobile:mt-1.5"
      >
        <Icon
          icon="fluent:edit-off-24-regular"
          onClick={() => onClickIcon(false)}
          width={18}
        />
      </div>
    </span>
  );
}
