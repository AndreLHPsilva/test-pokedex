import { useForm } from "react-hook-form";
import { Button } from "../Global/Button";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  TypeLoginDataProps,
  loginFormSchema,
} from "../../Types/Zod/LoginTypes";
import { RenderIconsPassword } from "../../Helpers/RenderIconsPassword";
import { WaitToDisappear } from "../../Helpers/Notifications";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../Contex/AuthContext";
import { handleLogin } from "../../Api/Login";

interface LoginFormProps {
  changeIsVisiblePassword: React.Dispatch<React.SetStateAction<boolean>>;
  isVisiblePassword: boolean;
}

export function LoginForm({
  changeIsVisiblePassword,
  isVisiblePassword,
}: LoginFormProps) {
  const navigate = useNavigate();
  const { setTeam, setToken, setUser } = useContext(AuthContext);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TypeLoginDataProps>({
    resolver: zodResolver(loginFormSchema),
  });

  async function HandleLogin(data: TypeLoginDataProps) {
    const response = await handleLogin(data);
    await WaitToDisappear(1500);

    if (response) {
      const { token, user } = response!;

      const team = user.team;

      setTeam(team);
      localStorage.setItem("team", JSON.stringify(team));
      setToken(token);
      localStorage.setItem("token", token);
      setUser(user);
      localStorage.setItem("user", JSON.stringify(user));

      navigate("/home");
    }
  }

  return (
    <form
      onSubmit={handleSubmit(HandleLogin)}
      className="text-sm flex flex-col gap-2 min-w-80 max-w-xs"
    >
      <div className="flex flex-col  gap-1">
        <label className="font-semibold text-xs" htmlFor="email">
          Email
        </label>
        <input
          {...register("email")}
          type="email"
          id="email"
          className="w-full border border-zinc-200 rounded py-1.5 px-2 outline-none focus:shadow focus:shadow-zinc-200 focus:border-yellow-600 transition-all"
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
            className="w-full border border-zinc-200 rounded py-1.5 pl-2 pr-8 outline-none focus:shadow focus:shadow-zinc-200 focus:border-yellow-600 transition-all"
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
        Entrar
      </Button>
    </form>
  );
}
