import Capability from "../model/Capability";
import Station from "../model/Station";
import WeatherDataPoint from "../model/WeatherDataPoint";

export default class StorageService {
    private stations: Array<Station> = [];
    private historyData: Array<WeatherDataPoint<number|string>> = [];
    private forecastData: Array<WeatherDataPoint<number|string>> = [];
    private capabilities: Array<Capability> = [];

    public getAllStations() {
        // clone the array
        return [...this.stations];
    }

    public getStation(id: string) {
        const foundStation = this.stations.find((station) => station.id === id);
        if (foundStation !== null) {
            return foundStation;
        } else {
            this.throwModelNotFoundError(`No station with id "${id}"`);
        }
    }

    public addStation(station: Station) {
        this.stations.push(station);
    }

    public getHistoryDataPoint(id: string) {
        const dataPoint = this.historyData.find((historyDataPoint) => historyDataPoint.id === id);
        if (dataPoint !== null) {
            return dataPoint;
        } else {
            this.throwModelNotFoundError(`No history data point with id "${id}"`);
        }
    }

    public getHistoryDataByStationAndDate(stationId: string, date: Date) {
        const dataPoint = this.historyData.filter(
            (historyDataPoint) => historyDataPoint.stationId === stationId
        ).find((historyDataPoint) => historyDataPoint.date.getUTCFullYear() === date.getUTCFullYear()
                && historyDataPoint.date.getUTCMonth() === date.getUTCMonth()
                && historyDataPoint.date.getUTCDate() === date.getUTCDate()
                && historyDataPoint.date.getUTCHours() === date.getUTCHours()
                && historyDataPoint.date.getUTCSeconds() === date.getUTCSeconds()
        );
        if (dataPoint !== null) {
            return dataPoint;
        } else {
            this.throwModelNotFoundError(`No history data point at date "${date.toISOString()}" and stationId `
                + `"${stationId}"`);
        }
    }

    public addHistoryDataPoint(dataPoint: WeatherDataPoint<string|number>) {
        this.historyData.push(dataPoint);
    }

    private throwModelNotFoundError(msg: string) {
        const e = new Error(msg);
        e.name = "ModelNotFoundError";
        throw e;
    }

}
