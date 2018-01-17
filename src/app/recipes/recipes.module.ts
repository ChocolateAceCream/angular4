import { NgModule } from '@angular/core';
//used in recipeDetail
import { RecipesComponent } from './recipes.component';
import { RecipeStartComponent } from './recipe-start/recipe-start.component';
import { RecipeEditComponent } from './recipe-edit/recipe-edit.component';
import { RecipeListComponent } from './recipe-list/recipe-list.component';
import { RecipeDetailComponent } from './recipe-detail/recipe-detail.component';
import { RecipeItemComponent } from './recipe-list/recipe-item/recipe-item.component';
//we moved ReactiveFormsModule here since we only use it inside recipes module
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RecipesRoutingModule } from './recipes-routing.module';
import { SharedModule } from '../shared/shared.module';
import { StoreModule } from '@ngrx/store';
import { recipeReducer } from './store/recipe.reducers';
import { EffectsModule } from '@ngrx/effects';
import { RecipeEffects } from './store/recipe.effects';
@NgModule({
    declarations: [
        RecipesComponent,
        RecipeListComponent,
        RecipeDetailComponent,
        RecipeItemComponent,
        RecipeStartComponent,
        RecipeEditComponent
    ],
    imports: [
        //since RecipeService will also be used by shooping list component, we
        //dont need to move it here.  1 2
        ReactiveFormsModule,
        //commonModule give us access to the common directives such as NgClass
        //etc..
        CommonModule,
        SharedModule,
        RecipesRoutingModule,
        //recipes is the name of our feature, then we add our reducers
        //now this feature(state) will be dynamicly add to app.module whenever
        //recipe.module get loaded.
		StoreModule.forFeature('recipes',recipeReducer),
        EffectsModule.forFeature([RecipeEffects]),
    ]
})
export class RecipesModule {}
