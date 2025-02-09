import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-meals',
  imports: [],
  templateUrl: './meals.component.html',
  styleUrl: './meals.component.scss'
})
export class MealsComponent {
  constructor(private router:Router){};

  handleMeals(name:String){
    this.router.navigate(['search'],{queryParams:{meal:name}});
  }
}
