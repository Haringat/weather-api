import {
    Request, Response
} from "express";
import Controller, {
    methodName
} from "../core/Controller";
import IdStub from "../core/dataAccess/IdStub";
import LoggerService from "../core/services/LoggerService";
import StationService from "../core/services/StationService";

export default class StationController extends Controller {

    public path = "/stations";
    public supportedHttpMethods: Array<methodName> = ["getSingle", "getAll", "add", "modify", "remove"];

    constructor(
        private _logger: LoggerService,
        private _stationsService: StationService
    ) {
        super();
    }

    public async add(request: Request, response: Response) {
        const body = request.body;
        if (/[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}/.test(body.name)) {
            this._logger.error("cannot use uuid as name for station.");
            throw {
                status: 400
            };
        }
        if (/\d{1,3}(?:\.\d{1,3})?° ?[NS] ?\d{1,3}(?:\.\d{1,3})?° ?[OW]/.test(body.name)) {
            this._logger.error("cannot use coordinates station name.");
            throw {
                status: 400
            };
        }
        const station = await this._stationsService.create(request.body);
        await this._stationsService.add(station);
        throw {
            status: 201,
            body: new IdStub("station", station.id)
        };
    }

    public async getSingle(request: Request, response: Response) {
        const stationId = request.params.id;
        return this._stationsService.getOne(stationId);
    }

    public async getAll(request: Request, response: Response) {
        const stations = await this._stationsService.getAll();
        return stations.mapAsync(async (station) => {
            return new IdStub("station", station.id, station.name);
        });
    }

    public async remove(request: Request, response: Response) {
        await this._stationsService.delete(request.params.stationId);
        response.status(200).end();
    }

}
