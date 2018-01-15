//this module to be imported to recipe.modules.ts
//

import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { RecipeDetailComponent } from './recipe-detail/recipe-detail.component';
import { RecipesComponent } from './recipes.component';
import { RecipeStartComponent } from './recipe-start/recipe-start.component';
import { RecipeEditComponent } from './recipe-edit/recipe-edit.component';

import { AuthGuard } from '../auth/auth-guard.service';

const recipesRoutes: Routes = [
    //   since recipes are set up as lazy loading in app-routing,
    //   { path: 'recipes', component: RecipesComponent, children: [
        { path: '', component: RecipesComponent, children: [
        { path: '', component: RecipeStartComponent}, //load recipes/
        //since  the :id is before new, when URL is localhost/recipe/new,
        //angular will resolve 'new' as :id params...then error happened
        //solution is reverse new and :id
        { path: 'new', component: RecipeEditComponent, canActivate: [AuthGuard] },
        { path: ':id', component: RecipeDetailComponent },
        //will determine whether we want to edit or add component inside edit
        //component
        { path: ':id/edit', component: RecipeEditComponent,canActivate: [AuthGuard] }
    ] },
];

@NgModule({
    imports: [
        RouterModule.forChild(recipesRoutes)
    ],
    //also need exports the RouterModule which have our recipes Routers
    //registered,
    exports: [RouterModule],
    providers: [
        AuthGuard
    ]
})
export class RecipesRoutingModule {}
