import { NgModule } from '@angular/core';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';

import { SharedModule } from '../shared/shared.module';
import { AppRoutingModule } from '../app-routing.module';

import { AuthGuard } from '../auth/auth-guard.service';
import { AuthService } from '../auth/auth.service';
import { RecipeService } from '../recipes/recipe.service';
import { DataStorageService } from '../shared/data-storage.service';
//import { ShoppingListService} from '../shopping-list/shopping-list.service';

import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from '../shared/auth.interceptor';
import { LoggingInterceptor } from '../shared/logging.interceptor';
@NgModule({
    declarations: [
        HeaderComponent,
        HomeComponent
    ],

    imports: [
        SharedModule,//for dropdown used in header
        AppRoutingModule,//for links functionality in header
    ],

    exports: [
        AppRoutingModule, //we need it in our main module, since we always need the root route for the app module and we have router-outlets in app.component.html, so we need to export AppRoutingModule
        HeaderComponent //since we used a selector of HeaderComponent in app.component.html(app-header tag)
    ],
    providers: [
        AuthService,
        //ShoppingListService,
        RecipeService,
        AuthGuard,
        //since we only use AuthGuard in recipe module, we can move it to
        //recipes-routing module, where we use it. also, there's nothing worng
        //to provice the authGuard service here, application wise.
        DataStorageService,
        //this tell angular what we provide here is HTTP_INTERCEPTORS, so
        //angular will send every outgoing request to this pipe line
        //also, we need to tell angular which interceptor we want to use, but
        //append userClass and import AuthInterceptor.

        //the order you set up here for the multiple interceptors, is actually
        //the order your request will travel through
        {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true},
        //if you want to register multi interceptor, just duplicate the provide JS obejct:
        {provide: HTTP_INTERCEPTORS, useClass: LoggingInterceptor, multi: true}
        //{provide: HTTP_INTERCEPTORS, userClass: AuthInterceptor, multi: true},
        //{provide: HTTP_INTERCEPTORS, userClass: AuthInterceptor, multi: true},
    ],

})
export class CoreModule {}
