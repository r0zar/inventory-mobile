import { Component, OnInit } from "@angular/core";
import { PageRoute, RouterExtensions } from "nativescript-angular/router";
import { alert } from "ui/dialogs";
import { DatePicker } from "ui/date-picker";
import { EventData } from "data/observable";

import { HarvestEditService } from "../shared/harvest-edit.service";
import { Harvest } from "../shared/harvest.model";
import { HarvestService } from "../shared/harvest.service";
import { harvestClassList, harvestDoorList, harvestSeatList, harvestTransmissionList } from "./constants";

/* ***********************************************************
* This is the harvest detail edit component.
* This component gets the selected data harvest, provides options to edit the harvest and saves the changes.
*************************************************************/
@Component({
    moduleId: module.id,
    selector: "HarvestDetailEdit",
    templateUrl: "./harvest-detail-edit.component.html",
    styleUrls: ["./harvest-detail-edit.component.scss"]
})
export class HarvestDetailEditComponent implements OnInit {
    private _harvest: Harvest;
    private _harvestClassOptions: Array<string> = [];
    private _harvestDoorOptions: Array<number> = [];
    private _harvestSeatOptions: Array<string> = [];
    private _harvestTransmissionOptions: Array<string> = [];
    private _isHarvestImageDirty: boolean = false;
    private _isUpdating: boolean = false;

    constructor(
        private _harvestService: HarvestService,
        private _harvestEditService: HarvestEditService,
        private _pageRoute: PageRoute,
        private _routerExtensions: RouterExtensions
    ) { }

    /* ***********************************************************
    * Use the "ngOnInit" handler to get the data harvest id parameter passed through navigation.
    * Get the data harvest details from the data service using this id and assign it to the
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
            .forEach((params) => this._harvest = this._harvestEditService.startEdit(params.id));
    }

    onPickerLoaded(args) {
    }

    get isUpdating(): boolean {
        return this._isUpdating;
    }

    get harvest(): Harvest {
        return new Harvest(this._harvest);
    }

    get harvestClassOptions(): Array<string> {
        return this._harvestClassOptions;
    }

    get harvestDoorOptions(): Array<number> {
        return this._harvestDoorOptions;
    }

    get harvestSeatOptions(): Array<string> {
        return this._harvestSeatOptions;
    }

    get harvestTransmissionOptions(): Array<string> {
        return this._harvestTransmissionOptions;
    }

    get harvestImageUrl(): string {
        return this._harvest.imageUrl;
    }

    set harvestImageUrl(value: string) {
        this._harvest.imageUrl = value;
        this._isHarvestImageDirty = true;
    }

    /* ***********************************************************
    * The edit done button uses the data service to save the updated values of the data harvest details.
    * Check out the data service as harvests/shared/harvest.service.ts
    *************************************************************/
    onDoneButtonTap(): void {

        let queue = Promise.resolve();

        this._isUpdating = true;

        if (this._isHarvestImageDirty && this._harvest.imageUrl) {
            this._harvest.imageStoragePath = `harvests/${String(this._harvest.Id)}.jpg`
            queue = queue
                .then(() => this._harvestService.uploadImage(this._harvest.imageStoragePath, this._harvest.imageUrl))
                .then((uploadedFile: any) => {this._harvest.imageUrl = uploadedFile.url})
        }

        queue.then(() => this._harvestService.update(this._harvest))
            .then(() => {
                this._isUpdating = false;
                this._routerExtensions.navigate(["/harvests"], {
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
        for (const classHarvest of harvestClassList) {
            this._harvestClassOptions.push(classHarvest);
        }

        for (const doorHarvest of harvestDoorList) {
            this._harvestDoorOptions.push(doorHarvest);
        }

        for (const seatHarvest of harvestSeatList) {
            this._harvestSeatOptions.push(seatHarvest);
        }

        for (const transmissionHarvest of harvestTransmissionList) {
            this._harvestTransmissionOptions.push(transmissionHarvest);
        }
    }
}
