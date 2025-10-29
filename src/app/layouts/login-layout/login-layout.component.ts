import { Component } from '@angular/core';
import {RouterOutlet} from '@angular/router'
import {NgxUiLoaderModule}from 'ngx-ui-loader'
@Component({
  selector: 'app-login-layout',
  standalone:true,
  imports: [RouterOutlet,NgxUiLoaderModule],
  template:`
  <router-outlet></router-outlet>
  <ngx-ui-loader></ngx-ui-loader>
  `
})
export class LoginLayoutComponent {

}
