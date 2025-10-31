import { Component, Input, OnInit } from '@angular/core';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { CommonModule } from '@angular/common';
import { ApiClient } from '../../services/api-client';
import { AuthService } from '../../services/auth-service';

@Component({
  selector: 'app-liked',
  templateUrl: './liked.component.html',
  styleUrls: ['./liked.component.scss'],
  imports: [CommonModule],
})
export class LikedComponent implements OnInit {
  constructor(private api: ApiClient, private auth: AuthService,private loader:NgxUiLoaderService) {}
  recipeList: any[] = [];
  recipeName: string = '';
  showRecipeDetail: boolean = false;
  showRecipeList: boolean = false;
  ngOnInit(): void {
    this.getUserLikedRecipes();
  }
  getUserLikedRecipes() {
    this.loader.start();
    const payload={
      userId:this.auth.getUserId(),
      username:this.auth.getUsername()
    }
     this.api
      .post('user/getLikedRecipes',payload)
      .subscribe({
        next: (res: any) => {
          this.recipeList=res.results;
          this.showRecipeList=true;
          this.loader.stop();
        },
        error: (err: any) => {
          console.error(err);
          this.loader.stop();
        },
      });
  }
  onCardClick(recipe: any) {

  }
  removeFromLiked(recipe: any) {
   const payload={
      userId:this.auth.getUserId(),
      recipeId:recipe.id,
      recipeImage:recipe.image,
      recipeTitle:recipe.title
    }
    this.api
    .post('user/removeLikedRecipe',payload)
      .subscribe({
        next: (res: any) => {
         this.getUserLikedRecipes();
        },
        error: (err: any) => {
          console.error(err);
          this.loader.stop();
        },
      });
  }
}
