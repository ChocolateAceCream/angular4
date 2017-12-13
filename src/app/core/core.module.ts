import { NgModule } from '@angular/core';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';

import { SharedModule } from '../shared/shared.module';
import { AppRoutingModule } from '../app-routing.module';
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
    ]

})
export class CoreModule {}
