import {
    Request, Response
} from "express";
import * as swagger from "swagger-node-express";

export default {
    spec: {
        description : "Adds a new station",
        errorResponses : [swagger.errors.invalid("station")],
        method: "POST",
        nickname : "addStations",
        notes : "Returns a pet based on ID",
        parameters : [],
        path : "/stations/",
        summary : "adds a stations",
        type : "Station"
    },
    async action(request: Request, response: Response) {
        // TODO: implement
        response.status(501).end();
    }
};
