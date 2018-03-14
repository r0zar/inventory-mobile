import { NgModule } from "@angular/core";
import { Routes } from "@angular/router";
import { NativeScriptRouterModule } from "nativescript-angular/router";

import { HarvestListComponent } from "./harvest-list.component";
import { HarvestDetailComponent } from "./harvest-detail/harvest-detail.component";
import { HarvestDetailEditComponent } from "./harvest-detail-edit/harvest-detail-edit-component";
import { AuthGuard } from "../shared/auth-guard.service";

const routes: Routes = [
    { path: "", component: HarvestListComponent, canActivate: [AuthGuard] },
    { path: "harvest-detail/:id", component: HarvestDetailComponent, canActivate: [AuthGuard] },
    { path: "harvest-detail-edit/:id", component: HarvestDetailEditComponent, canActivate: [AuthGuard] }
];

@NgModule({
    imports: [NativeScriptRouterModule.forChild(routes)],
    exports: [NativeScriptRouterModule]
})
export class HarvestsRoutingModule { }
