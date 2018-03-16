import { Component, OnInit } from "@angular/core";
import { PageRoute, RouterExtensions } from "nativescript-angular/router";
import { DataFormEventData } from "nativescript-pro-ui/dataform";

import { Package } from "../shared/package.model";
import { PackageService } from "../shared/package.service";
import { MetrcService } from "../../shared/metrc.service";

import { ScrollView, ScrollEventData } from 'tns-core-modules/ui/scroll-view';
import { Image } from 'tns-core-modules/ui/image';
import { screen } from 'platform';
import { View } from 'tns-core-modules/ui/core/view';
import { Page } from "ui/page";


/* ***********************************************************
* This is the package details component in the master-detail structure.
* This component retrieves the passed parameter from the master list component,
* finds the data package by this parameter and displays the detailed data package information.
*************************************************************/
@Component({
    selector: "PackageDetail",
    moduleId: module.id,
    templateUrl: "./package-detail.component.html"
})
export class PackageDetailComponent implements OnInit {
    private _package: Package;
    private _fabMenuOpen: boolean = false;

    constructor(
        private _metrcService: MetrcService,
        private _packageService: PackageService,
        private _pageRoute: PageRoute,
        private _routerExtensions: RouterExtensions
    ) { }

    /* ***********************************************************
    * Use the "ngOnInit" handler to get the data package id parameter passed through navigation.
    * Get the data package details from the data service using this id and assign it to the
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
                const packageId = params.id;

                //this._package = this._packageService.getPackageById(packageId);
                this._metrcService.getPackages()
                    .subscribe((packages: Array<any>) => {
                        this._package = new Package(packages.find(p => p.Id == packageId));
                    });
            });
    }

    onScroll(
      event: ScrollEventData,
      scrollView: ScrollView,
      topView: View,
      fabView: View,
      actionItem1: View,
      actionItem2: View,
      actionItem3: View,
      actionItem4: View) {
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
                  actionItem3.animate({ opacity: 1-offset/50 }).then(() => { }, () => { });
                  actionItem4.animate({ opacity: 1-offset/50 }).then(() => { }, () => { });
                } else {
                  actionItem1.animate({ translate: { x: offset, y: -1 * offset } }).then(() => { }, () => { });
                  actionItem2.animate({ translate: { x: offset, y: -1 * offset } }).then(() => { }, () => { });
                  actionItem3.animate({ translate: { x: offset, y: -1 * offset } }).then(() => { }, () => { });
                  actionItem4.animate({ translate: { x: offset, y: -1 * offset } }).then(() => { }, () => { });
                }
            } else {
                // Android, animations are jerky so instead just adjust the position without animation.
                topView.translateY = Math.floor(offset);
                fabView.translateY = Math.floor(-1 * offset);
                fabView.translateX = Math.floor(offset);
                if (this._fabMenuOpen) {
                  actionItem1.opacity = 1-offset/50
                  actionItem2.opacity = 1-offset/50
                  actionItem3.opacity = 1-offset/50
                  actionItem4.opacity = 1-offset/50
                } else {
                  actionItem1.translateY = Math.floor(-1 * offset);
                  actionItem1.translateX = Math.floor(offset);
                  actionItem2.translateY = Math.floor(-1 * offset);
                  actionItem2.translateX = Math.floor(offset);
                  actionItem3.translateY = Math.floor(-1 * offset);
                  actionItem3.translateX = Math.floor(offset);
                  actionItem4.translateY = Math.floor(-1 * offset);
                  actionItem4.translateX = Math.floor(offset);
                }
            }
        }
    }

    fabTap(actionItem1: View, actionItem2: View, actionItem3: View, actionItem4: View): void {
      this._fabMenuOpen = !this._fabMenuOpen
      if (this._fabMenuOpen) {
        actionItem1.animate({ translate: { x: -70, y: 0 } }).then(() => { }, () => { });
        actionItem2.animate({ translate: { x: -50, y: -60 } }).then(() => { }, () => { });
        actionItem3.animate({ translate: { x: -30, y: -120 } }).then(() => { }, () => { });
        actionItem4.animate({ translate: { x: -140, y: 0 } }).then(() => { }, () => { });
      } else {
        actionItem1.animate({ translate: { x: 0, y: 0 } }).then(() => { }, () => { });
        actionItem2.animate({ translate: { x: 0, y: 0 } }).then(() => { }, () => { });
        actionItem3.animate({ translate: { x: 0, y: 0 } }).then(() => { }, () => { });
        actionItem4.animate({ translate: { x: 0, y: 0 } }).then(() => { }, () => { });
      }
    }

    get package(): Package {
        return this._package;
    }

    actionItem1Tap(): void {
      console.log('change item')
      this._routerExtensions.navigate(["/packages/changeitem", this._package.Label],
          {
              animated: true,
              transition: {
                  name: "flipLeft",
                  duration: 500,
                  curve: "linear"
              }
          });
    }

    actionItem2Tap(): void {
      console.log('adjust package')
      this._routerExtensions.navigate(["/packages/adjust", this._package.Label],
          {
              animated: true,
              transition: {
                  name: "flipLeft",
                  duration: 500,
                  curve: "linear"
              }
          });
    }

    actionItem3Tap(): void {
      console.log('remediate package')
      this._routerExtensions.navigate(["/packages/remediate", this._package.Label],
          {
              animated: true,
              transition: {
                  name: "flipLeft",
                  duration: 500,
                  curve: "linear"
              }
          });
    }

    actionItem4Tap(): void {
      console.log('finish/unfinish package')
    }

    /* ***********************************************************
    * The back button is essential for a master-detail feature.
    *************************************************************/
    onBackButtonTap(): void {
        this._routerExtensions.backToPreviousPage();
    }

    /* ***********************************************************
    * The master-detail template comes with an example of an package edit page.
    * Check out the edit page in the /packages/package-detail-edit folder.
    *************************************************************/
    onEditButtonTap(): void {
        this._routerExtensions.navigate(["/packages/package-detail-edit", this._package.Id],
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
