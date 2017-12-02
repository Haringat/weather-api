import {
    flatten
} from "flat";
import console from "../logger";

export interface IConfiguration {
    readonly [key: string]: number | boolean | string;
}

export default function parseConfigFile(configFileContent: Buffer, defaultConfig: object): IConfiguration {
    const configObject = JSON.parse(configFileContent.toString("utf8"));
    const flatConfig = flatten(configObject, {
        maxDepth: 100
    });
    const flatDefaults = flatten(defaultConfig);
    // noinspection JSUnusedLocalSymbols (the parameters are set by standard)
    return new Proxy(new Configuration(flatConfig, flatDefaults) as any, {
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
        ownKeys(target) {
            return Object.getOwnPropertyNames(target);
        },
        set(target, key) {
            console.warning(`config is read-only. Tried to set key ${key}`);
            return false;
        }
    }) as IConfiguration;
}

class Configuration {

    public config: {
        [key: string]: boolean | number | string;
    };

    constructor(config: object, defaults: object) {
        Object.getOwnPropertyNames(defaults).forEach((propertyName) => {
            if (!config.hasOwnProperty(propertyName)) {
                const defaultValue = defaults[propertyName];
                console.warning(`Missing configuration value for key "${propertyName}" (Expected type:` +
                    `"${typeof defaultValue}"). Falling back to default value "${defaultValue}"`);
            }
        });
        this.config = {
            ...defaults,
            ...config
        } as {
            [key: string]: boolean | number | string;
        };
    }

}
