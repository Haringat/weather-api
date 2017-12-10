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
import Station from "../core/storage/model/Station";
import StorageService from "../core/storage/StorageService";
import StationsController from "./StationController";

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

test("adds a new station", async (t) => {
    t.plan(1);
    await superTest(t.context.app._server).post(
        "/v1/stations/"
    ).set("Accept", "Application/JSON").send({
        data: {
            capabilities: [{
                unit: "%",
                name: "humidity"
            }],
            latitude: 10,
            longitude: 11,
            altitude: 12,
            name: "FooStation"
        }
    }).expect(
        201
    );
    t.is(
        t.context.storageService._stations.length, 1
    );
});

test("remove a station", async (t) => {
    t.plan(1);
    const storageService = t.context.storageService;
    const station = new Station();
    station.id = "da830d0c-692d-4901-9b6d-f71ccf3257c8";
    station.name = "foo";
    station.latitude = 0;
    station.longitude = 0;
    station.altitude = 0;
    storageService._stations.push(station);
    await superTest(t.context.app._server).delete(
        "/v1/stations/da830d0c-692d-4901-9b6d-f71ccf3257c8"
    ).expect(200);
    t.is(
        t.context.storageService._stations.length, 0
    );
});

test.afterEach.always(async (t) => {
    const app: Application = t.context.app;
    await app.debootstrap();
});
