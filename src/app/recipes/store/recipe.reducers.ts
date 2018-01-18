import { Recipe } from '../recipe.model';
import { Ingredient } from '../../shared/ingredient.model';
import * as RecipeActions from './recipe.actions';

import * as fromApp from '../../store/app.reducers';

//extends fromApp.AppState now let RecipeState not only has recipes: State, but
//also has all properties from AppState as soon as this module get injected
export interface RecipeState extends fromApp.AppState{
	recipes: State;
}

export interface State {
    recipes: Recipe[];
}

const initialState: State = {
    recipes: [
        new Recipe(
            'pizza',
            'this is a simply test',
            'https://www.bbcgoodfood.com/sites/default/files/styles/recipe/public/recipe_images/recipe-image-legacy-id--51643_11.jpg?itok=I_hF8vFL',
            [
                new Ingredient('Meat',1),
                new Ingredient('French Fries',1)
            ]
        ),
        new Recipe(
            'hot dog',
            'this is a simply test',
            'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ6n-tv2EszDPtBJh7OpyX0npfHX0iyHe4kxVQoVDAcw-ZtUtCc5Q',
            [
                new Ingredient('Meat',3),
                new Ingredient('bread',1)
            ]
        )
    ]
};

export function recipeReducer(state = initialState, action: RecipeActions.RecipeActions) {
    switch(action.type) {
        case (RecipeActions.SET_RECIPES):
            return {
                ...state,
                recipes: [...action.payload]
            };
        case (RecipeActions.ADD_RECIPE):
            return {
                ...state,
                recipes: [...state.recipes, action.payload]
            };
        case (RecipeActions.UPDATE_RECIPE):
            const targetRecipe = state.recipes[action.payload.index];
            const updatedRecipe = {
                ...targetRecipe,
                ...action.payload.updatedRecipe
            };
            const origionalRecipes = [...state.recipes];
            origionalRecipes[action.payload.index] = updatedRecipe;
            return {
                ...state,
                recipes: origionalRecipes
            };
        case (RecipeActions.DELETE_RECIPE):
            const deleteRecipes = [...state.recipes];
            deleteRecipes.splice(action.payload, 1);
            return {
                ...state,
                recipes: deleteRecipes
            };
        default:
            return state;
    }
}
