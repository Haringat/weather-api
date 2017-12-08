import * as util from "util";
import * as uuid from "uuid";
import Capability from "../dataAccess/Capability";
import {
    IUnit
} from "../dataAccess/Unit";
import RawCapability from "../storage/model/Capability";
import StorageService from "../storage/StorageService";
import UnitService from "./UnitService";

const {
    isNullOrUndefined
} = util;
const uuid4 = uuid.v4;

export interface ICapabilityService {
    capabilityExists(capabilityName: string): Promise<boolean>;
    addCapability(capability: Capability): Promise<void>;
    create(data: {
        id: string,
        name: string,
        unit: {
            id: string,
            name: string
        }
    }): Promise<Capability>;
}

export default class CapabilityService implements ICapabilityService {

    constructor(private _storageService: StorageService, private _unitService: UnitService) {
    }

    public async capabilityExists(capabilityName: string) {
        const storedCapabilities = await this._storageService.getAllCapabilities();
        return storedCapabilities.some((capability) => capability.name === capabilityName);
    }

    public async addCapability(capability: Capability) {
        const rawCapability = new RawCapability();
        rawCapability.id = capability.id;
        rawCapability.name = capability.name;
        rawCapability.unitId = capability.unit.id;
        await this._storageService.addCapability(rawCapability);
    }

    public async create({
        id,
        name,
        unit
    }: {
        id?: string,
        name: string,
        unit: {
            id?: string,
            name: string
        } | string
    }) {
        if (isNullOrUndefined(id)) {
            id = uuid4();
        }
        if (isNullOrUndefined(name) ||
            isNullOrUndefined(unit)) {
            const e = new Error("tried to create station from incomplete station data.");
            e.name = "IncompleteModelError";
            throw e;
        }
        const capability: Capability = Object.create(Capability.prototype, {
            _id: {
                value: id,
                enumerable: true,
                writable: true,
                configurable: true
            },
            _name: {
                value: name,
                enumerable: true,
                writable: true,
                configurable: true
            }
        });
        if (typeof unit === "string") {
            unit = {
                name: unit
            };
        }
        const unitExists = await this._unitService.unitExists(unit.name);
        if (!unitExists) {
            const newUnit = await this._unitService.create(unit);
            await this._unitService.addUnit(newUnit);
        }
        return capability;
    }

    public async delete(capabilityId: string) {
        await this._storageService.deleteCapabilityById(capabilityId);
    }

    public async getAll() {
        return await this._storageService.getAllCapabilities();
    }

    public async getById(id: string) {
        const capabilities = await this.getAll();
        const foundCapability = capabilities.find((capability) => capability.id === id);
        if (foundCapability !== null) {
            return foundCapability;
        } else {
            const e = new Error(`No capability with id "${id}"`);
            e.name = "ModelNotFoundError";
            throw e;
        }
    }

    public async getByName(name: string) {
        const capabilities = await this.getAll();
        const foundCapability = capabilities.find((capability) => capability.name === name);
        if (foundCapability !== null) {
            return foundCapability;
        } else {
            const e = new Error(`No capability with name "${name}"`);
            e.name = "ModelNotFoundError";
            throw e;
        }
    }
}
