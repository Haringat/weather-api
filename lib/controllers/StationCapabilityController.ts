import Controller, {
    methodName
} from "../core/Controller";
import CapabilityService from "../core/services/CapabilityService";
import LoggerService from "../core/services/LoggerService";
import StationService from "../core/services/StationService";

export default class StationCapabilityController extends Controller {

    public supportedHttpMethods: Array<methodName> = ["add", "remove"];
    public path: string = "/stations/:stationId/capabilities";

    constructor(
        private _logger: LoggerService,
        private _stationService: StationService,
        private _capabilityService: CapabilityService
    ) {
        super();
    }

}
