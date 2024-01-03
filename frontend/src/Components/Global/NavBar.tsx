import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../Contex/AuthContext";

interface NavBarProps {
  whitchLinkIsActive: "home" | "my-team" | null;
}

export function NavBar({ whitchLinkIsActive }: NavBarProps) {
  const { Logout } = useContext(AuthContext);

  const activeClasses =
    "border-b-2 border-yellowPrimary text-yellowPrimary font-extrabold";

  return (
    <nav className="flex w-full justify-around mobile:text-xs py-5 bg-redSecondary border-b font-medium mb-10 mobile:mb-5 text-white tracking-wider">
      <Link to={"/home"}>
        <h1 className="text-xl mobile:text-sm font-bold hover:text-yellow-200 transition-all">
          PokedeX
        </h1>
      </Link>
      <div className="flex gap-10 mobile:gap-5">
        <Link
          to="/home"
          className={`${
            whitchLinkIsActive == "home" && activeClasses
          } hover:text-yellow-200 hover:border-yellow-200 transition-all`}
        >
          Home
        </Link>
        <Link
          to="/meu-time"
          className={`${
            whitchLinkIsActive == "my-team" && activeClasses
          } hover:text-yellow-200 hover:border-yellow-200 transition-all`}
        >
          Meu Time
        </Link>
        <span
          className="cursor-pointer hover:text-yellow-200 transition-all"
          onClick={Logout}
        >
          Sair
        </span>
      </div>
    </nav>
  );
}
