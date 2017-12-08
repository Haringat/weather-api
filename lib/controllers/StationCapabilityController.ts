import {
    Request, Response
} from "express";
import {
    Console2
} from "scribe-js/lib/console2";
import Controller, {
    methodName
} from "../core/Controller";
import {
    loggerMethods
} from "../core/logger";
import CapabilityService from "../core/services/CapabilityService";
import StationService from "../core/services/StationService";

export default class StationCapabilityController extends Controller {

    public supportedHttpMethods: Array<methodName> = ["add", "remove"];
    public path: string = "/stations/:stationId/capabilities";

    constructor(
        private _logger: Console2<loggerMethods>,
        private _stationService: StationService,
        private _capabilityService: CapabilityService
    ) {
        super();
    }

}
