import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RecipeService {
  private apiUrl = 'https://your-api-endpoint/recipes'; // Replace with your API URL

  constructor(private http: HttpClient) {}

  // Fetch all recipes from the API
  getRecipes(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }
}
