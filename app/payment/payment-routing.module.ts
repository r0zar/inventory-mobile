import { NgModule } from "@angular/core";
import { Routes } from "@angular/router";
import { NativeScriptRouterModule } from "nativescript-angular/router";

import { PaymentComponent } from "./payment.component";
import { AddPaymentComponent } from "./add.component";

const routes: Routes = [
    { path: "", component: PaymentComponent },
    { path: "add", component: AddPaymentComponent }
];

@NgModule({
    imports: [NativeScriptRouterModule.forChild(routes)],
    exports: [NativeScriptRouterModule]
})
export class PaymentRoutingModule { }
