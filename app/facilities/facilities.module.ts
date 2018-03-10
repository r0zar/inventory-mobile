import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptCommonModule } from "nativescript-angular/common";
import { NativeScriptFormsModule } from "nativescript-angular/forms";
import { NativeScriptUIListViewModule } from "nativescript-pro-ui/listview/angular";
import { NativeScriptUIDataFormModule } from "nativescript-pro-ui/dataform/angular";
import { HttpClientModule } from '@angular/common/http';

import { SharedModule } from "../shared/shared.module";
import { FacilityDetailEditComponent } from "./facility-detail-edit/facility-detail-edit-component";
import { MyImageAddRemoveComponent } from "./facility-detail-edit/my-image-add-remove/my-image-add-remove.component";
import { MyListSelectorModalViewComponent } from "./facility-detail-edit/my-list-selector/my-list-selector-modal-view.component"; // tslint:disable-line:max-line-length
import { MyListSelectorComponent } from "./facility-detail-edit/my-list-selector/my-list-selector.component";
import { FacilityDetailComponent } from "./facility-detail/facility-detail.component";
import { FacilityListComponent } from "./facility-list.component";
import { FacilitiesRoutingModule } from "./facilities-routing.module";
import { FacilityEditService } from "./shared/facility-edit.service";
import { FacilityService } from "./shared/facility.service";
import { MetrcService } from "../shared/metrc.service";

@NgModule({
    imports: [
        HttpClientModule,
        FacilitiesRoutingModule,
        NativeScriptCommonModule,
        NativeScriptFormsModule,
        NativeScriptUIListViewModule,
        NativeScriptUIDataFormModule,
        SharedModule
    ],
    declarations: [
        FacilityListComponent,
        FacilityDetailComponent,
        FacilityDetailEditComponent,
        MyListSelectorComponent,
        MyListSelectorModalViewComponent,
        MyImageAddRemoveComponent
    ],
    entryComponents: [
        MyListSelectorModalViewComponent
    ],
    providers: [
        FacilityService,
        FacilityEditService,
        MetrcService,
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class FacilitiesModule { }
