import { Component, OnInit } from "@angular/core";
import { PageRoute, RouterExtensions } from "nativescript-angular/router";
import { alert } from "ui/dialogs";
import { DatePicker } from "ui/date-picker";
import { EventData } from "data/observable";

import { StrainEditService } from "../shared/strain-edit.service";
import { Strain } from "../shared/strain.model";
import { StrainService } from "../shared/strain.service";
import { strainClassList, strainDoorList, strainSeatList, strainTransmissionList } from "./constants";

/* ***********************************************************
* This is the strain detail edit component.
* This component gets the selected data strain, provides options to edit the strain and saves the changes.
*************************************************************/
@Component({
    moduleId: module.id,
    selector: "StrainDetailEdit",
    templateUrl: "./strain-detail-edit.component.html",
    styleUrls: ["./strain-detail-edit.component.scss"]
})
export class StrainDetailEditComponent implements OnInit {
    private _strain: Strain;
    private _strainClassOptions: Array<string> = [];
    private _strainDoorOptions: Array<number> = [];
    private _strainSeatOptions: Array<string> = [];
    private _strainTransmissionOptions: Array<string> = [];
    private _isStrainImageDirty: boolean = false;
    private _isUpdating: boolean = false;

    constructor(
        private _strainService: StrainService,
        private _strainEditService: StrainEditService,
        private _pageRoute: PageRoute,
        private _routerExtensions: RouterExtensions
    ) { }

    /* ***********************************************************
    * Use the "ngOnInit" handler to get the data strain id parameter passed through navigation.
    * Get the data strain details from the data service using this id and assign it to the
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
            .forEach((params) => this._strain = this._strainEditService.startEdit(params.id));
    }

    onPickerLoaded(args) {
    }

    get isUpdating(): boolean {
        return this._isUpdating;
    }

    get strain(): Strain {
        return new Strain(this._strain);
    }

    get strainClassOptions(): Array<string> {
        return this._strainClassOptions;
    }

    get strainDoorOptions(): Array<number> {
        return this._strainDoorOptions;
    }

    get strainSeatOptions(): Array<string> {
        return this._strainSeatOptions;
    }

    get strainTransmissionOptions(): Array<string> {
        return this._strainTransmissionOptions;
    }

    get strainImageUrl(): string {
        return this._strain.imageUrl;
    }

    set strainImageUrl(value: string) {
        this._strain.imageUrl = value;
        this._isStrainImageDirty = true;
    }

    /* ***********************************************************
    * The edit done button uses the data service to save the updated values of the data strain details.
    * Check out the data service as strains/shared/strain.service.ts
    *************************************************************/
    onDoneButtonTap(): void {

        let queue = Promise.resolve();

        this._isUpdating = true;

        if (this._isStrainImageDirty && this._strain.imageUrl) {
            this._strain.imageStoragePath = `strains/${String(this._strain.Id)}.jpg`
            queue = queue
                .then(() => this._strainService.uploadImage(this._strain.imageStoragePath, this._strain.imageUrl))
                .then((uploadedFile: any) => {this._strain.imageUrl = uploadedFile.url})
        }

        queue.then(() => this._strainService.update(this._strain))
            .then(() => {
                this._isUpdating = false;
                this._routerExtensions.navigate(["/strains"], {
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
        for (const classStrain of strainClassList) {
            this._strainClassOptions.push(classStrain);
        }

        for (const doorStrain of strainDoorList) {
            this._strainDoorOptions.push(doorStrain);
        }

        for (const seatStrain of strainSeatList) {
            this._strainSeatOptions.push(seatStrain);
        }

        for (const transmissionStrain of strainTransmissionList) {
            this._strainTransmissionOptions.push(transmissionStrain);
        }
    }
}
