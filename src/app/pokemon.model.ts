export interface Pokemon {
    id: number;
    name: string;
    life: number;
    damage: number;
    picture: string;
    types: [string] | [string, string] | [string, string, string];
    created: Date;
}

export type PokemonList = Pokemon[]

export const POKEMON_RULES = { // Pokemon Edit Form Validation
    NAME_PATTERN: /^[a-zA-Zéè]+$/,
    MAX_NAME: 20,
    MIN_NAME: 3, 
    MAX_LIFE: 30,
    HIGH_LIFE: 25,
    LOW_LIFE: 15,
    MIN_LIFE: 10,
    MAX_DAMAGE: 10,
    MIN_DAMAGE: 1,
    MIN_TYPES: 1,
    MAX_TYPES: 3,
  } as const;

export function getPokemonColor(type: string): string {
    switch (type) {
        case 'Feu':
            return '#EF5350';
        case 'Eau':
            return '#42A5F5';
        case 'Plante':
            return '#66BB6A';
        case 'Insecte':
            return '#8d6e63';
        case 'Vol':
            return '#90CAF9';
        case 'Poison':
            return '#b388ff';
        case 'Fée':
            return '#f8bbd0';
        case 'Electrique':
            return '#f4ff81';
        default:
            return '#303030';
        }
}
  


