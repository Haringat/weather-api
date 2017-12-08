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

export default class CapabilityController extends Controller {

    public supportedHttpMethods: Array<methodName> = ["add", "remove"];
    public path: string = "/capabilities";

    constructor(private _logger: Console2<loggerMethods>, private _capabilityService: CapabilityService) {
        super();
    }

}
