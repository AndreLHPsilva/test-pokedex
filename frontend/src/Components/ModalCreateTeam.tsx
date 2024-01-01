import { useContext } from "react";
import { Modal } from "./Global/Modal";
import { AuthContext } from "../Contex/AuthContext";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  TypeCreateTeamDataProps,
  createTeamSchema,
} from "../Types/Zod/ModalCreateTeamTypes";
import { Button } from "./Global/Button";
import { TeamContext } from "../Contex/TeamContext";

interface ModalProps {
  onClose: () => void;
  title: string;
}

export function ModalCreateTeam({ onClose, title }: ModalProps) {
  const { showModalCreateTeam } = useContext(AuthContext);
  const { CreateTeam } = useContext(TeamContext);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TypeCreateTeamDataProps>({
    resolver: zodResolver(createTeamSchema),
  });

  return (
    <Modal onClose={onClose} open={showModalCreateTeam} title={title}>
      <div className="max-w-80 p-5 flex flex-col gap-3 divide-y max-h-96 overflow-y-auto">
        <div>
          <p className="text-sm font-medium">
            Escolha a nome do seu time e após a criação vá para a página
            principal e escolha os pokemons.
          </p>
          <span className="text-xs">
            *Lembrando que você só pode escolher 5 pokemons.
          </span>
        </div>
        <form
          onSubmit={handleSubmit(CreateTeam)}
          className="pt-5 flex flex-col gap-5"
        >
          <div className="flex flex-col gap-1">
            <label htmlFor="name" className="font-semibold text-xs">
              Nome do Time
            </label>
            <input
              {...register("name")}
              type="text"
              id="name"
              className="w-full border border-zinc-200 rounded py-1.5 pl-2 pr-8 outline-none focus:shadow focus:shadow-zinc-200 focus:border-zinc-300 transition-all"
            />
            {errors.name && (
              <span className="text-red-500 text-xs">
                {errors.name.message}
              </span>
            )}
          </div>
          <Button
            className="w-full bg-red-500 text-white uppercase font-bold text-xs py-1.5 hover:bg-red-700"
            type="submit"
          >
            Salvar
          </Button>
        </form>
      </div>
    </Modal>
  );
}
