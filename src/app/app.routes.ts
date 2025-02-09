import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LikedComponent } from './components/liked/liked.component';
import { HistoryComponent } from './components/history/history.component';
import { ResultsComponent } from './components/results/results.component';
import { RecipeComponent } from './components/recipe/recipe.component';

export const routes: Routes = [
    {
        path:'',
        component: HomeComponent
    },
    {
        path:'liked',
        component: LikedComponent
    },
    {
        path: 'history',
        component: HistoryComponent
    },
    {
        path:'search',
        component: ResultsComponent
    },
    {
        path:'recipes/:id',
        component: RecipeComponent
    }
];
