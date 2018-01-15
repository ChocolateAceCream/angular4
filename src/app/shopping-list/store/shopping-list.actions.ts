import { Action } from '@ngrx/store';
import { Ingredient } from '../../shared/ingredient.model';

//a const which discribe the action and will be export to other files, typically
//use uppcase for the name and same value for name and value
export const ADD_INGREDIENT = 'ADD_INGREDIENT';
export const ADD_INGREDIENTS = 'ADD_INGREDIENTS';
export const UPDATE_INGREDIENT = 'UPDATE_INGREDIENT';
export const DELETE_INGREDIENT = 'DELETE_INGREDIENT';
export const START_EDIT = 'START_EDIT';
export const STOP_EDIT = 'STOP_EDIT';

export class AddIngredient implements Action {
    //type is a forced property of Action.
    readonly type = ADD_INGREDIENT;
    //not every action was required to have a payload. we can add property
    //payload:
    //by adding a constructor, and adding an accesser public to turn payload as a
    //property to this class,
    constructor(public payload: Ingredient) {}
    // payload: Ingredient;
}

export class AddIngredients implements Action {
    readonly type = ADD_INGREDIENTS;
    constructor(public payload: Ingredient[]) {}
}

export class UpdateIngredients implements Action {
    readonly type = UPDATE_INGREDIENT;
    constructor(public payload: {ingredient: Ingredient}) {}
}

export class DeleteIngredient implements Action {
    readonly type = DELETE_INGREDIENT;
}

//when leave the shopping list page
export class StopEdit implements Action {
    readonly type = STOP_EDIT;
}

export class StartEdit implements Action {
    readonly type = START_EDIT;
    constructor(public payload: number) {}
    //payload will be a number which refer to the index we editing
}
//bundle all actions seting up in this file to a single export.
//use union type operator | : a union type operator describe a value that can be
//one of several types We use the vertical bar (|) to separate each type, so

//bundle all actions seting up in this file to a single export.
//use union type operator | : a union type operator describe a value that can be
//one of several types We use the vertical bar (|) to separate each type, so
//number | string | boolean is the type of a value that can be a number, a
//string, or a boolean.
export type SlActions =
    AddIngredient |
    AddIngredients |
    UpdateIngredients |
    DeleteIngredient |
    StartEdit |
    StopEdit;
