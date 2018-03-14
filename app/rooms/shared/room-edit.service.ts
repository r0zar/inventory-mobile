import { Injectable } from "@angular/core";

import { Room } from "./room.model";
import { RoomService } from "./room.service";

@Injectable()
export class RoomEditService {
    private _editModel: Room;

    constructor(private _roomService: RoomService) {}

    startEdit(id: number): Room {
        this._editModel = null;

        return this.getEditableRoomById(id);
    }

    getEditableRoomById(id: number): Room {
        if (!this._editModel || this._editModel.Id != id) {
            const room = this._roomService.getRoomById(id);
            // get fresh editable copy of room model
            this._editModel = room ? new Room(room) : new Room({Id: id});
        }

        return this._editModel;
    }
}
