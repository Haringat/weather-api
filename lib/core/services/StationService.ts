import * as util from "util";
import * as uuid from "uuid";
import Station from "../dataAccess/Station";
import RawStation from "../storage/model/Station";
import RawStationCapability from "../storage/model/StationCapability";
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
        if (isNullOrUndefined(capabilities)) {
            capabilities = [];
        }
        if (isNullOrUndefined(name) ||
            isNullOrUndefined(latitude) ||
            isNullOrUndefined(longitude) ||
            isNullOrUndefined(altitude)
        ) {
            const e = new Error("tried to create station from incomplete station data.");
            e.name = "IncompleteModelError";
            throw e;
        }
        const station: Station = Object.create(Station.prototype, {
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
        const rawStation = new RawStation();
        rawStation.name = station.name;
        rawStation.id = station.id;
        rawStation.latitude = station.latitude;
        rawStation.longitude = station.longitude;
        rawStation.altitude = station.altitude;
        await this._storageService.addStation(rawStation);
    }

    public async getAll() {
        const rawStations = await this._storageService.getAllStations();
        return await rawStations.mapAsync(async (rawStation) => {
            const station = new Station(rawStation);
            await station.resolve(this._storageService);
            return station;
        });
    }

    public getOne(idOrNameOrCoords: string) {
        if (/[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}/.test(idOrNameOrCoords)) {
            return this.getById(idOrNameOrCoords);
        } else if (/\d{1,3}(?:\.\d{1,3})?° ?[NS] ?\d{1,3}(?:\.\d{1,3})?° ?[OW]/.test(idOrNameOrCoords)) {
            return this.getByCoords(idOrNameOrCoords);
        } else {
            return this.getByName(idOrNameOrCoords);
        }
    }

    public async getById(stationId: string): Promise<Station> {
        const stations = await this.getAll();
        if (stations.length === 0) {
            throw {
                status: 204
            };
        }
        const foundStation = stations.find((station) => station.id === stationId);
        if (foundStation !== null) {
            return foundStation;
        } else {
            throw {
                status: 204
            };
        }
    }

    public async getByCoords(coords: string): Promise<Station> {
        const stations = await this.getAll();
        if (stations.length === 0) {
            // no content
            throw {
                status: 204
            };
        }
        const coordsMatches = coords.match(/(\d{1,3}(?:\.\d{1,3})?)° ?([NS]) ?(\d{1,3}(?:\.\d{1,3})?)° ?([OW])/);
        const parsedCoords = {
            latitude: Number(coordsMatches[1]) * (coordsMatches[2] === "N" ? 1 : -1),
            longitude: Number(coordsMatches[3]) * (coordsMatches[4] === "O" ? 1 : -1)
        };
        const orderedStations = stations.map((station) => {
            const horizontalDistance = (station.latitude - parsedCoords.latitude) ** 2;
            const verticalDistance = (station.longitude - parsedCoords.longitude) ** 2;
            const distance = Math.sqrt(horizontalDistance + verticalDistance);
            return {
                station,
                distance
            };
        }).sort((a, b) => {
            if (a.distance < b.distance) {
                return -1;
            } else if (a.distance > b.distance) {
                return 1;
            } else {
                return 0;
            }
        }).map((station) => station.station);
        return orderedStations[0];

    }

    public async getByName(name: string): Promise<Station> {
        const stations = await this.getAll();
        if (stations.length === 0) {
            throw {
                status: 204
            };
        }
        const foundStation = stations.find((station) => station.name === name);
        if (foundStation !== null) {
            return foundStation;
        } else {
            throw {
                status: 204
            };
        }
    }

    public async linkCapability(stationId: string, capabilityId: string) {
        const stationCapability = new RawStationCapability();
        stationCapability.id = uuid4();
        stationCapability.stationId = stationId;
        stationCapability.capabilityId = capabilityId;
        await this._storageService.addStationCapability(stationCapability);
    }

    public async unlinkCapability(stationId: string, capabilityId: string) {
        const station = await this.getOne(stationId);
        await this._storageService.deleteStationCapability(stationId, capabilityId);
    }

    public async delete(stationId: string) {
        await this._storageService.deleteStation(stationId);
    }
}
