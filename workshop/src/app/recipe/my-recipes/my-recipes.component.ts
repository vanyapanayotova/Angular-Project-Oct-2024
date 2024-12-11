import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../api.service';
import { Recipe } from '../../types/recipe';
import { LoaderComponent } from '../../shared/loader/loader.component';
import { RouterLink } from '@angular/router';
import { SlicePipe } from '../../shared/pipes/slice.pipe';
import { ElapsedTimePipe } from '../../shared/pipes/elapsed-time.pipe';
import { UserService } from '../../user/user.service';

@Component({
  selector: 'app-my-recipe',
  standalone: true,
  imports: [LoaderComponent, RouterLink, SlicePipe, ElapsedTimePipe],
  templateUrl: './my-recipes.component.html',
  styleUrl: './my-recipes.component.css',
})
export class MyRecipesComponent implements OnInit {
  recipes: Recipe[] = [];
  isLoading = true;

  constructor(
    private apiService: ApiService,
    private userService: UserService
  ) {}

  ngOnInit() {
    this.apiService.getMyRecipes(this.userService.user?._id).subscribe((recipes) => {
      this.recipes = recipes;      
      this.isLoading = false;
    });
  }
}
