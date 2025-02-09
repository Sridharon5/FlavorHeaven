import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class GetApiService {
  private readonly apiKey = '4917c4e8c51a4650aea45d99c83d782d';
  private readonly baseUrl = 'https://api.spoonacular.com/recipes/complexSearch';

  constructor(private http: HttpClient) {}

  // Search recipes by dish name
  getRecipeByDish(dish: string): Observable<any[]> {
    const url = `${this.baseUrl}?query=${dish}&apiKey=${this.apiKey}`;
    return this.http.get<any>(url).pipe(map((res) => res.results || []));
  }

  // Search recipes by ingredients
  getRecipeByIngredients(ingredients: string[]): Observable<any[]> {
    const ingredientQuery = ingredients.join(',');
    const url = `${this.baseUrl}?includeIngredients=${ingredientQuery}&apiKey=${this.apiKey}`;
    return this.http.get<any>(url).pipe(map((res) => res.results || []));
  }

  getDishSuggestions(query: string): Observable<string[]> {
    const url = `https://api.spoonacular.com/recipes/autocomplete?query=${query}&number=10&apiKey=${this.apiKey}`;
    return this.http.get<any[]>(url).pipe(map((res) => res.map((item) => item.title)));
  }
  
  getIngredientSuggestions(query: string): Observable<string[]> {
    const url = `https://api.spoonacular.com/food/ingredients/autocomplete?query=${query}&number=10&apiKey=${this.apiKey}`;
    return this.http.get<any[]>(url).pipe(map((res) => res.map((item) => item.name)));
  }
  
}
