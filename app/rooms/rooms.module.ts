import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptCommonModule } from "nativescript-angular/common";
import { NativeScriptUIListViewModule } from "nativescript-pro-ui/listview/angular";
import { NativeScriptUIDataFormModule } from "nativescript-pro-ui/dataform/angular";

import { SharedModule } from "../shared/shared.module";
import { RoomDetailEditComponent } from "./room-detail-edit/room-detail-edit-component";
import { MyImageAddRemoveComponent } from "./room-detail-edit/my-image-add-remove/my-image-add-remove.component";
import { MyListSelectorModalViewComponent } from "./room-detail-edit/my-list-selector/my-list-selector-modal-view.component"; // tslint:disable-line:max-line-length
import { MyListSelectorComponent } from "./room-detail-edit/my-list-selector/my-list-selector.component";
import { RoomDetailComponent } from "./room-detail/room-detail.component";
import { RoomListComponent } from "./room-list.component";
import { RoomsRoutingModule } from "./rooms-routing.module";
import { RoomEditService } from "./shared/room-edit.service";
import { RoomService } from "./shared/room.service";

@NgModule({
    imports: [
        RoomsRoutingModule,
        NativeScriptCommonModule,
        NativeScriptUIListViewModule,
        NativeScriptUIDataFormModule,
        SharedModule
    ],
    declarations: [
        RoomListComponent,
        RoomDetailComponent,
        RoomDetailEditComponent,
        MyListSelectorComponent,
        MyListSelectorModalViewComponent,
        MyImageAddRemoveComponent
    ],
    entryComponents: [
        MyListSelectorModalViewComponent
    ],
    providers: [
        RoomService,
        RoomEditService
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class RoomsModule { }
