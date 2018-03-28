import { Component, OnInit, ViewChild, Input } from "@angular/core";
import { ObservableArray } from "data/observable-array";
import { RouterExtensions } from "nativescript-angular/router";
import { ListViewEventData } from "nativescript-pro-ui/listview";
import { DataFormEventData } from "nativescript-pro-ui/dataform";
import firebase = require("nativescript-plugin-firebase");
import { DrawerTransitionBase, SlideInOnTopTransition } from "nativescript-pro-ui/sidedrawer";
import { RadSideDrawerComponent } from "nativescript-pro-ui/sidedrawer/angular";

import { Item } from "./shared/item.model";
import { ItemService } from "./shared/item.service";
import { MetrcService } from "../shared/metrc.service";

import _ = require('lodash');

@Component({
    selector: "Items",
    moduleId: module.id,
    templateUrl: "./item-list.component.html",
    styleUrls: ["./item-list.component.scss"]
})
export class ItemListComponent implements OnInit {
    /* ***********************************************************
    * Use the @ViewChild decorator to get a reference to the drawer component.
    * It is used in the "onDrawerButtonTap" function below to manipulate the drawer.
    *************************************************************/
    @ViewChild("drawer") drawerComponent: RadSideDrawerComponent;
    private _sideDrawerTransition: DrawerTransitionBase;
    private _isLoading: boolean = false;
    private _items: ObservableArray<Item> = new ObservableArray<Item>([]);
    private uid: string;

    constructor (
        private _itemService: ItemService,
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
            this._metrcService.getItems()
                .subscribe((items: Array<Item>) => {

                    // this is for creating unique ids in the sandbox
                    items = _.filter(items, item => _.includes(item.Name, this.uid))
                    _.forEach(items, item => {item.Name = item.Name.replace(this.uid, '')})

                    this._items = new ObservableArray(items);
                    this._isLoading = false;
                })
          })

    }

    get items(): ObservableArray<Item> {
        return this._items;
    }

    get isLoading(): boolean {
        return this._isLoading;
    }

    public onPullToRefreshInitiated(args: ListViewEventData) {
        // main rooms lookup logic
        this._metrcService.getItems()
            .subscribe((items: Array<Item>) => {

                // this is for creating unique ids in the sandbox
                items = _.filter(items, item => _.includes(item.Name, this.uid))
                _.forEach(items, item => {item.Name = item.Name.replace(this.uid, '')})

                this._items = new ObservableArray(items);
                this._isLoading = false;
                args.object.notifyPullToRefreshFinished();
            })

    }

    /* ***********************************************************
    * Use the "itemTap" event handler of the <RadListView> to navigate to the
    * item details page. Retrieve a reference for the data item (the id) and pass it
    * to the item details page, so that it can identify which data item to display.
    * Learn more about navigating with a parameter in this documentation article:
    * http://docs.nativescript.org/angular/core-concepts/angular-navigation.html#passing-parameter
    *************************************************************/
    onItemItemTap(args: ListViewEventData): void {
        const tappedItemItem = args.view.bindingContext;

        this._routerExtensions.navigate(["/items/item-detail", tappedItemItem.Id],
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
        this._routerExtensions.navigate(["/items/item-detail-create"],
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
