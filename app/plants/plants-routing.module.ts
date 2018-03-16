import { NgModule } from "@angular/core";
import { Routes } from "@angular/router";
import { NativeScriptRouterModule } from "nativescript-angular/router";

import { AuthGuard } from "../shared/auth-guard.service";
import { PlantsComponent } from "./plants.component";
import { PlantDetailComponent } from "./plant-detail/plant-detail.component";
import { ChangeGrowthPhasesComponent } from "./changegrowthphases/changegrowthphases.component";
import { CreatePlantingsComponent } from "./createplantings/createplantings.component"
import { DestroyComponent } from "./destroy/destroy.component"
import { HarvestComponent } from "./harvest/harvest.component"
import { ManicureComponent } from "./manicure/manicure.component"
import { MoveComponent } from "./move/move.component"

const routes: Routes = [
    { path: "", component: PlantsComponent },
    { path: "plant-detail/:id", component: PlantDetailComponent, canActivate: [AuthGuard] },
    { path: "changegrowthphases/:id", component: ChangeGrowthPhasesComponent, canActivate: [AuthGuard] },
    { path: "createplantings/:id", component: CreatePlantingsComponent, canActivate: [AuthGuard] },
    { path: "destroy/:id", component: DestroyComponent, canActivate: [AuthGuard] },
    { path: "harvest/:id", component: HarvestComponent, canActivate: [AuthGuard] },
    { path: "manicure/:id", component: ManicureComponent, canActivate: [AuthGuard] },
    { path: "move/:id", component: MoveComponent, canActivate: [AuthGuard] }
];

@NgModule({
    imports: [NativeScriptRouterModule.forChild(routes)],
    exports: [NativeScriptRouterModule]
})
export class PlantsRoutingModule { }
