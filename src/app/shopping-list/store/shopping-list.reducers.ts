import { Ingredient } from '../../shared/ingredient.model';

//import * as will bundle all export from that file into one JS object
//ShoppingListAction
import * as ShoppingListActions from './shopping-list.actions';

export interface AppState{
    //the overall AppState made up from several pieces
    shoppingList: State
}

//create a initial state since first time running application there won't be any
//current state
export interface State {
    ingredients: Ingredient[];
    editedIngredient: Ingredient;
    editedIngredientIndex: number;
}

//move the initial state from SlService into store, then app will load the
//correct initial state.
const initialState: State = {
    ingredients: [
        new Ingredient('Apple', 5),
        new Ingredient('Tomatoes', 10),
    ],
    editedIngredient: null,
    editedIngredientIndex: -1
};

//this function will receive two arguments, and arguments will be automatically
//passed into the function by NgRx, this reducer function will be triggered
//whenever the action was dispatched.
//first argument is the state, which refer to the current state of application
//second argument is action type of Action, which dispatched
export function shoppingListReducer(state = initialState, action: ShoppingListActions.SlActions) {
    //we need to set up amd return a new state here
    //e.g. you can simply return the current state:    return state;
    //usually we use a switch to see what kind of dispatched action take
    //place.(there might be multiple actions dispatched)
    //the value of action.type can be set when dispatch action, usually use a
    //string to describe an action, usually store in a const and will be export
    //for other files to use
    switch (action.type) {
        case ShoppingListActions.ADD_INGREDIENT:
            return {
                //here we use spread operator ... to copy and return a new
                //instance of our state object received, since the old state is
                //immutable.
                ...state,

                //add a new ingredient to the current ingredient array(fetched
                //from current state)
                //however, Action by defauly is payload less, to get the new
                //ingredient info from the action, we have to define our own
                //clearly type actions, which contained a payload property.
                ingredients: [...state.ingredients, action.payload]
            };
        case ShoppingListActions.ADD_INGREDIENTS:
            return {
                ...state,
                //since now payload is not a single ingredient element, we need
                //to use spread operator to spread the payload into serveral
                //single elements
                ingredients: [...state.ingredients, ...action.payload]
                //then we need to dispatch this action in recipe.service
            };
        case ShoppingListActions.UPDATE_INGREDIENT:
            //find the target ingredient which will be updated
            const ingredient = state.ingredients[state.editedIngredientIndex];

            const updatedIngredient = {
                //update old ingredient in a immutable way
                ...ingredient,//spread all properties of old ingredient
                //then override certain part from new ingredient
                ...action.payload.ingredient
                /*you can use ... to override immutable object, by create a new
                 * one, first spread the old object then spread the new object
                 * which contained partially updated property*/
            };
            const updatedIngredients = [...state.ingredients];
            updatedIngredients[state.editedIngredientIndex] = updatedIngredient;
            return {
                ...state,
                ingredients: updatedIngredients,
                editedIngredient: null,
                editedIngredientIndex: -1
            };

        case ShoppingListActions.DELETE_INGREDIENT:
            const afterDeletedIngredients = [...state.ingredients];
            afterDeletedIngredients.splice(state.editedIngredientIndex,1);
            return {
                ...state,
                ingredients: afterDeletedIngredients,
                editedIngredient: null,
                editedIngredientIndex: -1

            };

        case ShoppingListActions.START_EDIT:
            //since we want to edit in a immutable way, use ... operator
            const targetIngredient = {...state.ingredients[action.payload]};
            return {
                ...state,
                editedIngredient: targetIngredient,
                editedIngredientIndex: action.payload
            };
        case ShoppingListActions.STOP_EDIT:
            return {
                ...state,
                editedIngredient: null,
                editedIngredientIndex: -1
            };

        default:
            return state;
    }
}
