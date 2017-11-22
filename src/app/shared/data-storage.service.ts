import { Recipe } from '../recipes/recipe.model';
import { Injectable } from '@angular/core';
import { Response,Headers,Http } from '@angular/http';
import { RecipeService } from '../recipes/recipe.service';
import 'rxjs/Rx';
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
        this.http.get('https://superhacker-dc8b8.firebaseio.com/recipes.json')
            .map(
                (response: Response) => {
                    const recipes: Recipe[] = response.json();
                    //pass recipes fetched from server to recipeService, then
                    //from there to whoever interested to listen
                    //
                    //loop through the recipes to check if every recipes has ingredient property.
                    for(let recipe of recipes) {
                        //
                        //if no ingredient presented
                        if (!recipe['ingredients']) {
                            //now it still doesnt have ingredient, but now it
                            //has ingredient property empty array
                            recipe.ingredients = [];
                            //backet notation also works
                            //recipe['ingredients'] = [];
                        }
                    }
                    return recipes;
                }
            )
            .subscribe(
                //now we getting back recipes from map
                (recipes: Recipe[]) => {
                    this.recipeService.setRecipes(recipes);

                }
            );
    }
}
