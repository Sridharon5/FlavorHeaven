import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SidebarComponent } from '../../components/sidebar/sidebar.component';
import { SearchBarComponent } from '../../components/search-bar/search-bar.component';

@Component({
  selector: 'app-main-layout',
  imports: [RouterOutlet,SidebarComponent,SearchBarComponent],
  template: `
  <div class="row ">
  <app-sidebar class="col-2"></app-sidebar>
  <div class="row col-10">
    <app-search-bar></app-search-bar>
    <router-outlet></router-outlet>
  </div>
</div>
  `,
  styles:[`

    `

  ]
})
export class MainLayoutComponent {

}
