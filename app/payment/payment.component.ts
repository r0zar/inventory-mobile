import { Component, OnInit } from "@angular/core";
import { PageRoute, RouterExtensions } from "nativescript-angular/router";
import firebase = require("nativescript-plugin-firebase");
import { alert } from "ui/dialogs";

@Component({
    selector: "Payment",
    moduleId: module.id,
    templateUrl: "./payment.component.html"
})
export class PaymentComponent implements OnInit {

    private activeSubscription: boolean = false;

    constructor(
        private _routerExtensions: RouterExtensions
    ) { }


    ngOnInit(): void {

      firebase.getCurrentUser()
        .then(user => firebase.getValue("/users/" + user.uid + '/transactions'))
        .then(transactions => this.activeSubscription = transactions.value ? true : false)

    }

    betaTester(): void {
      alert({title: 'Early Access', message: 'Enjoy 100% free usage of KipoTrac until the offical launch in June.', okButtonText: "Dope"})
    }

    onBackButtonTap(): void {
        this._routerExtensions.backToPreviousPage();
    }
}
