import {
    Request, Response
} from "express";
import Controller, {
    methodName
} from "../core/Controller";
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
            throw new Error("cannot use uuid as name.");
        }
        const capability = await this._capabilityService.create(request.body);
        await this._capabilityService.addCapability(capability);
        response.status(200).send({
            id: capability.id
        }).end();
    }

    public async getAll(request: Request, response: Response) {
        const allCapabilities = await this._capabilityService.getAll();
        response.status(200).send(allCapabilities).end();
    }

    public async getSingle(request: Request, response: Response) {
        const id = request.params.capabilityId;
        if (/[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}/.test(id)) {
            // id is a uuid
            try {
                const capability = await this._capabilityService.getById(id);
                response.status(200).send(capability).end();
            } catch (e) {
                if (e.name === "ModelNotFoundError") {
                    response.status(404).end();
                } else {
                    throw e;
                }
            }
        } else {
            // id is actually a name
            try {
                const capability = await this._capabilityService.getByName(id);
                response.status(200).send(capability).end();
            } catch (e) {
                if (e.name === "ModelNotFoundError") {
                    response.status(404).end();
                } else {
                    throw e;
                }
            }
        }
    }

    public async remove(request: Request, response: Response) {
        await this._capabilityService.delete(request.params.capabilityId);
        response.status(200).end();
    }

}
