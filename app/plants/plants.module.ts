import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptCommonModule } from "nativescript-angular/common";
import { NativeScriptUIListViewModule } from "nativescript-pro-ui/listview/angular";
import { NativeScriptUIDataFormModule } from "nativescript-pro-ui/dataform/angular";
//import { BarcodeScanner } from 'nativescript-barcodescanner';

import { SharedModule } from "../shared/shared.module";
import { PlantsRoutingModule } from "./plants-routing.module";
import { PlantsComponent } from "./plants.component";
import { PlantDetailComponent } from "./plant-detail/plant-detail.component"
import { ChangeGrowthPhasesComponent } from "./changegrowthphases/changegrowthphases.component";
import { CreatePlantingsComponent } from "./createplantings/createplantings.component"
import { DestroyComponent } from "./destroy/destroy.component"
import { HarvestComponent } from "./harvest/harvest.component"
import { ManicureComponent } from "./manicure/manicure.component"
import { MoveComponent } from "./move/move.component"

import { Plant } from "./shared/plant.model";


@NgModule({
    imports: [
        NativeScriptUIListViewModule,
        NativeScriptUIDataFormModule,
        NativeScriptCommonModule,
        PlantsRoutingModule,
        SharedModule
    ],
    declarations: [
        PlantsComponent,
        PlantDetailComponent,
        ChangeGrowthPhasesComponent,
        CreatePlantingsComponent,
        DestroyComponent,
        HarvestComponent,
        ManicureComponent,
        MoveComponent
    ],
    providers: [
        //BarcodeScanner
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class PlantsModule { }
