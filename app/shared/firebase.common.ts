import firebase = require("nativescript-plugin-firebase");

import { Config } from "./config";
import { AuthService } from "./auth.service";
import { FacilityService } from "../facilities/shared/facility.service";
import { Data } from "./data.service";
import { alert } from "ui/dialogs";

/* ***********************************************************
* The {N} Firebase plugin initialization is explained in the plugin readme here:
* https://github.com/EddyVerbruggen/nativescript-plugin-firebase#usage
* Another important part of the initialization are the prerequisites:
* https://github.com/EddyVerbruggen/nativescript-plugin-firebase#prerequisites
* In this template, Firebase is set up with a custom existing project, so that
* You can build and run this template without creating your own Firebase project.
* Note that if you change the bundle id of the application, the Firebase configuration
* will stop working.
*************************************************************/
firebase.init({
    onMessageReceivedCallback: (message: any) => {
      console.log(`Title: ${message.title}`);
      console.log(`Body: ${message.body}`);
      // if your server passed a custom property called 'foo', then do this:
      console.log(`Value of 'foo': ${message.data.foo}`);
    },
    onPushTokenReceivedCallback: function(token) {
      console.log("Firebase push token: " + token);
    },
    persist: false,
    storageBucket: Config.firebaseBucket,
    onAuthStateChanged: (data: any) => {
      if (data.loggedIn) {
        AuthService.token = data.user.uid;
        // this loads the selected facility into local storage
        firebase.getValue("/users/" + data.user.uid + '/license/number')
          .then(number => {
            if (number.value) {
              FacilityService.facility = number.value
            }
          })
      }
      else {
        AuthService.token = "";
      }
    }
}).then((instance) => console.log("firebase.init done"),
    (error) => console.log("firebase.init error: " + error));
