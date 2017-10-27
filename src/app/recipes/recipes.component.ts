import { Component, OnInit } from '@angular/core';
//since we want to use the recipe service application wise, we need to import it
//from the app.module.ts, not here. If we import from here, when we leave the
//recipe component, we will lose the data input. since we actually editting the
//instance of recipe service, and when the recipe component got destroied, so does the recipe service.
//
//import { RecipeService } from './recipe.service';
@Component({
    selector: 'app-recipes',
    templateUrl: './recipes.component.html',
    styleUrls: ['./recipes.component.css']
    //  providers: [RecipeService]
})
export class RecipesComponent implements OnInit {

    constructor() { }

    ngOnInit() {
    }

}
