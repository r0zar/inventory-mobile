import { Injectable, NgZone } from "@angular/core";
import { Http } from "@angular/http";
import firebase = require("nativescript-plugin-firebase");
import { Observable } from "rxjs/Observable";

import { Config } from "../../shared/config";
import { Strain } from "./strain.model";

import _ = require('lodash');

const editableProperties = [
    "Id",
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
export class StrainService {
    private static cloneUpdateModel(strain: Strain): object {
        return editableProperties.reduce((a, e) => (a[e] = strain[e], a), {}); // tslint:disable-line:ban-comma-operator
    }

    private _strains: Array<Strain> = [];

    constructor(private _ngZone: NgZone) { }

    getStrainById(id: number): Strain {
        if (!id) {
            return;
        }

        return this._strains.filter((strain) => {
            return strain.Id == id;
        })[0];
    }

    load(): Observable<any> {
        return new Observable((observer: any) => {
            const path = "strains";

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

    update(strainModel: Strain): Promise<any> {
        const updateModel = StrainService.cloneUpdateModel(strainModel);

        return firebase.update("/strains/" + strainModel.Id, updateModel);
    }

    uploadImage(remoteFullPath: string, localFullPath: string): Promise<any> {
        return firebase.uploadFile({
            localFullPath,
            remoteFullPath,
            onProgress: null
        });
    }

    private handleSnapshot(data: any): Array<Strain> {
        this._strains = [];

        if (data) {
            for (const id in data) {
                if (data[id] && data.hasOwnProperty(id)) {
                    this._strains.push(new Strain(data[id]));
                }
            }
        }

        return this._strains;
    }

    private handleErrors(error: Response): Observable<any> {
        return Observable.throw(error);
    }
}
