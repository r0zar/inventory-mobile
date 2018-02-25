import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptCommonModule } from "nativescript-angular/common";

import { SharedModule } from "../shared/shared.module";
import { PackagesRoutingModule } from "./packages-routing.module";
import { PackagesComponent } from "./packages.component";

@NgModule({
    imports: [
        NativeScriptCommonModule,
        PackagesRoutingModule,
        SharedModule
    ],
    declarations: [
        PackagesComponent
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class PackagesModule { }
