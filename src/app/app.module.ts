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
import { reducers } from './store/app.reducers';
import { EffectsModule } from '@ngrx/effects';
import { AuthEffects } from './auth/store/auth.effects';
import { StoreRouterConnectingModule } from '@ngrx/router-store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';

@NgModule({
    declarations: [
        AppComponent,
    ],
    imports: [
        //adding .withServerTransition() to support Universal rendering, let
        //angular know we first rendering the app in server, then shipped to
        //browser by withServerTransition and appId was used internally to
        //manager different versions of app.
        BrowserModule.withServerTransition({appId: 'my-app'}),
        HttpClientModule,
        AppRoutingModule,
        SharedModule,
        ShoppingListModule,
        AuthModule,
        RecipesModule,
        //forRoot only works for eagerly loaded module, not for lazy load module
        //angular will set up a store and register a global state shoppingList
        StoreModule.forRoot(reducers),
        CoreModule,

        //pass an array of effects which we want to use
        //now we hook up our module and NgRx was able to analyze our store,
        //inject actions into effect class in the array
        EffectsModule.forRoot([AuthEffects]),
        StoreRouterConnectingModule,

        //StoreDevtoolsModule has to be placed after StoreModule, and only used
        //if app is not in environment mode, otherwise pass an empty array
        !environment.production ? StoreDevtoolsModule.instrument() : []
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
