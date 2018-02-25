import { Component, OnInit } from "@angular/core";
import firebase = require("nativescript-plugin-firebase");
import {RouterExtensions} from "nativescript-angular/router";
import * as dialogs from "ui/dialogs";

/* ***********************************************************
* Before you can navigate to this page from your app, you need to reference this page's module in the
* global app router module. Add the following object to the global array of routes:
* { path: "signup", loadChildren: "./signup/signup.module#SignupModule" }
* Note that this simply points the path to the page module file. If you move the page, you need to update the route too.
*************************************************************/

@Component({
    selector: "Signup",
    moduleId: module.id,
    templateUrl: "./signup.component.html"
})
export class SignupComponent implements OnInit {
    name: string;
    email: string;
    password: string;

    constructor(private routerExtensions: RouterExtensions) {
        /* ***********************************************************
        * Use the constructor to inject app services that you need in this component.
        *************************************************************/
    }

    ngOnInit(): void {
        /* ***********************************************************
        * Use the "ngOnInit" handler to initialize data for this component.
        *************************************************************/
    }
    onSignupButtonTap(): void {
      const name = this.name;
      const email = this.email;
      const password = this.password;
      firebase.createUser({email, password})
        .then( result => {
          firebase.updateProfile({displayName: name})
            .catch( errorMessage => console.log(errorMessage))
          dialogs.alert({title: "Hey " + name, message: "Your account has been created.", okButtonText: "Nice!"})
            .then( () => this.routerExtensions.navigate(["/home"], { clearHistory: true }))
        },
        errorMessage => {
          dialogs.alert({title: "Huh, something went wrong...", message: errorMessage, okButtonText: "OK, got it"})
        }
      );
    }
}
