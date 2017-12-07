import { Recipe } from '../recipes/recipe.model';
import { Injectable } from '@angular/core';
import { Response,Headers,Http } from '@angular/http';
import { RecipeService } from '../recipes/recipe.service';
import { AuthService } from '../auth/auth.service';
import 'rxjs/Rx';
//inject http service into this service
@Injectable()
export class DataStorageService {
    //inject Http service and Recipe in order to reach Recipe and http method
    constructor(
        private http: Http,
        private recipeService: RecipeService,
        private authService: AuthService
    ) {}

    storeRecipes() {
        const token = this.authService.getToken();
        //since we will get back an observable from http.put, we also need to
        //return this observable.
        return this.http.put(
            'https://superhacker-dc8b8.firebaseio.com/recipes.json?auth=' + token,
            this.recipeService.getRecipes()
        );
    }

    getRecipes() {
            /*if we retrive token with the .then block, the token can only be
             * used inside block, which is not good, so we do it in AuthService
            .then(
                (token: string) => {

                }
            );
             */
        //add an auth query params in URL
        const token = this.authService.getToken();
        this.http.get('https://superhacker-dc8b8.firebaseio.com/recipes.json?auth=' + token)
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
