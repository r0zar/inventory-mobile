import { Component, OnInit, ViewChild, Inject } from "@angular/core";
import { PageRoute, RouterExtensions } from "nativescript-angular/router";
import { DrawerTransitionBase, SlideInOnTopTransition } from "nativescript-pro-ui/sidedrawer";
import { RadSideDrawerComponent } from "nativescript-pro-ui/sidedrawer/angular";
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
      private barcodeScanner: BarcodeScanner,
      private _routerExtensions: RouterExtensions
    ){}


    /* ***********************************************************
    * Use the sideDrawerTransition property to change the open/close animation of the drawer.
    *************************************************************/
    ngOnInit(): void {
        this._sideDrawerTransition = new SlideInOnTopTransition();
    }

    onScanBarcodeTap(): void {
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
