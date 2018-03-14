import { Injectable } from "@angular/core";

import { Harvest } from "./harvest.model";
import { HarvestService } from "./harvest.service";

@Injectable()
export class HarvestEditService {
    private _editModel: Harvest;

    constructor(private _harvestService: HarvestService) {}

    startEdit(id: number): Harvest {
        this._editModel = null;

        return this.getEditableHarvestById(id);
    }

    getEditableHarvestById(id: number): Harvest {
        if (!this._editModel || this._editModel.Id != id) {
            const harvest = this._harvestService.getHarvestById(id);
            // get fresh editable copy of harvest model
            this._editModel = harvest ? new Harvest(harvest) : new Harvest({Id: id});
        }

        return this._editModel;
    }
}
