import { NgModule } from "@angular/core";
import { Routes } from "@angular/router";
import { NativeScriptRouterModule } from "nativescript-angular/router";

import { CarDetailEditComponent } from "./car-detail-edit/car-detail-edit.component";
import { CarDetailComponent } from "./car-detail/car-detail.component";
import { CarListComponent } from "./car-list.component";
import { AuthGuard } from "../shared/auth-guard.service";

const routes: Routes = [
    { path: "", component: CarListComponent, canActivate: [AuthGuard] },
    { path: "car-detail/:id", component: CarDetailComponent, canActivate: [AuthGuard] },
    { path: "car-detail-edit/:id", component: CarDetailEditComponent, canActivate: [AuthGuard] }
];

@NgModule({
    imports: [NativeScriptRouterModule.forChild(routes)],
    exports: [NativeScriptRouterModule]
})
export class CarsRoutingModule { }
