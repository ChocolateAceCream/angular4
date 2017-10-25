import { FormGroup, Validators, FormControl, FormArray } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { RecipeService } from '../recipe.service';

@Component({
    selector: 'app-recipe-edit',
    templateUrl: './recipe-edit.component.html',
    styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {
    id: number;
    editMode = false;
    recipeForm: FormGroup;
    constructor(private route: ActivatedRoute,
                private recipeService: RecipeService) { }
    ngOnInit() {
        //retrive the id
        this.route.params
            .subscribe(
                (params: Params) => {
                    //+ convert id string fetched from URL to number
                    this.id = +params['id'];
                    this.editMode = params['id'] != null;
                    //check if we are in editMode
                    //call the initForm method here so that whenever the route
                    //change(reload the page), we call it to re init form.
                    this.initForm();
                }
            );
    }

    onSubmit() {
        console.log(this.recipeForm);
    }

    onAddIngredient() {
        //we know ingredients is a formarray, but angular didin', so we need to
        //cast it explicaty, now so that we can push formcontrol to it. but
        //remeber we got two forcontrols, so we need create a new formGroup
        //first
        (<FormArray>this.recipeForm.get('ingredients')).push(
            new FormGroup({
                'name': new FormControl(null, Validators.required),
                'amount': new FormControl(null, [
                    Validators.required,
                    //this validators actually executed, because we
                    //need to pass the pattern to the factory to
                    //generate the validator, then pass the
                    //validator as a reference
                    Validators.pattern(/^[1-9]+[0-9]*$/)
                ])
            })
        );
    }

    //initializing form
    private initForm() {
        let recipeName = '';//use to store recipe name, use empty string as default
        let recipeImagePath = '';
        let recipeDescription = '';

        //import FormArray from angular form, and assign empty array as default
        let recipeIngredients = new FormArray([]);

        if (this.editMode) {
            //if in edit mode, we load the recipe name from recipe service with
            //the given ID
            const recipe = this.recipeService.getRecipe(this.id);
            recipeName = recipe.name;
            recipeImagePath = recipe.imagePath;
            recipeDescription = recipe.description;
            //if my recipe loaded has ingredients
            if (recipe['ingredients']) {
                for (let ingredient of recipe.ingredients) {
                    //push all ingredients into recipeIngredients FormArray
                    recipeIngredients.push(
                        new FormGroup({
                            //create new formgroup with defualt value of name
                            //and amount for the ingredient
                            'name': new FormControl(ingredient.name,Validators.required),
                            'amount': new FormControl(ingredient.amount,[
                                Validators.required,
                                //this validators actually executed, because we
                                //need to pass the pattern to the factory to
                                //generate the validator, then pass the
                                //validator as a reference
                                Validators.pattern(/^[1-9]+[0-9]*$/)
                            ])
                        })
                    );
                }
            }
        }

        //FormGroup take key-value pair JS object with controls we want to
        //register
        this.recipeForm = new FormGroup({
            'name': new FormControl(recipeName,Validators.required),
            'imagePath': new FormControl(recipeImagePath,Validators.required),
            'description': new FormControl(recipeDescription,Validators.required),
            'ingredients': recipeIngredients
        });
    }

}
