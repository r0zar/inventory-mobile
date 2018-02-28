import { Component, OnInit, ViewChild, Input } from "@angular/core";
import { ObservableArray } from "data/observable-array";
import { RouterExtensions } from "nativescript-angular/router";
import { ListViewEventData } from "nativescript-pro-ui/listview";
import firebase = require("nativescript-plugin-firebase");
import { DrawerTransitionBase, SlideInOnTopTransition } from "nativescript-pro-ui/sidedrawer";
import { RadSideDrawerComponent } from "nativescript-pro-ui/sidedrawer/angular";

import { Transfer } from "./shared/transfer.model";
import { TransferService } from "./shared/transfer.service";


@Component({
    selector: "Transfers",
    moduleId: module.id,
    templateUrl: "./transfers.component.html",
    styleUrls: ["./transfers.component.scss"]
})
export class TransfersComponent implements OnInit {
    /* ***********************************************************
    * Use the @ViewChild decorator to get a reference to the drawer component.
    * It is used in the "onDrawerButtonTap" function below to manipulate the drawer.
    *************************************************************/
    @ViewChild("drawer") drawerComponent: RadSideDrawerComponent;

    private _sideDrawerTransition: DrawerTransitionBase;

    private _isLoading: boolean = false;

    private _transfers: ObservableArray<Transfer> = new ObservableArray<Transfer>([]);

    constructor (
        private _transferService: TransferService,
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
        * Check out the service in transfers/shared/transfer.service.ts
        *************************************************************/
        this._transferService.load()
            .finally(() => {
              this._isLoading = false
            })
            .subscribe((transfers: Array<Transfer>) => {
                this._transfers = new ObservableArray(transfers);
                this._isLoading = false;
            });

    }

    get transfers(): ObservableArray<Transfer> {
        return this._transfers;
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
