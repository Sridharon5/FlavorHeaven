import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SidebarComponent } from '../../components/sidebar/sidebar.component';
import { SearchBarComponent } from '../../components/search-bar/search-bar.component';

@Component({
  selector: 'app-main-layout',
  imports: [RouterOutlet,SidebarComponent,SearchBarComponent],
  template: `
  <div class="main-layout">
  <app-sidebar class="sidebar"></app-sidebar>

  <div class="content-area">
    <div class="top-search-bar">
      <app-search-bar></app-search-bar>
    </div>

    <div class="content-body">
      <router-outlet></router-outlet>
    </div>
  </div>
</div>

  `,
   styleUrls: ['./main-layout.component.css']
})
export class MainLayoutComponent {

}
