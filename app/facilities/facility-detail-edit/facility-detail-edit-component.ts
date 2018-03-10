import { Component, OnInit } from "@angular/core";
import { PageRoute, RouterExtensions } from "nativescript-angular/router";
import { alert } from "ui/dialogs";
import { DatePicker } from "ui/date-picker";
import { EventData } from "data/observable";

import { FacilityEditService } from "../shared/facility-edit.service";
import { Facility } from "../shared/facility.model";
import { FacilityService } from "../shared/facility.service";
import { facilityClassList, facilityDoorList, facilitySeatList, facilityTransmissionList } from "./constants";

/* ***********************************************************
* This is the item detail edit component.
* This component gets the selected data item, provides options to edit the item and saves the changes.
*************************************************************/
@Component({
    moduleId: module.id,
    selector: "FacilityDetailEdit",
    templateUrl: "./facility-detail-edit.component.html",
    styleUrls: ["./facility-detail-edit.component.scss"]
})
export class FacilityDetailEditComponent implements OnInit {
    private _facility: Facility;
    private _facilityClassOptions: Array<string> = [];
    private _facilityDoorOptions: Array<number> = [];
    private _facilitySeatOptions: Array<string> = [];
    private _facilityTransmissionOptions: Array<string> = [];
    private _isFacilityImageDirty: boolean = false;
    private _isUpdating: boolean = false;

    constructor(
        private _facilityService: FacilityService,
        private _facilityEditService: FacilityEditService,
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
            .forEach((params) => this._facility = this._facilityEditService.startEdit(params.id));
    }

    onPickerLoaded(args) {
        let datePicker = <DatePicker>args.object;
        if (this._facility.SupportActivationDate) {
          let date = new Date(this._facility.SupportActivationDate)
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

    get facility(): Facility {
        return this._facility;
    }

    get facilityClassOptions(): Array<string> {
        return this._facilityClassOptions;
    }

    get facilityDoorOptions(): Array<number> {
        return this._facilityDoorOptions;
    }

    get facilitySeatOptions(): Array<string> {
        return this._facilitySeatOptions;
    }

    get facilityTransmissionOptions(): Array<string> {
        return this._facilityTransmissionOptions;
    }

    get facilityImageUrl(): string {
        return this._facility.imageUrl;
    }

    set facilityImageUrl(value: string) {
        this._facility.imageUrl = value;
        this._isFacilityImageDirty = true;
    }

    /* ***********************************************************
    * The edit done button uses the data service to save the updated values of the data item details.
    * Check out the data service as facilities/shared/facility.service.ts
    *************************************************************/
    onDoneButtonTap(): void {

        let queue = Promise.resolve();

        this._isUpdating = true;

        if (this._isFacilityImageDirty && this._facility.imageUrl) {
            this._facility.imageStoragePath = `facilities/${this._facility.LicenseNumber}.jpg`
            queue = queue
                .then(() => this._facilityService.uploadImage(this._facility.imageStoragePath, this._facility.imageUrl))
                .then((uploadedFile: any) => {this._facility.imageUrl = uploadedFile.url})
        }

        queue.then(() => this._facilityService.update(this._facility))
            .then(() => {
                this._isUpdating = false;
                this._routerExtensions.navigate(["/facilities"], {
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
        for (const classItem of facilityClassList) {
            this._facilityClassOptions.push(classItem);
        }

        for (const doorItem of facilityDoorList) {
            this._facilityDoorOptions.push(doorItem);
        }

        for (const seatItem of facilitySeatList) {
            this._facilitySeatOptions.push(seatItem);
        }

        for (const transmissionItem of facilityTransmissionList) {
            this._facilityTransmissionOptions.push(transmissionItem);
        }
    }
}
