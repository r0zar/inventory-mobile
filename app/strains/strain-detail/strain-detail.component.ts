import { Component, OnInit } from "@angular/core";
import { PageRoute, RouterExtensions } from "nativescript-angular/router";
import { DataFormEventData } from "nativescript-pro-ui/dataform";

import { Strain } from "../shared/strain.model";
import { MetrcService } from "../../shared/metrc.service";

import { ScrollView, ScrollEventData } from 'tns-core-modules/ui/scroll-view';
import { Image } from 'tns-core-modules/ui/image';
import { View } from 'tns-core-modules/ui/core/view';
import { Page } from "ui/page";
import { confirm } from "ui/dialogs";;


/* ***********************************************************
* This is the strain details component in the master-detail structure.
* This component retrieves the passed parameter from the master list component,
* finds the data strain by this parameter and displays the detailed data strain information.
*************************************************************/
@Component({
    selector: "StrainDetail",
    moduleId: module.id,
    templateUrl: "./strain-detail.component.html"
})
export class StrainDetailComponent implements OnInit {
    private _strain: Strain;
    private _fabMenuOpen: boolean = false;
    private _isLoading: boolean = false;

    constructor(
        private _metrcService: MetrcService,
        private _pageRoute: PageRoute,
        private _routerExtensions: RouterExtensions
    ) { }

    /* ***********************************************************
    * Use the "ngOnInit" handler to get the data strain id parameter passed through navigation.
    * Get the data strain details from the data service using this id and assign it to the
    * private property that holds it inside the component.
    *************************************************************/
    ngOnInit(): void {
        this._isLoading = true;
        /* ***********************************************************
        * Learn more about how to get navigation parameters in this documentation article:
        * http://docs.nativescript.org/angular/core-concepts/angular-navigation.html#passing-parameter
        *************************************************************/
        this._pageRoute.activatedRoute
            .switchMap((activatedRoute) => activatedRoute.params)
            .forEach((params) => {
              this._metrcService.getStrain(params.id)
                .subscribe((strain: Strain) => {
                  this._strain = new Strain(strain)
                  this._isLoading = false;
                });
            });
    }

    onScroll(event: ScrollEventData, scrollView: ScrollView, topView: View, fabView: View, actionItem1: View, actionItem2: View) {
        // If the header content is still visiible
        if (scrollView.verticalOffset < 200) {
            const offset = scrollView.verticalOffset / 2;
            if (scrollView.ios) {
                // iOS adjust the position with an animation to create a smother scrolling effect.
                topView.animate({ translate: { x: 0, y: offset } }).then(() => { }, () => { });
                fabView.animate({ translate: { x: offset, y: -1 * offset } }).then(() => { }, () => { });
                if (this._fabMenuOpen) {
                  actionItem1.animate({ opacity: 1-offset/50 }).then(() => { }, () => { });
                  actionItem2.animate({ opacity: 1-offset/50 }).then(() => { }, () => { });
                } else {
                  actionItem1.animate({ translate: { x: offset, y: -1 * offset } }).then(() => { }, () => { });
                  actionItem2.animate({ translate: { x: offset, y: -1 * offset } }).then(() => { }, () => { });
                }
            } else {
                // Android, animations are jerky so instead just adjust the position without animation.
                topView.translateY = Math.floor(offset);
                fabView.translateY = Math.floor(-1 * offset);
                fabView.translateX = Math.floor(offset);
                if (this._fabMenuOpen) {
                  actionItem1.opacity = 1-offset/50
                  actionItem2.opacity = 1-offset/50
                } else {
                  actionItem1.translateY = Math.floor(-1 * offset);
                  actionItem1.translateX = Math.floor(offset);
                  actionItem2.translateY = Math.floor(-1 * offset);
                  actionItem2.translateX = Math.floor(offset);
                }
            }
        }
    }

    fabTap(actionItem1: View, actionItem2: View): void {
      this._fabMenuOpen = !this._fabMenuOpen
      if (this._fabMenuOpen) {
        actionItem1.animate({ translate: { x: -70, y: 0 } }).then(() => { }, () => { });
        actionItem2.animate({ translate: { x: -50, y: -60 } }).then(() => { }, () => { });
      } else {
        actionItem1.animate({ translate: { x: 0, y: 0 } }).then(() => { }, () => { });
        actionItem2.animate({ translate: { x: 0, y: 0 } }).then(() => { }, () => { });
      }
    }

    actionItem1Tap(): void {
      console.log('edit strain')
      this.onEditButtonTap()
    }

    actionItem2Tap(): void {
      console.log('delete strain')
      let options = {
          title: "Delete Strain",
          message: "Are you sure you want to delete this strain?",
          okButtonText: "Yes",
          cancelButtonText: "No",
          neutralButtonText: "Cancel"
      };
      confirm(options).then((result: boolean) => {
        if (result) {
          this._isLoading = true;
          this._metrcService.deleteStrain(this._strain)
            .subscribe(() => {
              this._isLoading = false
              this._routerExtensions.navigate(["/strains"],
                  {
                      animated: true,
                      transition: {
                          name: "fade",
                          duration: 1000
                      }
                  });
            })
        }
      });
    }

    get strain(): Strain {
        return this._strain;
    }

    get isLoading(): boolean {
        return this._isLoading;
    }

    /* ***********************************************************
    * The back button is essential for a master-detail feature.
    *************************************************************/
    onBackButtonTap(): void {
        this._routerExtensions.backToPreviousPage();
    }

    /* ***********************************************************
    * The master-detail template comes with an example of an strain edit page.
    * Check out the edit page in the /strains/strain-detail-edit folder.
    *************************************************************/
    onEditButtonTap(): void {
        this._routerExtensions.navigate(["/strains/edit", this._strain.Id],
            {
                animated: true,
                transition: {
                    name: "slideTop",
                    duration: 200,
                    curve: "ease"
                }
            });
    }
}
