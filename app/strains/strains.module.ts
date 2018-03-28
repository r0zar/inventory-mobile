import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptCommonModule } from "nativescript-angular/common";
import { NativeScriptUIListViewModule } from "nativescript-pro-ui/listview/angular";
import { NativeScriptUIDataFormModule } from "nativescript-pro-ui/dataform/angular";

import { SharedModule } from "../shared/shared.module";
import { EditComponent } from "./edit/edit.component";
import { CreateComponent } from "./create/create.component";
import { StrainDetailComponent } from "./strain-detail/strain-detail.component";
import { StrainListComponent } from "./strain-list.component";
import { StrainsRoutingModule } from "./strains-routing.module";

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
        EditComponent,
        CreateComponent,
    ],
    entryComponents: [
    ],
    providers: [
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class StrainsModule { }
