import { Injectable } from "@angular/core";
import firebase = require("nativescript-plugin-firebase");
import { getString, setString } from "application-settings";
import _ = require('lodash');

@Injectable()
export class FacilityService {

    constructor() {
    }

    static get facility(): string {
      return getString("facility")
    }

    static set facility(thefacility: string) {
      firebase.getCurrentUser().then(user => firebase.setValue("/users/" + user.uid, thefacility))
      setString("facility", thefacility);
    }

    static get licenseType(): string {
      return getString("licenseType");
    }

    static set licenseType(type: string) {
      setString("licenseType", type);
    }

}
