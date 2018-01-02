import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';

import { RecipesModule } from './recipes/recipes.module';
import { SharedModule } from './shared/shared.module';
import { ShoppingListModule } from './shopping-list/shopping-list.module';
import { AuthModule } from './auth/auth.module';
import { CoreModule } from './core/core.module';
import { StoreModule } from '@ngrx/store';
import { shoppingListReducer } from './shopping-list/store/shopping-list.reducers';

@NgModule({
    declarations: [
        AppComponent,
    ],
    imports: [
        BrowserModule,
        HttpClientModule,
        AppRoutingModule,
        SharedModule,
        ShoppingListModule,
        AuthModule,
        RecipesModule,
        //forRoot only works for eagerly loaded module, not for lazy load module
        //angular will set up a store and register a global state shoppingList
        StoreModule.forRoot({shoppingList: shoppingListReducer}),
        CoreModule
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
