import { NgModule } from "@angular/core";
import { Routes } from "@angular/router";
import { NativeScriptRouterModule } from "nativescript-angular/router";

import { ItemListComponent } from "./item-list.component";
import { ItemDetailComponent } from "./item-detail/item-detail.component";
import { ItemDetailEditComponent } from "./item-detail-edit/item-detail-edit-component";
import { ItemDetailCreateComponent } from "./item-detail-create/item-detail-create-component";
import { AuthGuard } from "../shared/auth-guard.service";

const routes: Routes = [
    { path: "", component: ItemListComponent, canActivate: [AuthGuard] },
    { path: "item-detail/:id", component: ItemDetailComponent, canActivate: [AuthGuard] },
    { path: "item-detail-edit/:id", component: ItemDetailEditComponent, canActivate: [AuthGuard] },
    { path: "item-detail-create", component: ItemDetailCreateComponent, canActivate: [AuthGuard] }
];

@NgModule({
    imports: [NativeScriptRouterModule.forChild(routes)],
    exports: [NativeScriptRouterModule]
})
export class ItemsRoutingModule { }
