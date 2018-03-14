import { Component, OnInit } from "@angular/core";
import { PageRoute, RouterExtensions } from "nativescript-angular/router";
import { alert } from "ui/dialogs";
import { DatePicker } from "ui/date-picker";
import { EventData } from "data/observable";

import { RoomEditService } from "../shared/room-edit.service";
import { Room } from "../shared/room.model";
import { RoomService } from "../shared/room.service";
import { roomClassList, roomDoorList, roomSeatList, roomTransmissionList } from "./constants";

/* ***********************************************************
* This is the room detail edit component.
* This component gets the selected data room, provides options to edit the room and saves the changes.
*************************************************************/
@Component({
    moduleId: module.id,
    selector: "RoomDetailEdit",
    templateUrl: "./room-detail-edit.component.html",
    styleUrls: ["./room-detail-edit.component.scss"]
})
export class RoomDetailEditComponent implements OnInit {
    private _room: Room;
    private _roomClassOptions: Array<string> = [];
    private _roomDoorOptions: Array<number> = [];
    private _roomSeatOptions: Array<string> = [];
    private _roomTransmissionOptions: Array<string> = [];
    private _isRoomImageDirty: boolean = false;
    private _isUpdating: boolean = false;

    constructor(
        private _roomService: RoomService,
        private _roomEditService: RoomEditService,
        private _pageRoute: PageRoute,
        private _routerExtensions: RouterExtensions
    ) { }

    /* ***********************************************************
    * Use the "ngOnInit" handler to get the data room id parameter passed through navigation.
    * Get the data room details from the data service using this id and assign it to the
    * private property that holds it inside the component.
    *************************************************************/
    ngOnInit(): void {
        this.initializeEditOptions();

        /* ***********************************************************
        * Learn more about how to get navigation parameters in this documentation article:
        * http://docs.nativescript.org/angular/core-concepts/angular-navigation.html#passing-parameter
        *************************************************************/
        this._pageRoute.activatedRoute
            .switchMap((activatedRoute) => activatedRoute.params)
            .forEach((params) => this._room = this._roomEditService.startEdit(params.id));
    }

    onPickerLoaded(args) {
    }

    get isUpdating(): boolean {
        return this._isUpdating;
    }

    get room(): Room {
        return new Room(this._room);
    }

    get roomClassOptions(): Array<string> {
        return this._roomClassOptions;
    }

    get roomDoorOptions(): Array<number> {
        return this._roomDoorOptions;
    }

    get roomSeatOptions(): Array<string> {
        return this._roomSeatOptions;
    }

    get roomTransmissionOptions(): Array<string> {
        return this._roomTransmissionOptions;
    }

    get roomImageUrl(): string {
        return this._room.imageUrl;
    }

    set roomImageUrl(value: string) {
        this._room.imageUrl = value;
        this._isRoomImageDirty = true;
    }

    /* ***********************************************************
    * The edit done button uses the data service to save the updated values of the data room details.
    * Check out the data service as rooms/shared/room.service.ts
    *************************************************************/
    onDoneButtonTap(): void {

        let queue = Promise.resolve();

        this._isUpdating = true;

        if (this._isRoomImageDirty && this._room.imageUrl) {
            this._room.imageStoragePath = `rooms/${String(this._room.Id)}.jpg`
            queue = queue
                .then(() => this._roomService.uploadImage(this._room.imageStoragePath, this._room.imageUrl))
                .then((uploadedFile: any) => {this._room.imageUrl = uploadedFile.url})
        }

        queue.then(() => this._roomService.update(this._room))
            .then(() => {
                this._isUpdating = false;
                this._routerExtensions.navigate(["/rooms"], {
                    clearHistory: true,
                    animated: true,
                    transition: {
                        name: "slideBottom",
                        duration: 200,
                        curve: "ease"
                    }
                });
            })
            .catch((errorMessage: any) => {
                this._isUpdating = false;
                alert({ title: "Oops!", message: errorMessage, okButtonText: "Ok" });
            });

    }

    /* ***********************************************************
    * The back button is essential for a master-detail feature.
    *************************************************************/
    onBackButtonTap(): void {
        this._routerExtensions.backToPreviousPage();
    }


    private initializeEditOptions(): void {
        for (const classRoom of roomClassList) {
            this._roomClassOptions.push(classRoom);
        }

        for (const doorRoom of roomDoorList) {
            this._roomDoorOptions.push(doorRoom);
        }

        for (const seatRoom of roomSeatList) {
            this._roomSeatOptions.push(seatRoom);
        }

        for (const transmissionRoom of roomTransmissionList) {
            this._roomTransmissionOptions.push(transmissionRoom);
        }
    }
}
