import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { Observable, Subject } from 'rxjs';
import { GetApiService } from '../../services/getapiservice.service';

// PrimeNG imports
import { AutoCompleteModule } from 'primeng/autocomplete';
import { SelectModule } from 'primeng/select';
import { ButtonModule } from 'primeng/button';
import { ChipModule } from 'primeng/chip';
import { MultiSelectModule } from 'primeng/multiselect';

@Component({
  selector: 'app-search-bar',
  standalone: true,
  imports: [
    FormsModule,
    CommonModule,
    AutoCompleteModule,
    SelectModule,
    ButtonModule,
    ChipModule,
    MultiSelectModule
  ],
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss']
})
export class SearchBarComponent {
  searchedItem: string = '';
  type: string = 'Dish';
  suggestions: string[] = [];
  selectedIngredients: string[] = [];
  showSuggestions: boolean = false;
   selectRecipeChoices=[
            { label: 'By Dish', value: 'Dish' },
            { label: 'By Ingredient', value: 'Ingredient' }
          ];

  private searchSubject: Subject<string> = new Subject<string>();

  constructor(private router: Router, private apiService: GetApiService) {
    this.searchSubject
      .pipe(
        debounceTime(300),
        distinctUntilChanged(),
        switchMap((term) => this.fetchSuggestions(term))
      )
      .subscribe({
        next: (suggestions: string[]) => {
          this.suggestions = suggestions;
          this.showSuggestions = true;
        },
        error: (err) => console.error('Error fetching suggestions:', err)
      });
  }

  dotdRecipes: any[] = [
    {
      id: 801377,
      title: 'Chicken Parmesan Patty- Eat As A Burger OR On Pasta',
      image: 'https://img.spoonacular.com/recipes/801377-312x231.jpg',
      imageType: 'jpg'
    },
    {
      id: 637631,
      title: 'Cheesy Bacon Burger with Spicy Chipotle Aiolo Sauce',
      image: 'https://img.spoonacular.com/recipes/637631-312x231.jpg',
      imageType: 'jpg'
    },
    {
      id: 639708,
      title: 'Coconut & Pomogranate Ice Cream - Raw and Vegan',
      image: 'https://img.spoonacular.com/recipes/639708-312x231.jpg',
      imageType: 'jpg'
    }
  ];

  handledotd(): void {
    const randomIndex = Math.floor(Math.random() * this.dotdRecipes.length);
    const selectedRecipe = this.dotdRecipes[randomIndex];
    this.router.navigate([`/recipes/${selectedRecipe.id}`]);
  }

  fetchSuggestions(term: string): Observable<string[]> {
    if (this.type === 'Dish') {
      return this.apiService.getDishSuggestions(term);
    } else if (this.type === 'Ingredient') {
      return this.apiService.getIngredientSuggestions(term);
    }
    return new Observable();
  }

  selectSuggestion(suggestion: any): void {
    const selected = suggestion?.value ?? suggestion;
    if (this.type === 'Dish') {
      this.searchedItem = selected;
      this.showSuggestions = false;
    } else if (this.type === 'Ingredient') {
      if (!this.selectedIngredients.includes(selected)) {
        this.selectedIngredients.push(selected);
      }
      this.showSuggestions = false;
    }
  }

  handleType(name: string): void {
    this.type = name;
    this.suggestions = [];
    this.selectedIngredients = [];
    this.searchedItem = '';
    this.showSuggestions = false;
  }

  selectIngredient(ingredients: string[]): void {
    this.selectedIngredients = ingredients;
  }

  removeSelectedIngredient(ingredient: any): void {
    const index = this.selectedIngredients.indexOf(ingredient);
    if (index > -1) {
      this.selectedIngredients.splice(index, 1);
    }
  }

  search(): void {
    if (this.type === 'Dish') {
      this.router.navigate(['/search'], {
        queryParams: { dish: this.searchedItem }
      });
    } else if (this.type === 'Ingredient') {
      this.router.navigate(['/search'], {
        queryParams: { ingredients: this.selectedIngredients.join(',') }
      });
    }

    this.selectedIngredients = [];
    this.suggestions = [];
    this.searchedItem = '';
  }

  onInputChange(): void {
    this.searchSubject.next(this.searchedItem);
  }
}
