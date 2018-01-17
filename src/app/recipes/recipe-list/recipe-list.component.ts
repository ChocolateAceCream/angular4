import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import * as fromRecipe from '../store/recipe.reducers';
import { Observable } from 'rxjs/Observable';

@Component({
    selector: 'app-recipe-list',
    templateUrl: './recipe-list.component.html',
    styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {
    //
    recipeState: Observable<fromRecipe.State>;

    constructor(
                private router: Router,
        //to use the relative route
                private route: ActivatedRoute,
                private store: Store<fromRecipe.RecipeState>
    ) { }

    ngOnInit() {
            /*
        //listen to the recipeChanged event in recipeService, update this.recipe
        //with new recipe array received
        this.subscription = this.recipeService.recipeChanged
            .subscribe(
                (recipes: Recipe[]) => {
                    this.recipes = recipes;
                }
            );
        this.recipes = this.recipeService.getRecipes();
            */

        //'recipes' is the name we used inside recipes.module, import array,
        //forFeature operator
        //StoreModule.forFeature('recipes',recipeReducer)
        this.recipeState = this.store.select('recipes');
    }

    onNewRecipe() {
        //since we already in localhost/recipe, we use relative route to
        //navigate to localhost/recipe/new
        this.router.navigate(['new'], {relativeTo: this.route});
    }
}
