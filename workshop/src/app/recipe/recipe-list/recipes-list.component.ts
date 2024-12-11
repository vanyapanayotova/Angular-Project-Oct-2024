import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../api.service';
import { Recipe } from '../../types/recipe';
import { LoaderComponent } from '../../shared/loader/loader.component';
import { RouterLink } from '@angular/router';
import { SlicePipe } from '../../shared/pipes/slice.pipe';
import { ElapsedTimePipe } from '../../shared/pipes/elapsed-time.pipe';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-recipes-list',
  standalone: true,
  imports: [LoaderComponent, RouterLink, SlicePipe, DatePipe, ElapsedTimePipe],
  templateUrl: './recipes-list.component.html',
  styleUrl: './recipes-list.component.css',
})
export class RecipesListComponent implements OnInit {
  recipes: Recipe[] = [];
  isLoading = true;

  constructor(private apiService: ApiService) {}

  ngOnInit() {
    this.apiService.getRecipes().subscribe((recipes) => {
      this.recipes = recipes;      
      this.isLoading = false;
    });
  }
}
