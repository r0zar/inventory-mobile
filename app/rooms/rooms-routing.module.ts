import { NgModule } from "@angular/core";
import { Routes } from "@angular/router";
import { NativeScriptRouterModule } from "nativescript-angular/router";

import { RoomListComponent } from "./room-list.component";
import { RoomDetailComponent } from "./room-detail/room-detail.component";
import { RoomDetailEditComponent } from "./room-detail-edit/room-detail-edit-component";
import { AuthGuard } from "../shared/auth-guard.service";

const routes: Routes = [
    { path: "", component: RoomListComponent, canActivate: [AuthGuard] },
    { path: "room-detail/:id", component: RoomDetailComponent, canActivate: [AuthGuard] },
    { path: "room-detail-edit/:id", component: RoomDetailEditComponent, canActivate: [AuthGuard] }
];

@NgModule({
    imports: [NativeScriptRouterModule.forChild(routes)],
    exports: [NativeScriptRouterModule]
})
export class RoomsRoutingModule { }
