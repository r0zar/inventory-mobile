import { Injectable } from '@angular/core';
import { getString, setString } from "application-settings";
import firebase = require("nativescript-plugin-firebase");

@Injectable()
export class Data {

    static get licenseNumber(): string {
      return getString("licenseNumber")
    }

    static set licenseNumber(licenseNumber: string) {
      setString("licenseNumber", licenseNumber)
    }

    public storage: any;

    public constructor() {}

}
