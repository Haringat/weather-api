import {
    IConfiguration as IConfig
} from "./Configuration";

export default {
    /*"router.host": "127.0.0.1",
    "router.port": 8080*/
    router: {
        host: "127.0.0.1",
        port: 8080,
        swagger: {
            enableConsumerDocumentation: true,
            enableSupplierDocumentation: true
        }
    }
};

export interface IConfiguration extends IConfig {
    "router.host": string;
    "router.port": number;
    "router.swagger.enableConsumerDocumentation": boolean;
    "router.swagger.enableSupplierDocumentation": boolean;
}
