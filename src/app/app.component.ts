import { Component, computed, inject, signal } from '@angular/core';
import { Pokemon } from './pokemon.model';
import { PokemonBorderDirective } from './pokemon-border.directive';
import { DatePipe } from '@angular/common';
import { PokemonService } from './pokemon.service';

@Component({
  selector: 'app-root',
  imports: [PokemonBorderDirective, DatePipe],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})

export class AppComponent {
    readonly #pokemonService = inject(PokemonService);
    readonly pokemonList = signal(this.#pokemonService.getPokemonList());
    readonly searchTerm = signal('');

    readonly pokemonListFiltered = computed(() => {
        const pokemonList = this.pokemonList();
        const searchTerm = this.searchTerm().toLowerCase();
        return pokemonList.filter(pokemon => pokemon.name.toLocaleLowerCase().includes(searchTerm.trim().toLocaleLowerCase()))
    });

    size(pokemon: Pokemon) {
        if(pokemon.life <= 15) {
            return 'Petit';
        } 
        if(pokemon.life >= 25) {
            return 'Grand';
        }
        return 'Moyen';
    }

    incrementLife(pokemon: Pokemon) {
        pokemon.life = pokemon.life + 1;
    }
    
    decrementLife(pokemon: Pokemon) {
            pokemon.life = pokemon.life - 1;
    }
} 
