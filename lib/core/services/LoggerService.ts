import * as scribeJs from "scribe-js";
import {
    Console2 as Console2Interface
} from "scribe-js/lib/console2";
import * as expressLogger from "scribe-js/lib/expressLogger";

export type loggerMethods = "info" | "log" | "error" | "warning" | "dir";

const {
   Console2
} = scribeJs({
    createDefaultConsole: true,
    rootPath: "./logs"
});

export default class LoggerService {

    private _logger: Console2Interface<loggerMethods>;

    public get expressMiddleware() {
        return expressLogger.logger(this._logger);
    }

    constructor() {
        this._logger = new Console2<loggerMethods>({
            alwaysDate: true,
            alwaysLocation: true,
            alwaysTags: true,
            alwaysTime: true,
            logInConsole: true
        });
        this._logger.addLogger("info");
        this._logger.addLogger("log");
        this._logger.addLogger("error");
        this._logger.addLogger("warning");
        this._logger.addLogger("dir");
    }

    public info(loggable: any) {
        if (typeof loggable === "object") {
            this._logger.info(JSON.stringify(loggable));
        } else {
            this._logger.info(loggable);
        }
    }

    public log(loggable: any) {
        if (typeof loggable === "object") {
            this._logger.log(JSON.stringify(loggable));
        } else {
            this._logger.log(loggable);
        }
    }

    public error(loggable: any) {
        if (typeof loggable === "object") {
            this._logger.error(JSON.stringify(loggable));
        } else {
            this._logger.error(loggable);
        }
    }

    public warning(loggable: any) {
        if (typeof loggable === "object") {
            this._logger.warning(JSON.stringify(loggable));
        } else {
            this._logger.warning(loggable);
        }
    }

    public dir(loggable: any) {
        if (typeof loggable === "object") {
            this._logger.dir(JSON.stringify(loggable));
        } else {
            this._logger.dir(loggable);
        }
    }

}
