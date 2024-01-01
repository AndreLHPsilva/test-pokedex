import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../Contex/AuthContext";

interface NavBarProps {
  whitchLinkIsActive: "home" | "my-team" | null;
}

export function NavBar({ whitchLinkIsActive }: NavBarProps) {
  const { Logout } = useContext(AuthContext);

  return (
    <nav className="flex w-full justify-around mobile:text-xs py-5 bg-redSecondary border-b text-white font-medium mb-10 mobile:mb-5">
      <Link to={"/home"}>
        <h1 className="text-xl mobile:text-sm text-white">PokedeX</h1>
      </Link>
      <div className="flex gap-10 mobile:gap-5">
        <Link
          to="/home"
          className={`${
            whitchLinkIsActive == "home" &&
            "border-b-2 border-black text-black font-bold"
          }`}
        >
          Home
        </Link>
        <Link
          to="/meu-time"
          className={`${
            whitchLinkIsActive == "my-team" &&
            "border-b-2 border-black text-black font-bold"
          }`}
        >
          Meu Time
        </Link>
        <span className="cursor-pointer" onClick={Logout}>
          Sair
        </span>
      </div>
    </nav>
  );
}
