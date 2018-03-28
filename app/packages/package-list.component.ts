import { Component, OnInit, ViewChild, Input, ElementRef } from "@angular/core";
import { ObservableArray } from "data/observable-array";
import { RouterExtensions } from "nativescript-angular/router";
import { ListViewEventData } from "nativescript-pro-ui/listview";
import firebase = require("nativescript-plugin-firebase");
import { DrawerTransitionBase, SlideInOnTopTransition } from "nativescript-pro-ui/sidedrawer";
import { RadSideDrawerComponent } from "nativescript-pro-ui/sidedrawer/angular";

import { Package } from "./shared/package.model";
import { MetrcService } from "../shared/metrc.service";
import { Data } from "../shared/data.service";

import { ScrollView, ScrollEventData } from 'tns-core-modules/ui/scroll-view';
import { View } from 'tns-core-modules/ui/core/view';
import { Page } from "ui/page";


import _ = require('lodash');

@Component({
    selector: "Packages",
    moduleId: module.id,
    templateUrl: "./package-list.component.html",
    styleUrls: ["./package-list.component.scss"]
})
export class PackageListComponent implements OnInit {
    /* ***********************************************************
    * Use the @ViewChild decorator to get a reference to the drawer component.
    * It is used in the "onDrawerButtonTap" function below to manipulate the drawer.
    *************************************************************/
    @ViewChild("drawer") drawerComponent: RadSideDrawerComponent;
    @ViewChild("fabView") fabView: ElementRef;
    @ViewChild("actionItem1") actionItem1: ElementRef;
    @ViewChild("actionItem2") actionItem2: ElementRef;
    private _package: Package;
    private _fabMenuOpen: boolean = false;
    private _sideDrawerTransition: DrawerTransitionBase;
    private _isLoading: boolean = false;
    private _packages: ObservableArray<Package> = new ObservableArray<Package>([]);

    constructor (
        private _metrcService: MetrcService,
        private _routerExtensions: RouterExtensions,
        private data: Data,
    ){}


    /* ***********************************************************
    * Use the sideDrawerTransition property to change the open/close animation of the drawer.
    *************************************************************/
    ngOnInit(): void {
        let fabView = <View>this.fabView.nativeElement;
        fabView.opacity = 0
        let actionItem1 = <View>this.actionItem1.nativeElement;
        actionItem1.opacity = 0
        let actionItem2 = <View>this.actionItem2.nativeElement;
        actionItem2.opacity = 0

        this._sideDrawerTransition = new SlideInOnTopTransition();
        this._isLoading = true;

        this._metrcService.getPackages('active')
          .subscribe((packages: Array<Package>) => {
              this._packages = new ObservableArray(packages);
              this._isLoading = false;
          });

    }

    fabTap(actionItem1: View, actionItem2: View): void {
      this._fabMenuOpen = !this._fabMenuOpen
      if (this._fabMenuOpen) {
        actionItem1.animate({ translate: { x: -70, y: 0 } }).then(() => { }, () => { });
        actionItem2.animate({ translate: { x: -50, y: -60 } }).then(() => { }, () => { });
      } else {
        actionItem1.animate({ translate: { x: 0, y: 0 } }).then(() => { }, () => { });
        actionItem2.animate({ translate: { x: 0, y: 0 } }).then(() => { }, () => { });
      }
    }

    actionItem1Tap(): void {
      console.log('create package from ingredients/packages')
      this._routerExtensions.navigate(["/packages/create"],
          {
              animated: true,
              transition: {
                  name: "flipLeft",
                  duration: 500,
                  curve: "linear"
              }
          });
    }

    actionItem2Tap(): void {
      console.log('create package for testing from ingredients/packages')
      this._routerExtensions.navigate(["/packages/createtesting"],
          {
              animated: true,
              transition: {
                  name: "flipLeft",
                  duration: 500,
                  curve: "linear"
              }
          });
    }

    get packages(): ObservableArray<Package> {
        return this._packages;
    }

    get isLoading(): boolean {
        return this._isLoading;
    }

    public onPullToRefreshInitiated(args: ListViewEventData) {
        this._metrcService.getPackages('active')
            .subscribe((packages: Array<Package>) => {
                this._packages = new ObservableArray(packages);
                args.object.notifyPullToRefreshFinished();
            });
    }

    public onItemSelected(args: ListViewEventData, fabView: View, actionItem1: View, actionItem2: View) {
        this.data.storage = _.map(args.object.getSelectedItems(), 'Label')

        if (this.data.storage.length) {
          fabView.opacity = 1
          actionItem1.opacity = 1
          actionItem2.opacity = 1
        } else {
          fabView.opacity = 0
          actionItem1.opacity = 0
          actionItem2.opacity = 0
        }
    }

    public onItemDeselected(args: ListViewEventData, fabView: View, actionItem1: View, actionItem2: View) {
        this.data.storage = _.map(args.object.getSelectedItems(), 'Label')

        if (this.data.storage.length) {
          fabView.opacity = 1
          actionItem1.opacity = 1
          actionItem2.opacity = 1
        } else {
          fabView.opacity = 0
          actionItem1.opacity = 0
          actionItem2.opacity = 0
        }
    }


    /* ***********************************************************
    * Use the "itemTap" event handler of the <RadListView> to navigate to the
    * item details page. Retrieve a reference for the data item (the id) and pass it
    * to the item details page, so that it can identify which data item to display.
    * Learn more about navigating with a parameter in this documentation article:
    * http://docs.nativescript.org/angular/core-concepts/angular-navigation.html#passing-parameter
    *************************************************************/
    onPackageItemTap(args: ListViewEventData): void {
        const tappedPackageItem = args.view.bindingContext;

        this._routerExtensions.navigate(["/packages/package-detail", tappedPackageItem.Id],
        {
            animated: true,
            transition: {
                name: "slide",
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
