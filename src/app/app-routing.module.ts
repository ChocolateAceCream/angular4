import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RecipesComponent } from './recipes/recipes.component';
import { ShoppingListComponent } from './shopping-list/shopping-list.component';
import { RecipeStartComponent } from './recipes/recipe-start/recipe-start.component';
import { RecipeDetailComponent } from './recipes/recipe-detail/recipe-detail.component';
import { RecipeEditComponent } from './recipes/recipe-edit/recipe-edit.component';

import { SignupComponent } from './auth/signup/signup.component';

const appRoutes: Routes = [
    //only redirect if the full path matched ''
    { path: '', redirectTo: '/recipes', pathMatch: 'full' },
    { path: 'recipes', component: RecipesComponent, children: [
        { path: '', component: RecipeStartComponent}, //load recipes/
        //since  the :id is before new, when URL is localhost/recipe/new,
        //angular will resolve 'new' as :id params...then error happened
        //solution is reverse new and :id
        { path: 'new', component: RecipeEditComponent },
        { path: ':id', component: RecipeDetailComponent },
        //will determine whether we want to edit or add component inside edit
        //component
        { path: ':id/edit', component: RecipeEditComponent }
    ] },
    { path: 'shopping-list', component: ShoppingListComponent },
    { path: 'signup', component: SignupComponent }
];

//transcript the normal typescript class inro module
@NgModule({
    imports: [RouterModule.forRoot(appRoutes)],
    //add our routes to angular router. remember to import RouterModule from
    //angular router
    exports: [RouterModule]
    //export our module to the main app module
})
export class AppRoutingModule {

}
