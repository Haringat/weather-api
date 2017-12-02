import test from "ava";
import * as superTest from "supertest";
import App from "../../../core/app";
import parseConfigFile from "../../../core/configuration/Configuration";

test.beforeEach(async (t) => {
    const config = parseConfigFile(Buffer.from(JSON.stringify({
        router: {
            host: "127.0.0.1",
            port: 0
        }
    }), "utf8"), {
        router: {
            host: "127.0.0.1",
            port: 0
        }
    });
    t.context.app = new App(config);
    await t.context.app.setup();
    await t.context.app.bootstrap();
});

test("adds a new station", async (t) => {
    t.plan(1);
    await superTest(t.context.app.server)
        .post("/v1/supplier/stations/")
        .expect(200)
        .then(() => t.pass(), (e) => t.fail(e));
});

test.afterEach.always(async (t) => {
    await t.context.app.debootstrap();
});
