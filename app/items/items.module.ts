import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptCommonModule } from "nativescript-angular/common";
import { NativeScriptUIListViewModule } from "nativescript-pro-ui/listview/angular";
import { NativeScriptUIDataFormModule } from "nativescript-pro-ui/dataform/angular";

import { SharedModule } from "../shared/shared.module";
import { ItemDetailEditComponent } from "./item-detail-edit/item-detail-edit-component";
import { ItemDetailCreateComponent } from "./item-detail-create/item-detail-create-component";
import { ItemDetailComponent } from "./item-detail/item-detail.component";
import { ItemListComponent } from "./item-list.component";
import { ItemsRoutingModule } from "./items-routing.module";

@NgModule({
    imports: [
        ItemsRoutingModule,
        NativeScriptCommonModule,
        NativeScriptUIListViewModule,
        NativeScriptUIDataFormModule,
        SharedModule
    ],
    declarations: [
        ItemListComponent,
        ItemDetailComponent,
        ItemDetailEditComponent,
        ItemDetailCreateComponent,
    ],
    entryComponents: [
    ],
    providers: [
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class ItemsModule { }
