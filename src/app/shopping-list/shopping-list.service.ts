import { Ingredient } from '../shared/ingredient.model';
import { Subject } from 'rxjs/Subject';

export class ShoppingListService {
    ingredientsChanged = new Subject<Ingredient[]>();
    //since we want to use .slice() method to pass a copy of data stored in
    //service, when we modify the ingredient array, we actually modify the copy
    //therefore, in order to reflect the data update from original array, we
    //need to emit a event to notice the service for data update.
    //

    //add this startedEditing service to create an object that can be listened
    //in shopping-list onEdit method
    startedEditting = new Subject<(number)>();
    //subject is a generic type which will hold a number at the end

    private ingredients: Ingredient[]= [
        new Ingredient('Apples',5),
        new Ingredient('Tomatoes',10),
    ];

    getIngredients(){
        return this.ingredients.slice();
    }

    getIngredient(index: number) {
        return this.ingredients[index];
    }

    addIngredient(ingredient: Ingredient) {
        this.ingredients.push(ingredient);
        this.ingredientsChanged.next(this.ingredients.slice());
        //once the data changed, emit a copy of updated ingredients aray
    }

    addIngredients(ingredients: Ingredient[]){
        //on options is to use for loop and addIngredient method
        //t of ingredients) {
        //      this.addIngredient(ingredient);
        //  }
        //this will emit alot of unnessary event
        this.ingredients.push(...ingredients);//use spread operator to spread the ingredients array into single ingredient
        this.ingredientsChanged.next(this.ingredients.slice());
    }

    updateIngredient(index: number, newIngredient: Ingredient) {
        this.ingredients[index] = newIngredient;
        this.ingredientsChanged.next(this.ingredients.slice());
    }

    deleteIngredient(index: number) {
        this.ingredients.splice(index,1);//remove the ingredient at index
        this.ingredientsChanged.next(this.ingredients.slice());
    }
}
