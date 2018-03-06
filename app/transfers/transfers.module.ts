import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptCommonModule } from "nativescript-angular/common";
import { NativeScriptFormsModule } from "nativescript-angular/forms";
import { NativeScriptUIListViewModule } from "nativescript-pro-ui/listview/angular";

import { SharedModule } from "../shared/shared.module";
import { TransferDetailEditComponent } from "./transfer-detail-edit/transfer-detail-edit-component";
import { MyImageAddRemoveComponent } from "./transfer-detail-edit/my-image-add-remove/my-image-add-remove.component";
import { MyListSelectorModalViewComponent } from "./transfer-detail-edit/my-list-selector/my-list-selector-modal-view.component"; // tslint:disable-line:max-line-length
import { MyListSelectorComponent } from "./transfer-detail-edit/my-list-selector/my-list-selector.component";
import { TransferDetailComponent } from "./transfer-detail/transfer-detail.component";
import { TransferListComponent } from "./transfer-list.component";
import { TransfersRoutingModule } from "./transfers-routing.module";
import { TransferEditService } from "./shared/transfer-edit.service";
import { TransferService } from "./shared/transfer.service";

@NgModule({
    imports: [
        TransfersRoutingModule,
        NativeScriptCommonModule,
        NativeScriptFormsModule,
        NativeScriptUIListViewModule,
        SharedModule
    ],
    declarations: [
        TransferListComponent,
        TransferDetailComponent,
        TransferDetailEditComponent,
        MyListSelectorComponent,
        MyListSelectorModalViewComponent,
        MyImageAddRemoveComponent
    ],
    entryComponents: [
        MyListSelectorModalViewComponent
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
