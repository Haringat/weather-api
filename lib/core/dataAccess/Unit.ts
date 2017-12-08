import RawUnit from "../storage/model/Unit";
import StorageService from "../storage/StorageService";

export interface IUnit {
    id: string;
    name: string;
}

export default class Unit {

    public get id() {
        return this._id;
    }

    public get name() {
        return this._name;
    }

    private _id: string;
    private _name: string;

    constructor(private _raw: RawUnit) {
    }

    public async resolve(storageService: StorageService) {
        this._id = this._raw.id;
        this._name = this._raw.name;
    }

    public toJSON() {
        return this.name;
    }

}
