import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Post } from './types/post';
import { Recipe } from './types/recipe';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private http: HttpClient) {}

  getPosts(limit?: number) {
    let url = `/api/posts`;
    if (limit) {
      url += `?limit=${limit}`;
    }

    return this.http.get<Post[]>(url);
  }

  getRecipes() {
    return this.http.get<Recipe[]>(`/api/themes`);
  }

  getSingleRecipe(id: string) {
    return this.http.get<Recipe>(`/api/themes/${id}`);
  }

  createRecipe(recipeName: string,products: string, description: string, imgUrl: string) {
    const payload = { recipeName, products, description, imgUrl };
    return this.http.post<Recipe>(`/api/themes`, payload);
  }

  // CRUD operations
  // update -> http.put
  updateRecipe(recipeId: string, recipeName: string, products: string, description: string, imgUrl: string) {
    const payload = { recipeName, products, description, imgUrl };
    return this.http.put<Recipe>(`/api/themes/${recipeId}`, payload);
  }

  // delete -> http.delete theme ID
  deleteRecipe(recipeId: string) {
    return this.http.delete(`/api/themes/${recipeId}`);
  }
}
