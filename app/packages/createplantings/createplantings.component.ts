import { Component, OnInit } from "@angular/core";
import { PageRoute, RouterExtensions } from "nativescript-angular/router";
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { alert } from "ui/dialogs";;
import { EventData } from "data/observable";
import { DataFormEventData } from "nativescript-pro-ui/dataform";

import { Plantings } from "../shared/package.model";
import { MetrcService } from "../../shared/metrc.service";
import { BarcodeScanner } from 'nativescript-barcodescanner';

import _ = require('lodash');

/* ***********************************************************
* This is the noun verb component.
* This component gets the selected data noun, provides options to verb the noun and saves the changes.
*************************************************************/
@Component({
    moduleId: module.id,
    selector: "CreatePlantings",
    templateUrl: "./createplantings.component.html"
})
export class CreatePlantingsComponent implements OnInit {
    private _plantings: Plantings;
    private _rooms: any;
    private _batches: any;
    private _unitsOfWeight: any;
    private _strains: any;
    private _isLoading: boolean = false;

    constructor(
        private barcodeScanner: BarcodeScanner,
        private http: HttpClient,
        private _metrcService: MetrcService,
        private _pageRoute: PageRoute,
        private _routerExtensions: RouterExtensions
    ) { }

    /* ***********************************************************
    * Use the "ngOnInit" handler to get the data noun id parameter passed through navigation.
    * Get the data noun details from the data service using this id and assign it to the
    * private property that holds it inside the component.
    *************************************************************/
    ngOnInit(): void {

        this._metrcService.getRooms()
            .subscribe((rooms: Array<any>) => {
                this._rooms = _.map(rooms, 'Name')
            });

        this._metrcService.getBatches()
            .subscribe((batches: Array<any>) => {
                this._batches = _.map(batches, 'Name')
            });

        this._metrcService.getUnitsOfMeasure()
            .subscribe((units: Array<any>) => {
                this._unitsOfWeight = units
            });

        this._metrcService.getStrains()
            .subscribe((strains: Array<any>) => {
                this._strains = _.map(strains, 'Name')
            });

        this._pageRoute.activatedRoute
            .switchMap((activatedRoute) => activatedRoute.params)
            .forEach((params) => {
              let adjective = ''
              let noun = ''
              this.http.get<any[]>("https://api.datamuse.com/words?rel_jjb=marijuana")
                .subscribe((words: Array<any>) => {
                    adjective = _.capitalize(_.sample(words).word)
                    this._plantings = new Plantings({PackageLabel: params.id, PlantBatchName: `${adjective} ${noun}`})
                });
              this.http.get<any[]>("https://api.datamuse.com/words?rel_jja=grass")
                .subscribe((words: Array<any>) => {
                    noun = _.capitalize(_.sample(words).word)
                    this._plantings = new Plantings({PackageLabel: params.id, PlantBatchName: `${adjective} ${noun}`})
                });
            });

    }

    get plantings(): Plantings {
        return this._plantings;
    }

    get rooms(): any {
        return this._rooms;
    }

    get batches(): any {
        return this._batches;
    }

    get unitsOfWeight(): any {
        return _.map(_.filter(this._unitsOfWeight, {QuantityType: 'WeightBased'}), 'Name');
    }

    get strains(): any {
        return this._strains;
    }

    get isLoading(): boolean {
        return this._isLoading;
    }

    onScanTap(): void {
      var scanner = this.barcodeScanner;
      scanner.available()
        .then(() => {
          scanner.hasCameraPermission()
            .then(granted => {
              if (granted) {
                this.barcode(scanner)
              } else {
                scanner.requestCameraPermission()
                  .then(granted => {
                    return granted ? this.barcode(scanner) : null
                  })
              }
            })

        })
    }

    barcode(scanner: BarcodeScanner): void {
      scanner.scan({
        message: "Scan the new package RFID tag.",
        orientation: 'landscape',
        formats: "CODE_128",
        torchOn: true,
        showTorchButton: true,
        openSettingsIfPermissionWasPreviouslyDenied: true,
        resultDisplayDuration: 500,
        closeCallback: () => { console.log("Scanner closed"); }, // invoked when the scanner was closed
        reportDuplicates: true // which is the default
      })
      .then(result => {
        this._plantings.PackageLabel = result.text
      })
      .catch(error => console.log("No scan: " + error))
    }

    /* ***********************************************************
    * The verb done button uses the data service to save the updated values of the data noun details.
    * Check out the data service as nounes/shared/noun.service.ts
    *************************************************************/
    onDoneButtonTap(): void {
        this._isLoading = true
        this._metrcService.createPlantings(this._plantings)
            .finally(() => this._isLoading = false)
            .subscribe(() => this._routerExtensions.backToPreviousPage());
    }

    /* ***********************************************************
    * The back button is essential for a master-detail feature.
    *************************************************************/
    onBackButtonTap(): void {
        this._routerExtensions.backToPreviousPage();
    }

}
