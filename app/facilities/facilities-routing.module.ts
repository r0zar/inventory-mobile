import { NgModule } from "@angular/core";
import { Routes } from "@angular/router";
import { NativeScriptRouterModule } from "nativescript-angular/router";

import { FacilityListComponent } from "./facility-list.component";
import { FacilityDetailComponent } from "./facility-detail/facility-detail.component";
import { AuthGuard } from "../shared/auth-guard.service";

const routes: Routes = [
    { path: "", component: FacilityListComponent, canActivate: [AuthGuard] },
    { path: "facility-detail/:id", component: FacilityDetailComponent, canActivate: [AuthGuard] }
];

@NgModule({
    imports: [NativeScriptRouterModule.forChild(routes)],
    exports: [NativeScriptRouterModule]
})
export class FacilitiesRoutingModule { }
