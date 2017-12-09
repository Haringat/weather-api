import {
    Request, Response
} from "express";
import Controller, {
    methodName
} from "../core/Controller";
import IdStub from "../core/dataAccess/IdStub";
import CapabilityService from "../core/services/CapabilityService";
import LoggerService from "../core/services/LoggerService";

export default class CapabilityController extends Controller {

    public supportedHttpMethods: Array<methodName> = ["getAll", "getSingle", "add", "remove"];
    public path: string = "/capabilities";

    constructor(private _logger: LoggerService, private _capabilityService: CapabilityService) {
        super();
    }

    public async add(request: Request, response: Response) {
        const body = request.body;
        if (/[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}/.test(body.name)) {
            this._logger.error("cannot use uuid as name for capability.");
            throw {
                status: 400
            };
        }
        const capability = await this._capabilityService.create(request.body);
        await this._capabilityService.addCapability(capability);
        throw {
            status: 201,
            body: new IdStub("capability", capability.id)
        };
    }

    public async getAll(request: Request, response: Response) {
        const capabilities = await this._capabilityService.getAll();
        return capabilities.map((capability) => new IdStub("capability", capability.id, capability.name));
    }

    public async getSingle(request: Request, response: Response) {
        const capability = await this._capabilityService.getOne(request.params.capabilityId);
        return capability;
    }

    public async remove(request: Request, response: Response) {
        await this._capabilityService.delete(request.params.capabilityId);
        throw {
            status: 200
        };
    }

}
