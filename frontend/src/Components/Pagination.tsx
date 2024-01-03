import { useContext } from "react";
import { PokemonsContext } from "../Contex/PokemonsContext";

export function Pagination() {
  const { pagination } = useContext(PokemonsContext);

  const initPagination = pagination.total == 0 ? 0 : pagination?.offset + 1;

  const to =
    pagination?.limit + pagination?.offset > pagination.total
      ? pagination.total
      : pagination?.limit + pagination?.offset;

  const toPagination =
    pagination.total == 0 ? 0 : (pagination.total == 1 ? 1 : to);

  return (
    <div> 
      <div className="text-sm">
        <span className="font-bold text-base">{initPagination}</span> ao <span className="font-bold text-base">{toPagination}</span> de{" "}
        <span className="font-bold text-base">{pagination?.total}</span>
      </div>
    </div>
  );
}
