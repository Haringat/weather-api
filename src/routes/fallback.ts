import {
    Request, Response
} from "express";

// respond with 404 if no route matches
export default function(request: Request, response: Response) {
    response.status(404).end();
}
