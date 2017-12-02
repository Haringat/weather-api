import "async-tools";
import * as express from "express";
import {
    createServer,
    Server
} from "http";
import * as swagger from "swagger-node-express";
import routes from "../routes";
import {
    IConfiguration
} from "./configuration/Configuration";
import console, {
    expressMiddleWare
} from "./logger";

enum ApplicationState {
    UNCONFIGURED,
    OFFLINE,
    STARTING,
    ONLINE,
    STOPPING
}

export default class Application {

    public app = express();
    // TODO: use config
    private host = "127.0.0.1";
    // TODO: use config
    private port = 80;
    private server: Server;
    private swaggerApp = express();
    private state: ApplicationState = ApplicationState.UNCONFIGURED;

    constructor(config: IConfiguration) {

        this.host = config["router.host"] as string;
        this.port = config["router.port"] as number;

        this.server = createServer(this.app);

        this.app.use(expressMiddleWare);

        this.app.use("/v1", this.swaggerApp);
    }

    public async setup() {
        await this.setupSwagger();
    }

    public async addRoute(route) {
        swagger.addHandlers(route.spec.method, [route]);
    }

    public async bootstrap() {

        if (this.state !== ApplicationState.OFFLINE) {
            console.warning(`tried bootstrap app from state ${ApplicationState[this.state]}`);
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
        swagger.setAppHandler(this.app);
        swagger.configureSwaggerPaths("", "/docs", "");
        swagger.configure(`http://${this.host}:${this.port}`, "0.1");
        await routes.forEachAsync(async (route) => {
            await this.addRoute(route);
        });
        this.state = ApplicationState.OFFLINE;
    }

}
