import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptCommonModule } from "nativescript-angular/common";

import { SharedModule } from "../shared/shared.module";
import { FacilitiesRoutingModule } from "./facilities-routing.module";
import { FacilitiesComponent } from "./facilities.component";

@NgModule({
    imports: [
        NativeScriptCommonModule,
        FacilitiesRoutingModule,
        SharedModule
    ],
    declarations: [
        FacilitiesComponent
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class FacilitiesModule { }
