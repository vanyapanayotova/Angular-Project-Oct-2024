import { Routes } from '@angular/router';
import { BannerComponent } from './banner/banner.component';
import { RegisterComponent } from './user/register/register.component';
import { LoginComponent } from './user/login/login.component';
import { ProfileComponent } from './user/profile/profile.component';
import { RecipesListComponent } from './recipe/recipe-list/recipes-list.component';
import { CurrentRecipeComponent } from './recipe/current-recipe/current-recipe.component';
import { AuthGuard } from './guards/auth.guard';
import { EditRecipeComponent } from './recipe/edit-recipe/edit-recipe.component';
import { ErrorMsgComponent } from './error-msg/error-msg.component';
import { PageNotFoundComponent } from './error/error.component';
// import { HomeComponent } from './home/home.component';
// import { PageNotFoundComponent } from './error/error.component';
// import { LoginComponent } from './user/login/login.component';
// import { RegisterComponent } from './user/register/register.component';
// import { ProfileComponent } from './user/profile/profile.component';
// import { AddThemeComponent } from './theme/add-theme/add-theme.component';
// import { MainComponent } from './main/main.component';
// import { CurrentThemeComponent } from './theme/current-theme/current-theme.component';
// import { AuthGuard } from './guards/auth.guard';
// import { ErrorMsgComponent } from './core/error-msg/error-msg.component';

export const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: BannerComponent },

  //   //   Start - User routing
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'profile', component: ProfileComponent },
  //   //   End - User routing

  // Start - Theme routing
  {
    path: 'recipes',
    children: [
      { path: '', component: RecipesListComponent },
      {
        path: ':recipeId',
        component: CurrentRecipeComponent,
        // canActivate: [AuthGuard],
      },
      {
        path: ':recipeId/edit',
        component: EditRecipeComponent,
        canActivate: [AuthGuard],
      }
    ],
  },
  {
    path: 'add-recipe',
    loadComponent: () =>
      import('./recipe/add-recipe/add-recipe.component').then(
        (c) => c.AddRecipeComponent
      ),
    canActivate: [AuthGuard],
  },
    // // End - Theme routing

    // { path: 'error', component: ErrorMsgComponent },
    { path: '404', component: PageNotFoundComponent },
    { path: '**', redirectTo: '/404' },
];
