import { Component, inject, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { PokemonService } from '../../pokemon.service';
import { DatePipe } from '@angular/common';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-pokemon-profile',
  imports: [RouterLink, DatePipe],
  templateUrl: './pokemon-profile.component.html',
  styles: ``
})
export class PokemonProfileComponent {
    readonly #route = inject(ActivatedRoute);
    readonly #pokemonService = inject(PokemonService);

    readonly #pokemonId = Number(this.#route.snapshot.paramMap.get('id'));
    readonly pokemon = signal(this. #pokemonService.getPokemonById(this.#pokemonId));
    private title = inject(Title);

    ngOnInit() {
        const currentTitle = this.title.getTitle();
        this.title.setTitle(this.pokemon().name);
      }
}
