var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import * as swagger from "swagger-node-express";
const action = (request, response) => __awaiter(this, void 0, void 0, function* () {
    // TODO: implement
    response.status(200).end();
});
export default {
    spec: {
        description: "Adds a new station",
        path: "/stations/",
        notes: "Returns a pet based on ID",
        summary: "adds a stations",
        method: "POST",
        parameters: [],
        type: "Station",
        errorResponses: [swagger.errors.invalid("station")],
        nickname: "addStations"
    },
    action
};
