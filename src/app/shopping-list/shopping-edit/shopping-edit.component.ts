import {
    ViewChild,
    Component,
    OnInit,
    OnDestroy
} from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs/Subscription';

import { Ingredient } from '../../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';

@Component({
    selector: 'app-shopping-edit',
    templateUrl: './shopping-edit.component.html',
    styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
    //viewchild takes a class type or a refence name string
    @ViewChild('f') shoppingListForm: NgForm;
    subscription: Subscription;
    editedItem: Ingredient; //store the item we want to edit
    editMode = false;  //used to decide if we create a new record or edit the existing one
    editedItemIndex: number;
    constructor(private shoppingListService: ShoppingListService) { }

    ngOnInit() {
        this.subscription = this.shoppingListService.startedEditting
            .subscribe(
                (index: number) => {
                    this.editMode = true;
                    this.editedItemIndex = index;
                    this.editedItem = this.shoppingListService.getIngredient(index);
                    this.shoppingListForm.setValue({
                        name: this.editedItem.name,
                        amount: this.editedItem.amount
                    });

                }
            );
    }

    onSubmit(form: NgForm) {
        const value = form.value;
        //value.amount, where amount is the name of the input tag.
        const newIngredient = new Ingredient(value.name, value.amount);
        if (this.editMode) {
           this.shoppingListService.updateIngredient(this.editedItemIndex, newIngredient);
        } else {
            this.shoppingListService.addIngredient(newIngredient);
        }
        //leave the editMode
        this.editMode = false;
        //reset form
        form.reset();
    }

    onClear() {
        //since we already used viewChild, we can access to the form directly
        this.shoppingListForm.reset();
        //ensure we leave the editMode
        this.editMode = false;
    }

    onDelete() {
        this.shoppingListService.deleteIngredient(this.editedItemIndex);
        this.onClear();//clear the form after we done deletion
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }

}
