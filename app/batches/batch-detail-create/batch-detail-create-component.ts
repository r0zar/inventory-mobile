import { Component, OnInit } from "@angular/core";
import { PageRoute, RouterExtensions } from "nativescript-angular/router";
import { alert } from "ui/dialogs";;
import { EventData } from "data/observable";
import { DataFormEventData } from "nativescript-pro-ui/dataform";

import { Batch } from "../shared/batch.model";
import { MetrcService } from "../../shared/metrc.service";

import _ = require('lodash');

/* ***********************************************************
* This is the batch detail create component.
* This component gets the selected data batch, provides options to create the batch and saves the changes.
*************************************************************/
@Component({
    moduleId: module.id,
    selector: "BatchDetailCreate",
    templateUrl: "./batch-detail-create.component.html",
    styleUrls: ["../batch-detail-edit/batch-detail-edit.component.scss"]
})
export class BatchDetailCreateComponent implements OnInit {
    private _batch: Batch;
    private _strains: any;
    private _unitsOfMeasure: any;
    private _batchCategories: any;

    constructor(
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

        this._batch = new Batch({})

        this._metrcService.getStrains()
            .subscribe((strains: Array<any>) => {
                this._strains = _.map(strains, 'Name')
            });

    }

    get batch(): Batch {
        console.dir(this._batch)
        return this._batch;
    }

    get strains(): any {
        return this._strains;
    }

    get batchCategories(): any {
        return this._batchCategories;
    }

    get unitsOfMeasure(): any {
        return this._unitsOfMeasure;
    }

    /* ***********************************************************
    * The create done button uses the data service to save the updated values of the data batch details.
    * Check out the data service as batches/shared/batch.service.ts
    *************************************************************/
    onDoneButtonTap(): void {
        this._metrcService.createPlantings(this._batch)
            .subscribe((batch: Batch) => this._routerExtensions.backToPreviousPage());
    }

    /* ***********************************************************
    * The back button is essential for a master-detail feature.
    *************************************************************/
    onBackButtonTap(): void {
        this._routerExtensions.backToPreviousPage();
    }

}
