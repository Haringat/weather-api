import * as fs from "fs";
import * as util from "util";
import CapabilityController from "./controllers/CapabilityController";
import StationsController from "./controllers/StationsController";
import Application from "./core/app";
import parseConfigFile from "./core/configuration/Configuration";
import defaultConfig from "./core/configuration/defaults";
import {
    IConfiguration
} from "./core/configuration/defaults";
import CapabilityService from "./core/services/CapabilityService";
import LoggerService from "./core/services/LoggerService";
import StationService from "./core/services/StationService";
import UnitService from "./core/services/UnitService";
import StorageService from "./core/storage/StorageService";

const readFile = util.promisify(fs.readFile);

export default async function() {

    const configPath = "./config/weather-api.json";

    let configFileContent: Buffer;
    try {
        configFileContent = await readFile(configPath);
    } catch (e) {
        throw new Error(`could not read config file at "${configPath}".`);
    }

    const config = parseConfigFile<IConfiguration>(configFileContent, defaultConfig);
    const loggerService = new LoggerService();
    const app = new Application(config, loggerService);
    const storageService = new StorageService(loggerService);
    const unitService = new UnitService(storageService);
    const capabilityService = new CapabilityService(storageService, unitService);
    const stationsService = new StationService(storageService, capabilityService);
    app.addController(new StationsController(loggerService, stationsService));
    app.addController(new CapabilityController(loggerService, capabilityService));

    await app.setup();
    await app.bootstrap();

}
