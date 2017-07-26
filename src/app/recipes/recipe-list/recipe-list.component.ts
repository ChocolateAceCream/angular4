import { Component, Output, EventEmitter, OnInit } from '@angular/core';
import { Recipe } from '../recipe.model';

@Component({
    selector: 'app-recipe-list',
    templateUrl: './recipe-list.component.html',
    styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {

    @Output() recipeWasSelected = new EventEmitter<Recipe>();

    recipes: Recipe[] = [
        new Recipe('test recipe', 'this is a simply test', 'https://www.bbcgoodfood.com/sites/default/files/styles/recipe/public/recipe_images/recipe-image-legacy-id--51643_11.jpg?itok=I_hF8vFL')
    ];

    constructor() { }

    ngOnInit() {
    }

    onRecipeSelected(recipe: Recipe) {
        this.recipeWasSelected.emit(recipe);

    }

}
