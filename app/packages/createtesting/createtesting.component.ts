import { Component, OnInit } from "@angular/core";
import { PageRoute, RouterExtensions } from "nativescript-angular/router";
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { alert } from "ui/dialogs";;
import { EventData } from "data/observable";
import { DataFormEventData } from "nativescript-pro-ui/dataform";

import { Package, Create } from "../shared/package.model";
import { MetrcService } from "../../shared/metrc.service";
import { Data } from "../../shared/data.service";
import { BarcodeScanner } from 'nativescript-barcodescanner';

import _ = require('lodash');

/* ***********************************************************
* This is the noun verb component.
* This component gets the selected data noun, provides options to verb the noun and saves the changes.
*************************************************************/
@Component({
    moduleId: module.id,
    selector: "CreateTesting",
    templateUrl: "./createtesting.component.html"
})
export class CreateTestingComponent implements OnInit {
    private _package: Create;
    private _rooms: any;
    private _items: any;
    private _unitsOfWeight: any;
    private _itemCategories: any;
    private _isLoading: boolean = false;

    constructor(
        private barcodeScanner: BarcodeScanner,
        private http: HttpClient,
        private _metrcService: MetrcService,
        private _pageRoute: PageRoute,
        private _routerExtensions: RouterExtensions,
        private data: Data
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

        this._metrcService.getItems()
            .subscribe((items: Array<any>) => {
                this._items = _.map(items, 'Name')
            });

        this._package = new Create({})

    }

    get package(): Create {
        return this._package;
    }

    get rooms(): any {
        return this._rooms;
    }

    get items(): any {
        return this._items;
    }

    get unitsOfWeight(): any {
        return _.map(_.filter(this._unitsOfWeight, {QuantityType: 'WeightBased'}), 'Name');
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
        this._package.Tag = result.text
      })
      .catch(error => console.log("No scan: " + error))
    }

    /* ***********************************************************
    * The verb done button uses the data service to save the updated values of the data noun details.
    * Check out the data service as nounes/shared/noun.service.ts
    *************************************************************/
    onDoneButtonTap(): void {
      let sourcePackages = {
        Ingredients: _.map(this.data.storage, Label => {
          return {Package: Label, Quantity: this._package.Quantity, UnitOfMeasure: this._package.UnitOfMeasure}
        })
      }
      this._package.Quantity = this._package.Quantity * this.data.storage.length
      this._isLoading = true
      this._metrcService.createPackageFromPackages(_.extend(this._package, sourcePackages))
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
