import { Component, OnInit, ViewChild, Input } from "@angular/core";
import { ObservableArray } from "data/observable-array";
import { RouterExtensions } from "nativescript-angular/router";
import { ListViewEventData } from "nativescript-pro-ui/listview";
import firebase = require("nativescript-plugin-firebase");
import { DrawerTransitionBase, SlideInOnTopTransition } from "nativescript-pro-ui/sidedrawer";
import { RadSideDrawerComponent } from "nativescript-pro-ui/sidedrawer/angular";

import { Package } from "./shared/package.model";
import { PackageService } from "./shared/package.service";


@Component({
    selector: "Packages",
    moduleId: module.id,
    templateUrl: "./packages.component.html",
    styleUrls: ["./packages.component.scss"]
})
export class PackagesComponent implements OnInit {
    /* ***********************************************************
    * Use the @ViewChild decorator to get a reference to the drawer component.
    * It is used in the "onDrawerButtonTap" function below to manipulate the drawer.
    *************************************************************/
    @ViewChild("drawer") drawerComponent: RadSideDrawerComponent;

    private _sideDrawerTransition: DrawerTransitionBase;

    private _isLoading: boolean = false;

    private _packages: ObservableArray<Package> = new ObservableArray<Package>([]);

    constructor (
        private _packageService: PackageService,
        private _routerExtensions: RouterExtensions,
    ){}


    /* ***********************************************************
    * Use the sideDrawerTransition property to change the open/close animation of the drawer.
    *************************************************************/
    ngOnInit(): void {
        this._sideDrawerTransition = new SlideInOnTopTransition();
        this._isLoading = true;

        /* ***********************************************************
        * The data is retrieved remotely from FireBase.
        * The actual data retrieval code is wrapped in a data service.
        * Check out the service in packages/shared/package.service.ts
        *************************************************************/
        this._packageService.load()
            .finally(() => {
              this._isLoading = false
            })
            .subscribe((packages: Array<Package>) => {
                this._packages = new ObservableArray(packages);
                this._isLoading = false;
            });

    }

    get packages(): ObservableArray<Package> {
        return this._packages;
    }

    get isLoading(): boolean {
        return this._isLoading;
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
