import { Injectable, NgZone } from "@angular/core";
import firebase = require("nativescript-plugin-firebase");
import { Observable } from "rxjs/Observable";

import { Config } from "../../shared/config";
import { Package } from "./package.model";

const editableProperties = [
    "Label"
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
export class PackageService {

    private _packages: Array<Package> = [];

    constructor(private _ngZone: NgZone) { }

    load(): Observable<any> {
        return new Observable((observer: any) => {

            const onValueEvent = (snapshot: any) => {
                this._ngZone.run(() => {
                    const results = this.handleSnapshot(snapshot.value);
                    observer.next(results);
                });
            };
            firebase.addValueEventListener(onValueEvent, `/packages`);
        }).catch(this.handleErrors);
    }

    private handleSnapshot(data: any): Array<Package> {
        this._packages = [];

        if (data) {
            for (const Id in data) {
                if (data.hasOwnProperty(Id)) {
                    this._packages.push(new Package(data[Id]));
                }
            }
        }
        return this._packages;
    }

    private handleErrors(error: Response): Observable<any> {
        return Observable.throw(error);
    }
}
