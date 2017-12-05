import RawUnit from "../storage/model/Unit";
import StorageService from "../storage/StorageService";

export default class Unit {

    public get id() {
        return this.raw.id;
    }

    public get name() {
        return this.raw.name;
    }

    constructor(private raw: RawUnit, storageService: StorageService) {

    }

    public resolve(storageService: StorageService) {
        return this;
    }

    public toJSON() {
        return {

        }
    }

}