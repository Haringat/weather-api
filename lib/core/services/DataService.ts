import * as util from "util";
import * as uuid from "uuid";
import Capability from "../dataAccess/Capability";
import Station from "../dataAccess/Station";
import WeatherDataPoint from "../dataAccess/WeatherDataPoint";
import RawWeatherDataPoint from "../storage/model/WeatherDataPoint";
import StorageService from "../storage/StorageService";

const {
    v4: uuid4
} = uuid;

const {
    isNullOrUndefined
} = util;

export default class DataService {

    constructor(private _storageService: StorageService) {
    }

    public async create({
        id,
        value,
        stationId,
        capabilityId,
        date,
        dateOfMeasure
    }: {
        id?: string,
        value: string | number,
        stationId: string,
        capabilityId: string,
        date: string,
        dateOfMeasure: string
    }): Promise<WeatherDataPoint> {
        if (isNullOrUndefined(id)) {
            id = uuid4();
        }
        if (isNullOrUndefined(value) ||
            isNullOrUndefined(stationId) ||
            isNullOrUndefined(capabilityId) ||
            isNullOrUndefined(date) ||
            isNullOrUndefined(dateOfMeasure)
        ) {
            let message = "tried to create weather data point from incomplete data.";
            if (isNullOrUndefined(value)) {
                message += ` value is ${value}`;
            }
            if (isNullOrUndefined(stationId)) {
                message += ` stationId is ${stationId}`;
            }
            if (isNullOrUndefined(capabilityId)) {
                message += ` capabilityId is ${capabilityId}`;
            }
            if (isNullOrUndefined(date)) {
                message += ` date is ${date}`;
            }
            if (isNullOrUndefined(dateOfMeasure)) {
                message += ` dateOfMeasure is ${dateOfMeasure}`;
            }
            const e = new Error(message);
            e.name = "IncompleteModelError";
            throw e;
        }
        const station = new Station(await this._storageService.getStation(stationId));
        await station.resolve(this._storageService);
        const capability = new Capability(await this._storageService.getCapability(capabilityId));
        await capability.resolve(this._storageService);
        return Object.create(WeatherDataPoint.prototype, {
            _id: {
                value: id,
                enumerable: true,
                writable: true,
                configurable: true
            },
            _value: {
                value,
                enumerable: true,
                writable: true,
                configurable: true
            },
            _station: {
                value: station,
                enumerable: true,
                writable: true,
                configurable: true
            },
            _capability: {
                value: capability,
                enumerable: true,
                writable: true,
                configurable: true
            },
            _date: {
                value: new Date(date),
                enumerable: true,
                writable: true,
                configurable: true
            },
            _dateOfMeasure: {
                value: new Date(dateOfMeasure),
                enumerable: true,
                writable: true,
                configurable: true
            }
        });
    }

    public async add(dataPoint: WeatherDataPoint, isHistory: boolean) {
        const rawDataPoint = new RawWeatherDataPoint();
        rawDataPoint.id = dataPoint.id;
        rawDataPoint.date = dataPoint.date;
        rawDataPoint.dateOfMeasure = dataPoint.dateOfMeasure;
        rawDataPoint.capabilityId = dataPoint.capability.id;
        rawDataPoint.stationId = dataPoint.station.id;
        rawDataPoint.value = dataPoint.value;
        if (isHistory) {
            await this._storageService.addHistoryDataPoint(rawDataPoint);
        } else {
            await this._storageService.addForecastDataPoint(rawDataPoint);
        }
    }

    public async getAll(stationId, isHistory: boolean) {
        let allRaw;
        if (isHistory) {
            allRaw = await this._storageService.getHistoryDataByStation(stationId);
        } else {
            allRaw = await this._storageService.getForecastDataByStation(stationId);
        }
        const allDataPoints = await allRaw.mapAsync(async (dataPoint) => {
            if (isHistory) {
                return await this._storageService.getHistoryDataPoint(dataPoint.id);
            } else {
                return await this._storageService.getForecastDataPoint(dataPoint.id);
            }
        });
        return allDataPoints.mapAsync(async (rawDataPoint) => {
            const dataPoint = new WeatherDataPoint(rawDataPoint);
            await dataPoint.resolve(this._storageService);
            return dataPoint;
        });
    }

}
