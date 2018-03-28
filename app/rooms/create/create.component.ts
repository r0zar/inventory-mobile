import { Component, OnInit } from "@angular/core";
import { PageRoute, RouterExtensions } from "nativescript-angular/router";
import { EventData } from "data/observable";
import { DataFormEventData } from "nativescript-pro-ui/dataform";
import firebase = require("nativescript-plugin-firebase");
import { Room } from "../shared/room.model";
import { MetrcService } from "../../shared/metrc.service";
import { alert } from "ui/dialogs";

import _ = require('lodash');

/* ***********************************************************
* This is the room component.
* This component gets the selected data, provides options to create the room and saves the changes.
*************************************************************/
@Component({
    moduleId: module.id,
    selector: "Create",
    templateUrl: "./create.component.html"
})
export class CreateComponent implements OnInit {
    private _room: Room;
    private _isLoading: boolean = false;
    private uid: string;

    constructor(
        private _metrcService: MetrcService,
        private _routerExtensions: RouterExtensions
    ) { }

    /* ***********************************************************
    * Use the "ngOnInit" handler to get the data noun id parameter passed through navigation.
    * Get the data noun details from the data service using this id and assign it to the
    * private property that holds it inside the component.
    *************************************************************/
    ngOnInit(): void {
        this._room = new Room({})
        // this is for creating unique ids in the sandbox
        firebase.getCurrentUser()
          .then(user => {this.uid = user.uid})
    }

    get room(): Room {
        return this._room;
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
        _.extend(this._room, {Name: `${this._room.Name} ${this.uid}`})

        this._isLoading = true
        this._metrcService.createRooms(this._room)
          .finally(() => {
            this._isLoading = false
            this._routerExtensions.navigate(['/rooms'], {animated: true, transition: {name: "slideBottom", duration: 200, curve: "ease"}})
          })
          .subscribe(() => {
            firebase.getCurrentUser()
              .then(user => {
                firebase.getValue("/users/" + user.uid + "/rooms/setup")
                  .then(setup => {
                    if (!setup.value) {
                      firebase.setValue("/users/" + user.uid + '/rooms/setup', true)
                      alert({
                        title: 'Ah, good to have some room!',
                        message: 'Nice! Now we have some space to grow those beautiful buds.\n\nBefore we can create a new batch though, I need to know a little about your strains.\n\nHead to the \'Strains\' page and we can do just that.',
                        okButtonText: "OK"
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
