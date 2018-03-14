import { Component, OnInit } from "@angular/core";
import { PageRoute, RouterExtensions } from "nativescript-angular/router";
import { alert } from "ui/dialogs";;
import { EventData } from "data/observable";
import { DataFormEventData } from "nativescript-pro-ui/dataform";

import { Item } from "../shared/item.model";
import { MetrcService } from "../../shared/metrc.service";

import _ = require('lodash');

/* ***********************************************************
* This is the item detail create component.
* This component gets the selected data item, provides options to create the item and saves the changes.
*************************************************************/
@Component({
    moduleId: module.id,
    selector: "ItemDetailCreate",
    templateUrl: "./item-detail-create.component.html",
    styleUrls: ["../item-detail-edit/item-detail-edit.component.scss"]
})
export class ItemDetailCreateComponent implements OnInit {
    private _item: Item;
    private _strains: any;
    private _unitsOfMeasure: any;
    private _itemCategories: any;

    constructor(
        private _metrcService: MetrcService,
        private _pageRoute: PageRoute,
        private _routerExtensions: RouterExtensions
    ) { }

    /* ***********************************************************
    * Use the "ngOnInit" handler to get the data item id parameter passed through navigation.
    * Get the data item details from the data service using this id and assign it to the
    * private property that holds it inside the component.
    *************************************************************/
    ngOnInit(): void {

        this._item = new Item({})

        this._metrcService.getStrains()
            .subscribe((strains: Array<any>) => {
                this._strains = _.map(strains, 'Name')
            });

        this._metrcService.getUnitsOfMeasure()
            .subscribe((units: Array<any>) => {
                this._unitsOfMeasure = _.map(units, 'Name')
            });

        this._metrcService.getItemCategories()
            .subscribe((categories: Array<any>) => {
                this._itemCategories = _.map(categories, 'Name')
            });

    }

    get item(): Item {
        console.dir(this._item)
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

    /* ***********************************************************
    * The create done button uses the data service to save the updated values of the data item details.
    * Check out the data service as items/shared/item.service.ts
    *************************************************************/
    onDoneButtonTap(): void {
        this._metrcService.createItem(this._item)
            .subscribe((item: Item) => this._routerExtensions.backToPreviousPage());
    }

    /* ***********************************************************
    * The back button is essential for a master-detail feature.
    *************************************************************/
    onBackButtonTap(): void {
        this._routerExtensions.backToPreviousPage();
    }

}
