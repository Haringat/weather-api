import {
    Request, Response
} from "express";
import * as swagger from "swagger-node-express";

const action = async (request: Request, response: Response) => {
    // TODO: implement
    response.status(200).end();
};

export default {
    spec: {
        description : "Adds a new station",
        path : "/stations/",
        notes : "Returns a pet based on ID",
        summary : "adds a stations",
        method: "POST",
        parameters : [],
        type : "Station",
        errorResponses : [swagger.errors.invalid("station")],
        nickname : "addStations"
    },
    action
};
