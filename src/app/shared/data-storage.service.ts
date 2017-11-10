import { Recipe } from '../recipes/recipe.model';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { RecipeService } from '../recipes/recipe.service';
import { Response } from '@angular/http';
//inject http service into this service
@Injectable()
export class DataStorageService {
    //inject Http service and Recipe in order to reach Recipe and http method
    constructor(private http: Http, private recipeService: RecipeService) {}

    storeRecipes() {
        //since we will get back an observable from http.put, we also need to
        //return this observable.
        return this.http.put(
            'https://superhacker-dc8b8.firebaseio.com/recipes.json',
            this.recipeService.getRecipes()
        );
    }

    getRecipes() {
        this.http.get('https://superhacker-dc8b8.firebaseio.com/')
            .subscribe(
                (response: Response) => {
                    const recipes: Recipe[] = response.json();
                    //pass recipes fetched from server to recipeService, then
                    //from there to whoever interested to listen
                    this.recipeService.setRecipes(recipes);

                }
            );
    }
}
