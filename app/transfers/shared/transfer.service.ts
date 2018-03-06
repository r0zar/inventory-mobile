import { Injectable, NgZone } from "@angular/core";
import { Http } from "@angular/http";
import firebase = require("nativescript-plugin-firebase");
import { Observable } from "rxjs/Observable";

import { Config } from "../../shared/config";
import { Transfer } from "./transfer.model";

import _ = require('lodash');

const editableProperties = [
    "Id",
    "Label",
    "Quantity",
    "TransferType",
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
export class TransferService {
    private static cloneUpdateModel(paccage: Transfer): object {
        return editableProperties.reduce((a, e) => (a[e] = paccage[e], a), {}); // tslint:disable-line:ban-comma-operator
    }

    private _transfers: Array<Transfer> = [];

    constructor(private _ngZone: NgZone) { }

    getTransferById(id: number): Transfer {
        if (!id) {
            return;
        }

        return this._transfers.filter((paccage) => {
            return paccage.Id == id;
        })[0];
    }

    load(): Observable<any> {
        return new Observable((observer: any) => {
            const path = "transfers";

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

    update(transferModel: Transfer): Promise<any> {
        const updateModel = TransferService.cloneUpdateModel(transferModel);

        return firebase.update("/transfers/" + transferModel.Id, updateModel);
    }

    uploadImage(remoteFullPath: string, localFullPath: string): Promise<any> {
        return firebase.uploadFile({
            localFullPath,
            remoteFullPath,
            onProgress: null
        });
    }

    private handleSnapshot(data: any): Array<Transfer> {
        this._transfers = [];

        if (data) {
            for (const id in data) {
                if (data[id] && data.hasOwnProperty(id)) {
                    this._transfers.push(new Transfer(data[id]));
                }
            }
        }

        return this._transfers;
    }

    private handleErrors(error: Response): Observable<any> {
        return Observable.throw(error);
    }
}
