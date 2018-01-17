import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
//import { Recipe } from '../recipe.model';
//import { RecipeService } from '../recipe.service';

import { Store } from '@ngrx/store';
import * as ShoppingListActions from '../../shopping-list/store/shopping-list.actions';
//import * as fromShoppingList from '../../shopping-list/store/shopping-list.reducers';
//import * as fromApp from '../../store/app.reducers';
import { Observable } from 'rxjs/Observable';
import * as fromRecipe from '../store/recipe.reducers';
import * as RecipeActions from '../store/recipe.actions';
import 'rxjs/add/operator/take';

@Component({
    selector: 'app-recipe-detail',
    templateUrl: './recipe-detail.component.html',
    styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {
    recipeState: Observable<fromRecipe.State>;
    id: number;
    constructor(
        //private recipeService: RecipeService,
        private route: ActivatedRoute,
        private router: Router,
        //private store: Store<{shoppingList: {ingredients: Ingredient[]}}>
        //private store: Store<fromApp.AppState>

        private store: Store<fromRecipe.RecipeState>
        //since we need to use the recipe state in ngOnInit and app
        //state in toShoppingList, now we make fromRecipe extending fromApp, so
        //that it can contain all state of the app
    ){}

    ngOnInit() {
        //since we need to change id from inside the page, this approach is not
        //const id = this.route.snapshot.params['id'];
        //use subscribe approach:
        this.route.params
            .subscribe(
                (params: Params) => {
                    this.id = +params['id'];//+ convert string to number
                    this.recipeState = this.store.select('recipes');
                }
            )
        //remember if we use our own observable, we need to manully cleanup
        //after destroy the component.
    }
    onAddToShoppingList() {
        //now we use state store instead of service
        //this.recipeService.addIngredientsToShoppingList(this.recipe.ingredients);

        this.store.select('recipes')
            .take(1)
            .subscribe(
                (recipeState: fromRecipe.State) => {
                    this.store.dispatch(new ShoppingListActions.AddIngredients(recipeState.recipes[this.id].ingredients))

            });
    }
    onEditRecipe(){
        this.router.navigate(['edit'], {relativeTo: this.route});
        //a more complex way of navigate is :
        //this.router.navigate(['../',this.id,'edit'], {relativeTo: this.route})
    }

    onDeleteRecipe() {
        //id was obtained from route
        this.store.dispatch( new RecipeActions.DeleteRecipe(this.id));
        //after delete, navigate to recipes for better UX
        this.router.navigate(['/recipes']);
    }
}
