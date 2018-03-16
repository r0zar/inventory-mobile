import { Component, OnInit } from "@angular/core";
import { PageRoute, RouterExtensions } from "nativescript-angular/router";
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { alert } from "ui/dialogs";;
import { EventData } from "data/observable";
import { DataFormEventData } from "nativescript-pro-ui/dataform";

import { Batch, BatchPackage } from "../shared/batch.model";
import { MetrcService } from "../../shared/metrc.service";

import _ = require('lodash');

/* ***********************************************************
* This is the batch detail create component.
* This component gets the selected data batch, provides options to create the batch and saves the changes.
*************************************************************/
@Component({
    moduleId: module.id,
    selector: "BatchDetailPackage",
    templateUrl: "./batch-detail-package.component.html",
    styleUrls: ["../batch-detail-edit/batch-detail-edit.component.scss"]
})
export class BatchDetailPackageComponent implements OnInit {
    private _batchPackage: BatchPackage;
    private _rooms: any;
    private _itemCategories: any;
    private _isCreating: boolean = false;

    constructor(
        private http: HttpClient,
        private _metrcService: MetrcService,
        private _pageRoute: PageRoute,
        private _routerExtensions: RouterExtensions
    ) { }

    /* ***********************************************************
    * Use the "ngOnInit" handler to get the data batch id parameter passed through navigation.
    * Get the data batch details from the data service using this id and assign it to the
    * private property that holds it inside the component.
    *************************************************************/
    ngOnInit(): void {

        this._metrcService.getRooms()
            .subscribe((rooms: Array<any>) => {
                this._rooms = _.map(rooms, 'Name')
            });

        this._metrcService.getItemCategories()
            .subscribe((itemCategories: Array<any>) => {
                this._itemCategories = _.map(itemCategories, 'Name')
            });


        this._pageRoute.activatedRoute
            .switchMap((activatedRoute) => activatedRoute.params)
            .forEach((params) => this._batchPackage = new BatchPackage({Id: params.id, Item: 'Immature Plant', ActualDate: new Date()}));

    }

    get batchPackage(): BatchPackage {
        return this._batchPackage;
    }

    get rooms(): any {
        return this._rooms;
    }

    get itemCategories(): any {
        return this._itemCategories;
    }

    get isCreating(): boolean {
        return this._isCreating;
    }

    /* ***********************************************************
    * The create done button uses the data service to save the updated values of the data batch details.
    * Check out the data service as batches/shared/batch.service.ts
    *************************************************************/
    onDoneButtonTap(): void {
        this._isCreating = true
        this._metrcService.createBatchPackage(this._batchPackage)
            .finally(() => this._isCreating = false)
            .subscribe((batch: Batch) => this._routerExtensions.backToPreviousPage());
    }

    /* ***********************************************************
    * The back button is essential for a master-detail feature.
    *************************************************************/
    onBackButtonTap(): void {
        this._routerExtensions.backToPreviousPage();
    }

}
