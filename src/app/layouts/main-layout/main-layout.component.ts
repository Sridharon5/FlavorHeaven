import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SidebarComponent } from '../../components/sidebar/sidebar.component';
import {NgxUiLoaderModule}from 'ngx-ui-loader'

@Component({
  selector: 'app-main-layout',
  imports: [RouterOutlet, SidebarComponent,NgxUiLoaderModule],
  template: `
    <div class="main-layout">
      <app-sidebar class="sidebar"></app-sidebar>

      <div class="content-area">
        <div class="content-body">
          <router-outlet></router-outlet>
        </div>
      </div>
    </div>
    <ngx-ui-loader></ngx-ui-loader>
  `,
  styleUrls: ['./main-layout.component.css'],
})
export class MainLayoutComponent {}
