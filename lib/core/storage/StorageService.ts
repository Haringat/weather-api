import LoggerService, {
    loggerMethods
} from "../services/LoggerService";
import RawCapability from "./model/Capability";
import RawStation from "./model/Station";
import StationCapability from "./model/StationCapability";
import RawUnit from "./model/Unit";
import RawWeatherDataPoint from "./model/WeatherDataPoint";

export default class StorageService {

    private static cloneArrayOfObjects<T extends object>(array: Array<T>): Array<T> {
        return array.map((entity) => {
            const descriptor = Object.entries(entity).map(([key, value]) => {
                return {
                    [key]: {
                        value,
                        configurable: true,
                        enumerable: true,
                        writable: true
                    }
                };
            }).reduce((propertyDescriptor, singlePropertyDescriptor) => {
                return {
                    ...propertyDescriptor,
                    ...singlePropertyDescriptor
                };
            }, {});
            return Object.create(Object.getPrototypeOf(entity), descriptor);
        });
    }

    private static throwModelNotFoundError(msg: string) {
        const e = new Error(msg);
        e.name = "ModelNotFoundError";
        throw e;
    }

    private _capabilities: Array<RawCapability> = [];
    private _forecastData: Array<RawWeatherDataPoint> = [];
    private _historyData: Array<RawWeatherDataPoint> = [];
    private _stationCapabilities: Array<StationCapability> = [];
    private _stations: Array<RawStation> = [];
    private _units: Array<RawUnit> = [];

    constructor(private _logger: LoggerService) {
    }

    public async getAllStations() {
        return StorageService.cloneArrayOfObjects<RawStation>(this._stations);
    }

    public async getStation(id: string) {
        const foundStation = this._stations.find((station) => station.id === id);
        if (foundStation !== null) {
            return foundStation;
        } else {
            StorageService.throwModelNotFoundError(`No station with id "${id}"`);
        }
    }

    public async addCapability(capability: RawCapability) {
        this._capabilities.push(capability);
    }

    public async addStation(station: RawStation) {
        this._stations.push(station);
    }

    public async addStationCapability(stationCapability: StationCapability) {
        this._stationCapabilities.push(stationCapability);
    }

    public async getHistoryData() {
        return this._historyData.map((dataPoint) => {
            return {
                ...dataPoint
            };
        });
    }

    public async addHistoryDataPoint(dataPoint: RawWeatherDataPoint) {
        this._historyData.push(dataPoint);
    }

    public async getHistoryDataPoint(id: string) {
        const dataPoint = this._historyData.find((historyDataPoint) => historyDataPoint.id === id);
        if (dataPoint !== null) {
            return dataPoint;
        } else {
            StorageService.throwModelNotFoundError(`No history data point with id "${id}"`);
        }
    }

    public async getHistoryDataByStationAndDate(stationId: string, date: Date) {
        const dataPoint = this._historyData.filter(
            (historyDataPoint) => historyDataPoint.stationId === stationId
        ).find((historyDataPoint) => {
            return historyDataPoint.date.getUTCFullYear() === date.getUTCFullYear()
                && historyDataPoint.date.getUTCMonth() === date.getUTCMonth()
                && historyDataPoint.date.getUTCDate() === date.getUTCDate()
                && historyDataPoint.date.getUTCHours() === date.getUTCHours()
                && historyDataPoint.date.getUTCSeconds() === date.getUTCSeconds();
        });
        if (dataPoint !== null) {
            return dataPoint;
        } else {
            StorageService.throwModelNotFoundError(
                `No history data point at date "${date.toISOString()}" and stationId "${stationId}"`
            );
        }
    }

    public async addForecastDataPoint(dataPoint: RawWeatherDataPoint) {
        this._forecastData.push(dataPoint);
    }

    public async getForecastDataPoint(id: string) {
        const dataPoint = this._forecastData.find((historyDataPoint) => historyDataPoint.id === id);
        if (dataPoint !== null) {
            return dataPoint;
        } else {
            StorageService.throwModelNotFoundError(`No history data point with id "${id}"`);
        }
    }

    public async getForecastDataByStationAndDate(stationId: string, date: Date) {
        const dataPoint = this._forecastData.filter(
            (forecastDataPoint) => forecastDataPoint.stationId === stationId
        ).find((forecastDataPoint) => {
            return forecastDataPoint.date.getUTCFullYear() === date.getUTCFullYear()
                && forecastDataPoint.date.getUTCMonth() === date.getUTCMonth()
                && forecastDataPoint.date.getUTCDate() === date.getUTCDate()
                && forecastDataPoint.date.getUTCHours() === date.getUTCHours()
                && forecastDataPoint.date.getUTCSeconds() === date.getUTCSeconds();
        });
        if (dataPoint !== null) {
            return dataPoint;
        } else {
            StorageService.throwModelNotFoundError(
                `No history data point at date "${date.toISOString()}" and stationId "${stationId}"`
            );
        }
    }

    public async getForecastDataByStation(stationId: string) {
        return this._forecastData.filter(
            (forecastDataPoint) => forecastDataPoint.stationId === stationId
        );
    }

    public async getCapability(capabilityId: string) {
        const foundCapability = this._capabilities.find((capability) => capability.id === capabilityId);
        if (foundCapability !== null) {
            return foundCapability;
        } else {
            StorageService.throwModelNotFoundError(`No capability with id "${capabilityId}"`);
        }
    }

    public async getStationCapabilities(stationId: string) {
        return this._stationCapabilities.filter((stationCapability) => stationCapability.stationId === stationId);
    }

    public async getAllCapabilities() {
        return StorageService.cloneArrayOfObjects<RawCapability>(this._capabilities);
    }

    public async getUnit(unitId: string) {
        const foundUnit = this._units.find((unit) => unit.id === unitId);
        if (foundUnit !== undefined) {
            return foundUnit;
        } else {
            StorageService.throwModelNotFoundError(`No unit with id "${unitId}"`);
        }
    }

    public async getAllUnits() {
        return StorageService.cloneArrayOfObjects(this._units);
    }

    public async addUnit(unit: RawUnit) {
        this._units.push(unit);
    }

    public async deleteCapabilityById(capabilityId: string) {
        const index = this._capabilities.findIndex(((capability) => capability.id === capabilityId));
        if (index !== -1) {
            this._capabilities.splice(index, 1);
        } else {
            const e = new Error(`no capability with id "${capabilityId}"`);
            e.name = "ModelNotFoundError";
            throw e;
        }
    }

    public async deleteStationCapability(stationId: string, capabilityId: string) {
        const index = this._stationCapabilities.findIndex(
            (stationCapability) =>
                stationCapability.stationId === stationId &&
                stationCapability.capabilityId === capabilityId
        );
        if (index !== -1) {
            this._stationCapabilities.splice(index, 1);
        } else {
            StorageService.throwModelNotFoundError(
                `No station capability with stationId "${stationId}" and capabilityId "${capabilityId}"`
            );
        }
    }

    public async deleteStation(stationId: string) {
        const index = this._stations.findIndex(
            (station) => station.id === stationId
        );
        if (index !== -1) {
            this._stations.splice(index, 1);
        } else {
            StorageService.throwModelNotFoundError(
                `No station station with id "${stationId}"`
            );
        }
    }
}
