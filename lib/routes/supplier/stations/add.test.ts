import test from "ava";
import * as superTest from "supertest";
import App from "../../../core/app";

test.beforeEach(async (t) => {
    t.context.app = new App();
    await t.context.app.bootstrap();
});

test("adds a new station", async (t) => {
    t.plan(1);
    await superTest(t.context.app.server)
        .post("/v1/supplier/stations/")
        .expect(200)
        .then((data) => t.pass(), t.fail);
});

test.afterEach.always(async (t) => {
    await t.context.app.debootstrap();
});
