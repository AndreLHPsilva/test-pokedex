import { ImgHTMLAttributes } from "react";
import { IPokemonsExternal } from "../../Types/PokemonsContext/PokemonsContext";
import { twMerge } from "tailwind-merge";
import { Icon } from "@iconify/react/dist/iconify.js";

export interface ImagePokemonProps extends ImgHTMLAttributes<HTMLImageElement> {
  onClick?: () => void;
  pokemon: IPokemonsExternal;
}

export function ImagePokemon({
  className,
  pokemon,
  ...props
}: ImagePokemonProps) {
  if (pokemon.img_url) {
    return (
      <img
        src={pokemon.img_url}
        alt="Imagem do Pokemon"
        className={twMerge("object-contain w-20 h-20", className)}
        {...props}
      />
    );
  }

  return <Icon icon="carbon:no-image" width={80} height={80} />;
}
