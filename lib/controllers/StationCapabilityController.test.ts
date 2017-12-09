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
import Capability from "../core/storage/model/Capability";
import Station from "../core/storage/model/Station";
import StationCapability from "../core/storage/model/StationCapability";
import Unit from "../core/storage/model/Unit";
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
        stationService
    );
    app.addController(stationCapabilityController);
    await app.setup();
    await app.bootstrap();
    t.context.app = app;
});

test("link capability to station", async (t) => {
    t.plan(1);
    const storageService = t.context.storageService;
    const station = new Station();
    station.id = "da830d0c-692d-4901-9b6d-f71ccf3257c8";
    station.name = "foo";
    station.latitude = 0;
    station.longitude = 0;
    station.altitude = 0;
    storageService._stations.push(station);
    const capability = new Capability();
    capability.name = "bar";
    capability.id = "dfed8f55-c6fa-4f81-a6d8-bd0abe56e13c";
    capability.unitId = "00000000-0000-0000-0000-000000000000";
    storageService._capabilities.push(capability);
    await superTest(t.context.app._server).post(
        "/v1/stations/da830d0c-692d-4901-9b6d-f71ccf3257c8/capabilities"
    ).send({
        data: {
            capabilityId: "dfed8f55-c6fa-4f81-a6d8-bd0abe56e13c"
        }
    }).expect(
        201
    );
    t.is(storageService._stationCapabilities.length, 1);
});

test("unlink capability from station", async (t) => {
    t.plan(1);
    const storageService = t.context.storageService;
    const station = new Station();
    station.id = "da830d0c-692d-4901-9b6d-f71ccf3257c8";
    station.name = "foo";
    station.latitude = 0;
    station.longitude = 0;
    station.altitude = 0;
    storageService._stations.push(station);
    const capability = new Capability();
    capability.name = "pressure";
    capability.id = "dfed8f55-c6fa-4f81-a6d8-bd0abe56e13c";
    capability.unitId = "1345d1a4-9ba8-48b4-9e61-006b6e203a6e";
    storageService._capabilities.push(capability);
    const stationCapability = new StationCapability();
    stationCapability.id = "c674e404-304d-4f37-80ee-8da3b84d880b";
    stationCapability.stationId = "da830d0c-692d-4901-9b6d-f71ccf3257c8";
    stationCapability.capabilityId = "dfed8f55-c6fa-4f81-a6d8-bd0abe56e13c";
    storageService._stationCapabilities.push(stationCapability);
    const unit = new Unit();
    unit.id = "1345d1a4-9ba8-48b4-9e61-006b6e203a6e";
    unit.name = "bar";
    storageService._units.push(unit);
    await superTest(t.context.app._server).delete(
        "/v1/stations/da830d0c-692d-4901-9b6d-f71ccf3257c8/capabilities/dfed8f55-c6fa-4f81-a6d8-bd0abe56e13c"
    ).expect(
        200
    );
    t.is(storageService._stationCapabilities.length, 0);
});

test.afterEach(async (t) => {
    const app: Application = t.context.app;
    await app.debootstrap();
});
