import * as process from "process";
import bootstrap from "./bootstrap";
import console from "./core/logger";

bootstrap().then(() => {
    console.info("server running");
}, (e) => {
    console.error("bootstrap failed due to an error.");
    console.error(e.stack);
    process.exit(-1);
});
