import { Component, OnInit } from "@angular/core";
import { PageRoute, RouterExtensions } from "nativescript-angular/router";
// import * as elementRegistryModule from 'nativescript-angular/element-registry';
// elementRegistryModule.registerElement("CardView", () => require("nativescript-cardview").CardView);

@Component({
    selector: "Credits",
    moduleId: module.id,
    templateUrl: "./credits.component.html"
})
export class CreditsComponent implements OnInit {

    constructor(
        private _routerExtensions: RouterExtensions
    ) { }


    ngOnInit(): void {

    }

    onBackButtonTap(): void {
        this._routerExtensions.backToPreviousPage();
    }
}
