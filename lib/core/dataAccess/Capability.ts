import RawCapability from "../storage/model/Capability";
import StorageService from "../storage/StorageService";
import Unit from "./Unit";

export default class Capability {

    public get id() {
        return this.raw.id;
    }

    public get name() {
        return this.raw.name;
    }
    public unit: Unit;

    constructor(private raw: RawCapability) {
    }

    public resolve(storageService: StorageService) {
        return this;
    }

}