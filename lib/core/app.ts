import "async-tools";
import * as express from "express";
import * as http from "http";
import {
    Server
} from "http";
import {
    Console2
} from "scribe-js/lib/console2";
import {
    IConfiguration
} from "./configuration/defaults";
import Controller, {
    getHttpMethodName,
    getPath
} from "./Controller";
import {
    expressMiddleWare, loggerMethods
} from "./logger";

const {
    createServer
} = http;

enum ApplicationState {
    UNCONFIGURED,
    OFFLINE,
    STARTING,
    ONLINE,
    STOPPING
}

export default class Application {

    public app = express();

    private _api = express();
    private _host: string;
    private _port: number;
    private _server: Server;
    private _state: ApplicationState = ApplicationState.UNCONFIGURED;
    private _controllers: Array<Controller> = [];

    constructor(config: IConfiguration, private _logger: Console2<loggerMethods>) {

        this._host = config["router.host"];
        this._port = config["router.port"];

    }

    public async setup() {
        if (this._state !== ApplicationState.UNCONFIGURED) {
            return Promise.reject(new Error(`tried to reconfigure app in state ${ApplicationState[this._state]}`));
        }

        await this.setupControllers();
        await this.setupExpress();

        this._state = ApplicationState.OFFLINE;
    }

    public addController(controller: Controller) {
        this._controllers.push(controller);
    }

    public async bootstrap() {

        if (this._state !== ApplicationState.OFFLINE) {
            return Promise.reject(new Error(`tried to bootstrap app from state ${ApplicationState[this._state]}`));
        }

        this._state = ApplicationState.STARTING;

        return await new Promise<void>((resolve) => {
            this._server = createServer(this.app).listen(this._port, this._host, () => {
                this._state = ApplicationState.ONLINE;
                resolve();
            });
        });

    }

    public async debootstrap() {

        this._state = ApplicationState.STOPPING;

        return await new Promise((resolve) => {
            this._server.close(() => {
                this._state = ApplicationState.OFFLINE;
                resolve();
            });
        });

    }

    private async setupControllers() {
        await this._controllers.forEachAsync(async (controller) => {
            const controllerName = Object.getPrototypeOf(controller).constructor.name;
            const modelName = controllerName.replace(
                /^[A-Z]/, (capitalLetter) => capitalLetter.toLowerCase()
            ).replace(/Controller$/, "");
            this._api.options(getPath(controller.path, modelName, "getSingle"), (request, response) => {
                controller.options(request, response).catch((e) => {
                    response.status(500).end();
                    this._logger.error(`Route "${controllerName}.options" failed with error.`);
                    this._logger.error(e.stack);
                });
            });
            this._api.options(getPath(controller.path, modelName, "getAll"), (request, response) => {
                controller.options(request, response).catch((e) => {
                    response.status(500).end();
                    this._logger.error(`Route "${controllerName}.options" failed with error.`);
                    this._logger.error(e.stack);
                });
            });
            await controller.supportedHttpMethods.forEachAsync(async (method) => {
                const httpMethod = getHttpMethodName(method);
                const path = getPath(controller.path, modelName, method);
                this._logger.info(`registering route: ${httpMethod} on ${path}`);
                this._api[httpMethod](path, (request: express.Request, response: express.Response) => {
                    if (controller[method]) {
                        controller[method](request, response).catch((e) => {
                            response.status(500).end();
                            this._logger.error(`Route "${controllerName}.${method}" failed with error.`);
                            this._logger.error(e.stack);
                        });
                    } else {
                        response.status(501).end();
                        this._logger.warning(`controller "${controllerName}" does not support method ${method}`);
                    }
                });
            });
        });
    }

    private async setupExpress() {
        this._api.use((request: express.Request, response: express.Response, next: express.NextFunction) => {
            response.removeHeader("X-Powered-By");
            response.setHeader("Access-Control-Allow-Headers", "Content-Type");
            next();
        });
        this.app.use((request: express.Request, response: express.Response, next: express.NextFunction) => {
            response.removeHeader("X-Powered-By");
            response.setHeader("Access-Control-Allow-Headers", "Content-Type");
            next();
        });
        this.app.use(expressMiddleWare);

        this.app.use("/v1", this._api);
        this.app.use(express.json());
        this._api.use(express.json());

        this._server = createServer(this.app);

    }

}
