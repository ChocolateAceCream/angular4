import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';

@Component({
    selector: 'app-recipe-detail',
    templateUrl: './recipe-detail.component.html',
    styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {
    recipe: Recipe;
    id: number;
    constructor( private recipeService: RecipeService,
        private route: ActivatedRoute,
        private router: Router) {
    }

    ngOnInit() {
        //since we need to change id from inside the page, this approach is not
        //const id = this.route.snapshot.params['id'];
        //use subscribe approach:
        this.route.params
            .subscribe(
                (params: Params) => {
                    this.id = +params['id'];//+ convert string to number
                    this.recipe = this.recipeService.getRecipe(this.id);
                }
            )
        //remember if we use our own observable, we need to manully cleanup
        //after destroy the component.
    }
    onAddToShoppingList() {
        //suit
        this.recipeService.addIngredientsToShoppingList(this.recipe.ingredients);
    }
    onEditRecipe(){
        this.router.navigate(['edit'], {relativeTo: this.route});
        //a more complex way of navigate is :
        //this.router.navigate(['../',this.id,'edit'], {relativeTo: this.route})
    }
}
