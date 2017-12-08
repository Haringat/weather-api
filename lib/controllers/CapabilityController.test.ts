import test from "ava";
import Application from "../core/app";
import parseConfigFile from "../core/configuration/Configuration";
import {
    IConfiguration
} from "../core/configuration/defaults";
import logger from "../core/logger";

test.beforeEach(async (t) => {
    const config = parseConfigFile<IConfiguration>(Buffer.from(JSON.stringify({
        router: {
            host: "127.0.0.1",
            port: 0
        }
    })), {
        router: {
            host: "127.0.0.1",
            port: 0
        }
    });
    const app = new Application(config, logger);
    await app.setup();
    await app.bootstrap();
    t.context.app = app;
});

test("add capability", async (t) => {
});

test.todo("remove capability");

test.todo("get capability by name");

test.todo("get capability by id");

test.afterEach(async (t) => {
    const app: Application = t.context.app;
    await app.debootstrap();
});
