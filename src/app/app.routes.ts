import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { LikedComponent } from './pages/liked/liked.component';
import { LoginComponent } from './pages/login/login.component';
import { LoginLayoutComponent } from './layouts/login-layout/login-layout.component';
import { MainLayoutComponent } from './layouts/main-layout/main-layout.component';
import { AuthGuard } from './guards/auth.guard';
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
    canActivate: [AuthGuard],
    children: [
      { path: 'home', component:HomeComponent },
      { path: 'liked', component: LikedComponent }
     
    ]
  },
  { path: '**', redirectTo: 'login' }
];