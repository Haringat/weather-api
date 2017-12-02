import {
    readFile as readFileCb
} from "fs";
import {
    promisify
} from "util";
import App from "./core/app";
import parseConfigFile from "./core/configuration/Configuration";
import defaultConfig from "./core/configuration/defaults";
import console from "./core/logger";

const readFile = promisify(readFileCb);

export default async function() {

    const configFileContent = await readFile("./config/weather-api.json");

    return new App(parseConfigFile(configFileContent, defaultConfig)).bootstrap().then(() => {
        console.info("server running");
    });

}
