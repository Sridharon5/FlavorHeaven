import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { GetApiService } from '../../services/getapiservice.service';
import { RecipeCardsComponent } from '../recipe-cards/recipe-cards.component';
import { LikedService } from '../../services/liked.service';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.scss'],
  imports: [CommonModule, RecipeCardsComponent]
})
export class ResultsComponent implements OnInit {
  result: string | null = null;
  dish: string | null = null;
  cuisine: string | null = null;
  meal: string | null = null;
  ingredients: string[]=[];

  RecipeList: any[] = [];
  constructor(private router: Router,private route: ActivatedRoute, private getApi: GetApiService,private likedService: LikedService) {}


  likedDishes: any[] = [];
historyDishes: any[] = [];

addToLiked(recipe: any): void {
  // console.log(recipe);
  this.likedService.addLikedDish(recipe);
}

addToHistory(recipe: any): void {
  if (!this.historyDishes.some((item) => item.id === recipe.id)) {
    this.historyDishes.push(recipe);
  }
}

routeRecipe(id: number): void {
  const recipe = this.RecipeList.find((item) => item.id === id);
  if (recipe) {
    this.addToHistory(recipe);
    this.router.navigate(['/recipes', id]);
  }
}


  

ngOnInit(): void {
  this.route.queryParams.subscribe((params) => {
    this.dish = params['dish'];
    this.cuisine = params['cuisine'];
    this.meal = params['meal'];

    // Ensure ingredients is an array, even if it's null or a string
    this.ingredients = params['ingredients'] ? params['ingredients'].split(',') : [];

    if (this.dish) {
      this.result = this.dish;
    } else if (this.cuisine) {
      this.result = this.cuisine;
    } else if (this.meal) {
      this.result = this.meal;
    }

    // Fetch recipes when a new query parameter is detected
    if (this.result) {
      this.getApi.getRecipeByDish(this.result).subscribe({
        next: (recipes) => {
          this.RecipeList = recipes; // Update the RecipeList with API response
        },
        error: (err) => {
          console.error('Error fetching recipes:', err);
        }
      });
    }

    if (this.ingredients.length > 0) {
      console.log('Ingredients:', this.ingredients);
      this.result=this.ingredients.join(', ');
      this.getApi.getRecipeByIngredients(this.ingredients).subscribe({
        next: (recipes) => {
          this.RecipeList = recipes; // Update the RecipeList with API response
        },
        error: (err) => {
          console.error('Error fetching recipes:', err);
        }
      });
    }
  });
}

}
