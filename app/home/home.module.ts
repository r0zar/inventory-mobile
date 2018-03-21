import { NgModule, NO_ERRORS_SCHEMA, ValueProvider } from "@angular/core";
import { NativeScriptCommonModule } from "nativescript-angular/common";
import { BarcodeScanner } from 'nativescript-barcodescanner';
import { MetrcService } from "../shared/metrc.service";

import { SharedModule } from "../shared/shared.module";
import { HomeRoutingModule } from "./home-routing.module";
import { HomeComponent } from "./home.component";


@NgModule({
    imports: [
        NativeScriptCommonModule,
        HomeRoutingModule,
        SharedModule
    ],
    declarations: [
        HomeComponent
    ],
    providers: [
        BarcodeScanner,
        MetrcService
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class HomeModule { }
