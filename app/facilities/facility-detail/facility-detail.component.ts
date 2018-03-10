import { Component, OnInit } from "@angular/core";
import { PageRoute, RouterExtensions } from "nativescript-angular/router";

import { Facility } from "../shared/facility.model";
import { FacilityService } from "../shared/facility.service";
import { MetrcService } from "../../shared/metrc.service";

import * as elementRegistryModule from 'nativescript-angular/element-registry';
elementRegistryModule.registerElement("CardView", () => require("nativescript-cardview").CardView);

//import { Room } from "../../rooms/shared/room.model";

/* ***********************************************************
* This is the item details component in the master-detail structure.
* This component retrieves the passed parameter from the master list component,
* finds the data item by this parameter and displays the detailed data item information.
*************************************************************/
@Component({
    selector: "FacilityDetail",
    moduleId: module.id,
    templateUrl: "./facility-detail.component.html"
})
export class FacilityDetailComponent implements OnInit {
    private _facility: Facility;
    //private _rooms: Room;

    constructor(
        private _metrcService: MetrcService,
        private _facilityService: FacilityService,
        private _pageRoute: PageRoute,
        private _routerExtensions: RouterExtensions
    ) { }

    /* ***********************************************************
    * Use the "ngOnInit" handler to get the data item id parameter passed through navigation.
    * Get the data item details from the data service using this id and assign it to the
    * private property that holds it inside the component.
    *************************************************************/
    ngOnInit(): void {
        /* ***********************************************************
        * Learn more about how to get navigation parameters in this documentation article:
        * http://docs.nativescript.org/angular/core-concepts/angular-navigation.html#passing-parameter
        *************************************************************/
        this._pageRoute.activatedRoute
            .switchMap((activatedRoute) => activatedRoute.params)
            .forEach((params) => {
                const facilityId = params.id;

                this._facility = this._facilityService.getFacilityById(facilityId);
                // this._metrcService.getFacilities()
                //     .subscribe((facilities: Array<Facility>) => {
                //         this._facility = facilities.find(facility => facility.Id == facilityId);
                //     });
            });
    }

    get facility(): Facility {
        return this._facility;
    }

    get rooms(): any {
        //return this._rooms;
        return [{Id: 1, Name: "Vegetative Room A"}]
    }


    /* ***********************************************************
    * The back button is essential for a master-detail feature.
    *************************************************************/
    onBackButtonTap(): void {
        this._routerExtensions.backToPreviousPage();
    }

    /* ***********************************************************
    * The master-detail template comes with an example of an item edit page.
    * Check out the edit page in the /facilities/facility-detail-edit folder.
    *************************************************************/
    onEditButtonTap(): void {
        this._routerExtensions.navigate(["/facilities/facility-detail-edit", this._facility.Id],
            {
                animated: true,
                transition: {
                    name: "slideTop",
                    duration: 200,
                    curve: "ease"
                }
            });
    }

    onAddRoomButtonTap(): void {
      this._metrcService.createRooms({licenseNumber: "123-ABC", Rooms: [{Name: "Harvest Room"}]})
        .finally(() => {
          console.log('room added')
        })
    }
}
