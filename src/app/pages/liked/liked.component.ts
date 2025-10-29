import { Component, Input, OnInit } from '@angular/core';

import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-liked',
  templateUrl: './liked.component.html',
  styleUrls: ['./liked.component.scss'],
  imports:[CommonModule]
})
export class LikedComponent implements OnInit {
  likedRecipe: any[] = [];

  @Input() recipe!:any;

  constructor() {}

  ngOnInit(): void {
    //this.likedRecipe = this.likedService.getLikedDishes();
  }

  removeFromLiked(recipeId: number): void {
    // this.likedService.removeLikedDish(recipeId);
    // this.likedRecipe = this.likedService.getLikedDishes();
  }
}
