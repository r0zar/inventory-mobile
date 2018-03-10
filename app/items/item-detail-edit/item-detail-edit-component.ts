import { Component, OnInit } from "@angular/core";
import { PageRoute, RouterExtensions } from "nativescript-angular/router";
import { alert } from "ui/dialogs";
import { DatePicker } from "ui/date-picker";
import { EventData } from "data/observable";

import { ItemEditService } from "../shared/item-edit.service";
import { Item } from "../shared/item.model";
import { ItemService } from "../shared/item.service";
import { itemClassList, itemDoorList, itemSeatList, itemTransmissionList } from "./constants";

/* ***********************************************************
* This is the item detail edit component.
* This component gets the selected data item, provides options to edit the item and saves the changes.
*************************************************************/
@Component({
    moduleId: module.id,
    selector: "ItemDetailEdit",
    templateUrl: "./item-detail-edit.component.html",
    styleUrls: ["./item-detail-edit.component.scss"]
})
export class ItemDetailEditComponent implements OnInit {
    private _item: Item;
    private _itemClassOptions: Array<string> = [];
    private _itemDoorOptions: Array<number> = [];
    private _itemSeatOptions: Array<string> = [];
    private _itemTransmissionOptions: Array<string> = [];
    private _isItemImageDirty: boolean = false;
    private _isUpdating: boolean = false;

    constructor(
        private _itemService: ItemService,
        private _itemEditService: ItemEditService,
        private _pageRoute: PageRoute,
        private _routerExtensions: RouterExtensions
    ) { }

    /* ***********************************************************
    * Use the "ngOnInit" handler to get the data item id parameter passed through navigation.
    * Get the data item details from the data service using this id and assign it to the
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
            .forEach((params) => this._item = this._itemEditService.startEdit(params.id));
    }

    onPickerLoaded(args) {
    }

    get isUpdating(): boolean {
        return this._isUpdating;
    }

    get item(): Item {
        return new Item(this._item);
    }

    get itemClassOptions(): Array<string> {
        return this._itemClassOptions;
    }

    get itemDoorOptions(): Array<number> {
        return this._itemDoorOptions;
    }

    get itemSeatOptions(): Array<string> {
        return this._itemSeatOptions;
    }

    get itemTransmissionOptions(): Array<string> {
        return this._itemTransmissionOptions;
    }

    get itemImageUrl(): string {
        return this._item.imageUrl;
    }

    set itemImageUrl(value: string) {
        this._item.imageUrl = value;
        this._isItemImageDirty = true;
    }

    /* ***********************************************************
    * The edit done button uses the data service to save the updated values of the data item details.
    * Check out the data service as items/shared/item.service.ts
    *************************************************************/
    onDoneButtonTap(): void {

        let queue = Promise.resolve();

        this._isUpdating = true;

        if (this._isItemImageDirty && this._item.imageUrl) {
            this._item.imageStoragePath = `items/${String(this._item.Id)}.jpg`
            queue = queue
                .then(() => this._itemService.uploadImage(this._item.imageStoragePath, this._item.imageUrl))
                .then((uploadedFile: any) => {this._item.imageUrl = uploadedFile.url})
        }

        queue.then(() => this._itemService.update(this._item))
            .then(() => {
                this._isUpdating = false;
                this._routerExtensions.navigate(["/items"], {
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
        for (const classItem of itemClassList) {
            this._itemClassOptions.push(classItem);
        }

        for (const doorItem of itemDoorList) {
            this._itemDoorOptions.push(doorItem);
        }

        for (const seatItem of itemSeatList) {
            this._itemSeatOptions.push(seatItem);
        }

        for (const transmissionItem of itemTransmissionList) {
            this._itemTransmissionOptions.push(transmissionItem);
        }
    }
}
