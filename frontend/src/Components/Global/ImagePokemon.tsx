import { ImgHTMLAttributes } from "react";
import { IPokemonsExternal } from "../../Types/PokemonsContext/PokemonsContext";
import { twMerge } from "tailwind-merge";
import { Icon } from "@iconify/react/dist/iconify.js";
import { IPokemon } from "../../Types/User";

export interface ImagePokemonProps extends ImgHTMLAttributes<HTMLImageElement> {
  onClick?: () => void;
  pokemon: IPokemonsExternal | IPokemon;
  img_url?: string;
}

export function ImagePokemon({
  className,
  img_url,
  pokemon,
  ...props
}: ImagePokemonProps) {
  let base_url_img = pokemon?.img_url;

  if (img_url) {
    base_url_img = img_url;
  }

  if (base_url_img) {
    return (
      <img
        src={base_url_img}
        alt="Imagem do Pokemon"
        className={twMerge("object-contain w-20 h-20", className)}
        {...props}
      />
    );
  }

  return <Icon icon="carbon:no-image" width={80} height={80} />;
}
