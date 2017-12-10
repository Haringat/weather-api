import {
    Request, Response
} from "express";
import Controller, {
    methodName
} from "../core/Controller";
import DataService from "../core/services/DataService";

export default class ReportController extends Controller {

    public supportedHttpMethods: Array<methodName> = ["add", "getAll"];
    public path: string = "/stations/:stationId/reports";

    constructor(private _dataService: DataService) {
        super();
    }

    public async getAll(request: Request, response: Response) {
        return await this._dataService.getAll(request.params.stationId, true);
    }

    public async add(request: Request, response: Response) {
        const dataPoint = await this._dataService.create(request.body);
        await this._dataService.add(dataPoint, true);
    }

}
