import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';
import { Subscription } from 'rxjs/Subscription';

@Component({
    selector: 'app-recipe-list',
    templateUrl: './recipe-list.component.html',
    styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit, OnDestroy {
    recipes: Recipe[];
    subscription: Subscription;

    constructor( private recipeService: RecipeService,
                private router: Router,
        //to use the relative route
                private route: ActivatedRoute) { }

    ngOnInit() {
        //listen to the recipeChanged event in recipeService, update this.recipe
        //with new recipe array received
        this.subscription = this.recipeService.recipeChanged
            .subscribe(
                (recipes: Recipe[]) => {
                    this.recipes = recipes;
                }
            );
        this.recipes = this.recipeService.getRecipes();
    }

    onNewRecipe() {
        //since we already in localhost/recipe, we use relative route to
        //navigate to localhost/recipe/new
        this.router.navigate(['new'], {relativeTo: this.route});
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }
}
