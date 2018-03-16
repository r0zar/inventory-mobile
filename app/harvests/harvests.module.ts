import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptCommonModule } from "nativescript-angular/common";
import { NativeScriptUIListViewModule } from "nativescript-pro-ui/listview/angular";
import { NativeScriptUIDataFormModule } from "nativescript-pro-ui/dataform/angular";

import { SharedModule } from "../shared/shared.module";
import { MyImageAddRemoveComponent } from "./harvest-detail-edit/my-image-add-remove/my-image-add-remove.component";
import { MyListSelectorModalViewComponent } from "./harvest-detail-edit/my-list-selector/my-list-selector-modal-view.component"; // tslint:disable-line:max-line-length
import { MyListSelectorComponent } from "./harvest-detail-edit/my-list-selector/my-list-selector.component";
import { HarvestDetailComponent } from "./harvest-detail/harvest-detail.component";
import { CreatePackageComponent } from "./createpackage/createpackage.component";
import { RemoveWasteComponent } from "./removewaste/removewaste.component";
import { HarvestListComponent } from "./harvest-list.component";
import { HarvestsRoutingModule } from "./harvests-routing.module";
import { HarvestEditService } from "./shared/harvest-edit.service";
import { HarvestService } from "./shared/harvest.service";

@NgModule({
    imports: [
        HarvestsRoutingModule,
        NativeScriptCommonModule,
        NativeScriptUIListViewModule,
        NativeScriptUIDataFormModule,
        SharedModule
    ],
    declarations: [
        HarvestListComponent,
        HarvestDetailComponent,
        CreatePackageComponent,
        RemoveWasteComponent,
        MyListSelectorComponent,
        MyListSelectorModalViewComponent,
        MyImageAddRemoveComponent
    ],
    entryComponents: [
        MyListSelectorModalViewComponent
    ],
    providers: [
        HarvestService,
        HarvestEditService
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class HarvestsModule { }
