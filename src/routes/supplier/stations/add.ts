import {
    NextFunction, Request, Response
} from "express";
/*import {} from "swagger-node-express";

export default {
    spec: {
        description : "Operations about pets",
        path : "/pet.{format}/{petId}",
        notes : "Returns a pet based on ID",
        summary : "Find pet by ID",
        method: "GET",
        parameters : [swagger.pathParam("petId", "ID of pet that needs to be fetched", "string")],
        type : "Pet",
        errorResponses : [swagger.errors.invalid('id'), swagger.errors.notFound('pet')],
        nickname : "getPetById"
    },

}   */

export default async function(request: Request, response: Response) {
    // TODO: implement
    response.status(200).end();
}
