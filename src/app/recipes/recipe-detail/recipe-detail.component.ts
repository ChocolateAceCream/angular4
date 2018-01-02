import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';

import { Store } from '@ngrx/store';
import * as ShoppingListActions from '../../shopping-list/store/shopping-list.actions';
import * as fromShoppingList from '../../shopping-list/store/shopping-list.reducers';

@Component({
    selector: 'app-recipe-detail',
    templateUrl: './recipe-detail.component.html',
    styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {
    recipe: Recipe;
    id: number;
    constructor(
        private recipeService: RecipeService,
        private route: ActivatedRoute,
        private router: Router,
        //private store: Store<{shoppingList: {ingredients: Ingredient[]}}>
        private store: Store<fromShoppingList.AppState>
    ){}

    ngOnInit() {
        //since we need to change id from inside the page, this approach is not
        //const id = this.route.snapshot.params['id'];
        //use subscribe approach:
        this.route.params
            .subscribe(
                (params: Params) => {
                    this.id = +params['id'];//+ convert string to number
                    this.recipe = this.recipeService.getRecipe(this.id);
                }
            )
        //remember if we use our own observable, we need to manully cleanup
        //after destroy the component.
    }
    onAddToShoppingList() {
        //now we use state store instead of service
        //this.recipeService.addIngredientsToShoppingList(this.recipe.ingredients);

        this.store.dispatch(new ShoppingListActions.AddIngredients(this.recipe.ingredients))
    }
    onEditRecipe(){
        this.router.navigate(['edit'], {relativeTo: this.route});
        //a more complex way of navigate is :
        //this.router.navigate(['../',this.id,'edit'], {relativeTo: this.route})
    }

    onDeleteRecipe() {
        //id was obtained from route
        this.recipeService.deleteRecipe(this.id);
        //after delete, navigate to recipes for better UX
        this.router.navigate(['/recipes']);
    }
}
