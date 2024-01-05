export interface IAbilitiesResponse {
  ability: {
    name: string;
    url: string;
  };
  is_hidden: boolean;
  slot: number;
}

interface IFormsResponse {
  name: string;
  url: string;
}

interface IGameIndicesResponse {
  game_index: number;
  version: {
    name: string;
    url: string;
  };
}

interface IVersionDetailsResponse {
  rarity: number;
  version: {
    name: string;
    url: string;
  };
}

interface IHeldItemsResponse {
  item: {
    name: string;
    url: string;
  };
  version_details: IVersionDetailsResponse[];
}

interface IVersionGroupDetailsResponse {
  level_learned_at: number;
  move_learn_method: {
    name: string;
    url: string;
  };
  version_group: {
    name: string;
    url: string;
  };
}

interface IMovesResponse {
  move: {
    name: string;
    url: string;
  };
  version_group_details: IVersionGroupDetailsResponse[];
}

interface ISpriteResponse {
  back_default: string | null;
  back_female: string | null;
  back_shiny: string | null;
  back_shiny_female: string | null;
  front_default: string;
  front_female: string | null;
  front_shiny: string | null;
  front_shiny_female: string | null;
  other: {
    dream_world: {
      front_default: string | null;
      front_female: string | null;
    };
    home: {
      front_default: string | null;
      front_female: string | null;
      front_shiny: string | null;
      front_shiny_female: string | null;
    };
    "official-artwork": {
      front_default: string | null;
      front_shiny: string | null;
    };
    showdown: {
      back_default: string | null;
      back_female: string | null;
      back_shiny: string | null;
      back_shiny_female: string | null;
      front_default: string | null;
      front_female: string | null;
      front_shiny: string | null;
      front_shiny_female: string | null;
    };
  };
  versions: {
    "generation-i": {
      "red-blue": {
        back_default: string | null;
        back_gray: string | null;
        back_transparent: string | null;
        front_default: string | null;
        front_gray: string | null;
        front_transparent: string | null;
      };
      yellow: {
        back_default: string | null;
        back_gray: string | null;
        back_transparent: string | null;
        front_default: string | null;
        front_gray: string | null;
        front_transparent: string | null;
      };
    };
    "generation-ii": {
      crystal: {
        back_default: string | null;
        back_shiny: string | null;
        back_shiny_transparent: string | null;
        back_transparent: string | null;
        front_default: string | null;
        front_shiny: string | null;
        front_shiny_transparent: string | null;
        front_transparent: string | null;
      };
      gold: {
        back_default: string | null;
        back_shiny: string | null;
        front_default: string | null;
        front_shiny: string | null;
        front_transparent: string | null;
      };
      silver: {
        back_default: string | null;
        back_shiny: string | null;
        front_default: string | null;
        front_shiny: string | null;
        front_transparent: string | null;
      };
    };
    "generation-iii": {
      emerald: {
        front_default: string | null;
        front_shiny: string | null;
      };
      "firered-leafgreen": {
        back_default: string | null;
        back_shiny: string | null;
        front_default: string | null;
        front_shiny: string | null;
      };
      "ruby-sapphire": {
        back_default: string | null;
        back_shiny: string | null;
        front_default: string | null;
        front_shiny: string | null;
      };
    };
    "generation-iv": {
      "diamond-pearl": {
        back_default: string | null;
        back_female: string | null;
        back_shiny: string | null;
        back_shiny_female: string | null;
        front_default: string | null;
        front_female: string | null;
        front_shiny: string | null;
        front_shiny_female: string | null;
      };
      "heartgold-soulsilver": {
        back_default: string | null;
        back_female: string | null;
        back_shiny: string | null;
        back_shiny_female: string | null;
        front_default: string | null;
        front_female: string | null;
        front_shiny: string | null;
        front_shiny_female: string | null;
      };
      platinum: {
        back_default: string | null;
        back_female: string | null;
        back_shiny: string | null;
        back_shiny_female: string | null;
        front_default: string | null;
        front_female: string | null;
        front_shiny: string | null;
        front_shiny_female: string | null;
      };
    };
    "generation-v": {
      "black-white": {
        animated: {
          back_default: string | null;
          back_female: string | null;
          back_shiny: string | null;
          back_shiny_female: string | null;
          front_default: string;
          front_female: string | null;
          front_shiny: string | null;
          front_shiny_female: string | null;
        };
        back_default: string | null;
        back_female: string | null;
        back_shiny: string | null;
        back_shiny_female: string | null;
        front_default: string | null;
        front_female: string | null;
        front_shiny: string | null;
        front_shiny_female: string | null;
      };
    };
    "generation-vi": {
      "omegaruby-alphasapphire": {
        front_default: string | null;
        front_female: string | null;
        front_shiny: string | null;
        front_shiny_female: string | null;
      };
      "x-y": {
        front_default: string | null;
        front_female: string | null;
        front_shiny: string | null;
        front_shiny_female: string | null;
      };
    };
    "generation-vii": {
      icons: {
        front_default: string | null;
        front_female: string | null;
      };
      "ultra-sun-ultra-moon": {
        front_default: string | null;
        front_female: string | null;
        front_shiny: string | null;
        front_shiny_female: string | null;
      };
    };
    "generation-viii": {
      icons: {
        front_default: string | null;
        front_female: string | null;
      };
    };
  };
}

export interface IStatResponse {
  base_stat: number;
  effort: number;
  stat: {
    name: string;
    url: string;
  };
}

export interface ITypeResponse {
  slot: number;
  type: {
    name: string;
    url: string;
  };
}

export interface IPokemonCompleted {
  id: number;
  height: number;
  weight: number;
  base_experience: number;
  is_default: boolean;
  location_area_encounters: string;
  name: string;
  order: number;
  species: {
    name: string;
    url: string;
  };
  sprites: ISpriteResponse;
  forms: IFormsResponse[];
  game_indices: IGameIndicesResponse[];
  held_items: IHeldItemsResponse[];
  moves: IMovesResponse[];
  past_abilities: [];
  past_types: [];
  abilities: IAbilitiesResponse[];
  stats: IStatResponse[];
  types: ITypeResponse[];
}

interface IDoubleDamageFromResponse {
  name: string;
  url: string;
}

interface IGameIndicesResponse {
  game_index: number;
  generation: {
    name: string;
    url: string;
  };
}

interface IMovesResponse {
  name: string;
  url: string;
}

export interface IPokemonsByTypeResponse {
  pokemon: {
    name: string;
    url: string;
  };
  slot: number;
}

export interface IPokemonByTypeResponse {
  damage_relations: {
    double_damage_from: IDoubleDamageFromResponse[];
    no_damage_from: [];
    no_damage_to: [];
  };
  game_indices: IGameIndicesResponse[];
  generation: {
    name: "generation-i";
    url: "https://pokeapi.co/api/v2/generation/1/";
  };
  id: number;
  move_damage_class: {
    name: string;
    url: string;
  };
  moves: IMovesResponse[];
  past_damage_relations: [];
  pokemon: IPokemonsByTypeResponse[];
}

export interface IEvolvesToResponse {
  evolution_details: object[];
  evolves_to: [];
  is_baby: false;
  species: {
    name: string;
    url: string;
  };
}

export interface IEvolutionsResponse {
  baby_trigger_item: any;
  chain: {
    evolution_details: [];
    evolves_to: IEvolvesToResponse[];
    is_baby: boolean;
    species: {
      name: string;
      url: string;
    };
  };
  id: number;
}

export interface IResultsTypesResponse {
  name: string;
  url: string;
}

export interface ITypesPokemonsReponse {
  count: number;
  next: string;
  previous: string;
  results: IResultsTypesResponse[];
}

export interface IGetAllPokemonsDTO {
  limit?: number;
  offset?: number;
  url?: string;
}

export interface IPokemonShort {
  name: string;
  url: string;
}

export interface IResponseGetAllPokemons {
  count: number;
  next: string;
  previous: boolean;
  results: IPokemonShort[];
}

export interface IStat {
  name: string;
  qnt: number;
}

export interface IPokemonSpeciesResponse {
  base_happiness: number;
  capture_rate: number;
  color: {
    name: string;
    url: string;
  };
  egg_groups: [];
  evolution_chain: {
    url: string;
  };
  evolves_from_species: any;
  flavor_text_entries: [];
  form_descriptions: [];
  forms_switchable: boolean;
  gender_rate: number;
  genera: [];
  generation: {
    name: string;
    url: string;
  };
  growth_rate: {
    name: string;
    url: string;
  };
  habitat: {
    name: string;
    url: string;
  };
  has_gender_differences: boolean;
  hatch_counter: number;
  id: number;
  is_baby: boolean;
  is_legendary: boolean;
  is_mythical: boolean;
  name: string;
  names: any[];
  order: number;
  pal_park_encounters: any[];
  pokedex_numbers: any[];
  shape: {
    name: string;
    url: string;
  };
  varieties: any[];
}
