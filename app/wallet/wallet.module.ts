import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptCommonModule } from "nativescript-angular/common";

import { SharedModule } from "../shared/shared.module";
import { WalletRoutingModule } from "./wallet-routing.module";
import { WalletComponent } from "./wallet.component";

@NgModule({
    imports: [
        NativeScriptCommonModule,
        WalletRoutingModule,
        SharedModule
    ],
    declarations: [
        WalletComponent
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class WalletModule { }
