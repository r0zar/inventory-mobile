import { Component, OnInit } from "@angular/core";
import { PageRoute, RouterExtensions } from "nativescript-angular/router";

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
