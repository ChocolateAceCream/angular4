import { Store } from '@ngrx/store';
//mport * as fromShoppingList from './store/shopping-list.reducers';
import * as ShoppingListActions from './store/shopping-list.actions';
import * as fromApp from '../store/app.reducers';

import { Component, OnInit } from '@angular/core';
//import { Subscription } from 'rxjs/Subscription';

import { Ingredient } from '../shared/ingredient.model';
//import { ShoppingListService } from './shopping-list.service';
import { Observable } from 'rxjs/Observable';

@Component({
    selector: 'app-shopping-list',
    templateUrl: './shopping-list.component.html',
    styleUrls: ['./shopping-list.component.css']
})
    /*since we dont need subscribe, we dont need OnDestroy
export class ShoppingListComponent implements OnInit, OnDestroy {
     */
export class ShoppingListComponent implements OnInit{
    //ingredients: Ingredient[];
    //since we set an initial ingredient state in reducer to be of type JS
    //object with Ingredients array, that's what we need to setup here
    //also, since ingredients is inside the JS object, we need to rename it to
    //shoppingListState
    shoppingListState: Observable<{ingredients: Ingredient[]}>;

    /*since we using NgRx now, we don't need to subscibe anymore
    private subscription: Subscription;
     */

    constructor(
        //private shoppingListService: ShoppingListService,
        //since store is generic type, we need to tell it which kind of data we
        //want to retrive here and the type u enter here need to fit the global
        //state, which is the initial state from reducer->an Ingredient JS
        //object

        //private store: Store<{shoppingList: {ingredients: Ingredient[]}}>
        private store: Store<fromApp.AppState>

    ) { }

    ngOnInit() {
        //this.ingredients = this.shoppingListService.getIngredients();
        //now we will use state , since shoppingList is a observable, we need to
        //change the type of ingredients to observable
        this.shoppingListState = this.store.select('shoppingList');
        /*
        this.subscription = this.shoppingListService.ingredientsChanged
            .subscribe(
                (ingredients: Ingredient[]) => {
                    this.ingredients = ingredients;
                }
            );
         */
    }

    onEditItem(index: number) {
        //this.shoppingListService.startedEditting.next(index);
        //pass the index to the startedEdititng subject in service

        this.store.dispatch(new ShoppingListActions.StartEdit(index))
    }

        /*
    ngOnDestroy() {
        this.subscription.unsubscribe();
    }
         */

}
