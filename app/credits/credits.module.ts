import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptCommonModule } from "nativescript-angular/common";

import { SharedModule } from "../shared/shared.module";
import { CreditsRoutingModule } from "./credits-routing.module";
import { CreditsComponent } from "./credits.component";

@NgModule({
    imports: [
        NativeScriptCommonModule,
        CreditsRoutingModule,
        SharedModule
    ],
    declarations: [
        CreditsComponent
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class CreditsModule { }
