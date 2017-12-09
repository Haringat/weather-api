import "async-tools";
import * as express from "express";
import * as http from "http";
import {
    Server
} from "http";
import {
    bodyBuffer,
    jsonParser,
    xmlParser
} from "./bufferMiddleware";
import {
    IConfiguration
} from "./configuration/defaults";
import Controller, {
    getHttpMethodName,
    getPath
} from "./Controller";
import serializeJSON from "./serializers/json";
import serializeXML from "./serializers/xml";
import LoggerService from "./services/LoggerService";

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

    constructor(config: IConfiguration, private _logger: LoggerService) {

        this._host = config["router.host"];
        this._port = config["router.port"];

    }

    public async setup() {
        if (this._state !== ApplicationState.UNCONFIGURED) {
            return Promise.reject(new Error(`tried to reconfigure app in state ${ApplicationState[this._state]}`));
        }

        await this.setupExpress();
        await this.setupControllers();

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

    // TODO: split the controller setup into several methods
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
                        controller[method](request, response).then((data) => {
                            if (!response.finished) {
                                if (data !== undefined) {
                                    if (request.headers.accept === undefined) {
                                        const body = serializeJSON(data);
                                        response.setHeader("Content-Type", "Application/JSON");
                                        response.status(200).send(body).end();
                                    } else {
                                        switch (request.headers.accept.toLowerCase()) {
                                            case "application/json":
                                            case "text/json":
                                            case "*/json":
                                            case "*/*":
                                                response.setHeader("Content-Type", "Application/JSON");
                                                response.status(200).send(serializeJSON(data)).end();
                                                break;
                                            case "application/xml":
                                            case "text/xml":
                                            case "*/xml":
                                                response.setHeader("Content-Type", "Application/XML");
                                                response.status(200).send(serializeXML(data)).end();
                                                break;
                                            default:
                                                // not acceptable
                                                response.status(406).end();
                                        }
                                    }
                                } else {
                                    // no content
                                    response.status(204).end();
                                }
                            }
                        }, (e) => {
                            if (typeof e === "number") {
                                e = {
                                    status: e
                                };
                            }
                            if (typeof e === "object") {
                                if (e instanceof Error) {
                                    response.status(500).end();
                                    this._logger.error(`Route "${controllerName}.${method}" failed with error.`);
                                    this._logger.error(e.stack);
                                } else if (e.hasOwnProperty("status")) {
                                    let body;
                                    if (e.hasOwnProperty("body")) {
                                        switch (request.headers.accept.toLowerCase()) {
                                            case "application/json":
                                            case "text/json":
                                            case "*/json":
                                            case "*/*":
                                                response.setHeader("Content-Type", "Application/JSON");
                                                body = serializeJSON(e.body);
                                                break;
                                            case "application/xml":
                                            case "text/xml":
                                            case "*/xml":
                                                response.setHeader("Content-Type", "Application/XML");
                                                body = serializeXML(e.body);
                                                break;
                                            default:
                                                // not acceptable
                                                response.status(406).end();
                                        }
                                    }
                                    if (!response.finished) {
                                        response.status(e.status);
                                        if (e.hasOwnProperty("body")) {
                                            response.send(body);
                                        }
                                        response.end();
                                    }
                                }
                                response.status(e).end();
                            } else {
                                this._logger.error(`cannot handle "something" thrown by route.`);
                                this._logger.error(e);
                                response.status(500).end();
                            }
                        });
                    } else {
                        // not implemented
                        response.status(501).end();
                        this._logger.warning(`controller "${controllerName}" does not implement method ${method}`);
                    }
                });
            });
            this._api.all(controller.path, (request, response) => {
                // method not allowed
                response.status(405).end();
            });
            this._api.all(controller.path + "/:fooId", (request, response) => {
                // method not allowed
                response.status(405).end();
            });
        });
    }

    private async setupExpress() {
        this._api.use((request: express.Request, response: express.Response, next: express.NextFunction) => {
            response.removeHeader("X-Powered-By");
            response.setHeader("Access-Control-Allow-Headers", "Content-Type");
            next(null);
        });
        this.app.use((request: express.Request, response: express.Response, next: express.NextFunction) => {
            response.removeHeader("X-Powered-By");
            response.setHeader("Access-Control-Allow-Headers", "Content-Type");
            next(null);
        });
        this.app.use(this._logger.expressMiddleware);

        this.app.use("/v1", this._api);
        this._api.use(bodyBuffer());
        this._api.use(xmlParser());
        this._api.use(jsonParser());

        this._server = createServer(this.app);

    }

}
