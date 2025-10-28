import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LikedComponent } from './components/liked/liked.component';
import { LoginComponent } from './components/login/login.component';
import { LoginLayoutComponent } from './layouts/login-layout/login-layout.component';
import { MainLayoutComponent } from './layouts/main-layout/main-layout.component';

export const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  {
    path: '',
    component: LoginLayoutComponent,
    children: [
      { path: 'login', component: LoginComponent},
    ]
  },
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      { path: 'home', component:HomeComponent },
      { path: 'liked', component: LikedComponent }
     
    ]
  },
  { path: '**', redirectTo: 'login' }
];