import { EventEmitter } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';

export class ShoppingListService {
    private ingredients: Ingredient[]= [
        new Ingredient('Apples',5),
        new Ingredient('Tomatoes',10),
    ];

    ingredientsChanged = new EventEmitter<Ingredient[]>();
    //since we want to use .slice() method to pass a copy of data stored in
    //service, when we modify the ingredient array, we actually modify the copy
    //therefore, in order to reflect the data update from original array, we
    //need to emit a event to notice the service for data update.
    getIngredient(){
        return this.ingredients.slice();
    }

    addIngredient(ingredient: Ingredient) {
        this.ingredients.push(ingredient);
        this.ingredientsChanged.emit(this.ingredients.slice());
        //once the data changed, emit a copy of updated ingredients aray
    }

}
