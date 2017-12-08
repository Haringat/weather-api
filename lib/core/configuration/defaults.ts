import {
    IConfiguration as IConfig
} from "./Configuration";

export default {
    router: {
        host: "127.0.0.1",
        port: 8080
    }
};

export interface IConfiguration extends IConfig {
    "router.host": string;
    "router.port": number;
}
