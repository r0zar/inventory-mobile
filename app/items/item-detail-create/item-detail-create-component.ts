import { Component, OnInit } from "@angular/core";
import { PageRoute, RouterExtensions } from "nativescript-angular/router";
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { alert } from "ui/dialogs";
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
    templateUrl: "./item-detail-create.component.html"
})
export class ItemDetailCreateComponent implements OnInit {
    private _item: Item;
    private _strains: any;
    private _unitsOfMeasure: any;
    private _itemCategories: any;
    private units: any;

    constructor(
        private http: HttpClient,
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

        this._item = new Item({UnitOfMeasure: 'Each'})

        this._metrcService.getStrains()
            .subscribe((strains: Array<any>) => {
                this._strains = _.map(strains, 'Name')
            });

        this._metrcService.getUnitsOfMeasure()
            .subscribe((units: Array<any>) => {
                this.units = units
                this._unitsOfMeasure = units
            });

        this._metrcService.getItemCategories()
            .subscribe((categories: Array<any>) => {
                this._itemCategories = categories
            });

    }

    get item(): Item {
        return this._item;
    }

    get strains(): any {
        return this._strains;
    }

    get itemCategories(): any {
        return _.map(this._itemCategories, 'Name');
    }

    get unitsOfMeasure(): any {
        return _.map(this._unitsOfMeasure, 'Name');
    }

    dfPropertyCommitted(): void {
      let quantityType = _.find(this._itemCategories, {Name: this._item.ItemCategory}).QuantityType
      this._unitsOfMeasure = _.filter(this.units, {QuantityType: quantityType})
    }

    onTap(): void {
      let item = _.words(this._item.ItemCategory)[0]
      var adjective = '';
      var noun = '';
      this.http.get<any[]>(`https://api.datamuse.com/words?rel_jjb=${item}`)
        .subscribe((words: Array<any>) => {
            adjective = _.capitalize(_.sample(words).word)
            this._item = new Item(_.extend(this._item, {Name: `${adjective} ${noun}`}))
        });
      this.http.get<any[]>(`https://api.datamuse.com/words?ml=${this._item.Strain}`)
        .subscribe((words: Array<any>) => {
            noun = _.capitalize(_.sample(words).word)
            this._item = new Item(_.extend(this._item, {Name: `${adjective} ${noun}`}))
        });
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
