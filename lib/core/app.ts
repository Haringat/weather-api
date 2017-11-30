import * as express from "express";
import {createServer, Server} from "http";
import router from "../routes";
import { expressMiddleWare } from "./logger";

export default class {

    public app: express.Express;
    private server: Server;

    constructor() {

        this.app = express();

        this.app.use(expressMiddleWare);
        this.app.use("/v1", router);

    }

    public async setupSwagger() {
        return;
    }

    public async bootstrap(host: string, port: number) {

        return new Promise((resolve) => {
            this.server = createServer(this.app).listen(port, host, resolve);
        });

    }

    public async debootstrap() {

        return new Promise((resolve) => {
            this.server.close(resolve);
        });

    }

}
