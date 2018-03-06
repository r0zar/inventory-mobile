import { Injectable } from "@angular/core";

import { Transfer } from "./transfer.model";
import { TransferService } from "./transfer.service";

@Injectable()
export class TransferEditService {
    private _editModel: Transfer;

    constructor(private _transferService: TransferService) {}

    startEdit(id: number): Transfer {
        this._editModel = null;

        return this.getEditableTransferById(id);
    }

    getEditableTransferById(id: number): Transfer {
        if (!this._editModel || this._editModel.Id != id) {
            const paccage = this._transferService.getTransferById(id);
            // get fresh editable copy of transfer model
            this._editModel = paccage ? new Transfer(paccage) : new Transfer({Id: id});
        }

        return this._editModel;
    }
}
