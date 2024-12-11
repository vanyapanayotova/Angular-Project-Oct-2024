import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ApiService } from '../../api.service';
import { UserService } from '../../user/user.service';
import { Recipe } from '../../types/recipe';
import { LoaderComponent } from '../../shared/loader/loader.component';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-current-recipe',
  standalone: true,
  imports: [LoaderComponent, DatePipe, RouterLink],
  templateUrl: './current-recipe.component.html',
  styleUrl: './current-recipe.component.css',
})
export class CurrentRecipeComponent implements OnInit {
  recipe = {} as Recipe;
  isLoading = true;

  constructor(
    private route: ActivatedRoute,
    private apiService: ApiService,
    private userService: UserService,
    private router: Router,
  ) {}

  get isLoggedIn(): boolean {
    return this.userService.isLogged;
  }

  get isLikedByCurrentUser(): boolean {
    return this.recipe.subscribers.some(el => el == this.userService.user?._id);
  }

  get username(): string {
    return this.userService.user?.username || '';
  }

  get isOwner(): boolean {
    return this.recipe.userId._id == this.userService.user?._id;
  }

  ngOnInit(): void {
    const id = this.route.snapshot.params['recipeId'];

    this.apiService.getSingleRecipe(id).subscribe((recipe) => {
      this.recipe = recipe;      
      this.isLoading = false;     
    });
  }

  onDelete(event: Event) {
    event.preventDefault();
    const id = this.route.snapshot.params['recipeId'];
    this.apiService.deleteRecipe(id).subscribe(() => {
      this.router.navigate(['/recipes']);
    });
  }


  onLike(event: Event) {
    event.preventDefault();
    const id = this.route.snapshot.params['recipeId'];
    this.apiService.likeRecipe(id).subscribe(() => {
      this.router.navigate(['/recipes']);
    });
  }
}
