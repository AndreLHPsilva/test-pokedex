import { useContext } from "react";
import { Button } from "./Global/Button";
import { PokemonsContext } from "../Contex/PokemonsContext";
import Select from "react-select";
import { IOptionsTypePokemon } from "../Types/PokemonsContext/PokemonsContext";
import { Icon } from "@iconify/react/dist/iconify.js";

interface IInputValues {
  label: string;
  value: string;
}

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
    pokemonNames,
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

  function handleSearch(value: IInputValues) {
    if (!value) {
      return ClearSearchs();
    }

    setSearch(value.value);
  }

  return (
    <section className="flex justify-around items-center tablet:flex-col tablet:gap-2 mobile:items-start mobile:px-10">
      <div className="flex gap-2 items-center text-sm">
        <label htmlFor="search" className="font-bold text-xs">
          Pesquise por:
        </label>
        <Select
          value={search ? { value: search, label: search } : null}
          onChange={(e) => handleSearch(e as IInputValues)}
          isMulti={false}
          isSearchable={true}
          isClearable={true}
          blurInputOnSelect={true}
          closeMenuOnSelect={true}
          placeholder="Nome ou Número"
          options={pokemonNames.map((name) => ({
            label: name.name,
            value: name.name,
          }))}
          noOptionsMessage={() => "Nenhum nome encontrado!"}
          className="text-xs w-48 mobile:w-36 scroll-custom"
          styles={{
            control: (provided) => ({
              ...provided,
              minHeight: "unset",
            }),
            dropdownIndicator: (provided) => ({
              ...provided,
              padding: "5px",
              display: "none",
            }),
            clearIndicator: (provided) => ({
              ...provided,
            }),
            indicatorSeparator: (provided) => ({
              ...provided,
              margin: "2px",
            }),
            indicatorsContainer: (provided) => ({
              ...provided,
              margin: "2px",
            }),
          }}
        />

        <Button
          className="uppercase font-bold bg-yellow-500 border-1 shadow-md border-black hover:bg-yellow-700 hover:scale-95 text-white custom-text-shadow-xs transition-all duration-300 tracking-wider mobile:text-xs mobile:tracking-normal disabled:opacity-50 disabled:cursor-not-allowed p-1.5"
          onClick={() => FindPokemon(search)}
          isDisabled={search ? false : true}
          title="Digite algum nome ou número para pesquisar"
        >
          <Icon icon="wpf:search" width={20} />
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
          styles={{
            control: (provided) => ({
              ...provided,
              minHeight: "unset",
            }),
            dropdownIndicator: (provided) => ({
              ...provided,
              padding: "5px",
              display: "none",
            }),
            clearIndicator: (provided) => ({
              ...provided,
            }),
            indicatorSeparator: (provided) => ({
              ...provided,
              margin: "2px",
            }),
            indicatorsContainer: (provided) => ({
              ...provided,
              margin: "2px",
            }),
          }}
        />
      </div>
    </section>
  );
}
