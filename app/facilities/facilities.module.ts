import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptCommonModule } from "nativescript-angular/common";
import { NativeScriptUIListViewModule } from "nativescript-pro-ui/listview/angular";
import { NativeScriptUIDataFormModule } from "nativescript-pro-ui/dataform/angular";

import { SharedModule } from "../shared/shared.module";
import { FacilityDetailComponent } from "./facility-detail/facility-detail.component";
import { FacilityListComponent } from "./facility-list.component";
import { FacilitiesRoutingModule } from "./facilities-routing.module";
import { FacilityService } from "./shared/facility.service";

@NgModule({
    imports: [
        FacilitiesRoutingModule,
        NativeScriptCommonModule,
        NativeScriptUIListViewModule,
        NativeScriptUIDataFormModule,
        SharedModule
    ],
    declarations: [
        FacilityListComponent,
        FacilityDetailComponent,
    ],
    entryComponents: [
    ],
    providers: [
        FacilityService
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class FacilitiesModule { }
