import * as scribeJs from "scribe-js";
import * as expressLogger from "scribe-js/lib/expressLogger";

const {
    logger
} = expressLogger;

const {
   Console2
} = scribeJs({
    createDefaultConsole: true,
    rootPath: "./logs"
});

const console = new Console2<"info" | "log" | "error" | "warning" | "dir">({
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
