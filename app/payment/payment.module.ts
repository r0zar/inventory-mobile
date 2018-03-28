import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptCommonModule } from "nativescript-angular/common";
import { NativeScriptUIListViewModule } from "nativescript-pro-ui/listview/angular";

import { SharedModule } from "../shared/shared.module";
import { PaymentRoutingModule } from "./payment-routing.module";
import { PaymentComponent } from "./payment.component";
import { AddPaymentComponent } from "./add.component";

@NgModule({
    imports: [
        NativeScriptCommonModule,
        NativeScriptUIListViewModule,
        PaymentRoutingModule,
        SharedModule
    ],
    declarations: [
        PaymentComponent,
        AddPaymentComponent
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class PaymentModule { }
