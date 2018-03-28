import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptCommonModule } from "nativescript-angular/common";
import { NativeScriptUIListViewModule } from "nativescript-pro-ui/listview/angular";
import { NativeScriptUIDataFormModule } from "nativescript-pro-ui/dataform/angular";

import { SharedModule } from "../shared/shared.module";
import { HarvestDetailComponent } from "./harvest-detail/harvest-detail.component";
import { CreatePackageComponent } from "./createpackage/createpackage.component";
import { RemoveWasteComponent } from "./removewaste/removewaste.component";
import { HarvestListComponent } from "./harvest-list.component";
import { HarvestsRoutingModule } from "./harvests-routing.module";

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
    ],
    entryComponents: [
    ],
    providers: [
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class HarvestsModule { }
