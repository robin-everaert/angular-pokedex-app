import { Component, computed, inject, signal } from '@angular/core';
import { Pokemon } from '../../pokemon.model';
import { PokemonService } from '../../pokemon.service';
import { DatePipe } from '@angular/common';
import { PokemonBorderDirective } from '../../pokemon-border.directive';
import { RouterLink } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
@Component({
  selector: 'app-pokemon-list',
  imports: [PokemonBorderDirective, DatePipe, RouterLink],
  templateUrl: './pokemon-list.component.html',
  styles: ``
})
export class PokemonListComponent {
    readonly #pokemonService = inject(PokemonService);
    readonly pokemonList = toSignal(this.#pokemonService.getPokemonList(), {
        initialValue: [],
    });
    readonly searchTerm = signal('');

    readonly pokemonListFiltered = computed(() => {
        const pokemonList = this.pokemonList();
        const searchTerm = this.searchTerm().toLowerCase();
        return pokemonList.filter(pokemon => pokemon.name.toLocaleLowerCase().includes(searchTerm.trim().toLocaleLowerCase()));
    });

    readonly loading = computed(() => this.pokemonList().length === 0);

    size(pokemon: Pokemon) {
        if(pokemon.life <= 15) {
            return 'Petit';
        } 
        if(pokemon.life >= 25) {
            return 'Grand';
        }
        return 'Moyen';
    }
}
