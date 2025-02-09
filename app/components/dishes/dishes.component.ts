import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-dishes',
  imports: [],
  templateUrl: './dishes.component.html',
  styleUrl: './dishes.component.scss'
})
export class DishesComponent {
    constructor(private router:Router){}
    handledish(inp: String){
      this.router.navigate(['search'], { queryParams: { dish: inp } })
    }
}
