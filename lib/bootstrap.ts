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
import logger from "./core/logger";
import CapabilityService from "./core/services/CapabilityService";
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
    const app = new Application(config, logger);
    const storageService = new StorageService();
    const unitService = new UnitService(storageService);
    const capabilityService = new CapabilityService(storageService, unitService);
    const stationsService = new StationService(storageService, capabilityService);
    app.addController(new StationsController(logger, stationsService));
    app.addController(new CapabilityController(logger, capabilityService));

    await app.setup();
    await app.bootstrap();

}
