import * as flat from "flat";

const {
    flatten
} = flat;

export interface IConfiguration {
    readonly [key: string]: number | boolean | string;
}

export default function parseConfigFile<T extends object>(
    configFileContent: Buffer,
    defaultConfig: object
): T {
    const configObject = JSON.parse(configFileContent.toString());
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
            return false;
        }
    }) as T;
}

class Configuration {

    public config: {
        [key: string]: boolean | number | string;
    };

    constructor(config: object, defaults: object) {
        Object.getOwnPropertyNames(defaults).forEach((propertyName) => {
            if (!config.hasOwnProperty(propertyName)) {
                const defaultValue = defaults[propertyName];
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
