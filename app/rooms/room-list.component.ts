import { Component, OnInit, ViewChild, Input } from "@angular/core";
import { ObservableArray } from "data/observable-array";
import { RouterExtensions } from "nativescript-angular/router";
import { ListViewEventData } from "nativescript-pro-ui/listview";
import firebase = require("nativescript-plugin-firebase");
import { DrawerTransitionBase, SlideInOnTopTransition } from "nativescript-pro-ui/sidedrawer";
import { RadSideDrawerComponent } from "nativescript-pro-ui/sidedrawer/angular";

import { Room } from "./shared/room.model";
import { RoomService } from "./shared/room.service";
import { MetrcService } from "../shared/metrc.service";

import _ = require('lodash');

@Component({
    selector: "Rooms",
    moduleId: module.id,
    templateUrl: "./room-list.component.html",
    styleUrls: ["./room-list.component.scss"]
})
export class RoomListComponent implements OnInit {
    /* ***********************************************************
    * Use the @ViewChild decorator to get a reference to the drawer component.
    * It is used in the "onDrawerButtonTap" function below to manipulate the drawer.
    *************************************************************/
    @ViewChild("drawer") drawerComponent: RadSideDrawerComponent;

    private _sideDrawerTransition: DrawerTransitionBase;

    private _isLoading: boolean = false;

    private _rooms: ObservableArray<Room> = new ObservableArray<Room>([]);

    constructor (
        private _roomService: RoomService,
        private _metrcService: MetrcService,
        private _routerExtensions: RouterExtensions,
    ){}


    /* ***********************************************************
    * Use the sideDrawerTransition property to change the open/close animation of the drawer.
    *************************************************************/
    ngOnInit(): void {
        this._sideDrawerTransition = new SlideInOnTopTransition();
        this._isLoading = true;

        this._metrcService.getRooms()
            .finally(() => {
              this._isLoading = false
            })
            .subscribe((rooms: Array<Room>) => {
                this._rooms = new ObservableArray(rooms);
                this._isLoading = false;
            });

        /* ***********************************************************
        * The data is retrieved remotely from FireBase.
        * The actual data retrieval code is wrapped in a data service.
        * Check out the service in rooms/shared/room.service.ts
        *************************************************************/
        // this._roomService.load()
        //     .finally(() => {
        //       this._isLoading = false
        //     })
        //     .subscribe((rooms: Array<Room>) => {
        //         this._rooms = new ObservableArray(rooms);
        //         this._isLoading = false;
        //     });

    }

    get rooms(): ObservableArray<Room> {
        return this._rooms;
    }

    get isLoading(): boolean {
        return this._isLoading;
    }

    /* ***********************************************************
    * Use the "itemTap" event handler of the <RadListView> to navigate to the
    * room details page. Retrieve a reference for the data room (the id) and pass it
    * to the room details page, so that it can identify which data room to display.
    * Learn more about navigating with a parameter in this documentation article:
    * http://docs.nativescript.org/angular/core-concepts/angular-navigation.html#passing-parameter
    *************************************************************/
    onRoomItemTap(args: ListViewEventData): void {
        const tappedRoomItem = args.view.bindingContext;

        this._routerExtensions.navigate(["/rooms/room-detail", tappedRoomItem.Id],
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
        this._routerExtensions.navigate(["/rooms/create"],
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
