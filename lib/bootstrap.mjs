import App from "./core/app";
import console from "./core/logger";
export default function () {
    return new App().bootstrap("127.0.0.1", 8080).then(() => {
        console[`info`]("server running");
    });
}
