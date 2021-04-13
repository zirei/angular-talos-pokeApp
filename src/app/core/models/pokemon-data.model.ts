export interface PokemonData {
  abilities: [
    {
      ability: {
        name: string;
      };
    }
  ];
  base_experience: number;
  height: number;
  id: number;
  is_default: boolean;
  location_area_encounters: string;
  name: string;
  order: number;
  species: {
    url: string;
  };
  stats: [
    {
      base_stat: number;
    },
    {
      base_stat: number;
    },
    {
      base_stat: number;
    },
    {
      base_stat: number;
    },
    {
      base_stat: number;
    },
    {
      base_stat: number;
    }
  ];
  types: [
    {
      type: {
        name: string;
      };
    }
  ];
  weight: number;
  gender_rate: number;
  flavor_text?: {
    flavor_text: string;
  };
}
