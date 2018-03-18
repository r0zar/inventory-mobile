import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptCommonModule } from "nativescript-angular/common";
import { NativeScriptUIListViewModule } from "nativescript-pro-ui/listview/angular";
import { NativeScriptUIDataFormModule } from "nativescript-pro-ui/dataform/angular";

import { SharedModule } from "../shared/shared.module";;
import { RoomDetailComponent } from "./room-detail/room-detail.component";
import { RoomListComponent } from "./room-list.component";
import { CreateComponent } from "./create/create.component";
import { EditComponent } from "./edit/edit.component";
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
        CreateComponent,
        EditComponent
    ],
    entryComponents: [
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
