import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { NgModule } from '@angular/core';
import { DataStorageService } from './shared/data-storage.service';

import { AppComponent } from './app.component';
import { ShoppingListService} from './shopping-list/shopping-list.service';
import { AppRoutingModule } from './app-routing.module';

import { RecipeService } from './recipes/recipe.service';
import { AuthService } from './auth/auth.service';
import { AuthGuard } from './auth/auth-guard.service';
import { RecipesModule } from './recipes/recipes.module';
import { SharedModule } from './shared/shared.module';
import { ShoppingListModule } from './shopping-list/shopping-list.module';
import { AuthModule } from './auth/auth.module';
import { CoreModule } from './core/core.module';

@NgModule({
    declarations: [
        AppComponent,
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        HttpModule,
        SharedModule,
        ShoppingListModule,
        AuthModule,
        RecipesModule,
        CoreModule
    ],
    providers: [AuthService,ShoppingListService, RecipeService, DataStorageService, AuthGuard],
    bootstrap: [AppComponent]
})
export class AppModule { }
