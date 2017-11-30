import * as scribeJs from "scribe-js";
import { Console2Static } from "scribe-js/lib/console2";
import { logger } from "scribe-js/lib/expressLogger";

/*const scribe = scribeJs({
    createDefaultConsole: true,
    rootPath: "./logs"
});

const Console2 = scribe.Console2;
const logger = scribe.express.logger;*/

const {
   Console2
} = scribeJs({
    createDefaultConsole: true,
    rootPath: "./logs"
});

const console = new Console2<"info" | "log" | "error" | "warning" | "dir">({
    alwaysTime: true,
    alwaysTags: true,
    alwaysLocation: true,
    alwaysDate: true,
    logInConsole: true
});

console.addLogger("info");
console.addLogger("log");
console.addLogger("error");
console.addLogger("warning");
console.addLogger("dir");

export const expressMiddleWare = logger(console);

export default console;
