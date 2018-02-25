import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptCommonModule } from "nativescript-angular/common";

import { SharedModule } from "../shared/shared.module";
import { PlantsRoutingModule } from "./plants-routing.module";
import { PlantsComponent } from "./plants.component";

@NgModule({
    imports: [
        NativeScriptCommonModule,
        PlantsRoutingModule,
        SharedModule
    ],
    declarations: [
        PlantsComponent
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class PlantsModule { }
