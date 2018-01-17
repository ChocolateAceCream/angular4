import { Effect, Actions } from '@ngrx/effects';
import * as RecipeActions from '../store/recipe.actions';
import { HttpClient, HttpRequest} from '@angular/common/http';
import { Recipe } from '../recipe.model';
import { Injectable } from '@angular/core';

import { Store } from "@ngrx/store";
import * as fromRecipe from './recipe.reducers';
//might also work without that, but this can shink bundle size
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/withLatestFrom';

@Injectable()
export class RecipeEffects {
    @Effect()

    //used in header component
    recipeFetch = this.actions$
        .ofType(RecipeActions.FETCH_RECIPES)
        .switchMap((action: RecipeActions.FetchRecipes) => {
            return this.httpClient.get<Recipe[]>('https://superhacker-dc8b8.firebaseio.com/recipes.json',{
                observe: 'body',
                responseType: 'json'
            })

        })//only return an observable from switchMap, which contain the Recipe[]
        .map(
            (recipes) => {
                console.log(recipes);
                for (let recipe of recipes) {
                    if(!recipe['ingredients']) {
                        recipe['ingredients'] =[];
                    }
                }

                //return recipes;
                //now we dont want to just return the recipes, we want to return
                //a new action which dispatched automatically by ngrx effect
                return {
                    type: RecipeActions.SET_RECIPES,
                    payload: recipes
                };
            }
        );

    @Effect({dispatch: false})
    recipeStore = this.actions$
        .ofType(RecipeActions.STORE_RECIPES)
        //in order to store the recipe[], we first need to fetch it from the
    //state
    //
    //withLatestFrom operator allow us to combine the action we get from ofType
    //operator with other observable values we get from store.state,
    //withLatestFrom will return an array of observables combined
        .withLatestFrom(this.store.select('recipes'))
        .switchMap(([action, state]) => {
            const req = new HttpRequest(
                'PUT',
                'https://superhacker-dc8b8.firebaseio.com/recipes.json',
                state.recipes,
                {reportProgress: true}
            );
            return this.httpClient.request(req);
        });

    constructor(
        private actions$: Actions,
        private httpClient: HttpClient,
        private store: Store<fromRecipe.RecipeState>
    ) {}

}
