import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptCommonModule } from "nativescript-angular/common";
import { NativeScriptFormsModule } from "nativescript-angular/forms";
import { NativeScriptUIListViewModule } from "nativescript-pro-ui/listview/angular";

import { SharedModule } from "../shared/shared.module";
import { PackagesRoutingModule } from "./packages-routing.module";
import { PackagesComponent } from "./packages.component";
import { PackageService } from "./shared/package.service";

@NgModule({
    imports: [
        NativeScriptCommonModule,
        NativeScriptFormsModule,
        NativeScriptUIListViewModule,
        PackagesRoutingModule,
        SharedModule
    ],
    declarations: [
        PackagesComponent
    ],
    providers: [
        PackageService
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class PackagesModule { }
