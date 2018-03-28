import { Component, OnInit } from "@angular/core";
import { PageRoute, RouterExtensions } from "nativescript-angular/router";
import { ListViewEventData } from "nativescript-pro-ui/listview";

import { Product } from "nativescript-purchase/product";
import *  as purchase from "nativescript-purchase";

@Component({
    selector: "Add",
    moduleId: module.id,
    templateUrl: "./add.component.html"
})
export class AddPaymentComponent implements OnInit {

    private _subscriptions: Array<Product>;

    constructor(
        private _routerExtensions: RouterExtensions
    ) { }


    ngOnInit(): void {
      purchase.getProducts().then((products: Array<Product>) => {
          this._subscriptions = products;
      });

    }

    onSubscriptionItemTap(args: ListViewEventData) : void {
        const tappedSubscription = args.view.bindingContext;

        if (purchase.canMakePayments()) {
            purchase.buyProduct(tappedSubscription);
        }
        else {
            alert("Sorry, your account is not eligible to make payments!");
        }

    }

    get subscriptions(): Array<Product> {
        return this._subscriptions;
    }

    onBackButtonTap(): void {
        this._routerExtensions.backToPreviousPage();
    }
}
