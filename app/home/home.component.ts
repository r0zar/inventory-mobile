import { Component, OnInit, ViewChild, Inject } from "@angular/core";
import { DrawerTransitionBase, SlideInOnTopTransition } from "nativescript-pro-ui/sidedrawer";
import { RadSideDrawerComponent } from "nativescript-pro-ui/sidedrawer/angular";
// import { BarcodeScanner } from 'nativescript-barcodescanner';
// import { registerElement } from "nativescript-angular/element-registry";
// registerElement("BarcodeScanner", () => require("nativescript-barcodescanner").BarcodeScannerView);

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

    // constructor(private barcodeScanner: BarcodeScanner){
    // }


    /* ***********************************************************
    * Use the sideDrawerTransition property to change the open/close animation of the drawer.
    *************************************************************/
    ngOnInit(): void {
        this._sideDrawerTransition = new SlideInOnTopTransition();
    }

    // onScanBarcodeTap(): void {
    //   var scanner = this.barcodeScanner;
    //   scanner.available().then(() => {
    //     scanner.hasCameraPermission().then((granted) => {
    //       if (!granted) {
    //         scanner.requestCameraPermission()
    //       } else {
    //         var count = 0;
    //         scanner.scan({
    //             formats: "CODE_128",
    //             continuousScanCallback: (result) => {
    //               count++;
    //               console.log(result.format + ": " + result.text + " (count: " + count + ")");
    //               if (count === 3) {
    //                 scanner.stop();
    //               }
    //             },
    //             closeCallback: () => { console.log("Scanner closed"); }, // invoked when the scanner was closed
    //             reportDuplicates: false // which is the default
    //           }).then(
    //               () => {
    //                 console.log("We're now reporting scan results in 'continuousScanCallback'");
    //               },
    //               (error) => {
    //                 console.log("No scan: " + error);
    //               }
    //           )
    //       }
    //     })
    //
    //   })
    //
    // }

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
}
