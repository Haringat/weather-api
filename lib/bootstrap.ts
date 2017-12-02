import * as fs from "fs";
import * as util from "util";
import App from "./core/app";
import parseConfigFile from "./core/configuration/Configuration";
import defaultConfig from "./core/configuration/defaults";
import {
    IConfiguration
} from "./core/configuration/defaults";

const readFile = util.promisify(fs.readFile);

export default async function() {

    const configPath = "./config/weather-api.json";

    let configFileContent: Buffer;
    try {
        configFileContent = await readFile(configPath);
    } catch (e) {
        throw new Error(`could not read config file at "${configPath}".`);
    }
    const config = parseConfigFile(configFileContent, defaultConfig) as IConfiguration;
    const app = new App(config);
    await app.setup();
    await app.bootstrap();

}
