import { NgModule } from "@angular/core";
import { Routes } from "@angular/router";
import { NativeScriptRouterModule } from "nativescript-angular/router";

import { TransferListComponent } from "./transfer-list.component";
import { TransferDetailComponent } from "./transfer-detail/transfer-detail.component";
import { AuthGuard } from "../shared/auth-guard.service";

const routes: Routes = [
    { path: "", component: TransferListComponent, canActivate: [AuthGuard] },
    { path: "transfer-detail/:id", component: TransferDetailComponent, canActivate: [AuthGuard] }
];

@NgModule({
    imports: [NativeScriptRouterModule.forChild(routes)],
    exports: [NativeScriptRouterModule]
})
export class TransfersRoutingModule { }
