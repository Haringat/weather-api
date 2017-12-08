import test from "ava";
import * as superTest from "supertest";
import Application from "../core/app";
import parseConfigFile from "../core/configuration/Configuration";
import {
    IConfiguration
} from "../core/configuration/defaults";
import CapabilityService from "../core/services/CapabilityService";
import LoggerService from "../core/services/LoggerService";
import StationService from "../core/services/StationService";
import UnitService from "../core/services/UnitService";
import StorageService from "../core/storage/StorageService";
import StationCapabilityController from "./StationCapabilityController";

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
    t.context.storageService = storageService;
    const unitService = new UnitService(storageService);
    const capabilityService = new CapabilityService(storageService, unitService);
    const stationService = new StationService(storageService, capabilityService);
    const stationCapabilityController = new StationCapabilityController(
        loggerService,
        stationService,
        capabilityService
    );
    app.addController(stationCapabilityController);
    await app.setup();
    await app.bootstrap();
    t.context.app = app;
});

test("unlink capability from station", async (t) => {
    await superTest(t.context.app._server).delete(
        "/v1/stations/foo/capabilities/bar"
    ).expect(
        200
    );
    t.pass();
});

test.todo("link capability to station");

test.afterEach(async (t) => {
    const app: Application = t.context.app;
    await app.debootstrap();
});
