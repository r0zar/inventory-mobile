import { Component, OnInit, ViewChild, Inject } from "@angular/core";
import { ObservableArray } from "data/observable-array";
import { DrawerTransitionBase, SlideInOnTopTransition } from "nativescript-pro-ui/sidedrawer";
import { RadSideDrawerComponent } from "nativescript-pro-ui/sidedrawer/angular";
import { SelectedIndexChangedEventData, TabView, TabViewItem } from "tns-core-modules/ui/tab-view";
import { isAndroid } from "platform";
import { View } from 'tns-core-modules/ui/core/view';

import { Plant } from "./shared/plant.model";
import { PlantService } from "./shared/plant.service";
import { MetrcService } from "../shared/metrc.service";
// import { BarcodeScanner } from 'nativescript-barcodescanner';
// import { registerElement } from "nativescript-angular/element-registry";
// registerElement("BarcodeScanner", () => require("nativescript-barcodescanner").BarcodeScannerView);

import _ = require('lodash');

@Component({
    selector: "Plants",
    moduleId: module.id,
    templateUrl: "./plants.component.html",
    styleUrls: ["./plants.component.scss"]
})
export class PlantsComponent implements OnInit {
    /* ***********************************************************
    * Use the @ViewChild decorator to get a reference to the drawer component.
    * It is used in the "onDrawerButtonTap" function below to manipulate the drawer.
    *************************************************************/
    @ViewChild("drawer") drawerComponent: RadSideDrawerComponent;

    private _isLoading: boolean = false;
    private _title: string;
    private _fabMenuOpen: boolean = false;
    private _sideDrawerTransition: DrawerTransitionBase;
    private _plants: ObservableArray<Plant> = new ObservableArray<Plant>([]);

    constructor(
      //private barcodeScanner: BarcodeScanner
      private _plantService: PlantService,
      private _metrcService: MetrcService,
    ){}


    /* ***********************************************************
    * Use the sideDrawerTransition property to change the open/close animation of the drawer.
    *************************************************************/
    ngOnInit(): void {
        this._isLoading = true;
        this._sideDrawerTransition = new SlideInOnTopTransition();

        this._plantService.load()
            .finally(() => {
              this._isLoading = false
            })
            .subscribe((plants: Array<Plant>) => {
                this._plants = new ObservableArray(plants);
                this._isLoading = false;
            });
    }

    fabTap(actionItem1: View, actionItem2: View, actionItem3: View, actionItem4: View): void {
      this._fabMenuOpen = !this._fabMenuOpen
      if (this._fabMenuOpen) {
        actionItem1.animate({ translate: { x: -70, y: 0 } }).then(() => { }, () => { });
        actionItem2.animate({ translate: { x: -60, y: -65 } }).then(() => { }, () => { });
        actionItem3.animate({ translate: { x: -40, y: -125 } }).then(() => { }, () => { });
        actionItem4.animate({ translate: { x: 0, y: -175 } }).then(() => { }, () => { });
      } else {
        actionItem1.animate({ translate: { x: 0, y: 0 } }).then(() => { }, () => { });
        actionItem2.animate({ translate: { x: 0, y: 0 } }).then(() => { }, () => { });
        actionItem3.animate({ translate: { x: 0, y: 0 } }).then(() => { }, () => { });
        actionItem4.animate({ translate: { x: 0, y: 0 } }).then(() => { }, () => { });
      }
    }

    get plants(): ObservableArray<Plant> {
        return this._plants;
    }

    get immaturePlants(): Array<Plant> {
        return this._plants.filter(plant => plant.GrowthPhase == "Immature");
    }

    get vegetativePlants(): Array<Plant> {
        return this._plants.filter(plant => plant.GrowthPhase == "Vegetative");
    }

    get floweringPlants(): Array<Plant> {
        return this._plants.filter(plant => plant.GrowthPhase == "Flowering");
    }

    get harvestedPlants(): Array<Plant> {
        return this._plants.filter(plant => plant.GrowthPhase == "Harvested");
    }

    get isLoading(): boolean {
        return this._isLoading;
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


    get title(): string {
        return this._title;
    }

    set title(value: string) {
        if (this._title !== value) {
            this._title = value;
        }
    }

    /* ***********************************************************
    * The "getIconSource" function returns the correct tab icon source
    * depending on whether the app is ran on Android or iOS.
    * You can find all resources in /App_Resources/os
    *************************************************************/
    getIconSource(icon: string): string {
        return isAndroid ? "" : "res://tabIcons/" + icon;
    }

    /* ***********************************************************
    * Get the current tab view title and set it as an ActionBar title.
    * Learn more about the onSelectedIndexChanged event here:
    * https://docs.nativescript.org/cookbook/ui/tab-view#using-selectedindexchanged-event-from-xml
    *************************************************************/
    onSelectedIndexChanged(args: SelectedIndexChangedEventData) {
        const tabView = <TabView>args.object;
        const selectedTabViewItem = tabView.items[args.newIndex];

        this.title = selectedTabViewItem.title;
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
}
