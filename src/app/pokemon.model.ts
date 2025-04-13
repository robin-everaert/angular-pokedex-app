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