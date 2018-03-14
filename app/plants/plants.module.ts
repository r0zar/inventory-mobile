import { NgModule, NO_ERRORS_SCHEMA, ValueProvider } from "@angular/core";
import { NativeScriptCommonModule } from "nativescript-angular/common";
//import { BarcodeScanner } from 'nativescript-barcodescanner';

import { SharedModule } from "../shared/shared.module";
import { PlantsRoutingModule } from "./plants-routing.module";
import { PlantsComponent } from "./plants.component";

import { Plant } from "./shared/plant.model";
import { PlantService } from "./shared/plant.service";


@NgModule({
    imports: [
        NativeScriptCommonModule,
        PlantsRoutingModule,
        SharedModule
    ],
    declarations: [
        PlantsComponent
    ],
    providers: [
        PlantService,
        //BarcodeScanner
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class PlantsModule { }
