import { NgModule } from "@angular/core";
import { Routes } from "@angular/router";
import { NativeScriptRouterModule } from "nativescript-angular/router";

import { PackagesComponent } from "./packages.component";
import { PackageDetailComponent } from "./package-detail/package-detail.component";
import { AuthGuard } from "../shared/auth-guard.service";

const routes: Routes = [
    { path: "", component: PackagesComponent, canActivate: [AuthGuard] },
    { path: "package-detail/:id", component: PackageDetailComponent, canActivate: [AuthGuard] }
];

@NgModule({
    imports: [NativeScriptRouterModule.forChild(routes)],
    exports: [NativeScriptRouterModule]
})
export class PackagesRoutingModule { }
