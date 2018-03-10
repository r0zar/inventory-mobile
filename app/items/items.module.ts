import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptCommonModule } from "nativescript-angular/common";
import { NativeScriptFormsModule } from "nativescript-angular/forms";
import { NativeScriptUIListViewModule } from "nativescript-pro-ui/listview/angular";
import { NativeScriptUIDataFormModule } from "nativescript-pro-ui/dataform/angular";
import { HttpClientModule } from '@angular/common/http';

import { SharedModule } from "../shared/shared.module";
import { ItemDetailEditComponent } from "./item-detail-edit/item-detail-edit-component";
import { MyImageAddRemoveComponent } from "./item-detail-edit/my-image-add-remove/my-image-add-remove.component";
import { MyListSelectorModalViewComponent } from "./item-detail-edit/my-list-selector/my-list-selector-modal-view.component"; // tslint:disable-line:max-line-length
import { MyListSelectorComponent } from "./item-detail-edit/my-list-selector/my-list-selector.component";
import { ItemDetailComponent } from "./item-detail/item-detail.component";
import { ItemListComponent } from "./item-list.component";
import { ItemsRoutingModule } from "./items-routing.module";
import { ItemEditService } from "./shared/item-edit.service";
import { ItemService } from "./shared/item.service";
import { MetrcService } from "../shared/metrc.service";

@NgModule({
    imports: [
        HttpClientModule,
        ItemsRoutingModule,
        NativeScriptCommonModule,
        NativeScriptFormsModule,
        NativeScriptUIListViewModule,
        NativeScriptUIDataFormModule,
        SharedModule
    ],
    declarations: [
        ItemListComponent,
        ItemDetailComponent,
        ItemDetailEditComponent,
        MyListSelectorComponent,
        MyListSelectorModalViewComponent,
        MyImageAddRemoveComponent
    ],
    entryComponents: [
        MyListSelectorModalViewComponent
    ],
    providers: [
        ItemService,
        ItemEditService,
        MetrcService
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class ItemsModule { }
