import { Component, OnInit } from "@angular/core";
import { PageRoute, RouterExtensions } from "nativescript-angular/router";
import { alert } from "ui/dialogs";
import { DatePicker } from "ui/date-picker";
import { EventData } from "data/observable";

import { PackageEditService } from "../shared/package-edit.service";
import { Package } from "../shared/package.model";
import { PackageService } from "../shared/package.service";
import { packageClassList, packageDoorList, packageSeatList, packageTransmissionList } from "./constants";

/* ***********************************************************
* This is the item detail edit component.
* This component gets the selected data item, provides options to edit the item and saves the changes.
*************************************************************/
@Component({
    moduleId: module.id,
    selector: "PackageDetailEdit",
    templateUrl: "./package-detail-edit.component.html",
    styleUrls: ["./package-detail-edit.component.scss"]
})
export class PackageDetailEditComponent implements OnInit {
    private _package: Package;
    private _packageClassOptions: Array<string> = [];
    private _packageDoorOptions: Array<number> = [];
    private _packageSeatOptions: Array<string> = [];
    private _packageTransmissionOptions: Array<string> = [];
    private _isPackageImageDirty: boolean = false;
    private _isUpdating: boolean = false;

    constructor(
        private _packageService: PackageService,
        private _packageEditService: PackageEditService,
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
            .forEach((params) => this._package = this._packageEditService.startEdit(params.id));
    }

    onPickerLoaded(args) {
        let datePicker = <DatePicker>args.object;
        if (this._package.PackagedDate) {
          let date = this._package.PackagedDate.split('-')
          datePicker.year = Number(date[0]);
          datePicker.month =  Number(date[1]);
          datePicker.day =  Number(date[2]);
        }
        datePicker.minDate = new Date(1975, 0, 29);
        datePicker.maxDate = new Date(2025, 4, 12);
    }

    get isUpdating(): boolean {
        return this._isUpdating;
    }

    get package(): Package {
        return this._package;
    }

    get packageClassOptions(): Array<string> {
        return this._packageClassOptions;
    }

    get packageDoorOptions(): Array<number> {
        return this._packageDoorOptions;
    }

    get packageSeatOptions(): Array<string> {
        return this._packageSeatOptions;
    }

    get packageTransmissionOptions(): Array<string> {
        return this._packageTransmissionOptions;
    }

    get packageImageUrl(): string {
        return this._package.imageUrl;
    }

    set packageImageUrl(value: string) {
        this._package.imageUrl = value;
        this._isPackageImageDirty = true;
    }

    /* ***********************************************************
    * The edit cancel button navigates back to the item details page.
    *************************************************************/
    onCancelButtonTap(): void {
        this._routerExtensions.backToPreviousPage();
    }

    /* ***********************************************************
    * The edit done button uses the data service to save the updated values of the data item details.
    * Check out the data service as packages/shared/package.service.ts
    *************************************************************/
    onDoneButtonTap(): void {

        let queue = Promise.resolve();

        this._isUpdating = true;

        if (this._isPackageImageDirty && this._package.imageUrl) {
            queue = queue
                .then(() => this._packageService.uploadImage(this._package.imageStoragePath, this._package.imageUrl))
                .then((uploadedFile: any) => {
                    this._package.imageUrl = uploadedFile.url;
                });
        }

        queue.then(() => this._packageService.update(this._package))
            .then(() => {
                this._isUpdating = false;
                this._routerExtensions.navigate(["/packages"], {
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
                alert({ title: "Oops!", message: "Something went wrong. Please try again.", okButtonText: "Ok" });
            });

    }


    private initializeEditOptions(): void {
        for (const classItem of packageClassList) {
            this._packageClassOptions.push(classItem);
        }

        for (const doorItem of packageDoorList) {
            this._packageDoorOptions.push(doorItem);
        }

        for (const seatItem of packageSeatList) {
            this._packageSeatOptions.push(seatItem);
        }

        for (const transmissionItem of packageTransmissionList) {
            this._packageTransmissionOptions.push(transmissionItem);
        }
    }
}
