import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptModule } from "nativescript-angular/nativescript.module";

import { SignupRoutingModule } from "./signup-routing.module";
import { SignupComponent } from "./signup.component";

@NgModule({
    imports: [
        NativeScriptModule,
        SignupRoutingModule
    ],
    declarations: [
        SignupComponent
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class SignupModule { }
