import { Component, OnInit, ViewChild } from "@angular/core";
import { DrawerTransitionBase, SlideInOnTopTransition } from "nativescript-pro-ui/sidedrawer";
import { RadSideDrawerComponent } from "nativescript-pro-ui/sidedrawer/angular";

@Component({
    selector: "Subscription",
    moduleId: module.id,
    templateUrl: "./subscription.component.html"
})
export class SubscriptionComponent implements OnInit {
    /* ***********************************************************
    * Use the @ViewChild decorator to get a reference to the drawer component.
    * It is used in the "onDrawerButtonTap" function below to manipulate the drawer.
    *************************************************************/
    @ViewChild("drawer") drawerComponent: RadSideDrawerComponent;

    private _sideDrawerTransition: DrawerTransitionBase;

    private car: Object;


    /* ***********************************************************
    * Use the sideDrawerTransition property to change the open/close animation of the drawer.
    *************************************************************/
    ngOnInit(): void {
        this._sideDrawerTransition = new SlideInOnTopTransition();
        this.car = {
          "class" : "yall wild lmao",
          "doors" : 2,
          "hasAC" : true,
          "id" : "car1",
          "imageStoragePath" : "cars/BMW 5 Series.jpg",
          "imageUrl" : "https://firebasestorage.googleapis.com/v0/b/kiposoft-6ae15.appspot.com/o/cars%2FBMW%205%20Series.jpg?alt=media&token=4a0f4037-a56b-4f3c-83a2-dfababd418a6",
          "luggage" : 3,
          "name" : "Facility #1",
          "price" : 16,
          "seats" : "2",
          "transmission" : "Automatic"
        }
    }

    get sideDrawerTransition(): DrawerTransitionBase {
        return this._sideDrawerTransition;
    }

    /* ***********************************************************
    * According to guidelines, if you have a drawer on your page, you should always
    * have a button that opens it. Use the showDrawer() function to open the app drawer section.
    *************************************************************/
    onDrawerButtonTap(): void {
        this.drawerComponent.sideDrawer.showDrawer();
    }
}
