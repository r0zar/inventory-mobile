import { Injectable } from "@angular/core";

import { Package } from "./package.model";
import { PackageService } from "./package.service";

@Injectable()
export class PackageEditService {
    private _editModel: Package;

    constructor(private _packageService: PackageService) {}

    startEdit(id: number): Package {
        this._editModel = null;

        return this.getEditablePackageById(id);
    }

    getEditablePackageById(id: number): Package {
        if (!this._editModel || this._editModel.Id != id) {
            const paccage = this._packageService.getPackageById(id);
            // get fresh editable copy of package model
            this._editModel = paccage ? new Package(paccage) : new Package({Id: id});
        }

        return this._editModel;
    }
}
