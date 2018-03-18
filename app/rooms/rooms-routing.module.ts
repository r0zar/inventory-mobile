import { NgModule } from "@angular/core";
import { Routes } from "@angular/router";
import { NativeScriptRouterModule } from "nativescript-angular/router";

import { AuthGuard } from "../shared/auth-guard.service";
import { RoomListComponent } from "./room-list.component";
import { RoomDetailComponent } from "./room-detail/room-detail.component";
import { CreateComponent } from "./create/create.component";
import { EditComponent } from "./edit/edit.component";

const routes: Routes = [
    { path: "", component: RoomListComponent, canActivate: [AuthGuard] },
    { path: "room-detail/:id", component: RoomDetailComponent, canActivate: [AuthGuard] },
    { path: "create", component: CreateComponent, canActivate: [AuthGuard] },
    { path: "edit/:id", component: EditComponent, canActivate: [AuthGuard] }
];

@NgModule({
    imports: [NativeScriptRouterModule.forChild(routes)],
    exports: [NativeScriptRouterModule]
})
export class RoomsRoutingModule { }
