import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptCommonModule } from "nativescript-angular/common";
import { NativeScriptUIListViewModule } from "nativescript-pro-ui/listview/angular";
import { NativeScriptUIDataFormModule } from "nativescript-pro-ui/dataform/angular";

import { SharedModule } from "../shared/shared.module";
import { BatchDetailEditComponent } from "./batch-detail-edit/batch-detail-edit-component";
import { BatchDetailCreateComponent } from "./batch-detail-create/batch-detail-create-component";
import { BatchDetailPackageComponent } from "./batch-detail-package/batch-detail-package.component";
import { BatchDetailGrowthPhaseComponent } from "./batch-detail-growthphase/batch-detail-growthphase.component";
import { MyImageAddRemoveComponent } from "./batch-detail-edit/my-image-add-remove/my-image-add-remove.component";
import { MyListSelectorModalViewComponent } from "./batch-detail-edit/my-list-selector/my-list-selector-modal-view.component"; // tslint:disable-line:max-line-length
import { MyListSelectorComponent } from "./batch-detail-edit/my-list-selector/my-list-selector.component";
import { BatchDetailComponent } from "./batch-detail/batch-detail.component";
import { BatchListComponent } from "./batch-list.component";
import { BatchesRoutingModule } from "./batches-routing.module";
import { BatchEditService } from "./shared/batch-edit.service";
import { BatchService } from "./shared/batch.service";

@NgModule({
    imports: [
        BatchesRoutingModule,
        NativeScriptCommonModule,
        NativeScriptUIListViewModule,
        NativeScriptUIDataFormModule,
        SharedModule
    ],
    declarations: [
        BatchListComponent,
        BatchDetailComponent,
        BatchDetailEditComponent,
        BatchDetailCreateComponent,
        BatchDetailPackageComponent,
        BatchDetailGrowthPhaseComponent,
        MyListSelectorComponent,
        MyListSelectorModalViewComponent,
        MyImageAddRemoveComponent
    ],
    entryComponents: [
        MyListSelectorModalViewComponent
    ],
    providers: [
        BatchService,
        BatchEditService
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class BatchesModule { }
