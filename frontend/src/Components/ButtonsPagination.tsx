import { Icon } from "@iconify/react/dist/iconify.js";
import { useContext } from "react";
import { PokemonsContext } from "../Contex/PokemonsContext";
import { Pagination } from "./Pagination";

export function ButtonsPagination() {
  const { pagination, WhitchRequestSend, pokemons } =
    useContext(PokemonsContext);

  return (
    <section className="flex flex-col gap-3 w-full justify-center items-center mt-8">
      <div className="flex gap-3">
        <button
          className="bg-redPrimary rounded p-1 cursor-pointer hover:bg-redSecondary transition-all hover:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={
            pagination.offset == 0 || pokemons.length == pagination.total
          }
          onClick={() =>
            WhitchRequestSend({
              limit: pagination.limit,
              offset:
                pagination.offset - pagination.limit == 0
                  ? 0
                  : pagination.offset - pagination.limit,
            })
          }
        >
          <Icon
            icon="eva:arrow-left-fill"
            className="w-10 mobile:w-7"
            color="white"
          />
        </button>
        <button
          className="bg-redPrimary rounded p-1 cursor-pointer hover:bg-redSecondary transition-all hover:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={
            pagination.offset >= pagination.total ||
            pagination.total == 0 ||
            pagination.limit + pagination.offset >= pagination.total
          }
          onClick={() =>
            WhitchRequestSend({
              limit: pagination.limit,
              offset: pagination.offset + pagination.limit,
            })
          }
        >
          <Icon
            icon="eva:arrow-right-fill"
            className="w-10 mobile:w-7"
            color="white"
          />
        </button>
      </div>
      <Pagination />
    </section>
  );
}
