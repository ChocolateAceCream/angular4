import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './core/home/home.component';
import { AuthGuard } from './auth/auth-guard.service';

//the import here is a type script language feature, which let typescript to
//locate this component. since it's only a typescript thing and
//shoppingListComponent has been declarared in shoppinglist component, but here
//in app-touting module, we dont have direct connection
//
//for routing, it's not important to declare the component in the same file
//where your routes live, it's just important to declare it anywhere in the app,
//before that route get rendered.
//
//it's different thing for selectors. there has to be a connectio between
//declaratoin file and the file using selectors, even from some undirect link,
//such as shared module, which export the selectors.
import { ShoppingListComponent } from './shopping-list/shopping-list.component';

const appRoutes: Routes = [
    //only redirect if the full path matched ''
    { path: '', component: HomeComponent},
    //implement lazy loading with loadChildren, which take a string as input,
    //the string indicate the module path and the class exported from the module
    { path: 'recipes', loadChildren: './recipes/recipes.module#RecipesModule',canLoad: [AuthGuard]},
    { path: 'shopping-list', component: ShoppingListComponent }
];

//transcript the normal typescript class inro module
@NgModule({
    imports: [RouterModule.forRoot(appRoutes)],
    //add our routes to angular router. remember to import RouterModule from
    //angular router
    exports: [RouterModule]
    //export our module to the main app module
})
export class AppRoutingModule {

}
