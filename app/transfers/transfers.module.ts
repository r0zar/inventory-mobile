import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptCommonModule } from "nativescript-angular/common";
import { NativeScriptFormsModule } from "nativescript-angular/forms";
import { NativeScriptUIListViewModule } from "nativescript-pro-ui/listview/angular";

import { SharedModule } from "../shared/shared.module";
import { TransfersRoutingModule } from "./transfers-routing.module";
import { TransfersComponent } from "./transfers.component";
import { TransferService } from "./shared/transfer.service";

@NgModule({
    imports: [
        NativeScriptCommonModule,
        NativeScriptFormsModule,
        NativeScriptUIListViewModule,
        TransfersRoutingModule,
        SharedModule
    ],
    declarations: [
        TransfersComponent
    ],
    providers: [
        TransferService
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class TransfersModule { }
