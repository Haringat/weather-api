import test from "ava";
import {
    Request,
    Response
} from "express";
import * as stream from "stream";
import * as supertest from "supertest";
import Application from "./app";
import parseConfigFile from "./configuration/Configuration";
import {
    IConfiguration
} from "./configuration/defaults";
import Controller, {
    methodName
} from "./Controller";
import logger from "./logger";

const {
    Writable
} = stream;

test.beforeEach(async (t) => {
    // noinspection UnnecessaryLocalVariableJS
    const app = new Application(parseConfigFile<IConfiguration>(Buffer.from(JSON.stringify({
        router: {
            host: "127.0.0.1",
            port: 0
        }
    })), {
        router: {
            host: "127.0.0.1",
            port: 0
        }
    }), logger);
    t.context.app = app;
});

test("supports getSingle", async (t) => {
    t.plan(7);
    /* tslint:disable-next-line:max-classes-per-file */
    class GetSingleController extends Controller {

        public supportedHttpMethods: Array<methodName> = ["getSingle"];
        public path: string = "/getSingle";

        public async getSingle(request: Request, response: Response) {
            t.is(request.params.getSingleId, "foo");
            response.status(200).send({
                foo: "bar"
            }).end();
        }

    }
    const app: Application = t.context.app;
    app.addController(new GetSingleController());

    await app.setup();
    await app.bootstrap();

    const testServer = supertest(Reflect.get(app, "_server"));

    await testServer.options(
        "/v1/getSingle"
    ).expect((res: supertest.Response) => {
        t.is(res.get("Access-Control-Allow-Methods"), "");
        t.is(res.status, 200);
    });

    await testServer.options(
        "/v1/getSingle/foo"
    ).expect((res: supertest.Response) => {
        t.is(res.get("Access-Control-Allow-Methods"), "get");
        t.is(res.status, 200);
    });

    await testServer.get(
        "/v1/getSingle/foo"
    ).expect((res: supertest.Response) => {
        t.is(res.status, 200);
        t.deepEqual(res.body, {
            foo: "bar"
        });
    });
});

test("supports getAll", async (t) => {
    t.plan(7);
    /* tslint:disable-next-line:max-classes-per-file */
    class GetAllController extends Controller {

        public supportedHttpMethods: Array<methodName> = ["getAll"];
        public path: string = "/getAll";

        public async getAll(request: Request, response: Response) {
            t.deepEqual(request.params, {
            });
            response.status(200).send(["a", "b", "c"]).end();
        }

    }
    const app: Application = t.context.app;
    app.addController(new GetAllController());

    await app.setup();
    await app.bootstrap();

    const testServer = supertest(Reflect.get(app, "_server"));

    await testServer.options(
        "/v1/getAll"
    ).expect((res: supertest.Response) => {
        t.is(res.get("Access-Control-Allow-Methods"), "get");
        t.is(res.status, 200);
    });

    await testServer.options(
        "/v1/getAll/foo"
    ).expect((res: supertest.Response) => {
        t.is(res.get("Access-Control-Allow-Methods"), "");
        t.is(res.status, 200);
    });

    await testServer.get(
        "/v1/getAll"
    ).expect((res: supertest.Response) => {
        t.is(res.status, 200);
        t.deepEqual(res.body, ["a", "b", "c"]);
    });
});

test("supports replace", async (t) => {
    t.plan(5);
    /* tslint:disable-next-line:max-classes-per-file */
    class ReplaceController extends Controller {

        public supportedHttpMethods: Array<methodName> = ["replace"];
        public path: string = "/replace";

        public async replace(request: Request, response: Response) {
            const body = JSON.parse(request.body.toString());
            t.deepEqual(body, {
                foo: "bar"
            });
            response.status(200).end();
        }

    }
    const app: Application = t.context.app;
    app.addController(new ReplaceController());

    await app.setup();
    await app.bootstrap();

    const testServer = supertest(Reflect.get(app, "_server"));

    await testServer.options(
        "/v1/replace"
    ).expect((res: supertest.Response) => {
        t.is(res.get("Access-Control-Allow-Methods"), "");
        t.is(res.status, 200);
    });

    await testServer.options(
        "/v1/replace/foo"
    ).expect((res: supertest.Response) => {
        t.is(res.get("Access-Control-Allow-Methods"), "put");
        t.is(res.status, 200);
    });

    await testServer.put(
        "/v1/replace/foo"
    ).type("application/json").send({
        foo: "bar"
    }).expect(200);
});

test("supports remove", async (t) => {
    t.plan(5);
    /* tslint:disable-next-line:max-classes-per-file */
    class RemoveController extends Controller {

        public supportedHttpMethods: Array<methodName> = ["remove"];
        public path: string = "/remove";

        public async remove(request: Request, response: Response) {
            t.is(request.params.removeId, "foo");
            response.status(200).end();
        }

    }
    const app: Application = t.context.app;
    app.addController(new RemoveController());

    await app.setup();
    await app.bootstrap();

    const testServer = supertest(Reflect.get(app, "_server"));

    await testServer.options(
        "/v1/remove"
    ).expect((res: supertest.Response) => {
        t.is(res.get("Access-Control-Allow-Methods"), "");
        t.is(res.status, 200);
    });

    await testServer.options(
        "/v1/remove/foo"
    ).expect((res: supertest.Response) => {
        t.is(res.get("Access-Control-Allow-Methods"), "delete");
        t.is(res.status, 200);
    });

    await testServer.delete(
        "/v1/remove/foo"
    ).expect(200);
});

test("supports modify", async (t) => {
    t.plan(6);
    /* tslint:disable-next-line:max-classes-per-file */
    class ModifyController extends Controller {

        public supportedHttpMethods: Array<methodName> = ["modify"];
        public path: string = "/modify";

        public async modify(request: Request, response: Response) {
            const body = JSON.parse(request.body.toString());
            t.is(request.params.modifyId, "foo");
            t.deepEqual(body, {
                foo: "bar"
            });
            response.status(200).end();
        }

    }
    const app: Application = t.context.app;
    app.addController(new ModifyController());

    await app.setup();
    await app.bootstrap();

    const testServer = supertest(Reflect.get(app, "_server"));

    await testServer.options(
        "/v1/modify"
    ).expect((res: supertest.Response) => {
        t.is(res.get("Access-Control-Allow-Methods"), "");
        t.is(res.status, 200);
    });

    await testServer.options(
        "/v1/modify/foo"
    ).expect((res: supertest.Response) => {
        t.is(res.get("Access-Control-Allow-Methods"), "patch");
        t.is(res.status, 200);
    });

    await testServer.patch(
        "/v1/modify/foo"
    ).send({
        foo: "bar"
    }).expect(200);
});

test("supports add", async (t) => {
    t.plan(5);
    /* tslint:disable-next-line:max-classes-per-file */
    class AddController extends Controller {

        public supportedHttpMethods: Array<methodName> = ["add"];
        public path: string = "/add";

        public async add(request: Request, response: Response) {
            const body = JSON.parse(request.body.toString());
            t.deepEqual(body, {
                foo: "bar"
            });
            response.status(200).end();
        }

    }
    const app: Application = t.context.app;
    app.addController(new AddController());

    await app.setup();
    await app.bootstrap();

    const testServer = supertest(Reflect.get(app, "_server"));

    await testServer.options(
        "/v1/add"
    ).expect((res: supertest.Response) => {
        t.is(res.get("Access-Control-Allow-Methods"), "post");
        t.is(res.status, 200);
    });

    await testServer.options(
        "/v1/add/foo"
    ).expect((res: supertest.Response) => {
        t.is(res.get("Access-Control-Allow-Methods"), "");
        t.is(res.status, 200);
    });

    await testServer.post(
        "/v1/add"
    ).send({
        foo: "bar"
    }).expect(200);
});

test("sends 501 if a route is not implemented", async (t) => {
    t.plan(2);
    /* tslint:disable-next-line:max-classes-per-file */
    class InProgressController extends Controller {

        public supportedHttpMethods: Array<methodName> = ["add", "replace", "modify", "getSingle", "getAll", "remove"];
        public path: string = "/inProgress";

    }
    const app: Application = t.context.app;
    app.addController(new InProgressController());

    await app.setup();
    await app.bootstrap();

    const testServer = supertest(Reflect.get(app, "_server"));

    await testServer.options(
        "/v1/inProgress"
    ).expect((res: supertest.Response) => {
        t.deepEqual(res.get("Access-Control-Allow-Methods").split(", ").sort(), ["get", "post"]);
    });

    await testServer.options(
        "/v1/inProgress/foo"
    ).expect((res: supertest.Response) => {
        t.deepEqual(res.get("Access-Control-Allow-Methods").split(", ").sort(), ["delete", "get", "patch", "put"]);
    });

    await testServer.post(
        "/v1/inProgress"
    ).expect(501);

    await testServer.get(
        "/v1/inProgress"
    ).expect(501);

    await testServer.get(
        "/v1/inProgress/foo"
    ).expect(501);

    await testServer.patch(
        "/v1/inProgress/foo"
    ).expect(501);

    await testServer.put(
        "/v1/inProgress/foo"
    ).expect(501);

    await testServer.delete(
        "/v1/inProgress/foo"
    ).expect(501);
});

test("sends 500 if a route fails", async (t) => {
    t.plan(8);
    /* tslint:disable-next-line:max-classes-per-file */
    class InProgressController extends Controller {

        public supportedHttpMethods: Array<methodName> = ["add", "replace", "modify", "getSingle", "getAll", "remove"];
        public path: string = "/inProgress";

        private _addCalled: boolean = false;
        private _replaceCalled: boolean = false;
        private _modifyCalled: boolean = false;
        private _getSingleCalled: boolean = false;
        private _getAllCalled: boolean = false;
        private _removeCalled: boolean = false;

        public async add() {
            if (!this._addCalled) {
                this._addCalled = true;
                t.pass();
            } else {
                t.fail("add called more than once");
            }
            throw new Error();
        }

        public async replace() {
            if (!this._replaceCalled) {
                this._replaceCalled = true;
                t.pass();
            } else {
                t.fail("replace called more than once");
            }
            throw new Error();
        }

        public async modify() {
            if (!this._modifyCalled) {
                this._modifyCalled = true;
                t.pass();
            } else {
                t.fail("modify called more than once");
            }
            throw new Error();
        }

        public async getSingle() {
            if (!this._getSingleCalled) {
                this._getSingleCalled = true;
                t.pass();
            } else {
                t.fail("getSingle called more than once");
            }
            throw new Error();
        }

        public async getAll() {
            if (!this._getAllCalled) {
                this._getAllCalled = true;
                t.pass();
            } else {
                t.fail("getAll called more than once");
            }
            throw new Error();
        }

        public async remove() {
            if (!this._removeCalled) {
                this._removeCalled = true;
                t.pass();
            } else {
                t.fail("remove called more than once");
            }
            throw new Error();
        }

    }
    const app: Application = t.context.app;
    app.addController(new InProgressController());

    await app.setup();
    await app.bootstrap();

    const testServer = supertest(Reflect.get(app, "_server"));

    await testServer.options(
        "/v1/inProgress"
    ).expect((res: supertest.Response) => {
        t.deepEqual(res.get("Access-Control-Allow-Methods").split(", ").sort(), ["get", "post"]);
    });

    await testServer.options(
        "/v1/inProgress/foo"
    ).expect((res: supertest.Response) => {
        t.deepEqual(res.get("Access-Control-Allow-Methods").split(", ").sort(), ["delete", "get", "patch", "put"]);
    });

    await testServer.post(
        "/v1/inProgress"
    ).expect(500);

    await testServer.get(
        "/v1/inProgress"
    ).expect(500);

    await testServer.get(
        "/v1/inProgress/foo"
    ).expect(500);

    await testServer.patch(
        "/v1/inProgress/foo"
    ).expect(500);

    await testServer.put(
        "/v1/inProgress/foo"
    ).expect(500);

    await testServer.delete(
        "/v1/inProgress/foo"
    ).expect(500);
});

test.afterEach(async (t) => {
    await t.context.app.debootstrap();
});
