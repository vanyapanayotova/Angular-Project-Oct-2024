import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../../api.service';
import { UserService } from '../../user/user.service';
import { Recipe } from '../../types/recipe';
import { LoaderComponent } from '../../shared/loader/loader.component';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-current-recipe',
  standalone: true,
  imports: [LoaderComponent, DatePipe],
  templateUrl: './current-recipe.component.html',
  styleUrl: './current-recipe.component.css',
})
export class CurrentRecipeComponent implements OnInit {
  recipe = {} as Recipe;
  isLoading = true;

  constructor(
    private route: ActivatedRoute,
    private apiService: ApiService,
    private userService: UserService
  ) {}

  get isLoggedIn(): boolean {
    return this.userService.isLogged;
  }

  get username(): string {
    return this.userService.user?.username || '';
  }

  ngOnInit(): void {
    const id = this.route.snapshot.params['recipeId'];

    this.apiService.getSingleRecipe(id).subscribe((recipe) => {
      this.recipe = recipe;
      this.isLoading = false;
    });
  }
}
