import { NgModule } from "@angular/core";
import { Routes } from "@angular/router";
import { NativeScriptRouterModule } from "nativescript-angular/router";

import { AuthGuard } from "../shared/auth-guard.service";
import { PackageListComponent } from "./package-list.component";
import { PackageDetailComponent } from "./package-detail/package-detail.component";
import { AdjustComponent } from "./adjust/adjust.component";
import { ChangeItemComponent } from "./changeitem/changeitem.component";
import { CreateComponent } from "./create/create.component";
import { CreatePlantingsComponent } from "./createplantings/createplantings.component";
import { CreateTestingComponent } from "./createtesting/createtesting.component";
import { RemediateComponent } from "./remediate/remediate.component";

const routes: Routes = [
    { path: "", component: PackageListComponent, canActivate: [AuthGuard] },
    { path: "package-detail/:id", component: PackageDetailComponent, canActivate: [AuthGuard] },
    { path: "adjust/:id", component: AdjustComponent, canActivate: [AuthGuard] },
    { path: "changeitem/:id", component: ChangeItemComponent, canActivate: [AuthGuard] },
    { path: "create", component: CreateComponent, canActivate: [AuthGuard] },
    { path: "createplantings", component: CreatePlantingsComponent, canActivate: [AuthGuard] },
    { path: "createtesting", component: CreateTestingComponent, canActivate: [AuthGuard] },
    { path: "remediate/:id", component: RemediateComponent, canActivate: [AuthGuard] }
];

@NgModule({
    imports: [NativeScriptRouterModule.forChild(routes)],
    exports: [NativeScriptRouterModule]
})
export class PackagesRoutingModule { }
