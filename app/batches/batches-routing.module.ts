import { NgModule } from "@angular/core";
import { Routes } from "@angular/router";
import { NativeScriptRouterModule } from "nativescript-angular/router";

import { BatchListComponent } from "./batch-list.component";
import { BatchDetailComponent } from "./batch-detail/batch-detail.component";
import { BatchDetailEditComponent } from "./batch-detail-edit/batch-detail-edit-component";
import { BatchDetailCreateComponent } from "./batch-detail-create/batch-detail-create-component";
import { AuthGuard } from "../shared/auth-guard.service";

const routes: Routes = [
    { path: "", component: BatchListComponent, canActivate: [AuthGuard] },
    { path: "batch-detail/:id", component: BatchDetailComponent, canActivate: [AuthGuard] },
    { path: "batch-detail-edit/:id", component: BatchDetailEditComponent, canActivate: [AuthGuard] },
    { path: "batch-detail-create", component: BatchDetailCreateComponent, canActivate: [AuthGuard] }
];

@NgModule({
    imports: [NativeScriptRouterModule.forChild(routes)],
    exports: [NativeScriptRouterModule]
})
export class BatchesRoutingModule { }
