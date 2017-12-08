import * as process from "process";
import bootstrap from "./bootstrap";
import LoggerService from "./core/services/LoggerService";

const logger = new LoggerService();

bootstrap().then(() => {
    logger.info("server running");
}, (e) => {
    logger.error("bootstrap failed due to an error.");
    logger.error(e.stack);
    process.exit(-1);
});
