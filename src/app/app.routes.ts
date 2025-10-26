import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LikedComponent } from './components/liked/liked.component';
import { HistoryComponent } from './components/history/history.component';
import { ResultsComponent } from './components/results/results.component';
import { RecipeComponent } from './components/recipe/recipe.component';
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
      { path: 'liked', component: LikedComponent },
      { path: 'history', component: HistoryComponent },
      { path: 'search', component: ResultsComponent },
      { path: 'recipes/:id', component: RecipeComponent }
      
    ]
  },
  { path: '**', redirectTo: 'login' }
];