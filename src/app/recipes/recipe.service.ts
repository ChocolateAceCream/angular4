import { Injectable } from '@angular/core';

import { Recipe } from './recipe.model';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class RecipeService {
    recipeChanged = new Subject<Recipe[]>();
    //recipeSelected = new EventEmitter<Recipe>();//public method, hold Recipe ddtype of data
    private recipes: Recipe[] = [
        new Recipe(
            'test recipe 1',
            'this is a simply test',
            'https://www.bbcgoodfood.com/sites/default/files/styles/recipe/public/recipe_images/recipe-image-legacy-id--51643_11.jpg?itok=I_hF8vFL',
            [
                new Ingredient('Meat',1),
                new Ingredient('French Fries',1)
            ]
        ),
        new Recipe(
            'test recipe 2',
            'this is a simply test',
            'https://www.bbcgoodfood.com/sites/default/files/styles/recipe/public/recipe_images/recipe-image-legacy-id--51643_11.jpg?itok=I_hF8vFL',
            [
                new Ingredient('Meat',3),
                new Ingredient('French Fries',1)
            ]
        )
    ];

    constructor( private shoppingListService: ShoppingListService) {}

    getRecipes() {  //method to access to the array of recipes from outside.
        // if return like this:
        // return this.recipes;
        // this will return the direct reference to this array and since arrays
        // and objects are reference types in JS. therefore if we change
        // anything to this array from outside, we actually changed the array in
        // the service as well.
        // therefore, we need to use array.slice() method to return a new array
        // which is an exact copy of the one in this services file.
        return this.recipes.slice();
        //now we are not able to modify the recipes stored here from outside.
    }
    getRecipe(index: number) {
        //return a recipe by the index number
        return this.recipes[index];
    }

    addIngredientsToShoppingList(ingredients: Ingredient[]){
          this.shoppingListService.addIngredients(ingredients);
    }

    addRecipe(recipe: Recipe) {
       this.recipes.push(recipe);
       this.recipeChanged.next(this.recipes.slice());
    }

    updateRecipe(index: number, newRecipe: Recipe) {
       this.recipes[index] = newRecipe;
       this.recipeChanged.next(this.recipes.slice());
    }

    deleteRecipe(index: number) {
       this.recipes.splice(index,1);
       this.recipeChanged.next(this.recipes.slice());
    }
}
