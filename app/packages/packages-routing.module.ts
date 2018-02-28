import { NgModule } from "@angular/core";
import { Routes } from "@angular/router";
import { NativeScriptRouterModule } from "nativescript-angular/router";

import { PackageListComponent } from "./package-list.component";
import { PackageDetailComponent } from "./package-detail/package-detail.component";
import { PackageDetailEditComponent } from "./package-detail-edit/package-detail-edit-component";
import { AuthGuard } from "../shared/auth-guard.service";

const routes: Routes = [
    { path: "", component: PackageListComponent, canActivate: [AuthGuard] },
    { path: "package-detail/:id", component: PackageDetailComponent, canActivate: [AuthGuard] },
    { path: "package-detail-edit/:id", component: PackageDetailEditComponent, canActivate: [AuthGuard] }
];

@NgModule({
    imports: [NativeScriptRouterModule.forChild(routes)],
    exports: [NativeScriptRouterModule]
})
export class PackagesRoutingModule { }
