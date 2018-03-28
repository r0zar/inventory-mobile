// this import should be first in order to load some required settings (like globals and reflect-metadata)
import { platformNativeScriptDynamic } from "nativescript-angular/platform";
import firebase = require("nativescript-plugin-firebase");
import { AppModule } from "./app.module";

// this is for the purchase plugin
import *  as purchase from "nativescript-purchase";
import { Transaction, TransactionState } from "nativescript-purchase/transaction";

purchase.init(["monthly", "yearly"])

purchase.on(purchase.transactionUpdatedEvent, (transaction: Transaction) => {
    if (transaction.transactionState === TransactionState.Purchased) {
        console.log(`Congratulations you just bought ${transaction.productIdentifier}!`);
        firebase.getCurrentUser().then(user => firebase.setValue("/users/" + user.uid + '/transactions', [transaction]))
    }
    else if (transaction.transactionState === TransactionState.Restored) {
        firebase.getCurrentUser().then(user => firebase.setValue("/users/" + user.uid + '/transactions', [transaction]))
    }
    else if (transaction.transactionState === TransactionState.Failed) {
        console.log(`Purchase of ${transaction.productIdentifier} failed!`);
        firebase.getCurrentUser().then(user => firebase.setValue("/users/" + user.uid + '/transactions', [transaction]))
    }
});

purchase.on(purchase.transactionUpdatedEvent, (transaction: Transaction) => {
    if (transaction.transactionState === TransactionState.Purchased && transaction.productIdentifier.indexOf(".consume") >= 0) {
        purchase.consumePurchase(transaction.transactionReceipt)
    }
});

/* ***********************************************************
* The {N} Firebase plugin needs some initialization steps before it is ready
* for use. Check out the initialization script at /shared/firebase.common.ts
* along with more information about it.
*************************************************************/
import "./shared/firebase.common";

// added this cuz it seemed like the respectable thing to do
import {enableProdMode} from '@angular/core';
enableProdMode();

platformNativeScriptDynamic().bootstrapModule(AppModule);
