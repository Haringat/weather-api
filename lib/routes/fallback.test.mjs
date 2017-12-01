var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import test from "ava";
import * as superTest from "supertest";
import App from "../core/app";
test.beforeEach((t) => __awaiter(this, void 0, void 0, function* () {
    t.context.app = new App();
    yield t.context.app.bootstrap();
}));
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
    return Promise.all(endpoints.map((endpoint) => __awaiter(this, void 0, void 0, function* () {
        yield Promise.all(methods.map((method) => __awaiter(this, void 0, void 0, function* () {
            yield superTest(t.context.app.server)[method](endpoint)
                .expect(404)
                .then((data) => t.pass, () => t.fail(`method "${method}" on endpoint ${endpoint} failed`));
        })));
    })));
});
test.afterEach.always((t) => __awaiter(this, void 0, void 0, function* () {
    yield t.context.app.debootstrap();
}));
