import { Component, OnInit } from "@angular/core";
import { PageRoute, RouterExtensions } from "nativescript-angular/router";

import { Item } from "../shared/item.model";
import { ItemService } from "../shared/item.service";
import { MetrcService } from "../../shared/metrc.service";

import { ScrollView, ScrollEventData } from 'tns-core-modules/ui/scroll-view';
import { Image } from 'tns-core-modules/ui/image';
import { View } from 'tns-core-modules/ui/core/view';
import { Page } from "ui/page";
import { confirm } from "ui/dialogs";;


/* ***********************************************************
* This is the item details component in the master-detail structure.
* This component retrieves the passed parameter from the master list component,
* finds the data item by this parameter and displays the detailed data item information.
*************************************************************/
@Component({
    selector: "ItemDetail",
    moduleId: module.id,
    templateUrl: "./item-detail.component.html"
})
export class ItemDetailComponent implements OnInit {
    private _item: Item;
    private _fabMenuOpen: boolean = false;
    private _isLoading: boolean = false;

    constructor(
        private _metrcService: MetrcService,
        private _itemService: ItemService,
        private _pageRoute: PageRoute,
        private _routerExtensions: RouterExtensions
    ) {}

    /* ***********************************************************
    * Use the "ngOnInit" handler to get the data item id parameter passed through navigation.
    * Get the data item details from the data service using this id and assign it to the
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
              this._metrcService.getItem(params.id)
                .subscribe((item: Item) => {
                  this._item = new Item(item)
                  this._isLoading = false;
                });
            });
    }

    onScroll(event: ScrollEventData, scrollView: ScrollView, topView: View, fabView: View) {
        // If the header content is still visiible
        if (scrollView.verticalOffset < 200) {
            const offset = scrollView.verticalOffset / 2;
            if (scrollView.ios) {
                // iOS adjust the position with an animation to create a smother scrolling effect.
                topView.animate({ translate: { x: 0, y: offset } }).then(() => { }, () => { });
                fabView.animate({ translate: { x: 0, y: -1 * offset } }).then(() => { }, () => { });
                fabView.animate({ translate: { x: 0, y: offset } }).then(() => { }, () => { });
            } else {
                // Android, animations are jerky so instead just adjust the position without animation.
                topView.translateY = Math.floor(offset);
                fabView.translateY = Math.floor(-1 * offset);
                fabView.translateX = Math.floor(offset);
            }
        }
    }

    fabTap(actionItem1: View, actionItem2: View): void {
      this._fabMenuOpen = !this._fabMenuOpen
      if (this._fabMenuOpen) {
        actionItem1.animate({ translate: { x: -70, y: 0 } }).then(() => { }, () => { });
        actionItem2.animate({ translate: { x: -60, y: -65 } }).then(() => { }, () => { });
      } else {
        actionItem1.animate({ translate: { x: 0, y: 0 } }).then(() => { }, () => { });
        actionItem2.animate({ translate: { x: 0, y: 0 } }).then(() => { }, () => { });
      }
    }

    actionItem1Tap(): void {
      console.log('edit')
      this.onEditButtonTap()
    }



    actionItem2Tap(): void {
      console.log('delete item')
      let options = {
          title: "Delete Item",
          message: "Are you sure you want to delete this item?",
          okButtonText: "Yes",
          cancelButtonText: "No",
          neutralButtonText: "Cancel"
      };
      confirm(options).then((result: boolean) => {
        if (result) {
          this._isLoading = true;
          this._metrcService.deleteItem(this._item)
            .subscribe(() => {
              this._isLoading = false
              this._routerExtensions.navigate(["/items"],
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

    get item(): Item {
        return this._item;
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
    * The master-detail template comes with an example of an item edit page.
    * Check out the edit page in the /items/item-detail-edit folder.
    *************************************************************/
    onEditButtonTap(): void {
        this._routerExtensions.navigate(["/items/item-detail-edit", this._item.Id],
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
