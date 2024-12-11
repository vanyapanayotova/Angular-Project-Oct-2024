import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../api.service';
import { FormControl, FormGroup, FormsModule, NgForm, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../user/user.service';
import { Recipe } from '../../types/recipe';

@Component({
  selector: 'app-edit-recipe',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './edit-recipe.component.html',
  styleUrl: './edit-recipe.component.css',
})
export class EditRecipeComponent implements OnInit {
  recipe = {} as Recipe;
  isLoading = true;

  constructor(
    private apiService: ApiService, 
    private router: Router,
    private route: ActivatedRoute,
    private userService: UserService    
  ) {
  }

  ngOnInit(): void {
    const id = this.route.snapshot.params['recipeId'];

    this.apiService.getSingleRecipe(id).subscribe((recipe) => {
      this.recipe = recipe;
      console.log(recipe);
      // form.value = this.recipe;
      this.isLoading = false;
    });
  }

  updateRecipe(form: NgForm) {
    if (form.invalid) {
      return;
    }

    const { title, products, description, imgUrl } = form.value;

    this.apiService.updateRecipe(this.recipe._id, title, products, description, imgUrl ).subscribe(() => {
      this.router.navigate(['/recipes']);
    });
  }
}
