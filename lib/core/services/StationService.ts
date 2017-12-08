import * as util from "util";
import * as uuid from "uuid";
import Station from "../dataAccess/Station";
import StorageService from "../storage/StorageService";
import CapabilityService from "./CapabilityService";

const {
    isNullOrUndefined
} = util;
const {
    v4: uuid4
} = uuid;

export default class StationService {

    public constructor(private _storageService: StorageService, private _capabilityService: CapabilityService) {
    }

    public async create({
        id,
        name,
        latitude,
        longitude,
        altitude,
        capabilities
    }: {
        id?: string,
        name: string,
        latitude: number,
        longitude: number,
        altitude: number,
        capabilities: Array<{
            id?: string,
            name: string,
            unit: {
                id?: string,
                name: string
            } | string
        }>
    }) {
        if (isNullOrUndefined(id)) {
            id = uuid4();
        }
        if (isNullOrUndefined(id) ||
            isNullOrUndefined(name) ||
            isNullOrUndefined(latitude) ||
            isNullOrUndefined(longitude) ||
            isNullOrUndefined(altitude) ||
            isNullOrUndefined(capabilities)) {
            const e = new Error("tried to create station from incomplete station data.");
            e.name = "IncompleteModelError";
            throw e;
        }
        const station = Object.create(Station.prototype, {
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
            },
            _latitude: {
                value: latitude,
                enumerable: true,
                writable: true,
                configurable: true
            },
            _longitude: {
                value: longitude,
                enumerable: true,
                writable: true,
                configurable: true
            },
            _altitude: {
                value: altitude,
                enumerable: true,
                writable: true,
                configurable: true
            }
        });
        await capabilities.forEachAsync(async (capability) => {
            const capabilityExists = await this._capabilityService.capabilityExists(capability.name);
            if (!capabilityExists) {
                const modelCapability = await this._capabilityService.create(capability);
                await this._capabilityService.addCapability(modelCapability);
            }
        });
        return station;
    }

    public async add(station: Station) {
        await this._storageService.addStation(station);
    }

    public async getAll() {
        return await this._storageService.getAllStations();
    }

    public async getOne(stationId: any) {
        return await this._storageService.getStation(stationId);
    }
}
