import StorageService from "../storage/StorageService";
import Unit from "./Unit";

export interface ICapability {

    id: string;
    name: string;
    unitId: string;

}

export default class Capability {

    public get id() {
        return this._id;
    }

    public get name() {
        return this._name;
    }

    public get unit() {
        return this._unit;
    }

    private _id: string;
    private _name: string;
    private _unit: Unit;

    constructor(private _raw: ICapability) {
    }

    public async resolve(storageService: StorageService) {
        this._id = this._raw.id;
        this._name = this._raw.name;
        const rawUnit = await storageService.getUnit(this._raw.unitId);
        this._unit = new Unit(rawUnit);
    }

}
