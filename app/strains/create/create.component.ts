import { Component, OnInit } from "@angular/core";
import { PageRoute, RouterExtensions } from "nativescript-angular/router";
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { EventData } from "data/observable";
import { DataFormEventData } from "nativescript-pro-ui/dataform";
import firebase = require("nativescript-plugin-firebase");
import { Strain } from "../shared/strain.model";
import { MetrcService } from "../../shared/metrc.service";
import { alert } from "ui/dialogs";

import _ = require('lodash');

/* ***********************************************************
* This is the noun verb component.
* This component gets the selected data noun, provides options to verb the noun and saves the changes.
*************************************************************/
@Component({
    moduleId: module.id,
    selector: "Create",
    templateUrl: "./create.component.html"
})
export class CreateComponent implements OnInit {
    private _strain: Strain;
    private _isLoading: boolean = false;
    private uid: string;

    constructor(
        private http: HttpClient,
        private _metrcService: MetrcService,
        private _routerExtensions: RouterExtensions
    ) { }

    /* ***********************************************************
    * Use the "ngOnInit" handler to get the data noun id parameter passed through navigation.
    * Get the data noun details from the data service using this id and assign it to the
    * private property that holds it inside the component.
    *************************************************************/
    ngOnInit(): void {
        this._strain = new Strain({})
        // this is for creating unique ids in the sandbox
        firebase.getCurrentUser()
          .then(user => {this.uid = user.uid})
    }

    get strain(): Strain {
        return this._strain;
    }

    get isLoading(): boolean {
        return this._isLoading;
    }

    /* ***********************************************************
    * The verb done button uses the data service to save the updated values of the data noun details.
    * Check out the data service as nounes/shared/noun.service.ts
    *************************************************************/
    onDoneButtonTap(): void {
        // this is for creating unique ids in the sandbox
        _.extend(this._strain, {Name: `${this._strain.Name} ${this.uid}`})

        this._isLoading = true
        this._metrcService.createStrains(this._strain)
            .finally(() => {
              this._isLoading = false
              this._routerExtensions.navigate(['/strains'], {animated: true, transition: {name: "slideBottom", duration: 200, curve: "ease"}})
            })
            .subscribe(() => {
              firebase.getCurrentUser()
                .then(user => {
                  firebase.getValue("/users/" + user.uid + "/strains/setup")
                    .then(setup => {
                      if (!setup.value) {
                        firebase.setValue("/users/" + user.uid + '/strains/setup', true)
                        alert({
                          title: 'Wow, where can I get some of that!?',
                          message: 'Oh yeah- you... Cool.\n\nCongratulations, you\'re all set to plant your first batch of clones or seeds in KipoTrac.\n\nCheck your menu and happy growing!',
                          okButtonText: "Let\'s grow"
                        })
                      }
                    })
                })
            })
      }


    /* ***********************************************************
    * The back button is essential for a master-detail feature.
    *************************************************************/
    onBackButtonTap(): void {
        this._routerExtensions.backToPreviousPage();
    }

}
