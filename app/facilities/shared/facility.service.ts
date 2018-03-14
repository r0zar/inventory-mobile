import { Injectable, NgZone } from "@angular/core";
import { Http } from "@angular/http";
import firebase = require("nativescript-plugin-firebase");
import { Observable } from "rxjs/Observable";
import { getString, setString } from "application-settings";

import { Config } from "../../shared/config";
import { Facility } from "./facility.model";

import _ = require('lodash');

const editableProperties = [
    "Id",
    "Label",
    "Quantity",
    "FacilityType",
    "imageUrl"
];

/* ***********************************************************
* This is the master detail data service. It handles all the data operations
* of retrieving and updating the data. In this case, it is connected to Firebase and
* is using the {N} Firebase plugin. Learn more about it here:
* https://github.com/EddyVerbruggen/nativescript-plugin-firebase
* The {N} Firebase plugin needs some initialization steps before the app starts.
* Check out how it is imported in the main.ts file and the actual script in /shared/firebase.common.ts file.
*************************************************************/
@Injectable()
export class FacilityService {
    private static cloneUpdateModel(facility: Facility): object {
        return editableProperties.reduce((a, e) => (a[e] = facility[e], a), {}); // tslint:disable-line:ban-comma-operator
    }

    private _facilities: Array<Facility> = [];

    constructor(private _ngZone: NgZone) { }

    getFacilityById(id: string): Facility {
        if (!id) {
            return;
        }

        return this._facilities.filter((facility) => {
            return facility.LicenseNumber == id;
        })[0];
    }

    static get facility(): string {
      return getString("facility");
    }

    static set facility(thefacility: string) {
      setString("facility", thefacility);
    }

    load(): Observable<any> {
        return new Observable((observer: any) => {
            const path = "facilities";

            const onValueEvent = (snapshot: any) => {
                this._ngZone.run(() => {
                    //snapshot.value = _.filter(snapshot.value, {owner: 'rragsda'})
                    const results = this.handleSnapshot(snapshot.value);
                    observer.next(results);
                });
            };
            firebase.addValueEventListener(onValueEvent, `/${path}`);
        }).catch(this.handleErrors);
    }

    update(facilityModel: Facility): Promise<any> {
        const updateModel = FacilityService.cloneUpdateModel(facilityModel);

        return firebase.update("/facilities/" + facilityModel.LicenseNumber, updateModel);
    }

    uploadImage(remoteFullPath: string, localFullPath: string): Promise<any> {
        return firebase.uploadFile({
            localFullPath,
            remoteFullPath,
            onProgress: null
        });
    }

    private handleSnapshot(data: any): Array<Facility> {
        this._facilities = [];

        if (data) {
            for (const id in data) {
                if (data[id] && data.hasOwnProperty(id)) {
                    this._facilities.push(new Facility(data[id]));
                }
            }
        }

        return this._facilities;
    }

    private handleErrors(error: Response): Observable<any> {
        return Observable.throw(error);
    }
}
