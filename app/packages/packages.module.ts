import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptCommonModule } from "nativescript-angular/common";
import { NativeScriptUIListViewModule } from "nativescript-pro-ui/listview/angular";
import { NativeScriptUIDataFormModule } from "nativescript-pro-ui/dataform/angular";

import { SharedModule } from "../shared/shared.module";
import { PackageDetailComponent } from "./package-detail/package-detail.component";
import { PackageListComponent } from "./package-list.component";
import { PackagesRoutingModule } from "./packages-routing.module";
import { PackageEditService } from "./shared/package-edit.service";
import { PackageService } from "./shared/package.service";

@NgModule({
    imports: [
        PackagesRoutingModule,
        NativeScriptCommonModule,
        NativeScriptUIListViewModule,
        NativeScriptUIDataFormModule,
        SharedModule
    ],
    declarations: [
        PackageListComponent,
        PackageDetailComponent
    ],
    entryComponents: [
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
