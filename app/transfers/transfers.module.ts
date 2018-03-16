import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptCommonModule } from "nativescript-angular/common";
import { NativeScriptUIListViewModule } from "nativescript-pro-ui/listview/angular";
import { NativeScriptUIDataFormModule } from "nativescript-pro-ui/dataform/angular";

import { SharedModule } from "../shared/shared.module";
import { TransferDetailComponent } from "./transfer-detail/transfer-detail.component";
import { TransferListComponent } from "./transfer-list.component";
import { TransfersRoutingModule } from "./transfers-routing.module";
import { TransferEditService } from "./shared/transfer-edit.service";
import { TransferService } from "./shared/transfer.service";

@NgModule({
    imports: [
        TransfersRoutingModule,
        NativeScriptCommonModule,
        NativeScriptUIListViewModule,
        NativeScriptUIDataFormModule,
        SharedModule
    ],
    declarations: [
        TransferListComponent,
        TransferDetailComponent,
    ],
    entryComponents: [
    ],
    providers: [
        TransferService,
        TransferEditService
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class TransfersModule { }
