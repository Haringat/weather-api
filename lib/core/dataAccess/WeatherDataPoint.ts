import RawWeatherDataPoint from "../storage/model/WeatherDataPoint";
import StorageService from "../storage/StorageService";
import Capability from "./Capability";
import Station from "./Station";

export default class WeatherDataPoint {

    private _id: string;
    private _value: string | number;
    private _station: Station;
    private _capability: Capability;
    private _date: Date;
    private _dateOfMeasure: Date;

    constructor(private raw: RawWeatherDataPoint) {
    }

    public get id() {
        return this._id;
    }

    public get value() {
        return this._value;
    }

    public get station() {
        return this._station;
    }

    public get capability() {
        return this._capability;
    }

    public get date() {
        return this._date;
    }

    public get dateOfMeasure() {
        return this._dateOfMeasure;
    }

    public async resolve(storageService: StorageService) {
        this._id = this.raw.id;
        this._value = this.raw.value;
        this._date = new Date(this.raw.date);
        this._dateOfMeasure = new Date(this.raw.dateOfMeasure);
        const rawCapability = await storageService.getCapability(this.raw.capabilityId);
        const capability = new Capability(rawCapability);
        await capability.resolve(storageService);
        this._capability = capability;
        const rawStation = await storageService.getStation(this.raw.stationId);
        const station = new Station(rawStation);
        await station.resolve(storageService);
        this._station = station;
    }

    public toJSON() {
        return {
            value: this.value,
            capabilityName: this.capability.name,
            date: this.date.toISOString(),
            dateOfMeasure: this.dateOfMeasure.toISOString(),
            unit: this.capability.unit
        };
    }

    public toXML() {
        return `<data-point value="${this.value}" unit="${this.capability.unit.name}" ` +
            `capability-name="${this.capability.name}" date="${this.date.toISOString()}" ` +
            `date-of-measure="${this.dateOfMeasure.toISOString()}"/>`;
    }

}
