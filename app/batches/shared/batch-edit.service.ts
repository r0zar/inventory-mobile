import { Injectable } from "@angular/core";

import { Batch } from "./batch.model";
import { BatchService } from "./batch.service";

@Injectable()
export class BatchEditService {
    private _editModel: Batch;

    constructor(private _batchService: BatchService) {}

    startEdit(id: number): Batch {
        this._editModel = null;

        return this.getEditableBatchById(id);
    }

    getEditableBatchById(id: number): Batch {
        if (!this._editModel || this._editModel.Id != id) {
            const batch = this._batchService.getBatchById(id);
            // get fresh editable copy of batch model
            this._editModel = batch ? new Batch(batch) : new Batch({Id: id});
        }

        return this._editModel;
    }
}
