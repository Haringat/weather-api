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
import StationsController from "./StationsController";

test.beforeEach(async (t) => {
    const config = parseConfigFile(Buffer.from(JSON.stringify({
        router: {
            host: "127.0.0.1",
            port: 0
        }
    })), {
        router: {
            host: "127.0.0.1",
            port: 0
        }
    }) as IConfiguration;
    const loggerService = new LoggerService();
    const app = new Application(config, loggerService);
    const storageService = new StorageService(loggerService);
    t.context.storageService = storageService;
    const unitService = new UnitService(storageService);
    const capabilityService = new CapabilityService(storageService, unitService);
    const stationsService = new StationService(storageService, capabilityService);
    const stationsController = new StationsController(loggerService, stationsService);
    app.addController(stationsController);
    await app.setup();
    await app.bootstrap();
    t.context.app = app;
});

test.skip("adds a new station", async (t) => {
    t.plan(3);
    await superTest(t.context.app._server).post(
        "/v1/supplier/stations/"
    ).expect(
        200
    ).write(JSON.stringify({
        capabilities: [{
            unit: "%",
            name: "humidity"
        }],
        latitude: 10,
        longitude: 11,
        altitude: 12
    }));
    t.is(
        Object.getPrototypeOf(t.context.storageService._stations),
        Array.prototype,
        "storageService.stations is no Array anymore."
    );
    t.is(
        Object.getPrototypeOf(t.context.storageService._units),
        Array.prototype,
        "storageService.units is no Array anymore."
    );
    t.is(
        Object.getPrototypeOf(t.context.storageService._capabilities),
        Array.prototype,
        "storageService.capabilities is no Array anymore."
    );
});

test.afterEach.always(async (t) => {
    const app: Application = t.context.app;
    await app.debootstrap();
});
