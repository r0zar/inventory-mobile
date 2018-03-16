import { NgModule } from "@angular/core";
import { Routes } from "@angular/router";
import { NativeScriptRouterModule } from "nativescript-angular/router";

import { BatchListComponent } from "./batch-list.component";
import { BatchDetailComponent } from "./batch-detail/batch-detail.component";
import { BatchDetailEditComponent } from "./batch-detail-edit/batch-detail-edit-component";
import { BatchDetailCreateComponent } from "./batch-detail-create/batch-detail-create-component";
import { BatchDetailPackageComponent } from "./batch-detail-package/batch-detail-package.component";
import { BatchDetailGrowthPhaseComponent } from "./batch-detail-growthphase/batch-detail-growthphase.component";
import { AuthGuard } from "../shared/auth-guard.service";

const routes: Routes = [
    { path: "", component: BatchListComponent, canActivate: [AuthGuard] },
    { path: "batch-detail/:id", component: BatchDetailComponent, canActivate: [AuthGuard] },
    { path: "batch-detail-edit/:id", component: BatchDetailEditComponent, canActivate: [AuthGuard] },
    { path: "batch-detail-create", component: BatchDetailCreateComponent, canActivate: [AuthGuard] },
    { path: "batch-detail-package/:id", component: BatchDetailPackageComponent, canActivate: [AuthGuard] },
    { path: "batch-detail-growthphase/:id", component: BatchDetailGrowthPhaseComponent, canActivate: [AuthGuard] }
];

@NgModule({
    imports: [NativeScriptRouterModule.forChild(routes)],
    exports: [NativeScriptRouterModule]
})
export class BatchesRoutingModule { }
