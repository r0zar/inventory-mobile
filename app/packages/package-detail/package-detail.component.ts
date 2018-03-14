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

    onScroll(event: ScrollEventData, scrollView: ScrollView, fabView: View) {
        // If the header content is still visiible
        if (scrollView.verticalOffset < 200) {
            const offset = scrollView.verticalOffset / 2;
            if (scrollView.ios) {
                // iOS adjust the position with an animation to create a smother scrolling effect.
                //topView.animate({ translate: { x: 0, y: offset } }).then(() => { }, () => { });
                //fabView.animate({ translate: { x: 0, y: -1 * offset } }).then(() => { }, () => { });
                fabView.animate({ translate: { x: 0, y: offset } }).then(() => { }, () => { });
            } else {
                // Android, animations are jerky so instead just adjust the position without animation.
                //topView.translateY = Math.floor(offset);
                //fabView.translateY = Math.floor(-1 * offset);
                fabView.translateX = Math.floor(offset);
            }
        }
    }

    get package(): Package {
        return this._package;
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
