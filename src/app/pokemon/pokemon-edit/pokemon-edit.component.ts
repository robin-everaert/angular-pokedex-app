import { DatePipe, JsonPipe, NgClass } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { PokemonService } from '../../pokemon.service';
import { FormArray, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { getPokemonColor, POKEMON_RULES } from '../../pokemon.model';

@Component({
  selector: 'app-pokemon-edit',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule, JsonPipe],
  templateUrl: './pokemon-edit.component.html',
  styles: ``,
})

export class PokemonEditComponent {
  readonly route = inject(ActivatedRoute);
  readonly pokemonService = inject(PokemonService);
  readonly pokemonId = signal(
    Number(this.route.snapshot.paramMap.get('id'))
  ).asReadonly();

  readonly pokemon = signal(
    this.pokemonService.getPokemonById(this.pokemonId())
  ).asReadonly();
  readonly POKEMON_RULES = POKEMON_RULES;

  readonly form = new FormGroup({
    name: new FormControl(this.pokemon().name, 
    [
        Validators.required,
        Validators.minLength(POKEMON_RULES.MIN_NAME),
        Validators.maxLength(POKEMON_RULES.MAX_NAME),
        Validators.pattern(POKEMON_RULES.NAME_PATTERN),
    ]),
    life: new FormControl(this.pokemon().life, 
    [
        Validators.minLength(POKEMON_RULES.MIN_LIFE),
        Validators.maxLength(POKEMON_RULES.MAX_LIFE),
    ]),
    damage: new FormControl(this.pokemon().damage, 
    [
        Validators.minLength(POKEMON_RULES.MIN_DAMAGE),
        Validators.maxLength(POKEMON_RULES.MAX_DAMAGE),
    ]),
    types: new FormArray(this.pokemon().types.map(type => new FormControl(type)), 
    [
        Validators.required,
        Validators.minLength(POKEMON_RULES.MIN_TYPES),
        Validators.maxLength(POKEMON_RULES.MAX_TYPES),
    ]),
  });

  // Name
  get pokemonName(): FormControl {
    return this.form.get('name') as FormControl
  }
  // Life
  get pokemonLife(): FormControl {
    return this.form.get('life') as FormControl
  }
  incrementLife() {
    const newValue = this.pokemonLife.value + 1; 
    this.pokemonLife.setValue(newValue);
  }
  decrementLife() {
    const newValue = this.pokemonLife.value - 1;
    this.pokemonLife.setValue(newValue);
  }
  get pokemonDamage(): FormControl {
    return this.form.get('damage') as FormControl
  }
  incrementDamage() {
    const newValue = this.pokemonDamage.value + 1;
    this.pokemonDamage.setValue(newValue);
  }
  decrementDamage() {
    const newValue = this.pokemonDamage.value - 1;
    this.pokemonDamage.setValue(newValue);
  }

  // Type
  get pokemonTypeList(): FormArray {
    return this.form.get('types') as FormArray;
  }

  isPokemonTypeSelected(type: string) : boolean {
    return !!this.pokemonTypeList.controls.find(control => control.value === type)
  }

  onPokemonTypeChange(type: string, isChecked: boolean) {
    if(isChecked) {
        const control = new FormControl(type);
        this.pokemonTypeList.push(control)
    }
    else {
        const index = this.pokemonTypeList.controls
        .map(control => control.value)
        .indexOf(type);
        this.pokemonTypeList.removeAt(index);
    }
  } 

  getPokemonColor(type: string): string {
        return getPokemonColor(type);
  }

  getChipTextColor(type: string): 'black' | 'white' {
    return type === 'Electrique' ? 'black' : 'white'
  }

  onSubmit() {
    console.log(this.form.value);
  }


}