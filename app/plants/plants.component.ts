import { Component, OnInit, ViewChild, Inject } from "@angular/core";
import { ObservableArray } from "data/observable-array";
import { RouterExtensions } from "nativescript-angular/router";
import { ListViewEventData } from "nativescript-pro-ui/listview";
import { DataFormEventData } from "nativescript-pro-ui/dataform";
import { DrawerTransitionBase, SlideInOnTopTransition } from "nativescript-pro-ui/sidedrawer";
import { RadSideDrawerComponent } from "nativescript-pro-ui/sidedrawer/angular";
import { SelectedIndexChangedEventData, TabView, TabViewItem } from "tns-core-modules/ui/tab-view";
import { isAndroid } from "platform";
import { View } from 'tns-core-modules/ui/core/view';

import { Plant } from "./shared/plant.model";
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
    private _vegetativePlants: ObservableArray<Plant> = new ObservableArray<Plant>([]);
    private _floweringPlants: ObservableArray<Plant> = new ObservableArray<Plant>([]);

    constructor(
      //private barcodeScanner: BarcodeScanner
      private _metrcService: MetrcService,
      private _routerExtensions: RouterExtensions
    ){}


    /* ***********************************************************
    * Use the sideDrawerTransition property to change the open/close animation of the drawer.
    *************************************************************/
    ngOnInit(): void {
        this._isLoading = true;
        this._sideDrawerTransition = new SlideInOnTopTransition();

        this._metrcService.getVegetativePlants()
            .finally(() => {
              this._isLoading = false
            })
            .subscribe((plants: Array<Plant>) => {
                this._vegetativePlants = new ObservableArray(plants);
                this._isLoading = false;
            });

        this._metrcService.getFloweringPlants()
            .finally(() => {
              this._isLoading = false
            })
            .subscribe((plants: Array<Plant>) => {
                this._floweringPlants = new ObservableArray(plants);
                this._isLoading = false;
            });
    }

    get vegetativePlants(): ObservableArray<Plant> {
        return this._vegetativePlants;
    }

    get floweringPlants(): ObservableArray<Plant> {
        return this._floweringPlants;
    }

    get isLoading(): boolean {
        return this._isLoading;
    }

    public onPullToRefreshInitiated1(args: ListViewEventData) {
        this._metrcService.getVegetativePlants()
            .subscribe((plants: Array<Plant>) => {
                this._vegetativePlants = new ObservableArray(plants);
                args.object.notifyPullToRefreshFinished();
            });
    }

    public onPullToRefreshInitiated2(args: ListViewEventData) {
        this._metrcService.getFloweringPlants()
            .subscribe((plants: Array<Plant>) => {
                this._floweringPlants = new ObservableArray(plants);
                args.object.notifyPullToRefreshFinished();
            });
    }

    onPlantsItemTap(args: ListViewEventData): void {
        const tappedItemItem = args.view.bindingContext;

        this._routerExtensions.navigate(["/plants/plant-detail", tappedItemItem.Id],
        {
            animated: true,
            transition: {
                name: "slide",
                duration: 200,
                curve: "ease"
            }
        });

    }


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
