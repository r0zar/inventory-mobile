import { Component, OnInit } from "@angular/core";
import { PageRoute, RouterExtensions } from "nativescript-angular/router";
import { alert } from "ui/dialogs";
import { DatePicker } from "ui/date-picker";
import { EventData } from "data/observable";

import { TransferEditService } from "../shared/transfer-edit.service";
import { Transfer } from "../shared/transfer.model";
import { TransferService } from "../shared/transfer.service";
import { transferClassList, transferDoorList, transferSeatList, transferTransmissionList } from "./constants";

/* ***********************************************************
* This is the item detail edit component.
* This component gets the selected data item, provides options to edit the item and saves the changes.
*************************************************************/
@Component({
    moduleId: module.id,
    selector: "TransferDetailEdit",
    templateUrl: "./transfer-detail-edit.component.html",
    styleUrls: ["./transfer-detail-edit.component.scss"]
})
export class TransferDetailEditComponent implements OnInit {
    private _transfer: Transfer;
    private _transferClassOptions: Array<string> = [];
    private _transferDoorOptions: Array<number> = [];
    private _transferSeatOptions: Array<string> = [];
    private _transferTransmissionOptions: Array<string> = [];
    private _isTransferImageDirty: boolean = false;
    private _isUpdating: boolean = false;

    constructor(
        private _transferService: TransferService,
        private _transferEditService: TransferEditService,
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
            .forEach((params) => this._transfer = this._transferEditService.startEdit(params.id));
    }

    onPickerLoaded(args) {
        let datePicker = <DatePicker>args.object;
        if (this._transfer.ReceivedDateTime) {
          let date = new Date(this._transfer.ReceivedDateTime)
          datePicker.year = date.getFullYear();
          datePicker.month =  date.getMonth();
          datePicker.day =  date.getDate();
        }
        datePicker.minDate = new Date(1975, 0, 29);
        datePicker.maxDate = new Date(2025, 4, 12);
    }

    get isUpdating(): boolean {
        return this._isUpdating;
    }

    get transfer(): Transfer {
        return this._transfer;
    }

    get transferClassOptions(): Array<string> {
        return this._transferClassOptions;
    }

    get transferDoorOptions(): Array<number> {
        return this._transferDoorOptions;
    }

    get transferSeatOptions(): Array<string> {
        return this._transferSeatOptions;
    }

    get transferTransmissionOptions(): Array<string> {
        return this._transferTransmissionOptions;
    }

    get transferImageUrl(): string {
        return this._transfer.imageUrl;
    }

    set transferImageUrl(value: string) {
        this._transfer.imageUrl = value;
        this._isTransferImageDirty = true;
    }

    /* ***********************************************************
    * The edit done button uses the data service to save the updated values of the data item details.
    * Check out the data service as transfers/shared/transfer.service.ts
    *************************************************************/
    onDoneButtonTap(): void {

        let queue = Promise.resolve();

        this._isUpdating = true;

        if (this._isTransferImageDirty && this._transfer.imageUrl) {
            this._transfer.imageStoragePath = `transfers/${String(this._transfer.Id)}.jpg`
            queue = queue
                .then(() => this._transferService.uploadImage(this._transfer.imageStoragePath, this._transfer.imageUrl))
                .then((uploadedFile: any) => {this._transfer.imageUrl = uploadedFile.url})
        }

        queue.then(() => this._transferService.update(this._transfer))
            .then(() => {
                this._isUpdating = false;
                this._routerExtensions.navigate(["/transfers"], {
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
        for (const classItem of transferClassList) {
            this._transferClassOptions.push(classItem);
        }

        for (const doorItem of transferDoorList) {
            this._transferDoorOptions.push(doorItem);
        }

        for (const seatItem of transferSeatList) {
            this._transferSeatOptions.push(seatItem);
        }

        for (const transmissionItem of transferTransmissionList) {
            this._transferTransmissionOptions.push(transmissionItem);
        }
    }
}
