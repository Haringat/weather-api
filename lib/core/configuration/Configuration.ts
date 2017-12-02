import console from "../logger";

export interface IConfiguration {
    readonly [key: string]: number | boolean | string;
}

export default function parseConfigFile(configFileContent: Buffer, defaultConfig: object): IConfiguration {
    const configObject = JSON.parse(configFileContent.toString("utf8"));
    const parsedConfig = Configuration.parseConfig(configObject);
    return new Proxy(new Configuration(parsedConfig, defaultConfig) as any, {
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

    public static parseConfig(config: object) {
        const configKeys = this.getConfigKeys(config);
        console.info(JSON.stringify(configKeys));
        return Object.values(configKeys).reduce((configuration, [key, value]) => {
            configuration[key] = value;
            return configuration;
        }, {});
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

    private static getConfigKeys(deepConfigObject) {
        return Object.entries(deepConfigObject).map(([key, value]) => {
            if (typeof value === "object") {
                return this.getConfigKeys(value);
            } else {
                return [
                    key,
                    value
                ];
            }
        }).reduce((configs, [key, conf]) => {
            if (conf instanceof Array) {
                return [
                    ...configs,
                    conf.map(([confKey, confValue]) => {
                        return [
                            Configuration.appendKey(key, confKey),
                            confValue
                        ];
                    })
                ];
            } else {
                return [
                    ...configs,
                    [key, conf]
                ];
            }
        }, []);
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
