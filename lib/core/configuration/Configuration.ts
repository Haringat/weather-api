import {
    readFile as readFileCb
} from "fs";
import {
    promisify
} from "util";
import console from "../logger";
import defaultConfig from "./defaults";

const readFile = promisify(readFileCb);

export default class Configuration {

    public static async parseConfigFile(configFileContent: Buffer) {
        const configObject = JSON.parse(configFileContent.toString());
        const parsedConfig = Configuration.parseConfig(configObject);
        return new Proxy(new Configuration(parsedConfig, defaultConfig), {
            get(target, key) {
                if (target.config.hasOwnProperty(key)) {
                    return target.config[key];
                } else {
                    console.error(`Tried to access non-existing config key "${key}".`);
                    return undefined;
                }
            },
            has(target, key) {
                return target.config.hasOwnProperty(key);
            },
            set(target, key) {
                console.warning(`config is read-only. Tried to set key ${key}`);
                return false;
            }
        });
    }

    private static appendKey(prefix, key) {
        if (typeof key === "string") {
            return `${prefix}.${key}`;
        } else if (typeof key === "number") {
            return `${prefix}[${key}]`;
        } else {
            throw new Error(`key must be a number or string. "${typeof key}" given`);
        }
    }

    private static parseConfig(config: object) {
        return Configuration.parseConfigRecursive("", config);
    }

    private static parseConfigRecursive(prefix: string, config: object | string | number) {
        if (typeof config !== "object") {
            return [prefix, config];
        }
        return Object.entries(config).map(([key, value]) => {
            return Configuration.parseConfigRecursive(Configuration.appendKey(prefix, key), value);
        }).reduce((conf, [key, value]) => {
            conf[key] = value;
            return conf;
        }, {});
    }

    public config: {
        [key: string]: boolean | number | string;
    };

    constructor(config: object, defaults: object) {
        this.config = Object.entries(defaults).reduce((object, [key, defaultValue]) => {
            const configuredValue = config[key];
            if (configuredValue === undefined) {
                console.warning(`Missing configuration value for key "${key}" (Expected type:` +
                    `"${typeof defaultValue}"). Falling back to default value "${defaultValue}"`);
                object[key] = defaultValue;
            } else {
                object[key] = configuredValue;
            }
            return object;
        }, {});
    }

    public getConfig(key: string) {
        return this.config[key];
    }

}
