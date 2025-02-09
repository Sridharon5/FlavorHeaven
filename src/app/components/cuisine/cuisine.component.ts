import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-cuisine',
  imports: [],
  templateUrl: './cuisine.component.html',
  styleUrl: './cuisine.component.scss'
})
export class CuisineComponent {
  constructor(private router:Router){};
   handleCuisine(name:String){
      this.router.navigate(['search'],{queryParams: {cuisine:name}});
   }
}
