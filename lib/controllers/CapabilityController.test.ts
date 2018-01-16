import test from "ava";
import * as superTest from "supertest";
import Application from "../core/app";
import parseConfigFile from "../core/configuration/Configuration";
import {
    IConfiguration
} from "../core/configuration/defaults";
import CapabilityService from "../core/services/CapabilityService";
import LoggerService from "../core/services/LoggerService";
import UnitService from "../core/services/UnitService";
import Capability from "../core/storage/model/Capability";
import Unit from "../core/storage/model/Unit";
import StorageService from "../core/storage/StorageService";
import CapabilityController from "./CapabilityController";

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
    const loggerService = new LoggerService();
    const app = new Application(config, loggerService);
    const storageService = new StorageService(loggerService);
    const unitService = new UnitService(storageService);
    const capabilityService = new CapabilityService(storageService, unitService);
    const capabilityController = new CapabilityController(loggerService, capabilityService);
    app.addController(capabilityController);
    await app.setup();
    await app.bootstrap();
    t.context.app = app;
    t.context.storageService = storageService;
});

test("add capability", async (t) => {
    t.plan(2);
    const testServer = superTest(t.context.app._server);
    const response: superTest.Response = await testServer.post(
        "/v1/capabilities"
    ).send({
        data: {
            name: "temperature",
            unit: "°C"
        }
    }).set("Accept", "Application/JSON").expect(201);
    t.true(response.header["content-type"].toLowerCase().includes("application/json"));
    t.true(/[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}/.test(response.body.data.id));
});

test("remove capability", async (t) => {
    t.plan(2);
    t.context.storageService._capabilities.push({
        id: "2a9fea2c-1227-42d7-8285-ef3ee8170ba8",
        name: "humidity",
        unitId: "6d6126ad-7354-48ee-87ba-bdaa77320fd1"
    });
    t.context.storageService._units.push({
        id: "6d6126ad-7354-48ee-87ba-bdaa77320fd1",
        name: "%"
    });
    const testServer = superTest(t.context.app._server);
    await testServer.delete(
        "/v1/capabilities/2a9fea2c-1227-42d7-8285-ef3ee8170ba8"
    ).expect(200);
    t.is(t.context.storageService._capabilities.length, 0, "capability was not actually deleted");
    t.is(t.context.storageService._units.length, 1, "deleting capability also deleted unit");
});

test("get capability by name", async (t) => {
    t.plan(2);
    const capability = new Capability();
    capability.id = "2a9fea2c-1227-42d7-8285-ef3ee8170ba8";
    capability.name = "humidity";
    capability.unitId = "6d6126ad-7354-48ee-87ba-bdaa77320fd1";
    t.context.storageService._capabilities.push(capability);
    const unit = new Unit();
    unit.id = "6d6126ad-7354-48ee-87ba-bdaa77320fd1";
    unit.name = "%";
    t.context.storageService._units.push(unit);
    const testServer = superTest(t.context.app._server);
    const response: superTest.Response = await testServer.get(
        "/v1/capabilities/humidity"
    );
    t.is(response.status, 200);
    t.deepEqual(response.body, {
        data: {
            id: "2a9fea2c-1227-42d7-8285-ef3ee8170ba8",
            name: "humidity",
            unit: "%"
        }
    });
});

test("get capability by id", async (t) => {
    t.context.storageService._capabilities.push({
        id: "2a9fea2c-1227-42d7-8285-ef3ee8170ba8",
        name: "humidity",
        unitId: "6d6126ad-7354-48ee-87ba-bdaa77320fd1"
    });
    t.context.storageService._units.push({
        id: "6d6126ad-7354-48ee-87ba-bdaa77320fd1",
        name: "%"
    });
    const testServer = superTest(t.context.app._server);
    const response: superTest.Response = await testServer.get(
        "/v1/capabilities/2a9fea2c-1227-42d7-8285-ef3ee8170ba8"
    );
    t.is(response.status, 200);
    const body = response.body;
    t.deepEqual(body, {
        data: {
            id: "2a9fea2c-1227-42d7-8285-ef3ee8170ba8",
            name: "humidity",
            unit: "%"
        }
    });
});

test.afterEach(async (t) => {
    const app: Application = t.context.app;
    await app.debootstrap();
});
