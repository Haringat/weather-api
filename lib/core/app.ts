import "async-tools";
import * as express from "express";
import * as http from "http";
import {
    Server
} from "http";
import * as swagger from "swagger-node-express";
import models from "../models";
import {
    consumerRoutes,
    supplierRoutes
} from "../routes";
import {
    IConfiguration
} from "./configuration/defaults";
import console, {
    expressMiddleWare
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

    private api = express();
    private swagger;
    private enableConsumerDocs: boolean;
    private enableSupplierDocs: boolean;
    private host: string;
    private port: number;
    private server: Server;
    private state: ApplicationState = ApplicationState.UNCONFIGURED;

    constructor(config: IConfiguration) {

        this.host = config["router.host"];
        this.port = config["router.port"];
        this.enableConsumerDocs = config["router.swagger.enableConsumerDocumentation"];
        this.enableSupplierDocs = config["router.swagger.enableSupplierDocumentation"];

        this.server = createServer(this.app);

        this.app.use(expressMiddleWare);

        this.api.use((request: express.Request, response: express.Response, next: express.NextFunction) => {
            response.removeHeader("X-Powered-By");
            response.setHeader("Access-Control-Allow-Headers", "Content-Type");
            next();
        });
        this.app.use((request: express.Request, response: express.Response, next: express.NextFunction) => {
            response.removeHeader("X-Powered-By");
            response.setHeader("Access-Control-Allow-Headers", "Content-Type");
            next();
        });

        this.swagger = swagger.createNew(this.api);

        this.app.use("/v1", this.api);

    }

    public async setup() {
        await this.setupSwagger();
    }

    public async addSupplierRoute(route) {
        if (this.enableSupplierDocs) {
            this.swagger.addHandlers(route.spec.method, [route]);
        } else {
            this.api.use(route.spec.path, route.action);
        }
    }

    public async addConsumerRoute(route) {
        if (this.enableConsumerDocs) {
            this.swagger.addHandlers(route.spec.method, [route]);
        } else {
            this.api.use(route.spec.path, route.action);
        }
    }

    public async bootstrap() {

        if (this.state !== ApplicationState.OFFLINE) {
            console.warning(`tried to bootstrap app from state ${ApplicationState[this.state]}`);
            return;
        }

        this.state = ApplicationState.STARTING;

        return await new Promise<void>((resolve) => {
            this.server = createServer(this.app).listen(this.port, this.host, () => {
                this.state = ApplicationState.ONLINE;
                resolve();
            });
        });

    }

    public async debootstrap() {

        this.state = ApplicationState.STOPPING;

        return await new Promise((resolve) => {
            this.server.close(() => {
                this.state = ApplicationState.OFFLINE;
                resolve();
            });
        });

    }

    private async setupSwagger() {
        if (this.state !== ApplicationState.UNCONFIGURED) {
            console.warning("tried to reconfigure application server.");
            return;
        }
        await consumerRoutes.forEachAsync(async (route) => {
            await this.addConsumerRoute(route);
        });
        await supplierRoutes.forEachAsync(async (route) => {
            await this.addSupplierRoute(route);
        });
        this.swagger.configureSwaggerPaths("", "/api-docs", "");
        this.swagger.addModels(models);
        this.swagger.setApiInfo({
            title: "weather api",
            description: "An api for weather data",
            termsOfService: "http://example.com",
            contact: "contact@example.com",
            license: "FOO",
            licenseUrl: "http://example.com"
        });
        this.swagger.setHeaders = (res) => {
            res.setHeader("Access-Control-Allow-Headers", "Content-Type");
            res.setHeader("Content-Type", "Application/json");
        };
        this.swagger.configureDeclaration("stations", {
            description: "provides endpoints for working with stations",
            authorizations : [],
            protocols : ["http"],
            consumes: [
                "Application/JSON",
                "Application/XML"
            ],
            produces: [
                "Application/JSON",
                "Application/XML"
            ]
        });
        this.swagger.configure(`http://${this.host}:${this.port}/v1`, "1.0.0");
        this.state = ApplicationState.OFFLINE;
    }

}
