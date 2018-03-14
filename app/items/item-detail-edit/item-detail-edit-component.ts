import { Component, OnInit } from "@angular/core";
import { PageRoute, RouterExtensions } from "nativescript-angular/router";
import { alert } from "ui/dialogs";
import { DatePicker } from "ui/date-picker";
import { EventData } from "data/observable";

import { ItemEditService } from "../shared/item-edit.service";
import { Item } from "../shared/item.model";
import { ItemService } from "../shared/item.service";
import { MetrcService } from "../../shared/metrc.service";

import _ = require('lodash');


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
    private _strains: any;
    private _unitsOfMeasure: any;
    private _itemCategories: any;

    constructor(
        private _itemService: ItemService,
        private _metrcService: MetrcService,
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

        this._metrcService.getStrains()
            .subscribe((strains: Array<any>) => {
                //this._strains = _.map(strains, strain => {return {key: strain.Id, label: strain.Name}})
                this._strains = _.map(strains, 'Name')
            });

        this._metrcService.getUnitsOfMeasure()
            .subscribe((units: Array<any>) => {
                //this._strains = _.map(strains, strain => {return {key: strain.Id, label: strain.Name}})
                this._unitsOfMeasure = _.map(units, 'Name')
            });

        this._metrcService.getItemCategories()
            .subscribe((categories: Array<any>) => {
                //this._strains = _.map(strains, strain => {return {key: strain.Id, label: strain.Name}})
                this._itemCategories = _.map(categories, 'Name')
            });


        /* ***********************************************************
        * Learn more about how to get navigation parameters in this documentation article:
        * http://docs.nativescript.org/angular/core-concepts/angular-navigation.html#passing-parameter
        *************************************************************/
        this._pageRoute.activatedRoute
            .switchMap((activatedRoute) => activatedRoute.params)
            .forEach((params) => {
              this._metrcService.getItem(params.id)
                  .subscribe((item: Item) => this._item = new Item(item));
            });
    }

    onPickerLoaded(args) {
    }

    get isUpdating(): boolean {
        return this._isUpdating;
    }

    get item(): Item {
        return this._item;
    }

    get strains(): any {
        return this._strains;
    }

    get itemCategories(): any {
        return this._itemCategories;
    }

    get unitsOfMeasure(): any {
        return this._unitsOfMeasure;
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
        this._metrcService.updateItem(this._item)
            .subscribe((item: Item) => this._routerExtensions.backToPreviousPage());
    }

    /* ***********************************************************
    * The back button is essential for a master-detail feature.
    *************************************************************/
    onBackButtonTap(): void {
        this._routerExtensions.backToPreviousPage();
    }

}
