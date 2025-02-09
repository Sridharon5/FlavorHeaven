import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { GetApiService } from '../../services/getapiservice.service';
import { CommonModule } from '@angular/common';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { Observable, Subject } from 'rxjs'; // Import Subject for reactive input handling

@Component({
  selector: 'app-search-bar',
  imports: [FormsModule, CommonModule],
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss'],
})
export class SearchBarComponent {
  searchedItem: string = '';
  type: string = 'Dish'; // Default search type
  suggestions: string[] = []; // Holds autocomplete suggestions
  selectedIngredients: string[] = []; // Holds selected ingredients for multi-select
  showSuggestions: boolean = false;
  
  // Subject to track the search term (instead of an Observable directly)
  private searchSubject: Subject<string> = new Subject<string>();

  constructor(private router: Router, private apiService: GetApiService) {
    // Subscribe to the searchSubject to trigger search when the term changes
    this.searchSubject.pipe(
      debounceTime(300), // Wait for 300ms after typing stops
      distinctUntilChanged(), // Only trigger if the term has changed
      switchMap((term) => this.fetchSuggestions(term)) // Fetch suggestions based on the term
    ).subscribe({
      next: (suggestions: string[]) => {
        this.suggestions = suggestions;
        this.showSuggestions = true;
      },
      error: (err) => console.error('Error fetching suggestions:', err)
    });
  }

  dotdRecipes:any[]=[
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
    {id: 639708,
      title: 'Coconut & Pomogranate Ice Cream - Raw and Vegan', 
      image: 'https://img.spoonacular.com/recipes/639708-312x231.jpg', 
      imageType: 'jpg'
    }
  ]
  // Handle Dish of the Day (DOTD)
  handledotd(): void {
    const randomIndex = Math.floor(Math.random() * this.dotdRecipes.length);
    const selectedRecipe = this.dotdRecipes[randomIndex];

    // Navigate to the 'search/dotd' route, passing the recipe ID as a route parameter
    this.router.navigate([`/recipes/${selectedRecipe.id}`]);
  }

  // Fetch autocomplete suggestions for dish or ingredients
  fetchSuggestions(term: string): Observable<string[]> {
    if (this.type === 'Dish') {
      // Fetch dish suggestions from API
      return this.apiService.getDishSuggestions(term); // Returns Observable<string[]>
    } else if (this.type === 'Ingredient') {
      // Fetch ingredient suggestions from API
      return this.apiService.getIngredientSuggestions(term); // Returns Observable<string[]>
    }
    return new Observable(); // Return empty observable if no type selected
  }

  // Handle selection of a suggestion
  selectSuggestion(suggestion: string): void {
    if (this.type === 'Dish') {
      this.searchedItem = suggestion;
      this.showSuggestions = false;
    } else if (this.type === 'Ingredient') {
      if (!this.selectedIngredients.includes(suggestion)) {
        this.selectedIngredients.push(suggestion);
      }
      this.showSuggestions = false;
    }
  }

  // Handle type change (Dish or Ingredient)
  handleType(name: string): void {
    this.type = name;
    this.searchedItem = '';
    this.suggestions = [];
    this.selectedIngredients = [];
    this.showSuggestions = false;
  }

  // Method to handle ingredient selection
  selectIngredient(ingredient: string) {
    if (!this.selectedIngredients.includes(ingredient)) {
      this.selectedIngredients.push(ingredient);
    }
  }

  // Method to remove selected ingredient
  removeSelectedIngredient(ingredient: string) {
    const index = this.selectedIngredients.indexOf(ingredient);
    if (index > -1) {
      this.selectedIngredients.splice(index, 1);
    }
  }

  // Method to trigger search based on user input
  search(): void {
    if (this.type === 'Dish') {
      this.router.navigate(['/search'], { queryParams: { dish: this.searchedItem } });
    } else if (this.type === 'Ingredient') {
      this.router.navigate(['/search'], { queryParams: { ingredients: this.selectedIngredients.join(',') } });
    }

    // Reset search UI after search
    this.selectedIngredients = [];
    this.suggestions = [];
    this.searchedItem = '';
  }

  // Watch for input changes and trigger the searchSubject
  onInputChange(): void {
    this.searchSubject.next(this.searchedItem); // Emit the new value to the subject
  }
}
