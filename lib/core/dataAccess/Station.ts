import StorageService from "../storage/StorageService";
import Capability from "./Capability";

export interface IStation {

    id: string;
    name: string;
    latitude: number;
    longitude: number;
    altitude: number;

}

export default class Station {

    public get id() {
        return this._id;
    }

    public get name() {
        return this._name;
    }

    public get latitude() {
        return this._latitude;
    }

    public get longitude() {
        return this._longitude;
    }

    public get altitude() {
        return this._altitude;
    }

    public get capabilities() {
        return this._capabilities;
    }

    private _id: string;
    private _name: string;
    private _latitude: number;
    private _longitude: number;
    private _altitude: number;

    private _capabilities: Array<Capability>;

    public constructor(private _raw: IStation) {
    }

    public async resolve(storageService: StorageService) {
        this._id = this._raw.id;
        this._name = this._raw.name;
        this._latitude = this._raw.latitude;
        this._longitude = this._raw.longitude;
        this._altitude = this._raw.altitude;
        const stationCapabilities = await storageService.getStationCapabilities(this._raw.id);
        const rawCapabilities = await stationCapabilities.mapAsync(async (stationCapability) => {
            return await storageService.getCapability(stationCapability.capabilityId);
        });
        this._capabilities = await rawCapabilities.mapAsync(async (rawCapability) => {
            const capability = new Capability(rawCapability);
            await capability.resolve(storageService);
            return capability;
        });
    }

    public toJSON() {
        return {
            id: this.id,
            name: this.name,
            latitude: this.latitude,
            longitude: this.longitude,
            altitude: this.altitude,
            capabilities: this.capabilities
        };
    }

}
