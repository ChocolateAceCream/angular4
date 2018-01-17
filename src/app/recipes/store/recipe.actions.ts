import { Action } from '@ngrx/store';
import { Recipe } from '../recipe.model'

export const SET_RECIPES = 'SET_RECIPES';
export const ADD_RECIPE = 'ADD_RECIPE';
export const UPDATE_RECIPE = 'UPDATE_RECIPE';
export const DELETE_RECIPE = 'DELETE_RECIPE';
export const STORE_RECIPES = 'STORE_RECIPES';
export const FETCH_RECIPES = 'FETCH_RECIPES';

export class SetRecipes implements Action {
    readonly type = SET_RECIPES;

    constructor(public payload: Recipe[]) {}
}

export class AddRecipe implements Action {
    readonly type = ADD_RECIPE;

    constructor(public payload: Recipe) {}
}
export class UpdateRecipe implements Action {
    readonly type = UPDATE_RECIPE;

    //payload will contain the position of recipe to be updated and the content
    //of updated recipe
    constructor(public payload: {index: number, updatedRecipe: Recipe}) {}
}
export class DeleteRecipe implements Action {
    readonly type = DELETE_RECIPE;

    constructor(public payload: number ) {}
}
export class StoreRecipes implements Action {
    readonly type = STORE_RECIPES;
    //we dont need a Recipe payload here since we can directly fetch it from our
    //state
    //constructor(public payload: Recipe[] ) {}
}
export class FetchRecipes implements Action {
    readonly type = FETCH_RECIPES;
}

// union type operator | means RecipeActions could be type of any of chained
// type
export type RecipeActions = SetRecipes | AddRecipe | UpdateRecipe | DeleteRecipe | FetchRecipes | StoreRecipes;