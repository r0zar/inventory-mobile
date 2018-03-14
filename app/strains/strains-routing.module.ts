import { NgModule } from "@angular/core";
import { Routes } from "@angular/router";
import { NativeScriptRouterModule } from "nativescript-angular/router";

import { StrainListComponent } from "./strain-list.component";
import { StrainDetailComponent } from "./strain-detail/strain-detail.component";
import { StrainDetailEditComponent } from "./strain-detail-edit/strain-detail-edit-component";
import { AuthGuard } from "../shared/auth-guard.service";

const routes: Routes = [
    { path: "", component: StrainListComponent, canActivate: [AuthGuard] },
    { path: "strain-detail/:id", component: StrainDetailComponent, canActivate: [AuthGuard] },
    { path: "strain-detail-edit/:id", component: StrainDetailEditComponent, canActivate: [AuthGuard] }
];

@NgModule({
    imports: [NativeScriptRouterModule.forChild(routes)],
    exports: [NativeScriptRouterModule]
})
export class StrainsRoutingModule { }
