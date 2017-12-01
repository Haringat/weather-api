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
import App from "../../../core/app";
test.beforeEach((t) => __awaiter(this, void 0, void 0, function* () {
    t.context.app = new App();
    yield t.context.app.bootstrap();
}));
test("adds a new station", (t) => __awaiter(this, void 0, void 0, function* () {
    t.plan(1);
    yield superTest(t.context.app.server)
        .post("/v1/supplier/stations/")
        .expect(200)
        .then((data) => t.pass(), t.fail);
}));
test.afterEach.always((t) => __awaiter(this, void 0, void 0, function* () {
    yield t.context.app.debootstrap();
}));
