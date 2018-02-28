import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptCommonModule } from "nativescript-angular/common";

import { SharedModule } from "../shared/shared.module";
import { TransfersRoutingModule } from "./transfers-routing.module";
import { TransfersComponent } from "./transfers.component";

@NgModule({
    imports: [
        NativeScriptCommonModule,
        TransfersRoutingModule,
        SharedModule
    ],
    declarations: [
        TransfersComponent
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class TransfersModule { }
