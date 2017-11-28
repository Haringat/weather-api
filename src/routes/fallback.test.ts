import test from "ava";
import { createServer } from "http";
import {} from "methods";
import * as superTest from "supertest";
import { Test } from "supertest";
import App from "../core/app";

test.beforeEach(async (t) => {
    t.context.app = new App();
    await t.context.app.bootstrap();
});

test("catches all methods for non-existing endpoints", (t) => {
    t.plan(52);
    const endpoints = ["/foobar", "/foo/bar/baz"];
    const methods = [
        "get",
        "post",
        "put",
        "head",
        "delete",
        "options",
        "trace",
        "copy",
        "lock",
        "mkcol",
        "move",
        "purge",
        "propfind",
        "proppatch",
        "unlock",
        "report",
        "mkactivity",
        "checkout",
        "merge",
        "m-search",
        "notify",
        "subscribe",
        "unsubscribe",
        "patch",
        "search",
        "connect"
    ];
    return Promise.all(endpoints.map(async (endpoint) => {
        await Promise.all(methods.map(async (method) => {
            await superTest(t.context.app.server)
                [method](endpoint)
                .expect(404)
                .then((data) => t.pass, () => t.fail(`method "${method}" on endpoint ${endpoint} failed`));
        }));
    }));
});

test.afterEach(async (t) => {
    await t.context.app.debootstrap();
});
