import { NgModule } from '@angular/core';

import { AuthRoutingModule } from './auth-routing.module';
import { FormsModule } from '@angular/forms';
import { SignupComponent } from './signup/signup.component';
import { SigninComponent } from './signin/signin.component';
@NgModule({
    declarations: [
        SignupComponent,
        SigninComponent
    ],
    imports: [
        AuthRoutingModule,
        FormsModule
    ]
})
export class AuthModule {}
