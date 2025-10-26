import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-recipe',
  templateUrl: './recipe.component.html',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  styleUrls: ['./recipe.component.scss']
})
export class RecipeComponent implements OnInit {
  recipeData: any = {};
  private  API_KEY = '4e99d154f5004777b539ba011a91f212';

  constructor(
    private route: ActivatedRoute, 
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const recipeId =params.get('id');
      console.log(recipeId);
      console.log('Recipe ID from Route:', recipeId);
       console.log('Route Snapshot ID:', this.route.snapshot.paramMap.get('id'));
      if (recipeId) {
        this.fetchRecipeData(recipeId);
      }
    });
  }

  fetchRecipeData(id:string): void {
    const url = `https://api.spoonacular.com/recipes/${id}/information?includeNutrition=false&apiKey=${this.API_KEY}`;
    
    this.http.get(url).subscribe({
      next: (data) => {
        console.log(data);
        this.recipeData = data; 
      },
      error: (error) => {
        console.error('Error fetching recipe data:', error);
      }
    });
  }
  
}