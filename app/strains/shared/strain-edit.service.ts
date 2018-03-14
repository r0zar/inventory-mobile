import { Injectable } from "@angular/core";

import { Strain } from "./strain.model";
import { StrainService } from "./strain.service";

@Injectable()
export class StrainEditService {
    private _editModel: Strain;

    constructor(private _strainService: StrainService) {}

    startEdit(id: number): Strain {
        this._editModel = null;

        return this.getEditableStrainById(id);
    }

    getEditableStrainById(id: number): Strain {
        if (!this._editModel || this._editModel.Id != id) {
            const strain = this._strainService.getStrainById(id);
            // get fresh editable copy of strain model
            this._editModel = strain ? new Strain(strain) : new Strain({Id: id});
        }

        return this._editModel;
    }
}
