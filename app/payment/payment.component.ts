import { Component, OnInit } from "@angular/core";
import { PageRoute, RouterExtensions } from "nativescript-angular/router";

@Component({
    selector: "Payment",
    moduleId: module.id,
    templateUrl: "./payment.component.html"
})
export class PaymentComponent implements OnInit {

    constructor(
        private _routerExtensions: RouterExtensions
    ) { }


    ngOnInit(): void {

    }

    onBackButtonTap(): void {
        this._routerExtensions.backToPreviousPage();
    }
}
