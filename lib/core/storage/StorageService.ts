import Capability from "../model/Capability";
import Station from "../model/Station";
import WeatherDataPoint from "../model/WeatherDataPoint";

export default class StorageService {
    private stations: Array<Station> = [];
    private historyData: Array<WeatherDataPoint<number|string>> = [];
    private forecastData: Array<WeatherDataPoint<number|string>> = [];
    private capabilities: Array<Capability> = [];

    public async getAllStations() {
        // clone the array
        return [...this.stations];
    }

    public async getStation(id: string) {
        const foundStation = this.stations.find((station) => station.id === id);
        if (foundStation !== null) {
            return foundStation;
        } else {
            this.throwModelNotFoundError(`No station with id "${id}"`);
        }
    }

    public async addStation(station: Station) {
        this.stations.push(station);
    }

    public async getHistoryData() {
        return this.historyData.map((dataPoint) => {
            return {
                ...dataPoint
            };
        });
    }

    public async addHistoryDataPoint(dataPoint: WeatherDataPoint<number> | WeatherDataPoint<string>) {
        this.historyData.push(dataPoint);
    }

    public async getHistoryDataPoint(id: string) {
        const dataPoint = this.historyData.find((historyDataPoint) => historyDataPoint.id === id);
        if (dataPoint !== null) {
            return dataPoint;
        } else {
            this.throwModelNotFoundError(`No history data point with id "${id}"`);
        }
    }

    public async getHistoryDataByStationAndDate(stationId: string, date: Date) {
        const dataPoint = this.historyData.filter(
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
            this.throwModelNotFoundError(
                `No history data point at date "${date.toISOString()}" and stationId "${stationId}"`
            );
        }
    }

    public async addForecastDataPoint(dataPoint: WeatherDataPoint<number> | WeatherDataPoint<string>) {
        this.forecastData.push(dataPoint);
    }

    public async getForecastDataPoint(id: string) {
        const dataPoint = this.historyData.find((historyDataPoint) => historyDataPoint.id === id);
        if (dataPoint !== null) {
            return dataPoint;
        } else {
            this.throwModelNotFoundError(`No history data point with id "${id}"`);
        }
    }

    public async getForecastDataByStationAndDate(stationId: string, date: Date) {
        const dataPoint = this.historyData.filter(
            (forecastDataPoint) => forecastDataPoint.stationId === stationId
        ).filter((historyDataPoint) => {
            return historyDataPoint.date.getUTCFullYear() === date.getUTCFullYear()
                && historyDataPoint.date.getUTCMonth() === date.getUTCMonth()
                && historyDataPoint.date.getUTCDate() === date.getUTCDate();
        }).sort((dataPointA, dataPointB) => {
            if (dataPointA.dateOfMeasure < dataPointB.dateOfMeasure) {
                return -1;
            } else if (dataPointA.dateOfMeasure > dataPointB.dateOfMeasure) {
                return 1;
            } else {
                return 0;
            }
        }).reverse().find((historyDataPoint, index, history) => {
            return historyDataPoint.dateOfMeasure.valueOf() === history[0].dateOfMeasure.valueOf();
        });
        if (dataPoint !== null) {
            return dataPoint;
        } else {
            this.throwModelNotFoundError(
                `No history data point at date "${date.toISOString()}" and stationId "${stationId}"`
            );
        }
    }

    public async getForecastDataByStation(stationId: string) {
        return this.historyData.filter(
            (forecastDataPoint) => forecastDataPoint.stationId === stationId
        );
    }

    private throwModelNotFoundError(msg: string) {
        const e = new Error(msg);
        e.name = "ModelNotFoundError";
        throw e;
    }

}
