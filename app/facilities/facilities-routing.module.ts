import { NgModule } from "@angular/core";
import { Routes } from "@angular/router";
import { NativeScriptRouterModule } from "nativescript-angular/router";

import { FacilitiesComponent } from "./facilities.component";

const routes: Routes = [
    { path: "", component: FacilitiesComponent }
];

@NgModule({
    imports: [NativeScriptRouterModule.forChild(routes)],
    exports: [NativeScriptRouterModule]
})
export class FacilitiesRoutingModule { }
