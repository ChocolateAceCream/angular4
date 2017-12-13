import { NgModule } from '@angular/core';
import { DropdownDirective } from './dropdown.directive';
import { CommonModule } from '@angular/common';
@NgModule({
    //add all things we want to share here:
    declarations: [
        DropdownDirective
    ],

    //any directives/pipes/components  must be declared somewhere in your app once and only once. however,
    //since we want to import shared module into other module, we also have to
    //export it, since by default, usually anything declared inside module can only be accessable from that
    //module, not from outside.
    //
    //it's not necessary to import sth in order to export
    exports: [
        CommonModule,
        DropdownDirective

    ]

})
export class SharedModule {}
