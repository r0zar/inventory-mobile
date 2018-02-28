import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptCommonModule } from "nativescript-angular/common";

import { SharedModule } from "../shared/shared.module";
import { SubscriptionRoutingModule } from "./subscription-routing.module";
import { SubscriptionComponent } from "./subscription.component";

@NgModule({
    imports: [
        NativeScriptCommonModule,
        SubscriptionRoutingModule,
        SharedModule
    ],
    declarations: [
        SubscriptionComponent
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class SubscriptionModule { }
