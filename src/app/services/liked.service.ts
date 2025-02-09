import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LikedService {
  private likedDishes: any[] = [];

  getLikedDishes(): any[] {
    return this.likedDishes;
  }

  addLikedDish(recipe: any): void {
    if (!this.likedDishes.some((item) => item.id === recipe.id)) {
      this.likedDishes.push(recipe);
    }
  }

  removeLikedDish(recipeId: number): void {
    this.likedDishes = this.likedDishes.filter((item) => item.id !== recipeId);
  }
}
