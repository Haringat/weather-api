import "async-tools";
import * as express from "express";
import {createServer, Server} from "http";
import * as swagger from "swagger-node-express";
import routes from "../routes";
import console, { expressMiddleWare } from "./logger";

enum ApplicationState {
    UNCONFIGURED,
    OFFLINE,
    STARTING,
    ONLINE,
    STOPPING
}

export default class Application {

    public app = express();
    private server: Server;
    private swaggerApp = express();
    private swaggerInitialized: boolean = false;
    private bootstrapped: boolean = false;
    private state: ApplicationState = ApplicationState.UNCONFIGURED;

    constructor() {
        this.app.use(expressMiddleWare);

        this.app.use(this.swaggerApp);
    }

    public async setupSwagger() {
        if (this.state !== ApplicationState.UNCONFIGURED) {
            console.warning("tried to reconfigure application server.");
            return;
        }
        await routes.forEachAsync(async (route) => {
            await this.addRoute(route);
        });
        swagger.setAppHandler(this.app);
        this.state = ApplicationState.OFFLINE;
    }

    public async addRoute(route) {
        swagger.addHandlers(route.spec.method, [route]);
    }

    public async bootstrap(host: string, port: number) {

        if (this.state !== ApplicationState.OFFLINE) {
            console.warning(`tried bootstrap app from state ${ApplicationState[this.state]}`);
            return;
        }

        this.bootstrapped = true;

        if (!this.swaggerInitialized) {
            await this.setupSwagger();
        }

        return await new Promise<void>((resolve) => {
            this.server = createServer(this.app)
                .listen(port, host, resolve);
        });

    }

    public async debootstrap() {

        return await new Promise((resolve) => {
            this.server.close(() => {
                this.bootstrapped = false;
                resolve();
            });
        });

    }

}
