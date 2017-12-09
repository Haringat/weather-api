import {
    Request,
    Response
} from "express";
import Controller, {
    methodName
} from "../core/Controller";
import IdStub from "../core/dataAccess/IdStub";
import LoggerService from "../core/services/LoggerService";
import StationService from "../core/services/StationService";

export default class StationCapabilityController extends Controller {

    public supportedHttpMethods: Array<methodName> = ["getAll", "add", "remove"];
    public path: string = "/stations/:stationId/capabilities";

    constructor(
        private _logger: LoggerService,
        private _stationService: StationService
    ) {
        super();
    }

    public async getAll(request: Request, response: Response) {
        const station = await this._stationService.getOne(request.params.stationId);
        return station.capabilities.map(
            (capability) => new IdStub("capability", capability.id, capability.name)
        );
    }

    public async add(request: Request, response: Response) {
        const capabilityId = request.body.capabilityId;
        await this._stationService.linkCapability(request.params.stationId, capabilityId);
        response.status(201).end();
    }

    public async remove(request: Request, resonse: Response) {
        await this._stationService.unlinkCapability(request.params.stationId, request.params.stationCapabilityId);
        resonse.status(200).end();
    }

}
