import {
    Request, Response
} from "express";
import {
    Console2
} from "scribe-js/lib/console2";
import Controller, {
    methodName
} from "../core/Controller";
import LoggerService from "../core/services/LoggerService";
import StationService from "../core/services/StationService";

export default class StationsController extends Controller {

    public path = "/stations";
    public supportedHttpMethods: Array<methodName> = ["getSingle", "getAll", "add", "modify", "remove"];

    constructor(
        private _logger: LoggerService,
        private _stationsService: StationService
    ) {
        super();
    }

    public async add(request: Request, response: Response) {
        try {
            await this._stationsService.create(request.body);
        } catch (e) {
            if (e.name === "IncompleteModelError") {
                response.status(400).send("Incomplete model").end();
            } else {
                throw e;
            }
        }
    }

    public async getSingle(request: Request, response: Response) {
        const stationId = request.params.id;
        const station = this._stationsService.getOne(stationId);
        response.status(200).send(station).end();
    }

    public async getAll(request: Request, response: Response) {
        const stations = this._stationsService.getAll();
        response.status(200).send(stations).end();
    }

}
