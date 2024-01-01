import { useForm } from "react-hook-form";
import { Button } from "../Global/Button";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  TypeRegisterDataProps,
  registerFormSchema,
} from "../../Types/Zod/RegisterTypes";
import { RenderIconsPassword } from "../../Helpers/RenderIconsPassword";
import { HandleRegister } from "../../Api/Register";
import { WaitToDisappear } from "../../Helpers/Notifications";
import { useContext } from "react";
import { AuthContext } from "../../Contex/AuthContext";

interface RegisterFormProps {
  changeIsVisiblePassword: React.Dispatch<React.SetStateAction<boolean>>;
  isVisiblePassword: boolean;
}

export function RegisterForm({
  changeIsVisiblePassword,
  isVisiblePassword,
}: RegisterFormProps) {
  const { setShowLogin } = useContext(AuthContext);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TypeRegisterDataProps>({
    resolver: zodResolver(registerFormSchema),
  });

  async function handleRegister(data: TypeRegisterDataProps) {
    HandleRegister(data);
    await WaitToDisappear(1500);
    setShowLogin((prev) => !prev);
  }

  return (
    <form
      onSubmit={handleSubmit(handleRegister)}
      className="text-sm flex flex-col gap-2 min-w-80 max-w-xs"
    >
      <div className="flex flex-col  gap-1">
        <label className="font-semibold text-xs" htmlFor="name">
          Nome
        </label>
        <input
          {...register("name")}
          type="text"
          id="name"
          className="w-full border border-zinc-200 rounded py-1.5 px-2 outline-none focus:shadow focus:shadow-zinc-200 focus:border-zinc-300 transition-all"
        />
        {errors.name && (
          <span className="text-red-500 ">{errors.name.message}</span>
        )}
      </div>
      <div className="flex flex-col  gap-1">
        <label className="font-semibold text-xs" htmlFor="email">
          Email
        </label>
        <input
          {...register("email")}
          type="email"
          id="email"
          className="w-full border border-zinc-200 rounded py-1.5 px-2 outline-none focus:shadow focus:shadow-zinc-200 focus:border-zinc-300 transition-all"
        />
        {errors.email && (
          <span className="text-red-500 ">{errors.email.message}</span>
        )}
      </div>
      <div className="flex flex-col gap-1">
        <label className="font-semibold text-xs" htmlFor="password">
          Senha
        </label>
        <div className="relative">
          <input
            {...register("password")}
            type={isVisiblePassword ? "password" : "text"}
            id="password"
            className="w-full border border-zinc-200 rounded py-1.5 pl-2 pr-8 outline-none focus:shadow focus:shadow-zinc-200 focus:border-zinc-300 transition-all"
          />
          <button
            type="button"
            onClick={() => changeIsVisiblePassword((prev) => !prev)}
            className="absolute top-1.5 -right-1 pr-3"
          >
            {RenderIconsPassword(isVisiblePassword)}
          </button>
        </div>
        {errors.password && (
          <span className="text-red-500 ">{errors.password.message}</span>
        )}
      </div>
      <Button
        className="w-full bg-red-500 text-white uppercase font-bold text-xs py-1.5 hover:bg-red-700"
        type="submit"
      >
        Salvar
      </Button>
    </form>
  );
}
