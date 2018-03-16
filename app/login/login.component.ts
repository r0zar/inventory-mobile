import { Component, OnInit } from "@angular/core";
import {Page} from "ui/page";
import { AuthService } from "../shared/auth.service";
import firebase = require("nativescript-plugin-firebase");
import {RouterExtensions} from "nativescript-angular/router";
import { Switch } from "ui/switch";
import * as dialogs from "ui/dialogs";

/* ***********************************************************
* Before you can navigate to this page from your app, you need to reference this page's module in the
* global app router module. Add the following object to the global array of routes:
* { path: "login", loadChildren: "./login/login.module#LoginModule" }
* Note that this simply points the path to the page module file. If you move the page, you need to update the route too.
*************************************************************/

@Component({
    selector: "Login",
    moduleId: module.id,
    templateUrl: "./login.component.html"
})
export class LoginComponent implements OnInit {
    email: string;
    password: string;
    rememberMe: boolean;
    loading: boolean;
    loginFailed: boolean;

    constructor(page: Page, private routerExtensions: RouterExtensions) {
        page.actionBarHidden = true;
    }

    ngOnInit(): void {
        /* ***********************************************************
        * Use the "ngOnInit" handler to initialize data for this component.
        *************************************************************/
        this.email = ''
        this.password = ''
        this.rememberMe = true
        this.loading = false
        this.loginFailed = false
    }

    onRememberMeToggle(args): void {
        let rememberMeSwitch = <Switch>args.object;
        // remove this line when it actually works
        rememberMeSwitch.isEnabled = false
        if (rememberMeSwitch.checked) {
            this.rememberMe = true;
            // https://github.com/EddyVerbruggen/nativescript-plugin-firebase/issues/629
            //AuthService.setPersistence('local')
        } else {
            this.rememberMe = false;
            //AuthService.setPersistence('none')
        }
    }

    onSigninButtonTap(): void {
      this.loginFailed = false
      this.loading = true
      firebase.login(
        {
          type: firebase.LoginType.PASSWORD,
          passwordOptions: {
            email: this.email,
            password: this.password
          }
        })
        .then(result => {
          this.routerExtensions.navigate(["/home"], { clearHistory: true })
        })
        .catch(error => {
          this.loading = false
          this.loginFailed = true
          console.log(error)
        });

        /* ***********************************************************
        * Call your custom sign in logic using the email and password data.
        *************************************************************/
    }

    onForgotPasswordTap(): void {
      dialogs.confirm({
          title: "Password Reset",
          message: `Would you like to reset your password for ${this.email}?`,
          okButtonText: "Yes",
          cancelButtonText: "No thanks"
      }).then(result => {
          // result argument is boolean
          console.log("Dialog result: " + result);
          if (result) {
            firebase.resetPassword({
              email: this.email
            }).then(
                function () {
                  dialogs.alert({
                      title: "Success!",
                      message: "Check your email for a reset link.",
                      okButtonText: "Confirm"
                  }).then(() => {
                      console.log("Dialog closed!");
                  });
                },
                function (errorMessage) {
                  console.log(errorMessage);
                }
            );
          }
      });
    }
}
