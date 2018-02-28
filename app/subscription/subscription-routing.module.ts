import { NgModule } from "@angular/core";
import { Routes } from "@angular/router";
import { NativeScriptRouterModule } from "nativescript-angular/router";

import { SubscriptionComponent } from "./subscription.component";

const routes: Routes = [
    { path: "", component: SubscriptionComponent }
];

@NgModule({
    imports: [NativeScriptRouterModule.forChild(routes)],
    exports: [NativeScriptRouterModule]
})
export class SubscriptionRoutingModule { }
