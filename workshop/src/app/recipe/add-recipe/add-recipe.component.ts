import { Component } from '@angular/core';
import { ApiService } from '../../api.service';
import { FormsModule, NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-recipe',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './add-recipe.component.html',
  styleUrl: './add-recipe.component.css',
})
export class AddRecipeComponent {
  constructor(private apiService: ApiService, private router: Router) {}

  addRecipe(form: NgForm) {
    if (form.invalid) {
      return;
    }

    const { title, products, description, imgUrl } = form.value;

    this.apiService.createRecipe(title, products, description, imgUrl ).subscribe(() => {
      this.router.navigate(['/recipes']);
    });
  }
}
