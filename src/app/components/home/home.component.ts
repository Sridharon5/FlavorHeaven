import { Component } from '@angular/core';
import { MealsComponent } from '../meals/meals.component';
import { DishesComponent } from '../dishes/dishes.component';
import { CuisineComponent } from '../cuisine/cuisine.component';

@Component({
  selector: 'app-home',
  imports: [MealsComponent,DishesComponent,CuisineComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

}
