import { useContext } from "react";
import { PageLoginContext } from "../Contex/PageLoginContext";
import { RegisterForm } from "./Forms/RegisterForm";
import ImgRegister from "../../public/img-register.jpg";
import { AuthContext } from "../Contex/AuthContext";

export function Register() {
  const { setShowLogin } = useContext(AuthContext);

  const { isVisiblePassword, setIsVisiblePassword } =
    useContext(PageLoginContext);

  return (
    <section className="h-full grid grid-cols-3 notebook:grid-cols-1 tablet:grid-cols-1 mobile:grid-cols-1">
      <div className="flex flex-col justify-center items-center bg-zinc-50">
        <div className="max-w-28">
          <img src={ImgRegister} className="mix-blend-multiply" />
        </div>

        <RegisterForm
          changeIsVisiblePassword={setIsVisiblePassword}
          isVisiblePassword={isVisiblePassword}
        />

        <p className="text-xs mt-6">
          Já tem uma conta?{" "}
          <span
            className="text-red-400 font-semibold underline cursor-pointer hover:text-red-500 transition-all"
            onClick={() => setShowLogin((prev) => !prev)}
          >
            Faça Login!
          </span>
        </p>
      </div>
      <div className="relative h-full w-full col-span-2 bg-bgRegister bg-no-repeat bg-center justify-center items-center flex notebook:hidden tablet:hidden mobile:hidden">
        <div className="absolute inset-0 bg-black bg-opacity-40"></div>
        <h1 className="relative text-8xl text-white px-10 font-semibold custom-text-shadow">
          Cadastro
        </h1>
      </div>
    </section>
  );
}
