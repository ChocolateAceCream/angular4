import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';

@Component({
    selector: 'app-recipe-list',
    templateUrl: './recipe-list.component.html',
    styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {
    recipes: Recipe[];

    constructor( private recipeService: RecipeService,
                private router: Router,
        //to use the relative route
                private route: ActivatedRoute) { }

    ngOnInit() {
        //listen to the recipeChanged event in recipeService, update this.recipe
        //with new recipe array received
        this.recipeService.recipeChanged
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
}
