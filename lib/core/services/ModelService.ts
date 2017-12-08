import Capability from "../dataAccess/Capability";
import Station from "../dataAccess/Station";
import Unit from "../dataAccess/Unit";
import WeatherDataPoint from "../dataAccess/WeatherDataPoint";
import StorageService from "../storage/StorageService";

export default class ModelService {

    private _stations: Array<Station> = [];
    private _units: Array<Unit> = [];
    private _capabilities: Array<Capability> = [];
    private _weatherHistory: Array<WeatherDataPoint> = [];

    constructor(private _storageService: StorageService) {

    }

}
