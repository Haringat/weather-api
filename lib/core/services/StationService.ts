import Station from "../model/Station";
import {
    StorageService
} from "../storage";

export default class StationService {

    public constructor(private storageService: StorageService) {
    }

    public add(station: Station) {
        this.storageService.addStation(station);
    }

    public getAll() {
        return this.storageService.getAllStations();
    }

}
