import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptCommonModule } from "nativescript-angular/common";
import { NativeScriptUIListViewModule } from "nativescript-pro-ui/listview/angular";
import { NativeScriptUIDataFormModule } from "nativescript-pro-ui/dataform/angular";
import { SharedModule } from "../shared/shared.module";
import { PackagesRoutingModule } from "./packages-routing.module";

import { PackageListComponent } from "./package-list.component";
import { PackageDetailComponent } from "./package-detail/package-detail.component";
import { AdjustComponent } from "./adjust/adjust.component";
import { ChangeItemComponent } from "./changeitem/changeitem.component";
import { CreateComponent } from "./create/create.component";
import { CreatePlantingsComponent } from "./createplantings/createplantings.component";
import { CreateTestingComponent } from "./createtesting/createtesting.component";
import { RemediateComponent } from "./remediate/remediate.component";

import { PackageEditService } from "./shared/package-edit.service";
import { PackageService } from "./shared/package.service";
import { Data } from "../shared/data.service";
import { BarcodeScanner } from 'nativescript-barcodescanner';

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
        PackageDetailComponent,
        AdjustComponent,
        ChangeItemComponent,
        CreateComponent,
        CreatePlantingsComponent,
        CreateTestingComponent,
        RemediateComponent
    ],
    entryComponents: [
    ],
    providers: [
        PackageService,
        PackageEditService,
        Data,
        BarcodeScanner
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class PackagesModule { }
