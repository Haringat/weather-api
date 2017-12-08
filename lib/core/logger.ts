import * as scribeJs from "scribe-js";
import * as expressLogger from "scribe-js/lib/expressLogger";

const {
    logger
} = expressLogger;

export type loggerMethods = "info" | "log" | "error" | "warning" | "dir";

export const {
   Console2
} = scribeJs({
    createDefaultConsole: true,
    rootPath: "./logs"
});

const console = new Console2<loggerMethods>({
    alwaysDate: true,
    alwaysLocation: true,
    alwaysTags: true,
    alwaysTime: true,
    logInConsole: true
});

console.addLogger("info");
console.addLogger("log");
console.addLogger("error");
console.addLogger("warning");
console.addLogger("dir");

export const expressMiddleWare = logger(console);

export default console;
