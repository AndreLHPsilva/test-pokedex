import { useContext } from "react";
import { Button } from "./Global/Button";
import { PokemonsContext } from "../Contex/PokemonsContext";
import Select from "react-select";
import { IOptionsTypePokemon } from "../Types/PokemonsContext/PokemonsContext";

export function Search() {
  const {
    typesPokemons,
    typeSelected,
    setTypeSelected,
    setTypeSearch,
    ClearSearchs,
    GetByTypePokemon,
    setSearch,
    search,
    FindPokemon,
  } = useContext(PokemonsContext);

  function handleSelect(data: IOptionsTypePokemon | null) {
    if (!data?.value) {
      return ClearSearchs();
    }

    setTypeSearch("type");
    setTypeSelected(data);
    if (data) {
      GetByTypePokemon({ type: data.value! });
    }
  }

  function handleSearch(value: string) {
    if (!value) {
      ClearSearchs();
    }
    setSearch(value);
  }

  return (
    <section className="flex justify-around items-center tablet:flex-col tablet:gap-2">
      <div className="flex gap-2 items-center text-sm">
        <label htmlFor="search" className="font-bold text-xs">
          Pesquise por:
        </label>
        <input
          type="text"
          value={search}
          id="search"
          onChange={(e) => handleSearch(e.target.value)}
          placeholder="Nome ou Número"
          className="outline-none border border-zinc-200 rounded px-2 py-1.5  mobile:text-xs"
        />
        <Button
          className="uppercase font-bold bg-yellow-500 border-1 shadow-md border-black hover:bg-yellow-700 hover:scale-95 text-white custom-text-shadow-xs transition-all duration-300 tracking-wider mobile:text-xs mobile:tracking-normal mobile:py-1 mobile:px-1.5 disabled:opacity-50 disabled:cursor-not-allowed"
          onClick={() => FindPokemon(search)}
          isDisabled={search ? false : true}
          title="Digite algum nome ou número para pesquisar"
        >
          Pesquisar
        </Button>
      </div>
      <div className="flex items-center gap-2">
        <label htmlFor="search" className="font-bold text-xs">
          Filtre por:
        </label>
        <Select
          value={typeSelected}
          onChange={(e) => handleSelect(e)}
          isMulti={false}
          placeholder="Tipo"
          options={[
            { label: "Todos", value: "" },
            ...typesPokemons.map((type) => ({
              label: type.name,
              value: type.name,
            })),
          ]}
          noOptionsMessage={() => "Nenhum tipo encontrado!"}
          className="text-xs w-32 scroll-custom"
        />
      </div>
    </section>
  );
}
