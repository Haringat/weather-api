import {
    Request, Response
} from "express";
import {
    Console2
} from "scribe-js/lib/console2";
import * as deps from "ts-dependency-injection";
import {
    Console2 as Console2Class
} from "../core/logger";
import StationService from "../core/services/StationService";

const {
    Injection
} = deps;

export default class StationsController {

    @Injection(Console2Class)
    private logger: Console2<"info" | "log" | "error" | "warning" | "dir">;

    @Injection(StationService)
    private stationsService: StationService;

    public async add(request: Request, response: Response) {
        try {
            const stations = this.stationsService.getAll();
            response.status(200).send(stations).end();
        } catch (e) {
            this.logger.error(e.stack);
            response.status(500).end();
        }
    }

}
