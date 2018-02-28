import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptCommonModule } from "nativescript-angular/common";
import { NativeScriptFormsModule } from "nativescript-angular/forms";
import { NativeScriptUIListViewModule } from "nativescript-pro-ui/listview/angular";

import { SharedModule } from "../shared/shared.module";
import { PackageDetailEditComponent } from "./package-detail-edit/package-detail-edit-component";
import { MyImageAddRemoveComponent } from "./package-detail-edit/my-image-add-remove/my-image-add-remove.component";
import { MyListSelectorModalViewComponent } from "./package-detail-edit/my-list-selector/my-list-selector-modal-view.component"; // tslint:disable-line:max-line-length
import { MyListSelectorComponent } from "./package-detail-edit/my-list-selector/my-list-selector.component";
import { PackageDetailComponent } from "./package-detail/package-detail.component";
import { PackageListComponent } from "./package-list.component";
import { PackagesRoutingModule } from "./packages-routing.module";
import { PackageEditService } from "./shared/package-edit.service";
import { PackageService } from "./shared/package.service";

@NgModule({
    imports: [
        PackagesRoutingModule,
        NativeScriptCommonModule,
        NativeScriptFormsModule,
        NativeScriptUIListViewModule,
        SharedModule
    ],
    declarations: [
        PackageListComponent,
        PackageDetailComponent,
        PackageDetailEditComponent,
        MyListSelectorComponent,
        MyListSelectorModalViewComponent,
        MyImageAddRemoveComponent
    ],
    entryComponents: [
        MyListSelectorModalViewComponent
    ],
    providers: [
        PackageService,
        PackageEditService
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class PackagesModule { }
