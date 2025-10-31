import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ApiClient } from '../../services/api-client';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { AuthService } from '../../services/auth-service';
@Component({
  selector: 'app-home',
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  constructor(private router: Router,private api:ApiClient,private loader:NgxUiLoaderService,private auth:AuthService) {}
  showRecipeList:boolean=false;
  recipeList:any[]=[];
  recipeName:String='';
  recipeDetailData:any;
  showRecipeDetail:boolean=false;
  dishes = [
    { name: 'Pizza', img: '/pizza.jfif' },
    { name: 'Burger', img: '/burger.jfif' },
    { name: 'Dosa', img: '/dosa.jfif' },
    { name: 'Ice Cream', img: '/ice cream.jpg' },
    { name: 'Biryani', img: '/biryani.jfif' },
    { name: 'Samosa', img: '/samosa.jfif' },
  ];

  meals = [
    { name: 'Breakfast', img: '/breakfast 1.svg' },
    { name: 'Main Course', img: '/main-course.svg' },
    { name: 'Snacks', img: '/candies.svg' },
    { name: 'Beverages', img: '/coffee.svg' },
  ];

  cuisines = [
    { name: 'Indian', img: '/ind.webp' },
    { name: 'Chinese', img: '/chi.webp' },
    { name: 'Italian', img: '/itl.webp' },
    { name: 'Mexican', img: '/mex.png' },
    { name: 'Other', img: '/oth.png' },
  ];

  handleCuisine(name: String) {
    this.recipeName=name;
    const apiKey=this.api.getApiKey();
    this.loader.start();
    this.api
      .get(`complexSearch?query=${name}&apiKey=${apiKey}`)
      .subscribe({
        next: (res: any) => {
          this.recipeList=res.results;
          this.showRecipeList=true;
          this.loader.stop();
          console.log(res);
        },
        error: (err: any) => {
          console.error(err);
          this.loader.stop();
        },
      });
   // this.router.navigate(['search'], { queryParams: { cuisine: name } });
  }
  handledish(name: String) {
    this.recipeName=name;
   const apiKey=this.api.getApiKey();
    this.loader.start();
    this.api
      .get(`complexSearch?query=${name}&apiKey=${apiKey}`)
      .subscribe({
        next: (res: any) => {
          this.recipeList=res.results;
          this.showRecipeList=true;
          this.loader.stop();
          console.log(res);
        },
        error: (err: any) => {
          console.error(err);
          this.loader.stop();
        },
      });
  }
  handleMeals(name: String) {
    this.recipeName=name;
   const apiKey=this.api.getApiKey();
    this.loader.start();
    this.api
      .get(`complexSearch?query=${name}&apiKey=${apiKey}`)
      .subscribe({
        next: (res: any) => {
          this.recipeList=res.results;
          this.showRecipeList=true;
          this.loader.stop();
          console.log(res);
        },
        error: (err: any) => {
          console.error(err);
          this.loader.stop();
        },
      });
  }
  onCardClick(recipe:any){
    const id=recipe.id;
    const apiKey=this.api.getApiKey();
    this.loader.start();
     this.api
      .get(`${id}/information?includeNutrition=false&apiKey=${apiKey}`)
      .subscribe({
        next: (res: any) => {
          this.recipeDetailData=res;
          console.log("Show Recipe Detail Data",this.recipeDetailData);
          this.showRecipeDetail=true;
          this.showRecipeList=false;
          this.loader.stop();
          console.log(res);
        },
        error: (err: any) => {
          console.error(err);
          this.loader.stop();
        },
      });

  }
  addToLiked(recipe:any){
    
    const payload={
      userId:this.auth.getUserId(),
      recipeId:recipe.id,
      recipeImage:recipe.image,
      recipeTitle:recipe.title
    }
    this.loader.start();
    this.api
    .post('user/recipeLiked',payload)
      .subscribe({
        next: (res: any) => {
          this.recipeDetailData=res;
          console.log("Show Recipe Detail Data",this.recipeDetailData);
          this.showRecipeDetail=true;
          this.showRecipeList=false;
          this.loader.stop();
          console.log(res);
        },
        error: (err: any) => {
          console.error(err);
          this.loader.stop();
        },
      });
  }
  backToRecipe(){
    this.showRecipeList=false;
    this.showRecipeDetail=false;
  }
  backToRecipeListPage(){
    this.showRecipeList=true;
    this.showRecipeDetail=false;
  }
}
