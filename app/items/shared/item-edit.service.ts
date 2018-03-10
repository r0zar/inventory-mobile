import { Injectable } from "@angular/core";

import { Item } from "./item.model";
import { ItemService } from "./item.service";

@Injectable()
export class ItemEditService {
    private _editModel: Item;

    constructor(private _itemService: ItemService) {}

    startEdit(id: number): Item {
        this._editModel = null;

        return this.getEditableItemById(id);
    }

    getEditableItemById(id: number): Item {
        if (!this._editModel || this._editModel.Id != id) {
            const item = this._itemService.getItemById(id);
            // get fresh editable copy of item model
            this._editModel = item ? new Item(item) : new Item({Id: id});
        }

        return this._editModel;
    }
}
