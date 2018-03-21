import { Component, OnInit, ViewChild, Inject } from "@angular/core";
import { PageRoute, RouterExtensions } from "nativescript-angular/router";
import { DrawerTransitionBase, SlideInOnTopTransition } from "nativescript-pro-ui/sidedrawer";
import { RadSideDrawerComponent } from "nativescript-pro-ui/sidedrawer/angular";
import { MetrcService } from "../shared/metrc.service";
import { FacilityService } from "../facilities/shared/facility.service";
import firebase = require("nativescript-plugin-firebase");
import { alert } from "ui/dialogs";
import { BarcodeScanner } from 'nativescript-barcodescanner';
import { registerElement } from "nativescript-angular/element-registry";
registerElement("BarcodeScanner", () => require("nativescript-barcodescanner").BarcodeScannerView);

// import *  as purchase from "nativescript-purchase";
// import { Product } from "nativescript-purchase/product";
// import { Transaction, TransactionState } from "nativescript-purchase/transaction";
// import * as applicationSettings from "application-settings";
//
// purchase.init(["com.sample.purchase.coolproduct1", "com.sample.purchase.coolproduct2"]);
//
// purchase.on(purchase.transactionUpdatedEvent, (transaction: Transaction) => {
//     if (transaction.transactionState === TransactionState.Purchased) {
//         alert(`Congratulations you just bought ${transaction.productIdentifier}!`);
//         console.log(transaction.transactionDate);
//         console.log(transaction.transactionIdentifier);
//         applicationSettings.setBoolean(transaction.productIdentifier, true);
//     }
//     else if (transaction.transactionState === TransactionState.Restored) {
//         console.log(`Purchase of ${transaction.productIdentifier} restored.`);
//         console.log(transaction.transactionDate);
//         console.log(transaction.transactionIdentifier);
//         console.log(transaction.originalTransaction.transactionDate);
//         applicationSettings.setBoolean(transaction.productIdentifier, true);
//     }
//     else if (transaction.transactionState === TransactionState.Failed) {
//         alert(`Purchase of ${transaction.productIdentifier} failed!`);
//     }
// });
//
// purchase.on(purchase.transactionUpdatedEvent, (transaction: Transaction) => {
//     if (transaction.transactionState === TransactionState.Purchased && transaction.productIdentifier.indexOf(".consume") >= 0) {
//         purchase.consumePurchase(transaction.transactionReceipt)
//             .then((responseCode) => console.log(responseCode)) // If responseCode === 0 the purchase has been successfully consumed
//             .catch((e) => console.log(e));
//     }
// });


@Component({
    selector: "Home",
    moduleId: module.id,
    templateUrl: "./home.component.html"
})
export class HomeComponent implements OnInit {
    /* ***********************************************************
    * Use the @ViewChild decorator to get a reference to the drawer component.
    * It is used in the "onDrawerButtonTap" function below to manipulate the drawer.
    *************************************************************/
    @ViewChild("drawer") drawerComponent: RadSideDrawerComponent;

    private _sideDrawerTransition: DrawerTransitionBase;


    constructor(
      private _metrcService: MetrcService,
      private barcodeScanner: BarcodeScanner,
      private _routerExtensions: RouterExtensions
    ){}


    /* ***********************************************************
    * Use the sideDrawerTransition property to change the open/close animation of the drawer.
    *************************************************************/
    ngOnInit(): void {
        this._sideDrawerTransition = new SlideInOnTopTransition();

        firebase.getCurrentUser()
          .then(user => firebase.getValue("/users/" + user.uid))
          .then(user => FacilityService.facility = user.value)
          .catch(error => {
            alert({title: 'Welcome to KipoTrac', message: 'Select a facility to get started!', okButtonText: "OK"})
              .then(() => this._routerExtensions.navigate(['/facilities']))
          })

        // this._metrcService.getSalesReceipts()
        //   .subscribe(() => {})
        // this._metrcService.createSalesReceipt({
        //   "SalesDateTime": "2016-10-04T16:44:53.000",
        //   "SalesCustomerType": "Consumer",
        //   "PatientLicenseNumber": null,
        //   "CaregiverLicenseNumber": null,
        //   "Transactions": [
        //     {
        //       "PackageLabel": "1A4FF0100000028000000008",
        //       "Quantity": 1.0,
        //       "UnitOfMeasure": "Ounces",
        //       "TotalAmount": 9.99
        //     }
        //   ]
        // })
        // .subscribe(() => {})

        // this._metrcService.updateSalesReceipt({
        //   "Id": 337,
        //   "SalesDateTime": new Date(),
        //   "SalesCustomerType": "Consumer",
        //   "PatientLicenseNumber": null,
        //   "CaregiverLicenseNumber": null,
        //   "Transactions": [
        //     {
        //       "PackageLabel": "1A4FF0100000028000000008",
        //       "Quantity": 2.0,
        //       "UnitOfMeasure": "Ounces",
        //       "TotalAmount": 9.99
        //     }
        //   ]
        // })
        // .subscribe(() => {})

        // this._metrcService.voidSalesReceipt(337).subscribe(() => {})

        // this._metrcService.getLabTestTypes()
        //   .subscribe(() => {})

        // this._metrcService.recordLabTest({
        //   "Label": "1A4FF0300000026000000007",
        //   "ResultDate": new Date(),
        //   "Results": [
        //     {
        //       "LabTestTypeName": "THC (percent)",
        //       "Quantity": 100.2345,
        //       "Passed": true,
        //       "Notes": "WOW!"
        //     }
        //   ]
        // }).subscribe(() => {})
    }

    onScanBarcodeTap(): void {

      // purchase.getProducts()
      // .then((products: Array<Product>) => {
      //     console.log('love me')
      //     products.forEach((product: Product) => {
      //         console.log(product.productIdentifier);
      //         console.log(product.localizedTitle);
      //         console.log(product.priceFormatted);
      //         if (purchase.canMakePayments()) {
      //             purchase.buyProduct(product);
      //         }
      //         else {
      //             alert("Sorry, your account is not eligible to make payments!");
      //         }
      //
      //     });
      // })
      // .catch(error => console.log(error))

      var scanner = this.barcodeScanner;
      scanner.available()
        .then(() => {
          scanner.hasCameraPermission()
            .then(granted => {
              if (granted) {
                this.barcode(scanner)
              } else {
                scanner.requestCameraPermission()
                  .then(granted => {
                    return granted ? this.barcode(scanner) : null
                  })
              }
            })

        })

    }

    get sideDrawerTransition(): DrawerTransitionBase {
        return this._sideDrawerTransition;
    }

    /* ***********************************************************
    * According to guidelines, if you have a drawer on your page, you should always
    * have a button that opens it. Use the showDrawer() function to open the app drawer section.
    *************************************************************/
    onDrawerButtonTap(): void {
        this.drawerComponent.sideDrawer.showDrawer();
    }

    barcode(scanner: BarcodeScanner): void {
      scanner.scan({
        message: "Scan a plant or package RFID tag.",
        orientation: 'landscape',
        formats: "CODE_128",
        torchOn: true,
        showTorchButton: true,
        openSettingsIfPermissionWasPreviouslyDenied: true,
        resultDisplayDuration: 500,
        closeCallback: () => { console.log("Scanner closed"); }, // invoked when the scanner was closed
        reportDuplicates: true // which is the default
      })
      .then(result => {
        let labeledTarget = 'plant'
        this._routerExtensions.navigate([`/${labeledTarget}s/${labeledTarget}-detail`, result.text], {animated: true, transition: {name: "fade", duration: 200}});
      })
      .catch(error => console.log("No scan: " + error))
    }
}
