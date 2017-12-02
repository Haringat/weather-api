import "async-tools";
import * as express from "express";
import * as http from "http";
import {
    Server
} from "http";
import * as swagger from "swagger-node-express";
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

    private consumerAPI = express();
    private consumerSwagger;
    private enableConsumerDocs: boolean;
    private enableSupplierDocs: boolean;
    private host: string;
    private port: number;
    private server: Server;
    private state: ApplicationState = ApplicationState.UNCONFIGURED;
    private supplierAPI = express();
    private supplierSwagger;

    constructor(config: IConfiguration) {

        this.host = config["router.host"];
        this.port = config["router.port"];
        this.enableConsumerDocs = config["router.swagger.enableConsumerDocumentation"];
        this.enableSupplierDocs = config["router.swagger.enableSupplierDocumentation"];

        this.server = createServer(this.app);

        this.app.use(expressMiddleWare);

        if (this.enableConsumerDocs) {
            this.consumerSwagger = swagger.createNew(this.consumerAPI);
        }
        if (this.enableSupplierDocs) {
            this.supplierSwagger = swagger.createNew(this.supplierAPI);
        }

        this.app.use("/v1/consumer", this.consumerAPI);
        this.app.use("/v1/supplier", this.supplierAPI);
    }

    public async setup() {
        await this.setupSwagger();
    }

    // noinspection JSMethodCanBeStatic
    public async addSupplierRoute(route) {
        if (this.enableSupplierDocs) {
            this.supplierSwagger.addHandlers(route.spec.method, [route]);
        } else {
            this.supplierAPI.use(route.spec.path, route.action);
        }
    }

    public async addConsumerRoute(route) {
        if (this.enableConsumerDocs) {
            this.consumerSwagger.addHandlers(route.spec.method, [route]);
        } else {
            this.consumerAPI.use(route.spec.path, route.action);
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
        if (this.enableConsumerDocs) {
            this.consumerSwagger.configureSwaggerPaths("", "/docs", "");
            this.consumerSwagger.configure(`http://${this.host}:${this.port}`, "1");
        }
        if (this.enableSupplierDocs) {
            this.supplierSwagger.configureSwaggerPaths("", "/docs", "");
            this.supplierSwagger.configure(`http://${this.host}:${this.port}`, "1");
        }
        await consumerRoutes.forEachAsync(async (route) => {
            await this.addConsumerRoute(route);
        });
        await supplierRoutes.forEachAsync(async (route) => {
            await this.addSupplierRoute(route);
        });
        this.state = ApplicationState.OFFLINE;
    }

}
