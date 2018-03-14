import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptCommonModule } from "nativescript-angular/common";
import { NativeScriptUIListViewModule } from "nativescript-pro-ui/listview/angular";
import { NativeScriptUIDataFormModule } from "nativescript-pro-ui/dataform/angular";

import { SharedModule } from "../shared/shared.module";
import { StrainDetailEditComponent } from "./strain-detail-edit/strain-detail-edit-component";
import { MyImageAddRemoveComponent } from "./strain-detail-edit/my-image-add-remove/my-image-add-remove.component";
import { MyListSelectorModalViewComponent } from "./strain-detail-edit/my-list-selector/my-list-selector-modal-view.component"; // tslint:disable-line:max-line-length
import { MyListSelectorComponent } from "./strain-detail-edit/my-list-selector/my-list-selector.component";
import { StrainDetailComponent } from "./strain-detail/strain-detail.component";
import { StrainListComponent } from "./strain-list.component";
import { StrainsRoutingModule } from "./strains-routing.module";
import { StrainEditService } from "./shared/strain-edit.service";
import { StrainService } from "./shared/strain.service";

@NgModule({
    imports: [
        StrainsRoutingModule,
        NativeScriptCommonModule,
        NativeScriptUIListViewModule,
        NativeScriptUIDataFormModule,
        SharedModule
    ],
    declarations: [
        StrainListComponent,
        StrainDetailComponent,
        StrainDetailEditComponent,
        MyListSelectorComponent,
        MyListSelectorModalViewComponent,
        MyImageAddRemoveComponent
    ],
    entryComponents: [
        MyListSelectorModalViewComponent
    ],
    providers: [
        StrainService,
        StrainEditService
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class StrainsModule { }
