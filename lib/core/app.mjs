var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import * as express from "express";
import { createServer } from "http";
import router from "../routes";
import { expressMiddleWare } from "./logger";
export default class {
    constructor() {
        this.app = express();
        this.app.use(expressMiddleWare);
        this.app.use("/v1", router);
    }
    setupSwagger() {
        return __awaiter(this, void 0, void 0, function* () {
            return;
        });
    }
    bootstrap(host, port) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve) => {
                this.server = createServer(this.app).listen(port, host, resolve);
            });
        });
    }
    debootstrap() {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve) => {
                this.server.close(resolve);
            });
        });
    }
}
