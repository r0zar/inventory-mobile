import { Component, OnInit, ViewChild, Inject } from "@angular/core";
import { PageRoute, RouterExtensions } from "nativescript-angular/router";
import { DrawerTransitionBase, SlideInOnTopTransition } from "nativescript-pro-ui/sidedrawer";
import { RadSideDrawerComponent } from "nativescript-pro-ui/sidedrawer/angular";
import { MetrcService } from "../shared/metrc.service";
import { FacilityService } from "../facilities/shared/facility.service";
import firebase = require("nativescript-plugin-firebase");
import { alert } from "ui/dialogs";
import { Data } from "../shared/data.service";
import { BarcodeScanner } from 'nativescript-barcodescanner';
import { registerElement } from "nativescript-angular/element-registry";
registerElement("BarcodeScanner", () => require("nativescript-barcodescanner").BarcodeScannerView);


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
      private _routerExtensions: RouterExtensions,
      private data: Data
    ){}


    /* ***********************************************************
    * Use the sideDrawerTransition property to change the open/close animation of the drawer.
    *************************************************************/
    ngOnInit(): void {
        this._sideDrawerTransition = new SlideInOnTopTransition();


        firebase.getCurrentUser()
          .then(user => {
            firebase.getValue("/users/" + user.uid)
              .then(user => {
                if (!user.value) {
                  alert({title: 'Welcome to KipoTrac', message: 'I hope to make your work a lot easier.\n\nLet\'s go to the facilities page to choose where we\'ll be working.\n\nTo get there, click the menu and then select \'Facilities\'', okButtonText: "OK"})
                }
              })
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

      // var scanner = this.barcodeScanner;
      // scanner.available()
      //   .then(() => {
      //     scanner.hasCameraPermission()
      //       .then(granted => {
      //         if (granted) {
      //           this.barcode(scanner)
      //         } else {
      //           scanner.requestCameraPermission()
      //             .then(granted => {
      //               return granted ? this.barcode(scanner) : null
      //             })
      //         }
      //       })
      //
      //   })

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
