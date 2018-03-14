import { Component, OnInit } from "@angular/core";
import { PageRoute, RouterExtensions } from "nativescript-angular/router";
import { alert } from "ui/dialogs";
import { DatePicker } from "ui/date-picker";
import { EventData } from "data/observable";

import { BatchEditService } from "../shared/batch-edit.service";
import { Batch } from "../shared/batch.model";
import { BatchService } from "../shared/batch.service";

/* ***********************************************************
* This is the batch detail edit component.
* This component gets the selected data batch, provides options to edit the batch and saves the changes.
*************************************************************/
@Component({
    moduleId: module.id,
    selector: "BatchDetailEdit",
    templateUrl: "./batch-detail-edit.component.html",
    styleUrls: ["./batch-detail-edit.component.scss"]
})
export class BatchDetailEditComponent implements OnInit {
    private _batch: Batch;
    private _batchClassOptions: Array<string> = [];
    private _batchDoorOptions: Array<number> = [];
    private _batchSeatOptions: Array<string> = [];
    private _batchTransmissionOptions: Array<string> = [];
    private _isBatchImageDirty: boolean = false;
    private _isUpdating: boolean = false;

    constructor(
        private _batchService: BatchService,
        private _batchEditService: BatchEditService,
        private _pageRoute: PageRoute,
        private _routerExtensions: RouterExtensions
    ) { }

    /* ***********************************************************
    * Use the "ngOnInit" handler to get the data batch id parameter passed through navigation.
    * Get the data batch details from the data service using this id and assign it to the
    * private property that holds it inside the component.
    *************************************************************/
    ngOnInit(): void {

        /* ***********************************************************
        * Learn more about how to get navigation parameters in this documentation article:
        * http://docs.nativescript.org/angular/core-concepts/angular-navigation.html#passing-parameter
        *************************************************************/
        this._pageRoute.activatedRoute
            .switchMap((activatedRoute) => activatedRoute.params)
            .forEach((params) => this._batch = this._batchEditService.startEdit(params.id));
    }

    onPickerLoaded(args) {
    }

    get isUpdating(): boolean {
        return this._isUpdating;
    }

    get batch(): Batch {
        return new Batch(this._batch);
    }

    get batchClassOptions(): Array<string> {
        return this._batchClassOptions;
    }

    get batchDoorOptions(): Array<number> {
        return this._batchDoorOptions;
    }

    get batchSeatOptions(): Array<string> {
        return this._batchSeatOptions;
    }

    get batchTransmissionOptions(): Array<string> {
        return this._batchTransmissionOptions;
    }

    get batchImageUrl(): string {
        return this._batch.imageUrl;
    }

    set batchImageUrl(value: string) {
        this._batch.imageUrl = value;
        this._isBatchImageDirty = true;
    }

    /* ***********************************************************
    * The edit done button uses the data service to save the updated values of the data batch details.
    * Check out the data service as batches/shared/batch.service.ts
    *************************************************************/
    onDoneButtonTap(): void {

        let queue = Promise.resolve();

        this._isUpdating = true;

        if (this._isBatchImageDirty && this._batch.imageUrl) {
            this._batch.imageStoragePath = `batches/${String(this._batch.Id)}.jpg`
            queue = queue
                .then(() => this._batchService.uploadImage(this._batch.imageStoragePath, this._batch.imageUrl))
                .then((uploadedFile: any) => {this._batch.imageUrl = uploadedFile.url})
        }

        queue.then(() => this._batchService.update(this._batch))
            .then(() => {
                this._isUpdating = false;
                this._routerExtensions.navigate(["/batches"], {
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

}
