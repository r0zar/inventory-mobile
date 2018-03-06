import { Injectable } from "@angular/core";

import { Facility } from "./facility.model";
import { FacilityService } from "./facility.service";

@Injectable()
export class FacilityEditService {
    private _editModel: Facility;

    constructor(private _facilityService: FacilityService) {}

    startEdit(id: number): Facility {
        this._editModel = null;

        return this.getEditableFacilityById(id);
    }

    getEditableFacilityById(id: number): Facility {
        if (!this._editModel || this._editModel.Id != id) {
            const facility = this._facilityService.getFacilityById(id);
            // get fresh editable copy of facility model
            this._editModel = facility ? new Facility(facility) : new Facility({Id: id});
        }

        return this._editModel;
    }
}
