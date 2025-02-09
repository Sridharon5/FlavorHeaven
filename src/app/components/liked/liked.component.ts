import { Component, Input, OnInit } from '@angular/core';
import { LikedService } from '../../services/liked.service';
import { CardComponent } from '../card/card.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-liked',
  templateUrl: './liked.component.html',
  styleUrls: ['./liked.component.scss'],
  imports:[CardComponent,CommonModule]
})
export class LikedComponent implements OnInit {
  likedRecipe: any[] = [];

  @Input() recipe!:any;

  constructor(private likedService: LikedService) {}

  ngOnInit(): void {
    this.likedRecipe = this.likedService.getLikedDishes();
  }

  removeFromLiked(recipeId: number): void {
    this.likedService.removeLikedDish(recipeId);
    this.likedRecipe = this.likedService.getLikedDishes();
  }
}
