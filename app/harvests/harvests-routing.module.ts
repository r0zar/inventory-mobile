import { NgModule } from "@angular/core";
import { Routes } from "@angular/router";
import { NativeScriptRouterModule } from "nativescript-angular/router";

import { AuthGuard } from "../shared/auth-guard.service";
import { HarvestListComponent } from "./harvest-list.component";
import { HarvestDetailComponent } from "./harvest-detail/harvest-detail.component";
import { CreatePackageComponent } from "./createpackage/createpackage.component";
import { RemoveWasteComponent } from "./removewaste/removewaste.component";

const routes: Routes = [
    { path: "", component: HarvestListComponent, canActivate: [AuthGuard] },
    { path: "harvest-detail/:id", component: HarvestDetailComponent, canActivate: [AuthGuard] },
    { path: "createpackage/:id", component: CreatePackageComponent, canActivate: [AuthGuard] },
    { path: "removewaste/:id", component: RemoveWasteComponent, canActivate: [AuthGuard] }
];

@NgModule({
    imports: [NativeScriptRouterModule.forChild(routes)],
    exports: [NativeScriptRouterModule]
})
export class HarvestsRoutingModule { }
