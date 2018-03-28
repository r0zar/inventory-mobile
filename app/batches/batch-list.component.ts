import { Component, OnInit, ViewChild, Input } from "@angular/core";
import { ObservableArray } from "data/observable-array";
import { RouterExtensions } from "nativescript-angular/router";
import { ListViewEventData } from "nativescript-pro-ui/listview";
import firebase = require("nativescript-plugin-firebase");
import { DrawerTransitionBase, SlideInOnTopTransition } from "nativescript-pro-ui/sidedrawer";
import { RadSideDrawerComponent } from "nativescript-pro-ui/sidedrawer/angular";
import { View } from 'tns-core-modules/ui/core/view';

import { Batch } from "./shared/batch.model";
import { BatchService } from "./shared/batch.service";
import { MetrcService } from "../shared/metrc.service";

import _ = require('lodash');

@Component({
    selector: "Batches",
    moduleId: module.id,
    templateUrl: "./batch-list.component.html",
    styleUrls: ["./batch-list.component.scss"]
})
export class BatchListComponent implements OnInit {
    /* ***********************************************************
    * Use the @ViewChild decorator to get a reference to the drawer component.
    * It is used in the "onDrawerButtonTap" function below to manipulate the drawer.
    *************************************************************/
    @ViewChild("drawer") drawerComponent: RadSideDrawerComponent;
    private _sideDrawerTransition: DrawerTransitionBase;
    private _isLoading: boolean = false;
    private _fabMenuOpen: boolean = false;
    private _batches: ObservableArray<Batch> = new ObservableArray<Batch>([]);
    private uid: string;

    constructor (
        private _batchService: BatchService,
        private _metrcService: MetrcService,
        private _routerExtensions: RouterExtensions,
    ){}


    /* ***********************************************************
    * Use the sideDrawerTransition property to change the open/close animation of the drawer.
    *************************************************************/
    ngOnInit(): void {
        this._sideDrawerTransition = new SlideInOnTopTransition();
        this._isLoading = true;

        // this is for creating unique ids in the sandbox
        firebase.getCurrentUser()
          .then(user => this.uid = user.uid)
          .then(() => {

            // main rooms lookup logic
            this._metrcService.getBatches()
                .subscribe((batches: Array<Batch>) => {

                    // this is for creating unique ids in the sandbox
                    batches = _.filter(batches, batch => _.includes(batch.Name, this.uid))
                    _.forEach(batches, batch => {batch.Name = batch.Name.replace(this.uid, '')})

                    this._batches = new ObservableArray(batches);
                    this._isLoading = false;
                })
          })


        /* ***********************************************************
        * The data is retrieved remotely from FireBase.
        * The actual data retrieval code is wrapped in a data service.
        * Check out the service in batches/shared/batch.service.ts
        *************************************************************/
        // this._batchService.load()
        //     .finally(() => {
        //       this._isLoading = false
        //     })
        //     .subscribe((batches: Array<Batch>) => {
        //         this._batches = new ObservableArray(batches);
        //         this._isLoading = false;
        //     });

    }

    fabTap(actionItem1: View, actionItem2: View, actionItem3: View, actionItem4: View): void {
      this._fabMenuOpen = !this._fabMenuOpen
      if (this._fabMenuOpen) {
        actionItem1.animate({ translate: { x: -70, y: 0 } }).then(() => { }, () => { });
        actionItem2.animate({ translate: { x: -50, y: -60 } }).then(() => { }, () => { });
        actionItem3.animate({ translate: { x: -30, y: -120 } }).then(() => { }, () => { });
        actionItem4.animate({ translate: { x: 0, y: -180 } }).then(() => { }, () => { });
      } else {
        actionItem1.animate({ translate: { x: 0, y: 0 } }).then(() => { }, () => { });
        actionItem2.animate({ translate: { x: 0, y: 0 } }).then(() => { }, () => { });
        actionItem3.animate({ translate: { x: 0, y: 0 } }).then(() => { }, () => { });
        actionItem4.animate({ translate: { x: 0, y: 0 } }).then(() => { }, () => { });
      }
    }

    get batches(): ObservableArray<Batch> {
        return this._batches;
    }

    get isLoading(): boolean {
        return this._isLoading;
    }

    public onPullToRefreshInitiated(args: ListViewEventData) {
      // main rooms lookup logic
      this._metrcService.getBatches()
          .subscribe((batches: Array<Batch>) => {

              // this is for creating unique ids in the sandbox
              batches = _.filter(batches, batch => _.includes(batch.Name, this.uid))
              _.forEach(batches, batch => {batch.Name = batch.Name.replace(this.uid, '')})

              this._batches = new ObservableArray(batches);
              this._isLoading = false;
              args.object.notifyPullToRefreshFinished();
          })

    }

    /* ***********************************************************
    * Use the "itemTap" event handler of the <RadListView> to navigate to the
    * batch details page. Retrieve a reference for the data batch (the id) and pass it
    * to the batch details page, so that it can identify which data batch to display.
    * Learn more about navigating with a parameter in this documentation article:
    * http://docs.nativescript.org/angular/core-concepts/angular-navigation.html#passing-parameter
    *************************************************************/
    onBatchItemTap(args: ListViewEventData): void {
        const tappedBatchItem = args.view.bindingContext;

        this._routerExtensions.navigate(["/batches/batch-detail", tappedBatchItem.Id],
        {
            animated: true,
            transition: {
                name: "slide",
                duration: 200,
                curve: "ease"
            }
        });
    }

    onAddButtonTap(): void {
        this._routerExtensions.navigate(["/batches/batch-detail-create"],
            {
                animated: true,
                transition: {
                    name: "slideTop",
                    duration: 200,
                    curve: "ease"
                }
            });

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
