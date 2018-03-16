import { Component, OnInit } from "@angular/core";
import { PageRoute, RouterExtensions } from "nativescript-angular/router";
import { DataFormEventData } from "nativescript-pro-ui/dataform";

import { Batch } from "../shared/batch.model";
import { BatchService } from "../shared/batch.service";
import { MetrcService } from "../../shared/metrc.service";

import { ScrollView, ScrollEventData } from 'tns-core-modules/ui/scroll-view';
import { Image } from 'tns-core-modules/ui/image';
import { View } from 'tns-core-modules/ui/core/view';
import { Page } from "ui/page";


/* ***********************************************************
* This is the batch details component in the master-detail structure.
* This component retrieves the passed parameter from the master list component,
* finds the data batch by this parameter and displays the detailed data batch information.
*************************************************************/
@Component({
    selector: "BatchDetail",
    moduleId: module.id,
    templateUrl: "./batch-detail.component.html"
})
export class BatchDetailComponent implements OnInit {
    private _batch: Batch;
    private _fabMenuOpen: boolean = false;

    constructor(
        private _metrcService: MetrcService,
        private _batchService: BatchService,
        private _pageRoute: PageRoute,
        private _routerExtensions: RouterExtensions
    ) { }

    /* ***********************************************************
    * Use the "ngOnInit" handler to get the data batch id parameter passed through navigation.
    * Get the data batch details from the data service using this id and assign it to the
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
                const batchId = params.id;

                //this._batch = this._batchService.getBatchById(batchId);
                this._metrcService.getBatches()
                    .subscribe((batches: Array<any>) => {
                        this._batch = new Batch(batches.find(batch => batch.Id == batchId));
                    });
            });
    }

    onScroll(event: ScrollEventData, scrollView: ScrollView, topView: View, fabView: View, actionItem1: View, actionItem2: View, actionItem3: View) {
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
                } else {
                  actionItem1.animate({ translate: { x: offset, y: -1 * offset } }).then(() => { }, () => { });
                  actionItem2.animate({ translate: { x: offset, y: -1 * offset } }).then(() => { }, () => { });
                  actionItem3.animate({ translate: { x: offset, y: -1 * offset } }).then(() => { }, () => { });
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
                } else {
                  actionItem1.translateY = Math.floor(-1 * offset);
                  actionItem1.translateX = Math.floor(offset);
                  actionItem2.translateY = Math.floor(-1 * offset);
                  actionItem2.translateX = Math.floor(offset);
                  actionItem3.translateY = Math.floor(-1 * offset);
                  actionItem3.translateX = Math.floor(offset);
                }
            }
        }
    }

    fabTap(actionItem1: View, actionItem2: View, actionItem3: View): void {
      this._fabMenuOpen = !this._fabMenuOpen
      if (this._fabMenuOpen) {
        actionItem1.animate({ translate: { x: -70, y: 0 } }).then(() => { }, () => { });
        actionItem2.animate({ translate: { x: -50, y: -60 } }).then(() => { }, () => { });
        actionItem3.animate({ translate: { x: -30, y: -120 } }).then(() => { }, () => { });
      } else {
        actionItem1.animate({ translate: { x: 0, y: 0 } }).then(() => { }, () => { });
        actionItem2.animate({ translate: { x: 0, y: 0 } }).then(() => { }, () => { });
        actionItem3.animate({ translate: { x: 0, y: 0 } }).then(() => { }, () => { });
      }
    }

    actionItem1Tap(): void {
      console.log('create package from batch')
      this._routerExtensions.navigate(["/batches/batch-detail-package", this._batch.Id],
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
      console.log('change growth phase')
      this._routerExtensions.navigate(["/batches/batch-detail-growthphase", this._batch.Id],
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
      console.log('destroy batch')
    }

    get batch(): Batch {
        return this._batch;
    }

    /* ***********************************************************
    * The back button is essential for a master-detail feature.
    *************************************************************/
    onBackButtonTap(): void {
        this._routerExtensions.backToPreviousPage();
    }

    /* ***********************************************************
    * The master-detail template comes with an example of an batch edit page.
    * Check out the edit page in the /batches/batch-detail-edit folder.
    *************************************************************/
    onEditButtonTap(): void {
        this._routerExtensions.navigate(["/batches/batch-detail-edit", this._batch.Id],
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
